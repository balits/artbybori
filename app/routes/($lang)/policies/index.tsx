import {json, type LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import type {ShopPolicy} from '@shopify/hydrogen/storefront-api-types';
import invariant from 'tiny-invariant';
import {PageHeader, Section, Heading, Link} from '~/components';
import {routeHeaders, CACHE_LONG} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {Container} from '~/components/global/Container';
import {useEffect, useState} from 'react';
import clsx from 'clsx';

export const headers = routeHeaders;

export async function loader({request, context: {storefront}}: LoaderArgs) {
  const data = await storefront.query<{
    shop: Record<string, ShopPolicy>;
  }>(POLICIES_QUERY);

  invariant(data, 'No data returned from Shopify API');
  const policies = Object.values(data.shop || {});

  if (policies.length === 0) {
    throw new Response('Not found', {status: 404});
  }

  const seo = seoPayload.policies({policies, url: request.url});

  return json(
    {
      policies,
      seo,
    },
    {
      headers: {
        'Cache-Control': CACHE_LONG,
      },
    },
  );
}

export default function Policies() {
  const {policies} = useLoaderData<typeof loader>();

  const [selectedPolicy, setSelectedPolicy] =
    useState<Partial<ShopPolicy> | null>(null);

  return (
    <>
      <Container className="scaling-mt-header grid grid-cols-1 md:grid-cols-2 min-h-minus-header  py-8">
        <section className="w-full h-fit flex items-center justify-start mt-16">
          <ul className="flex flex-col gap-y-4 md:gap-y-8 lg:gap-y-16 ">
            {policies.map(
              (policy) =>
                policy && (
                  <li key={policy.id}>
                    <button
                      className={clsx(
                        'font-semibold text-2xl hover:opacity-80 active:opacity-100',
                        policy.id === selectedPolicy?.id &&
                          'underline decoration-3 decoration-offset-3',
                      )}
                      onClick={() => setSelectedPolicy(policy)}
                    >
                      {policy.title}
                    </button>
                  </li>
                ),
            )}
          </ul>
        </section>
        <section className="w-full h-full">
          <p
            className="prose"
            dangerouslySetInnerHTML={{__html: selectedPolicy?.body ?? ''}}
          ></p>
        </section>
      </Container>
    </>
  );
}

const POLICIES_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    id
    title
    handle
    body
  }

  query PoliciesQuery {
    shop {
      privacyPolicy {
        ...Policy
      }
      shippingPolicy {
        ...Policy
      }
      termsOfService {
        ...Policy
      }
      refundPolicy {
        ...Policy
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;
