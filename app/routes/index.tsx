import {
  defer,
  LinksFunction,
  SerializeFrom,
  type LoaderArgs,
} from '@shopify/remix-oxygen';
import {Suspense, useState} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {seoPayload} from '~/lib/seo.server';
import type {CollectionConnection} from '@shopify/hydrogen/storefront-api-types';
import {routeHeaders, CACHE_LONG} from '~/data/cache';

import Banner from '~/components/homepage/Banner';
import FeaturedProducts, {
  Skeleton as FeaturedSkeleton,
} from '~/components/homepage/FeaturedProducts';
import invariant from 'tiny-invariant';
import SplitView from '~/components/homepage/SplitView';
import InstagramGallery from '~/components/homepage/InstagramGallery';
import MultiCarousel, {
  Skeleton as MultiCarouselSkeleton,
} from '~/components/global/Carousel';

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: '/banner.JPG',
    as: 'image',
    type: 'image/jpg',
  },
  {
    rel: 'preload',
    href: '/split-1.jpg',
    as: 'image',
    type: 'image/jpg',
  },
  {
    rel: 'preload',
    href: '/split-2.jpg',
    as: 'image',
    type: 'image/jpg',
  },
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

  const featured_products_query = `#graphql
query FeaturedProductsQuery {
  featuredProducts: collections(first: 1, query: "title:Featured Products") {
    nodes {
      title
      handle
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
    }
  }
}
`;

  const featuredProductsPromise = context.storefront.query<{
    featuredProducts: CollectionConnection;
  }>(featured_products_query);

  const collectionsPromise = context.storefront.query<{
    collections: CollectionConnection;
  }>(all_collections_query);

  return defer({
    featuredProductsPromise,
    collectionsPromise,
  });
}

export default function Homepage() {
  const {featuredProductsPromise, collectionsPromise} =
    useLoaderData<typeof loader>();

  // TODO: skeletons vs placeholders

  return (
    <>
      <Banner />
      <Suspense fallback={<FeaturedSkeleton />}>
        <Await resolve={featuredProductsPromise}>
          {(data) => {
            return (
              <FeaturedProducts
                data={data.featuredProducts.nodes[0].products.nodes}
              />
            );
          }}
        </Await>
      </Suspense>
      <SplitView />
      {/*
      <Suspense fallback={<MultiCarouselSkeleton />}>
        <Await resolve={collectionsPromise}>
          {(data) => {
            return <MultiCarousel array={data.collections.nodes} />;
          }}
        </Await>
      </Suspense>
*/}

      <InstagramGallery />
    </>
  );
}
