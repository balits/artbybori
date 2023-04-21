import {json, SerializeFrom, type LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import type {Product, ProductConnection} from '@shopify/hydrogen/storefront-api-types';
import invariant from 'tiny-invariant';
import { getPaginationVariables } from '~/components/ui/Pagination';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';
import ProductGrid from '~/components/shop/ProductGrid';
import {flattenConnection} from '@shopify/hydrogen';
import InstagramGallery from '~/components/homepage/InstagramGallery';
import {Collection, CollectionConnection} from '@shopify/hydrogen/storefront-api-types';
import Container, { NoWrapContainer } from '~/components/global/Container';
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

  const seoCollection = {
    id: 'all-products',
    title: 'All Products',
    handle: 'products',
    descriptionHtml: 'All the store products',
    description: 'All the store products',
    seo: {
      title: 'Shop',
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
    <Container as={"section"} className="scaling-mt-header mb-8">
      <div className='pt-6 md:pt-10 lg:pt-12 mb-8 md:mg-12 lg:mb-16'>
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-cantata '>Shop all products.</h1>
      </div>
       {products && (
        <ProductGrid products={flattenConnection(products) as SerializeFrom<Product[]>} />
      ) }
      <InstagramGallery mt="mt-32" />
    </Container>
  );
}

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
