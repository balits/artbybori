import {LoaderArgs, redirect} from '@shopify/remix-oxygen';

export async function loader(args: LoaderArgs) {
  throw redirect('/shop', 308);
}
