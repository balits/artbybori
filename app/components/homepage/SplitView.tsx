import clsx from 'clsx';
import {Container} from '../global/Container';
import { Heading, Text, TextProp } from '../ui';
import { Link } from '../ui/Link';

export default function SplitView() {
  return (
    <section className=" pb-8 md:pb-16 lg:pb-20 pb-20 w-full flex flex-col justify-center items-center">
      <div className="overflow-hidden relative  w-full grid grid-cols-2 h-[65vh] lg:h-screen">
        <Link
          to="/categories/shop-all-products?sort=featured"
          className="relative h-full bg-custom-placeholder-green cursor-pointer group"
        >
          <img
            src='https://cdn.shopify.com/s/files/1/0694/7661/4408/files/IMG_1825.jpg?v=1679740047'
            className='absolute inset-0 w-full h-full object-cover object-center fadeIn'
            alt='Dark Gray Planter'
          />
          <div className="bg-transparent z-[2] absolute inset-0 w-full h-full object-cover object-bottom transition-colors ease-in-out group-hover:bg-black/10" />
          <div className="absolute inset-0 w-full h-full grid place-items-center font-medium text-custom-white z-[2] ">
            <Heading size='sm'>
              Surround yourself
              <br />
              with beautiful things.
            </Heading>
          </div>
        </Link>

        <div className="relative  grid place-items-center bg-custom-signature-green group">
          <img
            src='https://cdn.shopify.com/s/files/1/0694/7661/4408/files/IMG_6950.jpg?v=1681895145'
            className='absolute inset-0 w-full h-full object-cover object-center fadeIn'
            alt='A Slab of black Clay'
          />

          <div className="bg-transparent z-[2] absolute inset-0 w-full h-full object-cover" />

          <article className="absolute w-full h-full z-[3] hidden md:grid  p-4 place-items-center ">
            <div className=' w-2/3 lg:w-3/5 max-w-[400px]'>
              <TextBlock color='white'/>
            </div>
          </article>
        </div>
      </div>

      <Container className="md:hidden py-10 ">
        <TextBlock color="black"/>
      </Container>
    </section>
  );
}


function TextBlock({
  color
}: {
    color: TextProp['color']
}) {
  return (
    <div className={clsx('grid grid-cols-1 gap-y-4 lg:gap-y-8', color === "black" ? "text-custom-black" : "text-custom-white")}>
      <Text bold color={color}>
        Handmade with love.
      </Text>
      <Text color={color}>
        As a passionate artist, I specialize in creating functional and decorative ceramics that are both beautiful and practical. Each piece is carefully handcrafted in my home studio using high-quality materials and techniques, ensuring that every item is unique and made to last.
      </Text>
      <Text color={color}>
        I believe that every piece of ceramics has its own story to tell, and I strive to imbue my creations with a sense of warmth and personality. From the natural textures and colors of my glazes to the details of my hand-built pieces, my work is inspired by the beauty of the world around me.
      </Text>
      <Link
        prefetch="intent"
        to="/about"
        className={clsx("mt-4 transition-colors ease-in-out hover:bg-zinc-200/20 focus:bg-zinc-200/30 border py-1 lg:py-2 px-8 lg:px-14 w-fit", color === "black" ? "border-custom-black" : "border-custom-white")}
      >
        <Text as="span" bold>
          Learn&nbsp;more.
        </Text>
      </Link>
    </div>
  )
}
