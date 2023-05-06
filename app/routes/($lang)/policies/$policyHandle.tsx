import { json, type LoaderArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { Heading, Text, Link } from '~/components/ui';
import invariant from 'tiny-invariant';
import { ShopPolicy } from '@shopify/hydrogen/storefront-api-types';
import { routeHeaders, CACHE_LONG } from '~/data/cache';
import { seoPayload } from '~/lib/seo.server';
import Container from '~/components/global/Container';
import { LeftArrow } from '~/components/global/Icon';

export const headers = routeHeaders;

export async function loader({ request, params, context }: LoaderArgs) {
  invariant(params.policyHandle, 'Missing policy handle');
  const handle = params.policyHandle;

  const policyName = handle.replace(/-([a-z])/g, (_: unknown, m1: string) =>
    m1.toUpperCase(),
  );

  const data = await context.storefront.query<{
    shop: Record<string, ShopPolicy>;
  }>(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');
  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response(null, { status: 404 });
  }

  const seo = seoPayload.policy({ policy, url: request.url });

  return json(
    { policy, seo },
    {
      headers: {
        'Cache-Control': CACHE_LONG,
      },
    },
  );
}

export default function Policies() {
  const { policy } = useLoaderData<typeof loader>();

  return (
    <>
      <Container className='scaling-mt-header min-h-minus-header '>

          <Heading as="h1" spacing>
            {policy.title}
          </Heading>
          <Link to="/policies">
            <Text size="sm" className='inline-flex gap-x-2 items-center justify-center '>
              <LeftArrow />{' '}back to policies
            </Text>
          </Link>

        <div className="flex-grow w-full my-12">
          <div
            dangerouslySetInnerHTML={{ __html: policy.body }}
            className="prose prose-sm lg:prose-base hover:prose-a:text-custom-signature-green"
          />
        </div>
      </Container>
    </>
  );
}

const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }

  query PoliciesQuery(
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
    $refundPolicy: Boolean!
  ) @inContext(language: $language) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`;
