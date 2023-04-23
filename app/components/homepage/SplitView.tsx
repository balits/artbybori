import clsx from 'clsx';
import {Container} from '../global/Container';
import { Heading, Text, TextProp } from '../ui';
import { Link } from '../ui/Link';

export default function SplitView() {
  return (
    <section className="lg:shadow-sm mt-8 md:my-8 lg:mt-24 w-full flex flex-col justify-center items-center">
      <div className="overflow-y-hidden  w-full grid grid-cols-2 h-[60vh] lg:h-minus-header">
        <Link
          to="/shop"
          className="relative h-full bg-custom-placeholder-green cursor-pointer group"
        >
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
        All of our products are arefully had-crafted by ceramic
        artist, Bori Borbely. They fire at high temperatures so they
        are microwave and dishwasher safe. All of our products are
        arefully had-crafted by ceramic artist,{' '}
      </Text>
      <Text color={color}>
        All of our products are arefully had-crafted by ceramic
        artist, Bori Borbely. They fire at high temperatures so they
        are microwave and dishwasher safe. All of our products are
        arefully had-crafted by ceramic artist,{' '}
      </Text>
      <Link
        prefetch="intent"
        to="/about"
        className={clsx("mt-4 transition-colors ease-in-out hover:bg-zinc-200/20 focus:bg-zinc-200/30 border  font-semibold py-1 lg:py-2 px-8 lg:px-14 w-fit", color === "black" ? "border-custom-black" : "border-custom-white")}
      >
        Learn&nbsp;more.
      </Link>
    </div>
  )
}
