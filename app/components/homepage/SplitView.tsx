import {Link} from '@remix-run/react';
<<<<<<< HEAD
import {Container} from '../global/Container';
=======
import Container from '../global/Container';
>>>>>>> refs/remotes/origin/main

export default function SplitView() {
  return (
    <section className="lg:shadow-sm my-24 w-full flex flex-col justify-center items-center">
      <div className="overflow-y-hidden  w-full grid grid-cols-2">
        <Link
          to="/shop"
          className="relative h-full bg-custom-placeholder-green cursor-pointer group"
        >
          <img
            src="/split-1.jpg"
            alt="Standalone Vase"
            className="object-cover object-bottom w-full h-[300px] md:h-[60vw] lg:h-[calc(100vh-96px)]"
          />
          <div className="bg-transparent z-[2] absolute inset-0 w-full h-full object-cover object-bottom transition-colors ease-in-out group-hover:bg-black/10" />

          <div className="absolute inset-0 w-full h-full grid place-items-center font-medium text-custom-white z-[2] ">
<<<<<<< HEAD
            <h2 className="font-cantata text-md md:text-3xl lg:text-4xl">
=======
            <h2 className="font-cantata text-md md:text-3xl lg:text-5xl">
>>>>>>> refs/remotes/origin/main
              Surround yourself
              <br />
              with beautiful things.
            </h2>
          </div>
        </Link>

        <div className="relative h-full bg-custom-black grid place-items-center bg-black">
          <img
            src="/split-2.jpg"
            alt="Black clay"
            className="object-cover w-full h-[300px] md:h-[60vw] lg:h-[calc(100vh-96px)]"
          />

          <article className="absolute w-full h-full z-[2] hidden lg:grid text-custom-white p-4 place-items-center ">
            <div className="grid grid-cols-1 gap-y-10 w-1/3">
              <h2 className=" font-semibold">Handmade with love.</h2>
              <div>
                <p className="text-sm mb-4">
                  All of our products are arefully had-crafted by ceramic
                  artist, Bori Borbely. They fire at high temperatures so they
                  are microwave and dishwasher safe. All of our products are
                  arefully had-crafted by ceramic artist,{' '}
                </p>
                <p className="text-sm ">
                  All of our products are arefully had-crafted by ceramic
                  artist, Bori Borbely. They fire at high temperatures so they
                  are microwave and dishwasher safe. All of our products are
                  arefully had-crafted by ceramic artist,{' '}
                </p>
              </div>
              <Link
                prefetch="intent"
                to="/about"
                className="transition-colors ease-in-out hover:bg-zinc-200/10 focus:bg-zinc-200/20 border border-custom-white tracking-wide  font-semibold py-2 px-14 w-fit"
              >
                Learn more.
              </Link>
            </div>
          </article>
        </div>
      </div>

      <Container className="lg:hidden  p-8 pb-0 grid grid-cols-1 gap-y-8">
        <h2 className="font-semibold text-autoscale-big">
          Handmade with love.
        </h2>
        <div className="">
          <p className="text-autoscale tracking-wide mb-4">
            All of our products are arefully had-crafted by ceramic artist, Bori
            Borbely. They fire at high temperatures so they are microwave and
            dishwasher safe. All of our products are arefully had-crafted by
            ceramic artist,{' '}
          </p>
          <p className="text-autoscale tracking-wide">
            All of our products are arefully had-crafted by ceramic artist, Bori
            Borbely. They fire at high temperatures so they are microwave and
            dishwasher safe. All of our products are arefully had-crafted by
            ceramic artist,{' '}
          </p>
        </div>
        <Link
          prefetch="intent"
          to="/about"
          className="text-autoscale-big font-medium border-[1px] border-custom-black tracking-wide  py-1 px-8 w-fit"
        >
          Learn more.
        </Link>
      </Container>
    </section>
  );
}
