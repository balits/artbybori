import { Link } from "../ui/Link";

export default function Logo({onClick}: {onClick?: () => void}) {
  return (
    <p className="font-cantata text-[16px] md:text-xl lg:text-2xl  font-bold" onClick={onClick}>
      <Link prefetch="intent" to="/">
        ART&nbsp;BY&nbsp;BORI
      </Link>
    </p>
  );
}
