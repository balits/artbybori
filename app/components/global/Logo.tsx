import {Link} from "~/components"

export default function Logo() {
  return (
    <p className="font-cantata text-[16px] md:text-xl lg:text-2xl  font-bold">
      <Link prefetch="intent" to="/">
        ART&nbsp;BY&nbsp;BORI
      </Link>
    </p>
  );
}
