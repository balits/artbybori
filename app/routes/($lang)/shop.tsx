import {defer, json, type LoaderArgs} from '@shopify/remix-oxygen';
<<<<<<< HEAD
import {useCatch, useLoaderData} from '@remix-run/react';
import type {Product, ProductConnection} from '@shopify/hydrogen/storefront-api-types';
import invariant from 'tiny-invariant';
import {getPaginationVariables, ProductCard} from '~/components';
=======
import {useLoaderData} from '@remix-run/react';
import type {Product, ProductConnection} from '@shopify/hydrogen/storefront-api-types';
import invariant from 'tiny-invariant';
import {getPaginationVariables} from '~/components';
>>>>>>> refs/remotes/origin/main
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders, CACHE_LONG, CACHE_SHORT} from '~/data/cache';
import ProductGrid, {Fallback} from '~/components/shop/ProductGrid';
import {flattenConnection} from '@shopify/hydrogen';
import InstagramGallery from '~/components/homepage/InstagramGallery';
<<<<<<< HEAD
import {Collection, CollectionConnection} from '@shopify/hydrogen/storefront-api-types';
import { NoWrapContainer } from '~/components/global/Container';
=======
import {Collection} from '@shopify/hydrogen/storefront-api-types';
>>>>>>> refs/remotes/origin/main

const PAGE_BY = 8;

export const headers = routeHeaders;

export async function loader({request, context: {storefront}}: LoaderArgs) {
  const variables = getPaginationVariables(request, PAGE_BY);

  const {products} = await storefront.query<{
    products: ProductConnection;
  }>(ALL_PRODUCTS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(products, 'No products returned from Shopify API');

<<<<<<< HEAD
  /* const {collections} = await storefront.query<{
    collections: CollectionConnection
  }>(COLLECTIONS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    }
  })

  invariant(collections, "No collection returned from Shopify API");
  const products = flattenCollectionProducts(collections); */

=======
>>>>>>> refs/remotes/origin/main
  const seoCollection = {
    id: 'all-products',
    title: 'All Products',
    handle: 'products',
    descriptionHtml: 'All the store products',
    description: 'All the store products',
    seo: {
      title: 'All Products',
      description: 'All the store products',
    },
    metafields: [],
    products,
    updatedAt: '',
  } satisfies Collection;

  const seo = seoPayload.collection({
    collection: seoCollection,
    url: request.url,
  });

  return json(
    {
      products,
      seo,
    },
    {
      headers: {
        'Cache-Control': CACHE_SHORT,
      },
    },
  );
}

export default function AllProducts() {
  const {products} = useLoaderData<typeof loader>();

  return (
<<<<<<< HEAD
    <NoWrapContainer as={"section"} className="scaling-mt-header">
      <div className='pt-12 mb-16'>
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-cantata '>Shop all products.</h1>
      </div>
       {products && (
        <ProductGrid products={flattenConnection(products) as Product[]} />
      ) }
      <InstagramGallery mt="mt-32" />
    </NoWrapContainer>
  );
}

=======
    <>
      {products && (
        <ProductGrid products={flattenConnection(products) as Product[]} />
      )}
      <InstagramGallery mt="mt-32" />
    </>
  );
}

/*
        <Pagination connection={products}>
          {({
            endCursor,
            hasNextPage,
            hasPreviousPage,
            nextPageUrl,
            nodes,
            prevPageUrl,
            startCursor,
            nextLinkRef,
            isLoading,
          }) => {
            const itemsMarkup = nodes.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                loading={getImageLoadingPriority(i)}
              />
            ));

            return (
              <>
                {hasPreviousPage && (
                  <div className="flex items-center justify-center mt-6">
                    <Button
                      to={prevPageUrl}
                      variant="secondary"
                      prefetch="intent"
                      width="full"
                      disabled={!isLoading}
                      state={{
                        pageInfo: {
                          endCursor,
                          hasNextPage,
                          startCursor,
                        },
                        nodes,
                      }}
                    >
                      {isLoading ? 'Loading...' : 'Previous'}
                    </Button>
                  </div>
                )}
                <Grid data-test="product-grid">{itemsMarkup}</Grid>
                {hasNextPage && (
                  <div className="flex items-center justify-center mt-6">
                    <Button
                      ref={nextLinkRef}
                      to={nextPageUrl}
                      variant="secondary"
                      prefetch="intent"
                      width="full"
                      disabled={!isLoading}
                      state={{
                        pageInfo: {
                          endCursor,
                          hasPreviousPage,
                          startCursor,
                        },
                        nodes,
                      }}
                    >
                      {isLoading ? 'Loading...' : 'Next'}
                    </Button>
                  </div>
                )}
              </>
            );
          }}
        </Pagination>
*/

>>>>>>> refs/remotes/origin/main
const ALL_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
<<<<<<< HEAD

function flattenCollectionProducts(colls: CollectionConnection)  {
   let x =  flattenConnection(colls)
    .filter(coll => coll.handle != "hero" && coll.handle != "featured-products")
    .map(coll => coll.products)
    .flat();
  return x;
}

const COLLECTIONS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query Collections(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 10) {
      nodes {
        handle
        products(first:50) {
          nodes { ...ProductCard }
        }
      }
    }
  }`;
=======
>>>>>>> refs/remotes/origin/main
