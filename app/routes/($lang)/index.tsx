import {
  defer,
  HeadersFunction,
  LinksFunction,
  SerializeFrom,
  type LoaderArgs,
} from '@shopify/remix-oxygen';
import {Suspense, useState} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {seoPayload} from '~/lib/seo.server';
import type {
  CollectionConnection,
  Image,
} from '@shopify/hydrogen/storefront-api-types';
import {routeHeaders, CACHE_LONG} from '~/data/cache';

import Banner from '~/components/homepage/Banner';
import FeaturedProducts, {
  Skeleton as FeaturedSkeleton,
} from '~/components/homepage/FeaturedProducts';
import SplitView from '~/components/homepage/SplitView';
import InstagramGallery from '~/components/homepage/InstagramGallery';
import {
  CollectoinCarousel,
  Skeleton as CarouselSkeleton,
} from '~/components/global/Carousel';
import invariant from 'tiny-invariant';
import {CacheLong, flattenConnection} from '@shopify/hydrogen';
import Container from '~/components/global/Container';

export const links: LinksFunction = () => [
  /* {
    rel: 'preload',
    as: 'image',
    href: '/split-1.jpg',
  },
  {
    rel: 'preload',
    as: 'image',
    href: '/split-2.jpg',
  }, */
];

export async function loader({params, context}: LoaderArgs) {
  const {language, country} = context.storefront.i18n;

  if (
    params.lang &&
    params.lang.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the lang URL param is defined, yet we still are on `EN-US`
    // the the lang param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const all_collections_query = `#graphql
query AllCollectionsQuery {
  collections(first: 20) {
    nodes {
      id
      title
      handle
      image {
        url
        altText
      }
      products(first: 5) {
        nodes {
          id
          title
          description
          handle
          images(first: 1) {
            nodes {
              altText
              url
              width
              height
            }
          }
          variants(first:1) {
            nodes {
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
`;

  const hero_seo_query = `
query($handle: String!) {
  hero: collectionByHandle(handle: $handle) {
    image {
      url
      width,
      height
      altText
    }
  }
	shop {
		name
    description
	}
}
`;
  const hero = await context.storefront.query<{
    hero: {
      image: Image;
    };
    shop: {
      name: string;
      description: string;
    };
  }>(hero_seo_query, {
    variables: {
      handle: 'hero',
    },
  });

  const collectionsPromise = context.storefront.query<{
    collections: CollectionConnection;
  }>(all_collections_query);

  invariant(collectionsPromise, 'No collections returned from Storefont API\n');

  return defer(
    {
      hero,
      collectionsPromise,
    },
    {
      headers: {
        'Cache-Control': CACHE_LONG,
      },
    },
  );
}

export default function Homepage() {
  const {hero: homepage, collectionsPromise} = useLoaderData<typeof loader>();

  // TODO: skeletons vs placeholders

  return (
    <>
      <Banner image={homepage.hero.image} />
      {collectionsPromise && (
        <Suspense fallback={<FeaturedSkeleton />}>
          <Await resolve={collectionsPromise}>
            {(data) => {
              const featuredProducts = data.collections.nodes.find(
                (collection) => collection.handle === 'featured-products',
              );
              return featuredProducts ? (
                <FeaturedProducts data={featuredProducts.products.nodes} />
              ) : (
                <FeaturedSkeleton />
              );
            }}
          </Await>
        </Suspense>
      )}
      <SplitView />

      <section className="bg-custom-signature-green w-full h-fit my-12">
        <Container className="py-8 lg:py-16">
          <h2 className="mb-12 text-4xl text-custom-white font-cantata font-semibold ">
            Shop by categories.
          </h2>
          <Suspense fallback={<CarouselSkeleton />}>
            <Await resolve={collectionsPromise}>
              {({collections}) => {
                if (!collections) return <CarouselSkeleton />;
                const items = flattenConnection(collections).filter(
                  (coll) =>
                    coll.handle !== 'hero' &&
                    coll.handle !== 'featured-products',
                );
                return <CollectoinCarousel collections={items} />;
              }}
            </Await>
          </Suspense>
        </Container>
      </section>

      <InstagramGallery />
    </>
  );
}
