import {Image} from '@shopify/hydrogen';
import {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';
import { Heading } from '../ui';

type Props = {
  image: ImageType;
};

/***
 * The banner shown first when visiting the homepage.
 * Both on Desktop and Phones this Components takes up 100vw with no margin or max-width set
 */
export default function Banner({image}: Props) {
  return (
    <section className="bg-custom-placeholder-green/50 h-screen overflow-y-hidden grid place-items-center shadow-md relative">
      <Image
        data={image}
        className="absolute inset-0 w-full h-full object-cover"
        alt={image.altText ?? 'Ceramics for your home'}
        loading="eager"
        widths={[500, 900, 1400]}
        sizes="(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px"
      />
      <div className="absolute inset-0 w-full h-full grid place-items-center">
        <div className="lg:p-4 z-[2] text-custom-white grid place-items-center">
          <Heading size='lg' as="h1">
          Ceramics&nbsp;
          <br className="lg:hidden" />
          for&nbsp;your&nbsp;
          <br className="lg:hidden" />
          home.
          </Heading>
        </div>
      </div>
    </section>
  );
}
