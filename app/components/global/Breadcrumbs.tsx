import { Product } from "@shopify/hydrogen/storefront-api-types";
import { SerializeFrom } from "@shopify/remix-oxygen";
import { useLocation } from "react-use";
import { Link, Text } from "../ui";

type Crumb = {
  handle: string | null
  title: string
}

export default function Breadcrumbs({
  product
}: {
    product: SerializeFrom<Product>
  }) {
  const {collections, title: productTitle} = product

  const crumbs: Crumb[] = [{
    handle: "/",
    title:"Home"
  }]

  if (collections) {
    const {handle, title} = collections.nodes.filter(c => c.handle !== "featured-products" && c.handle !== "hero")[0]
    crumbs.push({
      handle,
      title
    })
  }


  crumbs.push({
    handle: null,
    title: productTitle
  })


  return <ol>
    {crumbs.map(c => {

      return (
        <li key={c.handle + c.title}>
          {c.handle ? (
            <Link to={c.handle} prefetch="intent">
              {c.title}
            </Link>
          ) : (
            <Text>
              {c.title}
            </Text>
          )}
        </li>
      )
    })}
  </ol>
}
