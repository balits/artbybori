import {LoaderArgs, redirect} from '@shopify/remix-oxygen';

export async function loader({params}: LoaderArgs) {
  return redirect(params?.lang ? `${params.lang}/categories/shop-all-products` : '/categories/shop-all-products');
}
