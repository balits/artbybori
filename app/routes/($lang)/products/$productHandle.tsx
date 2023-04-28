import {type ReactNode, useRef, Suspense, useMemo, useCallback} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {defer, json, SerializeFrom, type LoaderArgs} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  Await,
  useSearchParams,
  useLocation,
  useTransition,
} from '@remix-run/react';

import {
  AnalyticsPageType,
  ShopifyAnalyticsProduct,
  ShopPayButton,
} from '@shopify/hydrogen';
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import type {
  ProductVariant,
  SelectedOptionInput,
  Product as ProductType,
  Shop,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import type {Storefront} from '~/lib/type';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';
import {Container, ContainerProps, NoWrapContainer} from '~/components/global/Container';
import InstagramGallery from '~/components/homepage/InstagramGallery';

import { ProductCarousel, Skeleton as CarouselSkeleton } from '~/components/global/Carousel';
import { useWindowSize } from 'react-use';
import { AddToCartButton, ProductGallery } from '~/components';
import { Link, Text } from '~/components/ui';
import { IconCaret, IconCheck } from '~/components/ui/Icon';
import { Button, MyMoney } from '~/components/ui';
import { Minus, Plus } from '~/components/global/Icon';
import CheckoutButton from '~/components/global/CheckoutButton';

export const headers = routeHeaders;

export async function loader({params, request, context}: LoaderArgs) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const searchParams = new URL(request.url).searchParams;

  const selectedOptions: SelectedOptionInput[] = [];
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query<{
    product: ProductType & {selectedVariant?: ProductVariant};
    shop: Shop;
  }>(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };

  const seo = seoPayload.product({ product,
    selectedVariant,
    url: request.url,
  });

  return defer(
    {
      product,
      shop,
      storeDomain: shop.primaryDomain.url,
      recommended,
      analytics: {
        pageType: AnalyticsPageType.product,
        resourceId: product.id,
        products: [productAnalytics],
        totalValue: parseFloat(selectedVariant.price.amount),
      },
      seo,
    },
    {
      headers: {
        'Cache-Control': CACHE_SHORT,
      },
    },
  );
}

/**
* This component renders a full-width section up to [medium breakpoint](https://tailwindcss.com/docs/responsive-design)
* After that it renders a `Container` which has a max-w property
* */
function ContainerSwitch({
  children,
  className,
  as
}: {
    children: React.ReactNode
} & ContainerProps) {
  const {width} = useWindowSize();

  return width >= 768 ? (
    <Container as={as} className={className}>
      {children}
    </Container>
  ) : <section id="mobile-img-gallery" className={className}>{children}</section>
}

