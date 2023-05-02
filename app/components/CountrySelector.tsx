import {useFetcher, useLocation, useMatches} from '@remix-run/react';
import {Heading, Button} from '~/components';
import {useCallback, useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import {Localizations, Locale, CartAction} from '~/lib/type';
import {DEFAULT_LOCALE} from '~/lib/utils';
import clsx from 'clsx';
import {CartBuyerIdentityInput} from '@shopify/hydrogen/storefront-api-types';
import { IconCheck, Text } from './ui';

export function CountrySelector() {
  const [root] = useMatches();
  const fetcher = useFetcher();
  const closeRef = useRef<HTMLDetailsElement>(null);
  const selectedLocale = root.data?.selectedLocale ?? DEFAULT_LOCALE;
  const {pathname, search} = useLocation();
  const pathWithoutLocale = `${pathname.replace(
    selectedLocale.pathPrefix,
    '',
  )}${search}`;

  const countries = (fetcher.data ?? {}) as Localizations;
  const defaultLocale = countries?.['default'];
  const defaultLocalePrefix = defaultLocale
    ? `${defaultLocale?.language}-${defaultLocale?.country}`
    : '';

  const {ref, inView} = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const observerRef = useRef(null);
  useEffect(() => {
    ref(observerRef.current);
  }, [ref, observerRef]);

  // Get available countries list when in view
  useEffect(() => {
    if (!inView || fetcher.data || fetcher.state === 'loading') return;
    fetcher.load('/api/countries');
  }, [inView, fetcher]);

  const closeDropdown = useCallback(() => {
    closeRef.current?.removeAttribute('open');
  }, []);

  return (
    <section
      ref={observerRef}
      className="grid w-full max-w-[40%] gap-4"
      onMouseLeave={closeDropdown}
    >
      <div className="relative">
        <details
          className="absolute w-full border rounded border-white open:round-b-none overflow-clip"
          ref={closeRef}
        >
          <summary className="flex items-center justify-between w-full px-4 py-3 cursor-pointer">
            <Text as={"span"} >
            {selectedLocale.label}
            </Text>
          </summary>
          <div className="w-full overflow-auto border-t border-custom-white dark:border-white bg-custom-white max-h-36">
            {countries &&
              Object.keys(countries).map((countryPath) => {
                const countryLocale = countries[countryPath];
                const isSelected =
                  countryLocale.language === selectedLocale.language &&
                  countryLocale.country === selectedLocale.country;

                const countryUrlPath = getCountryUrlPath({
                  countryLocale,
                  defaultLocalePrefix,
                  pathWithoutLocale,
                });

                return (
                  <Country
                    key={countryPath}
                    closeDropdown={closeDropdown}
                    countryUrlPath={countryUrlPath}
                    isSelected={isSelected}
                    countryLocale={countryLocale}
                  />
                );
              })}
          </div>
        </details>
      </div>
    </section>
  );
}

function Country({
  closeDropdown,
  countryLocale,
  countryUrlPath,
  isSelected,
}: {
  closeDropdown: () => void;
  countryLocale: Locale;
  countryUrlPath: string;
  isSelected: boolean;
}) {
  return (
    <ChangeLocaleForm
      key={countryLocale.country}
      redirectTo={countryUrlPath}
      buyerIdentity={{
        countryCode: countryLocale.country,
      }}
    >
      <Button
        className={clsx([
          'bg-custom-signature-green w-full p-2 transition rounded flex justify-start',
          'items-center text-left cursor-pointer py-2 px-4',
        ])}
        type="submit"
        variant="primary"
        onClick={closeDropdown}
      >
        {countryLocale.label}
        {isSelected ? (
          <span className="ml-2">
            <IconCheck />
          </span>
        ) : null}
      </Button>
    </ChangeLocaleForm>
  );
}

function ChangeLocaleForm({
  children,
  buyerIdentity,
  redirectTo,
}: {
  children: React.ReactNode;
  buyerIdentity: CartBuyerIdentityInput;
  redirectTo: string;
}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input
        type="hidden"
        name="cartAction"
        value={CartAction.UPDATE_BUYER_IDENTITY}
      />
      <input
        type="hidden"
        name="buyerIdentity"
        value={JSON.stringify(buyerIdentity)}
      />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      {children}
    </fetcher.Form>
  );
}

function getCountryUrlPath({
  countryLocale,
  defaultLocalePrefix,
  pathWithoutLocale,
}: {
  countryLocale: Locale;
  pathWithoutLocale: string;
  defaultLocalePrefix: string;
}) {
  let countryPrefixPath = '';
  const countryLocalePrefix = `${countryLocale.language}-${countryLocale.country}`;

  if (countryLocalePrefix !== defaultLocalePrefix) {
    countryPrefixPath = `/${countryLocalePrefix.toLowerCase()}`;
  }
  return `${countryPrefixPath}${pathWithoutLocale}`;
}
