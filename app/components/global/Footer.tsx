import {Link} from "~/components"
import {Container} from '~/components/global/Container';
import {SiFacebook, SiGmail, SiInstagram, SiTiktok} from 'react-icons/si';

import {CountrySelector} from '../CountrySelector';

export default function Footer() {
  const routeLinks = [
    {
      url: 'shop',
      text: 'Shop',
    },
    {
      url: 'about',
      text: 'About',
    },
    {
      url: 'contact',
      text: 'Contact',
    },
    {
      url: 'policies',
      text: 'Policies',
    },
    {
      url: 'contact#faq',
      text: 'FAQs',
    },
  ];

  return (
    <footer className="h-fit w-full bg-custom-signature-green text-custom-white flex items-center justify-center">
      <Container className="mt-[10vw] lg:mt-16 ">
        <div className=" w-full h-fit flex flex-col gap-y-6  md:gap-y-8 lg:gap-y-12">
          <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-1 gap-8 ">
            <div className="h-fit">
              <Strong text="Quick links" />
              <ul className="grid grid-cols-1 gap-y-3">
                {routeLinks.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.url}
                      prefetch="intent"
                      className="cursor-pointer hover:opacity-80 hover:underline"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-fit row-start-1 col-span-2 md:row-start-auto md:col-span-1">
              <Strong text="Art by Bori" />
              <p className="text-autoscale-small mb-2">
                I make one of a kind ceramics in small batches that I sell in my
                online shop or sometimes on local art markets.
              </p>
              <p className="text-autoscale-small">
                With the pieces I sell and create, I hope to brighten your
                spaces and everyday rituals.
              </p>
            </div>
          </div>

          <div className="h-fit">
            <Strong text="Social media" />
            <ul>
              <li className="flex gap-x-3 md:gap-x-6 lg:gap-x-8">
                <Link to="https://facebook.com/artbybori" prefetch="none">
                  <SiFacebook className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-60 cursor-pointer" />
                </Link>
                <Link to="https://instagram.com/artbybori" prefetch="none">
                  <SiInstagram className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-60 cursor-pointer" />
                </Link>
                <Link to="https://tiktok.com" prefetch="none">
                  <SiTiktok className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-60 cursor-pointer" />
                </Link>
                <Link to="" prefetch="none">
                  <SiGmail className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-60 cursor-pointer" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-t-custom-grey/40 py-6 my-12 text-custom-white/60 w-full flex items-start justify-between">
          <div className="w-fit sm:w-1/3">
            <CountrySelector />
          </div>
          <div className="flex flex-col gap-y-2">
            <div>Ezzel lehet fizetni: </div>
            <div className="flex flex-col md:flex-row gap-x-4 ">
              <Link to="/" className="hover:underline text-autoscale-small">
                &#169; 2023 ART BY BORI,
              </Link>
              <Link
                target={'_blank'}
                to="https://www.shopify.com"
                className="hover:underline text-autoscale-small"
              >
                Powered&nbsp;by&nbsp;Shopify
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

const Strong = ({text}: {text: string}) => {
  return (
    <p className="font-bold capitalize md:mb-4 mb-6 text-lg">
      {text}
    </p>
  );
};
