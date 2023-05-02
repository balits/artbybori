import { Link } from "../ui/Link";
import { Link as RemixLink } from "@remix-run/react"
import { Container } from '~/components/global/Container';
import { SiFacebook, SiGmail, SiInstagram, SiTiktok } from 'react-icons/si';

import { CountrySelector } from '../CountrySelector';
import { Text } from "../ui";

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
                  <Text as="li" key={link.text}>
                    <Link
                      to={link.url}
                      prefetch="intent"
                      className="cursor-pointer hover:opacity-80 hover:underline"
                    >
                      {link.text}
                    </Link>
                  </Text>
                ))}
              </ul>
            </div>

            <div className="h-fit row-start-1 col-span-2 md:row-start-auto md:col-span-1">
              <Strong text="Art by Bori" />
              <Text size="md">
                I make one of a kind ceramics in small batches that I sell in my
                online shop or sometimes on local art markets.
              </Text>
              <Text size="md">
                With the pieces I sell and create, I hope to brighten your
                spaces and everyday rituals.
              </Text>
            </div>
          </div>

          <div className="h-fit">
            <Strong text="Social media" />
            <ul>
              <li className="flex gap-x-4 md:gap-x-6 lg:gap-x-8">
                <RemixLink to="https://facebook.com/artbybori" target={"_blank"} aria-label="Visit the official Facebook page for Art By Bori" rel="noopener noreferer">
                  <SiFacebook className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-60 cursor-pointer" />
                </RemixLink>
                <RemixLink to="https://instagram.com/artbybori" target={"_blank"} aria-label="Visit the official Instagram account of Art By Bori" rel="noopener noreferer">
                  <SiInstagram className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-60 cursor-pointer" />
                </RemixLink>
                <RemixLink to="https://tiktok.com/@artbybori" target={"_blank"} aria-label="Visit the official Tiktok account of Art By Bori" rel="noopener noreferer">
                  <SiTiktok className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-60 cursor-pointer" />
                </RemixLink>
                <RemixLink to="mailto:artbybori@gmail.com?subject=Custom%Order" target={"_blank"} aria-label="Write an email to Art by Bori" rel="noopener noreferer">
                  <SiGmail className="h-4 w-4 sm:h-5 sm:w-5 hover:opacity-60 cursor-pointer" />
                </RemixLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-gray-100/20 py-4 my-10 text-custom-white/60 w-full flex items-start justify-between">
          <PaymentOptionsList />
        </div>
      </Container>
    </footer>
  );
}

const Strong = ({ text }: { text: string }) => {
  return (
    <Text as={"h4"} bold size="lg" className="capitalize md:mb-4 mb-6">
      {text}
    </Text>
  );
};



const PaymentOptionsList = () => {
  const Amex = <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" aria-labelledby="pi-american_express" className="icon icon--full-color" viewBox="0 0 38 24" > <g fill="none"> <path fill="#000" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" opacity="0.07" ></path> <path fill="#006FCF" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" ></path> <path fill="#FFF" d="M8.971 10.268l.774 1.876H8.203l.768-1.876zm16.075.078h-2.977v.827h2.929v1.239h-2.923v.922h2.977v.739l2.077-2.245-2.077-2.34-.006.858zm-14.063-2.34h3.995l.887 1.935L16.687 8h10.37l1.078 1.19L29.25 8h4.763l-3.519 3.852 3.483 3.828h-4.834l-1.078-1.19-1.125 1.19H10.03l-.494-1.19h-1.13l-.495 1.19H4L7.286 8h3.43l.267.006zm8.663 1.078h-2.239l-1.5 3.536-1.625-3.536H12.06v4.81L10 9.084H8.007l-2.382 5.512H7.18l.494-1.19h2.596l.494 1.19h2.72v-3.935l1.751 3.941h1.19l1.74-3.929v3.93h1.458l.024-5.52-.001.001zm9.34 2.768l2.531-2.768h-1.822l-1.601 1.726-1.548-1.726h-5.894v5.518h5.81l1.614-1.738 1.548 1.738h1.875l-2.512-2.75h-.001z" ></path> </g> </svg>
  const ApplePay = <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" aria-labelledby="pi-apple_pay" className="icon icon--full-color" viewBox="0 0 165.521 105.965" > <path d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 00-2.958.975 9.932 9.932 0 00-4.35 4.35 10.463 10.463 0 00-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 00-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 00.974 2.96 9.897 9.897 0 001.83 2.52 9.874 9.874 0 002.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 002.958-.977 9.955 9.955 0 004.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 00-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 00-.974-2.96 9.94 9.94 0 00-4.35-4.35A10.52 10.52 0 00156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 00-1.431-.022C151.83 0 151.263 0 150.698 0z"></path> <path fill="#FFF" d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 012.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 01-.645 1.975 6.397 6.397 0 01-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 01-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 01-1.986-.65 6.337 6.337 0 01-1.622-1.18 6.355 6.355 0 01-1.178-1.623 6.935 6.935 0 01-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 01-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 01.02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 01.646-1.981 6.36 6.36 0 011.18-1.623 6.386 6.386 0 011.624-1.18 6.96 6.96 0 011.98-.646c.865-.155 1.792-.198 2.586-.22a68.26 68.26 0 011.354-.02l1.677-.003h135.875" ></path> <path d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048"></path> <g> <path d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894zM92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03zM120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z"></path> </g> </svg>
  const MasterCard = <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" aria-labelledby="pi-master" className="icon icon--full-color" viewBox="0 0 38 24" > <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" opacity="0.07" ></path> <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" ></path> <circle cx="15" cy="12" r="7" fill="#EB001B"></circle> <circle cx="23" cy="12" r="7" fill="#F79E1B"></circle> <path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z" ></path> </svg>
  const Visa = <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" aria-labelledby="pi-visa" className="icon icon--full-color" viewBox="0 0 38 24" > <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" opacity="0.07" ></path> <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" ></path> <path fill="#142688" d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" ></path> </svg>

  const paymentOptionSVGs = [
    {
      title: "American Express",
      svg: Amex
    },
    {
      title: "Apple Pay",
      svg: ApplePay
    },
    {
      title: "Master Card",
      svg: MasterCard
    },
    {
      title: "Visa",
      svg: Visa
    },
  ]

  return (
    <div className="grid grid-rows-2 gap-y-2">
      <ul className="flex items-center justify-end gap-x-2 ">
        {paymentOptionSVGs.map(option => (
          <li key={option.title} className="p-0 m-0 w-fit h-fit">
            {option.svg}
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <div className="flex flex-col md:flex-row gap-x-4 ">
          <Link to="/" className="hover:underline text-xs" >
            &#169; 2023 ART BY BORI,
          </Link>
          <Link
            target={'_blank'}
            to="https://www.shopify.com"
            className="hover:underline text-xs "
          >
            Powered&nbsp;by&nbsp;Shopify
          </Link>
        </div>
      </div>
    </div>
  )
}
