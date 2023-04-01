import {Link} from '@remix-run/react';

export default function Logo() {
  return (
    <p className="font-cantata text-[16px] md:text-xl lg:text-2xl  lg:pl-4 font-bold">
      <Link prefetch="intent" to="/">
        ART BY BORI
      </Link>
    </p>
  );
}
