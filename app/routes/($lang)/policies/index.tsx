import { json, type LoaderArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import type { ShopPolicy } from '@shopify/hydrogen/storefront-api-types';
import invariant from 'tiny-invariant';
import { routeHeaders, CACHE_LONG } from '~/data/cache';
import { seoPayload } from '~/lib/seo.server';
import { Container } from '~/components/global/Container';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Heading, Link, Text } from '~/components/ui';

export const headers = routeHeaders;

export async function loader({ request, context: { storefront } }: LoaderArgs) {
  const data = await storefront.query<{
    shop: Record<string, ShopPolicy>;
  }>(POLICIES_QUERY);

  invariant(data, 'No data returned from Shopify API');
  const policies = Object.values(data.shop || {});

  if (policies.length === 0) {
    throw new Response('Not found', { status: 404 });
  }

  const seo = seoPayload.policies({ policies, url: request.url });

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
  const { policies } = useLoaderData<typeof loader>();

  return (
    <Container className="scaling-mt-header h-minus-header">
      <Heading as="h1" spacing>
        Policies
      </Heading>

      <ul className='space-y-6 '>
        {policies.map(pol => (
          pol && (
            <li key={pol.id}>
              <Link to={`/policies/${pol.handle}`}>
                <Text size='xl' font='font-sans' className='underline underline-offset-2 hover:opacity-80'>
                  {pol.title}
                </Text>
              </Link>
            </li>
          )
        ))}
        <li>
          <Link to={`/policies/privacy-policy`}>
            <Text size='xl' font='font-sans' className='underline underline-offset-2 hover:opacity-80'>
              Privacy Policy
            </Text>
          </Link>
        </li>
        <li>
          <Link to={`/policies/tos`}>
            <Text size='xl' font='font-sans' className='underline underline-offset-2 hover:opacity-80'>
              Terms of Serice
            </Text>
          </Link>
        </li>
      </ul>
    </Container>
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