export default function ProductPage() {
  const {product, shop, recommended} = useLoaderData<typeof loader>();
  const {media, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;


  return (
    <>
      <ContainerSwitch
        as="div"
        className="relative scaling-mt-header grid grid-cols-1 md:grid-cols-2 md:gap-8 "
      >
        <div className="w-full ">
          <ProductGallery
            media={media.nodes}
            className="w-screen md:w-full "
          />
        </div>

        <section className="top-0 sticky h-fit px-6 py-4  md:scaling-pt-header">
          <ProductDescription />

          <div className="divide-y divide-custom-placeholder-green grid ">
            {descriptionHtml && (
              <ProductDetail
                title="Details"
                content={descriptionHtml}
              />
            )}
            {shippingPolicy?.body && (
              <ProductDetail
                title="Shipping"
                content={getExcerpt(shippingPolicy.body)}
                learnMore={`/policies/${shippingPolicy.handle}`}
              />
            )}
            {refundPolicy?.body && (
              <ProductDetail
                title="Returns"
                content={getExcerpt(refundPolicy.body)}
                learnMore={`/policies/${refundPolicy.handle}`}
              />
            )}
          </div>
        </section>

      </ContainerSwitch>

      <NoWrapContainer className="h-fit my-32">
        <h2 className="tracking-tight text-custom-black text-2xl md:text-2xl lg:text-4xl font-serif mb-12 ">
          You might also like.
        </h2>
        <Suspense fallback={<CarouselSkeleton />}>
          <Await
            errorElement="There was a problem loading recomended products"
            resolve={recommended}
          >
            {(data) => {
              return data?.recomended && (
                <ProductCarousel
                  size='normal'
                  products={data.recomended as SerializeFrom<ProductType[]>}
                  textOnTop={true}
                />)
            }}
          </Await>
        </Suspense>
      </NoWrapContainer>

      <InstagramGallery mt="mt-8"/>
    </>
  );

}

export function ProductDescription() {
  const {product, analytics, storeDomain} = useLoaderData<typeof loader>();

  const [currentSearchParams] = useSearchParams();
  const transition = useTransition();

  /**
* We update `searchParams` with in-flight request data from `transition` (if available)
* to create an optimistic UI, e.g. check the product option before the
* request has completed.
*/
  const searchParams = useMemo(() => {
    return transition.location
      ? new URLSearchParams(transition.location.search)
      : currentSearchParams;
  }, [currentSearchParams, transition]);

  const firstVariant = product.variants.nodes[0];

  /**
* We're making an explicit choice here to display the product options
* UI with a default variant, rather than wait for the user to select
* options first. Developers are welcome to opt-out of this behavior.
* By default, the first variant's options are used.
*/
  const searchParamsWithDefaults = useMemo<URLSearchParams>(() => {
    const clonedParams = new URLSearchParams(searchParams);

    for (const {name, value} of firstVariant.selectedOptions) {
      if (!searchParams.has(name)) {
        clonedParams.set(name, value);
      }
    }

    return clonedParams;
  }, [searchParams, firstVariant.selectedOptions]);

  /**
* Likewise, we're defaulting to the first variant for purposes
* of add to cart if there is none returned from the loader.
* A developer can opt out of this, too.
*/
  const selectedVariant = product.selectedVariant ?? firstVariant;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const isOnSale =
    selectedVariant?.price?.amount &&
      selectedVariant?.compareAtPrice?.amount &&
      selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  const productAnalytics: ShopifyAnalyticsProduct = {
    ...analytics.products[0],
    quantity: 1,
  };

  const getFirstSentence = useCallback((str: string)=>{
    const match = str.match(/^[^.!?]+[.!?]/);
    return match ? match[0] : str;
  },[]);


  return (
    <div className="grid gap-8">
      <div className="grid gap-8">
        <div className='flex items-center justify-between'>
          <Text as="h3" size="xl" bold>
            {product.title}
          </Text>
          <div className="flex items-center gap-2 mt-2">
          {selectedVariant.price && (
            <MyMoney
              data={selectedVariant.price}
              compareAtPrice={selectedVariant.compareAtPrice}
            />
          )}
        </div>
        </div>
        <div className=" flex flex-col gap-4 ">{getFirstSentence(product.description)}</div>

        <ProductOptions
          options={product.options}
          searchParamsWithDefaults={searchParamsWithDefaults}
        />

        {selectedVariant && (
          <div className="grid grid-cols-1  items-stretch gap-4 my-8">
            {isOutOfStock ? (
              <Button isDisabled>
                Sold&nbsp;out
              </Button>
            ) : (
                <>
                  <AddToCartButton
                    variant="signature"
                    width='full'
                    disabled={isOutOfStock}
                    lines={[
                      {
                        merchandiseId: selectedVariant.id,
                        quantity: 1,
                      },
                    ]}
                    data-test="add-to-cart"
                    analytics={{
                      products: [productAnalytics],
                      totalValue: parseFloat(productAnalytics.price),
                    }}
                  >
                    Add&nbsp;to&nbsp;Cart
                  </AddToCartButton>
                  {/* <Button to="/" >Checkout</Button> */}
                  <CheckoutButton variantIds={[selectedVariant.id!]} storeDomain={storeDomain} />
                </>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductOptions({
  options,
  searchParamsWithDefaults,
}: {
    options: ProductType['options'];
    searchParamsWithDefaults: URLSearchParams;
  }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const realOptions = options.filter((o) => o.values.length >1)

  return realOptions.length > 0 ? (
    <div className="grid grid-cols-1 gap-8">
      {realOptions
        .map((option) => (
          <fieldset
            key={option.name}
            className="grid grid-cols-1 gap-y-3 last:mb-0"
          >
            <legend className=" font-semibold mb-2">{option.name}:</legend>
            <div className="flex flex gap-4">
              {/**
* First, we render a bunch of <Link> elements for each option value.
* When the user clicks one of these buttons, it will hit the loader
* to get the new data.
*
* If there are more than 7 values, we render a dropdown.
* Otherwise, we just render plain links.
*/}
              {option.values.length > 4 ? (
                <div className="relative w-full">
                  <Listbox>
                    {({open}) => (
                      <>
                        <Listbox.Button
                          ref={closeRef}
                          className={clsx(
                            'flex items-center justify-between w-full py-3 px-4 border border-primary',
                            open
                              ? 'rounded-b md:rounded-t md:rounded-b-none'
                              : 'rounded',
                          )}
                        >
                          <span>
                            {searchParamsWithDefaults.get(option.name)}
                          </span>
                          <IconCaret direction={open ? 'up' : 'down'} />
                        </Listbox.Button>
                        <Listbox.Options
                          className={clsx(
                            'border-primary bg-contrast absolute bottom-12 z-30 grid h-48 w-full overflow-y-scroll rounded-t border px-2 py-2 transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none md:border-t-0 md:border-b',
                            open ? 'max-h-48' : 'max-h-0',
                          )}
                        >
                          {option.values.map((value) => (
                            <Listbox.Option
                              key={`option-${option.name}-${value}`}
                              value={value}
                            >
                              {({active}) => (
                                <ProductOptionLink
                                  optionName={option.name}
                                  optionValue={value}
                                  className={clsx(
                                    'text-primary w-full p-2 transition rounded flex justify-start items-center text-left cursor-pointer',
                                    active && 'bg-primary/10',
                                  )}
                                  searchParams={searchParamsWithDefaults}
                                  onClick={() => {
                                    if (!closeRef?.current) return;
                                    closeRef.current.click();
                                  }}
                                >
                                  {value}
                                  {searchParamsWithDefaults.get(option.name) ===
                                    value && (
                                      <span className="ml-2">
                                        <IconCheck />
                                      </span>
                                    )}
                                </ProductOptionLink>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </>
                    )}
                  </Listbox>
                </div>
              ) : (
                  <>
                    {option.values.map((value) => {
                      const checked =
                        searchParamsWithDefaults.get(option.name) === value;
                      const id = `option-${option.name}-${value}`;

                      return (
                        <p key={id}>
                          <ProductOptionLink
                            optionName={option.name}
                            optionValue={value}
                            searchParams={searchParamsWithDefaults}
                            className={clsx(
                              'py-1 border-b-[1px] cursor-pointer transition-all duration-200',
                              checked
                                ? 'border-custom-black'
                                : 'border-custom-placeholder-green',
                            )}
                          />
                        </p>
                      );
                    })}
                  </>
                )}
            </div>
          </fieldset>
        ))}
    </div>
  ): <></>
}

function ProductOptionLink({
  optionName,
  optionValue,
  searchParams,
  children,
  ...props
}: {
    optionName: string;
    optionValue: string;
    searchParams: URLSearchParams;
    children?: ReactNode;
    [key: string]: any;
  }) {
  const {pathname} = useLocation();
  const isLangPathname = /\/[a-zA-Z]{2}-[a-zA-Z]{2}\//g.test(pathname);
  // fixes internalized pathname
  const path = isLangPathname
    ? `/${pathname.split('/').slice(2).join('/')}`
    : pathname;

  const clonedSearchParams = new URLSearchParams(searchParams);
  clonedSearchParams.set(optionName, optionValue);

  return (
    <Link
      {...props}
      preventScrollReset
      prefetch="intent"
      replace
      to={`${path}?${clonedSearchParams.toString()}`}
    >
      {children ?? optionValue}
    </Link>
  );
}

function ProductDetail({
  title,
  content,
  learnMore,
}: {
    title: string;
    content: string;
    learnMore?: string;
  }) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2 gap-6 py-4">
      {({open}) => (
        <>
          <Disclosure.Button className={`text-left `}>
            <div className="flex justify-between">
              <h3 className=" lg:text-lg ">
                {title}
              </h3>
              {open ? <Minus className='text-custom-grey'/> : <Plus className='text-custom-grey' / >}
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'pl-2 grid gap-2'}>
            <div
              className="prose text-sm lg:text-md text-custom-grey "
              dangerouslySetInnerHTML={{__html: content}}
            />
            {learnMore && (
              <div className="">
                <Link
                  className="underline underline-2 underline-offset-2 hover:opacity-70  "
                  to={learnMore}
                >
                  Learn more
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
fragment ProductVariantFragment on ProductVariant {
id
availableForSale
selectedOptions {
name
value
}
image {
id
url
altText
width
height
}
price {
amount
currencyCode
}
compareAtPrice {
amount
currencyCode
}
sku
title
unitPrice {
amount
currencyCode
}
product {
title
handle
}
}
`;

const PRODUCT_QUERY = `#graphql
${MEDIA_FRAGMENT}
${PRODUCT_VARIANT_FRAGMENT}
query Product(
$country: CountryCode
$language: LanguageCode
$handle: String!
$selectedOptions: [SelectedOptionInput!]!
) @inContext(country: $country, language: $language) {
product(handle: $handle) {
id
title
vendor
handle
descriptionHtml
description
collections(first: 5) {
  nodes {
    handle
    title
  }
}
options {
  name
  values
}
selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
  ...ProductVariantFragment
}
media(first: 7) {
  nodes {
    ...Media
  }
}
variants(first: 1) {
  nodes {
    ...ProductVariantFragment
  }
}
seo {
  description
  title
}
}
shop {
  name
  primaryDomain {
    url
  }
  shippingPolicy {
    body
    handle
  }
  refundPolicy {
    body
    handle
  }
}
}
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
${PRODUCT_CARD_FRAGMENT}
query productRecommendations(
  $count: Int
  $country: CountryCode
  $language: LanguageCode
) @inContext(country: $country, language: $language) {
  bestSelling: products(first: $count, sortKey: BEST_SELLING) {
    nodes {
      ...ProductCard
    }
  }
  newest: products(first:6, sortKey: UPDATED_AT) {
    nodes {
      ...ProductCard
    }
  }
}`;

async function getRecommendedProducts(
  storefront: Storefront,
  productId: string,
) {
  const products = await storefront.query<{
    bestSelling: ProductConnection;
    newest: ProductConnection;
  }>(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = products.bestSelling.nodes
  .concat(products.newest.nodes)
  .filter(
    (value, index, array) =>
      array.findIndex((value2) => value2.id === value.id) === index,
  );

  const originalProduct = mergedProducts
  .map((item: ProductType) => item.id)
  .indexOf(productId);

  mergedProducts.splice(originalProduct, 1);

  return { recomended: mergedProducts };
}
