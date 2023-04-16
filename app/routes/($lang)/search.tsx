import {
  defer,
  type LoaderArgs,
  type SerializeFrom,
} from '@shopify/remix-oxygen';
<<<<<<< HEAD
import { flattenConnection } from '@shopify/hydrogen';
import { Await, Form, useLoaderData } from '@remix-run/react';
=======
import {flattenConnection} from '@shopify/hydrogen';
import {Await, Form, useLoaderData} from '@remix-run/react';
>>>>>>> refs/remotes/origin/main
import type {
  Collection,
  CollectionConnection,
  Product,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';
<<<<<<< HEAD
import { Suspense } from 'react';
import invariant from 'tiny-invariant';
import {
  FeaturedCollections,
  ProductGrid, ProductSwimlane,
} from '~/components';
import { PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import { PAGINATION_SIZE } from '~/lib/const';
import { seoPayload } from '~/lib/seo.server';
import { HiSearch } from 'react-icons/hi';
import { NoWrapContainer } from '~/components/global/Container';
import { CollectionCarousel, ProductCarousel } from '~/components/global/Carousel';

export async function loader({ request, context: { storefront } }: LoaderArgs) {
=======
import {Suspense} from 'react';
import invariant from 'tiny-invariant';
import {
  Heading,
  Input,
  PageHeader,
  ProductGrid,
  ProductSwimlane,
  FeaturedCollections,
  Section,
  Text,
} from '~/components';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {PAGINATION_SIZE} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';

export async function loader({request, context: {storefront}}: LoaderArgs) {
>>>>>>> refs/remotes/origin/main
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor')!;
  const searchTerm = searchParams.get('q')!;

  const data = await storefront.query<{
    products: ProductConnection;
  }>(SEARCH_QUERY, {
    variables: {
      pageBy: PAGINATION_SIZE,
      searchTerm,
      cursor,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');
<<<<<<< HEAD
  const { products } = data;
=======
  const {products} = data;
>>>>>>> refs/remotes/origin/main

  const getRecommendations = !searchTerm || products?.nodes?.length === 0;
  const seoCollection = {
    id: 'search',
    title: 'Search',
    handle: 'search',
    descriptionHtml: 'Search results',
    description: 'Search results',
    seo: {
      title: 'Search',
      description: `Showing ${products.nodes.length} search results for "${searchTerm}"`,
    },
    metafields: [],
    products,
    updatedAt: new Date().toISOString(),
  } satisfies Collection;

  const seo = seoPayload.collection({
    collection: seoCollection,
    url: request.url,
  });

  return defer({
    seo,
    searchTerm,
    products,
    noResultRecommendations: getRecommendations
      ? getNoResultRecommendations(storefront)
      : Promise.resolve(null),
  });
}

export default function Search() {
<<<<<<< HEAD
  const { searchTerm, products, noResultRecommendations } =
=======
  const {searchTerm, products, noResultRecommendations} =
>>>>>>> refs/remotes/origin/main
    useLoaderData<typeof loader>();
  const noResults = products?.nodes?.length === 0;

  return (
<<<<<<< HEAD
    <NoWrapContainer className='scaling-mt-header'>
      <div>
        <h1 className='text-3xl font-cantata font-semibold capitalize'>
=======
    <>
      <div className='scaling-mt-header px-6'>
        <h1 className='text-3xl font-cantata font-semibold capitalize'>
          Search
>>>>>>> refs/remotes/origin/main
        </h1>
        <Form method="get" className="relative flex w-full text-lg ">
          <input
            className='p-2 w-full'
            defaultValue={searchTerm}
            placeholder="Search…"
            type="search"
            name="q"
          />
          <button className="p-2" type="submit">
<<<<<<< HEAD
            <HiSearch className='h-4 w-4 md:w-5 md:h-5  cursor-pointer focus:ring-custom-black' />
=======
            Go
>>>>>>> refs/remotes/origin/main
          </button>
        </Form>
      </div>
      {!searchTerm || noResults ? (
        <>
          {noResults && (
<<<<<<< HEAD
            <section >
              <p className="opacity-50">
                No results, try something else.
              </p>
            </section>
=======
            <Section padding="x">
              <Text className="opacity-50">
                No results, try something else.
              </Text>
            </Section>
>>>>>>> refs/remotes/origin/main
          )}
          <Suspense>
            <Await
              errorElement="There was a problem loading related products"
              resolve={noResultRecommendations}
            >
              {(data) => (
<<<<<<< HEAD
                 <>
                  <FeaturedCollections
                    collections={data?.featuredCollections as SerializeFrom<Collection[]>} />

                  <CollectionCarousel
=======
                <>
                  <FeaturedCollections
                    title="Trending Collections"
>>>>>>> refs/remotes/origin/main
                    collections={
                      data!.featuredCollections as SerializeFrom<Collection[]>
                    }
                  />
<<<<<<< HEAD
                   <ProductSwimlane
                    title='Treding Products'
                    products={data!.featuredProducts as SerializeFrom<Product[]>}
=======
                  <ProductSwimlane
                    title="Trending Products"
                    products={
                      data!.featuredProducts as SerializeFrom<Product[]>
                    }
>>>>>>> refs/remotes/origin/main
                  />
                </>
              )}
            </Await>
          </Suspense>
        </>
      ) : (
<<<<<<< HEAD
        <section >
          <ProductGrid
            key="search"
            url={`/search?q=${searchTerm}`}
            collection={{ products } as Collection}
          />
        </section>
      )}
    </NoWrapContainer>
=======
        <Section>
          <ProductGrid
            key="search"
            url={`/search?q=${searchTerm}`}
            collection={{products} as Collection}
          />
        </Section>
      )}
    </>
>>>>>>> refs/remotes/origin/main
  );
}

const SEARCH_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query search(
    $searchTerm: String
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $after: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $pageBy
      sortKey: RELEVANCE
      query: $searchTerm
      after: $after
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export async function getNoResultRecommendations(
  storefront: LoaderArgs['context']['storefront'],
) {
  const data = await storefront.query<{
    featuredCollections: CollectionConnection;
    featuredProducts: ProductConnection;
  }>(SEARCH_NO_RESULTS_QUERY, {
    variables: {
      pageBy: PAGINATION_SIZE,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  return {
    featuredCollections: flattenConnection(data.featuredCollections),
    featuredProducts: flattenConnection(data.featuredProducts),
  };
}

const SEARCH_NO_RESULTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query searchNoResult(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
  ) @inContext(country: $country, language: $language) {
<<<<<<< HEAD
    featuredCollections: collections(first: 5, sortKey: UPDATED_AT) {
=======
    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {
>>>>>>> refs/remotes/origin/main
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
    featuredProducts: products(first: $pageBy) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
