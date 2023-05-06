import { json, type LoaderArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import type {
  Collection,
  CollectionConnection,
} from '@shopify/hydrogen/storefront-api-types';
import {
  Heading,
  Link,
  Button,
} from '~/components/ui';
import { getImageLoadingPriority } from '~/lib/const';
import { seoPayload } from '~/lib/seo.server';
import { CACHE_SHORT, routeHeaders } from '~/data/cache';
import { getPaginationVariables, Pagination } from '~/components/ui';
import Container from '~/components/global/Container';

const PAGINATION_SIZE = 8;

export const headers = routeHeaders;

export const loader = async ({ request, context: { storefront } }: LoaderArgs) => {
  const variables = getPaginationVariables(request, PAGINATION_SIZE);
  const { collections: collectionCollections } = await storefront.query<{
    collections: CollectionConnection;
  }>(COLLECTIONS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  const seo = seoPayload.listCollections({
    collections: collectionCollections,
    url: request.url,
  });





  return json(
    {
      collectionCollections,
      collections: collectionCollections.nodes.filter(e => e.handle !== "hero" && e.handle !== "featured-products" && e.products?.nodes?.length !== 0),
      seo,
    },
    {
      headers: {
        'Cache-Control': CACHE_SHORT,
      },
    },
  );
};

export default function Collections() {
  const { collectionCollections, collections } = useLoaderData<typeof loader>();

  return (
      <Container as={"section"} className='scaling-mt-header'>
        <Pagination connection={collectionCollections}>
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
          }) => (
            <>
              {hasPreviousPage && (
                <div className="flex items-center justify-center mt-6">
                  <Button
                    to={prevPageUrl}
                    variant="light"
                    width="full"
                    prefetch="intent"
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
                    {isLoading ? 'Loading...' : 'Previous products'}
                  </Button>
                </div>
              )}

              <ul
                className='grid gap-6 md:gap-8 lg:gap-10 place-items-center grid-cols-1 md:grid-cols-2'
                data-test="collection-grid"
              >
                {nodes.map((collection, i) => (
                 <CollectionCard
                    collection={collection as Collection}
                    key={collection.id}
                    loading={getImageLoadingPriority(i, 2)}
                  />
                ))}
              </ul>
              {hasNextPage && (
                <div className="flex items-center justify-center mt-6">
                  <Button
                    ref={nextLinkRef}
                    to={nextPageUrl}
                    variant="secondary"
                    width="full"
                    prefetch="intent"
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
                    {isLoading ? 'Loading...' : 'Next products'}
                  </Button>
                </div>
              )}
            </>
          )}
        </Pagination>
      </Container>
  );
}

function CollectionCard({
  collection,
  loading,
}: {
  collection: Collection;
  loading?: HTMLImageElement['loading'];
}) {
  console.log(collection)
  if (!collection.image || collection.products.nodes.length == 0) return null

  return (
    <Link to={`/categories/${collection.handle}`} className="grid gap-4 w-full h-full w-full h-full">
      <div className="card-image bg-custom-placeholder-green aspect-[3/2]">
        {collection?.image && (
          <img
            alt={collection.title}
            src={collection.image.url}
            height={400}
            sizes="(max-width: 32em) 100vw, 33vw"
            width={600}
            loading={loading}
          />
        )}
      </div>
      <Heading  size='sm' as="h3">
        {collection.title}
      </Heading>
    </Link>
  )
}

const COLLECTIONS_QUERY = `#graphql
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        id
        title
        description
        descriptionHtml
        handle
        seo {
          description
          title
        }
        image {
          id
          url
          width
          height
          altText
        }
        products(first:2) {
          nodes {
            handle
          }
        }
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
