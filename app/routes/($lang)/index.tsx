import {
  defer,
  type LoaderArgs,
} from '@shopify/remix-oxygen';
import { Suspense } from 'react';
import { Await, useLoaderData } from '@remix-run/react';
import { seoPayload } from '~/lib/seo.server';
import type {
  CollectionConnection,
  Image,
} from '@shopify/hydrogen/storefront-api-types';
import { routeHeaders, CACHE_LONG } from '~/data/cache';

import Banner from '~/components/homepage/Banner';
import FeaturedProducts, {
  Skeleton as FeaturedSkeleton,
} from '~/components/homepage/FeaturedProducts';
import SplitView from '~/components/homepage/SplitView';
import InstagramGallery from '~/components/homepage/InstagramGallery';
import {
  CollectionCarousel,
  Skeleton as CarouselSkeleton,
} from '~/components/global/Carousel';
import invariant from 'tiny-invariant';
import { AnalyticsPageType, flattenConnection } from '@shopify/hydrogen';
import { Container, NoWrapContainer } from '~/components/global/Container';
import { Heading, MyHeading } from '~/components/ui';
import { filterInvalidCollections } from '~/lib/utils';

export const headers = routeHeaders;

export async function loader({ params, context }: LoaderArgs) {
  const { language, country } = context.storefront.i18n;

  if (
    params.lang &&
    params.lang.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the lang URL param is defined, yet we still are on `EN-US`
    // the the lang param must be invalid, send to the 404 page
    throw new Response(null, { status: 404 });
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
images(first: 2) {
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

  const seo = seoPayload.home();

  return defer(
    {
      hero,
      collectionsPromise,
      seo,
      analytics: {
        pageType: AnalyticsPageType.home
      }
    },
    {
      headers: {
        'Cache-Control': CACHE_LONG,
      },
    },
  );
}

export default function Homepage() {
  const { hero: homepage, collectionsPromise } = useLoaderData<typeof loader>();

  return (
    <>
      <Banner image={homepage.hero.image} />

      <div className='bg-custom-white'>
        <Container className="py-20">
          <Heading>
            Featured products.
          </Heading>
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
        </Container>

        <SplitView />

        <NoWrapContainer as={"section"} className="h-fit py-8 md:py-12 lg:py-20">
          <div className="">
            <Heading>
              Shop by categories.
            </Heading>
            <Suspense fallback={<CarouselSkeleton />}>
              <Await resolve={collectionsPromise}>
                {({ collections }) => {
                  if (!collections) return <CarouselSkeleton />;
                  const items = filterInvalidCollections(flattenConnection(collections));
                  return (
                    <CollectionCarousel size="normal" collections={items} textOnTop={true} />
                  );
                }}
              </Await>
            </Suspense>
          </div>
        </NoWrapContainer>

        <InstagramGallery />

      </div>
    </>
  );
}
