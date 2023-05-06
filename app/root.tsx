import {
  defer,
  type LinksFunction,
  type MetaFunction,
  type LoaderArgs,
  type AppLoadContext,
} from '@shopify/remix-oxygen';
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useMatches,
} from '@remix-run/react';
import { ShopifySalesChannel, Seo, useShopifyCookies, getClientBrowserParameters, sendShopifyAnalytics, AnalyticsEventName, ShopifyPageView, ShopifyPageViewPayload } from '@shopify/hydrogen';
import Layout from './components/global/Layout';
import tailwind from './styles/app.css';
import carouselCss from "react-multi-carousel/lib/styles.css";
import favicon from '../public/favicon.svg';
import { seoPayload } from '~/lib/seo.server';
import { DEFAULT_LOCALE } from './lib/utils';
import invariant from 'tiny-invariant';
import { Shop, Cart } from '@shopify/hydrogen/storefront-api-types';
import { useAnalytics } from './hooks/useAnalytics';
import Container from './components/global/Container';
import { useEffect, useState } from 'react';
import { useLocation } from '@remix-run/react';
import { useAnalyticsFromLoaders } from './lib/analytics';
import { Button } from './components/ui';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: carouselCss },
    { rel: 'stylesheet', href: tailwind },
    { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
    { rel: "preconnect", href: "https://rsms.me/inter/inter.css" },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader({ request, context }: LoaderArgs) {
  const [customerAccessToken, cartId, shop] = await Promise.all([
    context.session.get('customerAccessToken'),
    context.session.get('cartId'),
    getLayoutData(context),
  ]);

  const seo = seoPayload.root({ shop: shop, url: request.url });




  return defer({
    isLoggedIn: Boolean(customerAccessToken),
    selectedLocale: context.storefront.i18n,
    cart: cartId ? getCart(context, cartId) : undefined,
    analytics: {
      shopifySalesChannel: ShopifySalesChannel.hydrogen,
      shopId: shop.id,
    },
    seo,
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const locale = data.selectedLocale ?? DEFAULT_LOCALE;

  const [userConset, setUserConsent] = useState(false);
  useShopifyCookies({ hasUserConsent: userConset })

  const location = useLocation();
  const pageAnalytics = useAnalyticsFromLoaders();

  useEffect(() => {
    console.log(pageAnalytics)
    const payload = {
      ...getClientBrowserParameters(),
      ...pageAnalytics,
      userConset,
      shopifySalesChannel: ShopifySalesChannel.hydrogen,
    };

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  useAnalytics(userConset, locale);

  return (
    <html lang={locale.language}>
      <head>
        <meta charSet="utf-8" />
        <Seo />
        <Meta />
        <Links />
      </head>
      <body className='selection:bg-custom-brighter-green'>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AcceptCookiesModal() {
  return (
    <aside>

    </aside>
  )
}

function NotFoundError({ type }: { type?: string }) {
  return (
    <div className="text-center">
      <p className="text-base font-semibold text-custom-signature-green">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-custom-black sm:text-5xl">Page not found</h1>
      <p className="mt-6 text-base leading-7 text-custom-lightgrey">
        Whoops! We couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Button
        href="#"
        variant="signature"
        className="mt-8"
        to="/"
      >
        Go back home
      </Button>
    </div>
  );
}

function GenericError({ error }: { error?: { message: string, stack?: string } }) {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  function addLinksToStackTrace(stackTrace: string) {
    return stackTrace?.replace(
      /^\s*at\s?.*?[(\s]((\/|\w\:).+)\)\n/gim,
      (all, m1) =>
        all.replace(
          m1,
          `<a href="vscode://file${m1}" class="hover:underline">${m1}</a>`,
        ),
    );
  }
  return (
    <div className="text-center">
      <p className="text-base font-semibold text-custom-signature-green">ERROR</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-custom-black sm:text-5xl">Something ain&apos;t right...</h1>
      <p className="mt-6 text-base leading-7 text-custom-lightgrey" >{error?.message}</p>
      {error?.stack && (<pre
        style={{
          padding: '2rem',
          background: 'hsla(10, 50%, 50%, 0.1)',
          color: 'red',
          overflow: 'auto',
          maxWidth: '100%',
        }}
        dangerouslySetInnerHTML={{
          __html: addLinksToStackTrace(error.stack),
        }}
      />
      )}
      <Button
        href="#"
        variant="signature"
        className="mt-8"
        to="/"
      >
        Go back home
      </Button>
    </div>
  )
}

export function CatchBoundary() {
  const [root] = useMatches();
  const caught = useCatch();
  const isNotFound = caught.status === 404;
  const locale = root.data?.selectedLocale ?? DEFAULT_LOCALE;

  return (
    <html lang={locale.language}>
      <head>
        <title>{isNotFound ? 'Not found' : 'Error'}</title>
        <Meta />
        <Links />
      </head>
      <body className=''>
        <Layout noFooter>
          <div className='h-screen grid place-items-center  px-8'>

            {isNotFound ? (
              <NotFoundError type={caught.data?.pageType} />
            ) : (
              <GenericError
                error={{ message: `${caught.status} ${caught.data}` }}
              />
            )}
          </div>
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const [root] = useMatches();
  const locale = root?.data?.selectedLocale ?? DEFAULT_LOCALE;

  return (
    <html lang={locale.language}>
      <head>
        <title>Error</title>
        <Meta />
        <Links />
      </head>
      <body className=''>
        <Layout noFooter>
          <div className='h-screen grid place-items-center  px-8'>
              <GenericError
                error={error}
              />
          </div>
        </Layout>
        <ScrollRestoration />
        <Scripts/>
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layoutMenus(
    $language: LanguageCode
  ) @inContext(language: $language) {
    shop {
      id
      name
      description
      primaryDomain {
        url
      }
      brand {
       logo {
         image {
          url
         }
       }
     }
    }
  }
`;

async function getLayoutData({ storefront }: AppLoadContext) {
  const data = await storefront.query<{ shop: Shop }>(LAYOUT_QUERY, {
    variables: {
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  return data.shop;
}

const CART_QUERY = `#graphql
  query CartQuery($cartId: ID!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }

  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            amountPerQuantity {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              availableForSale
              compareAtPrice {
                ...MoneyFragment
              }
              price {
                ...MoneyFragment
              }
              requiresShipping
              title
              image {
                ...ImageFragment
              }
              product {
                handle
                title
                id
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
      totalDutyAmount {
        ...MoneyFragment
      }
      totalTaxAmount {
        ...MoneyFragment
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
    }
  }

  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }

  fragment ImageFragment on Image {
    id
    url
    altText
    width
    height
  }
`;

export async function getCart({ storefront }: AppLoadContext, cartId: string) {
  invariant(storefront, 'missing storefront client in cart query');

  const { cart } = await storefront.query<{ cart?: Cart }>(CART_QUERY, {
    variables: {
      cartId,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });

  return cart;
}
