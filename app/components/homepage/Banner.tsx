import {Image} from '@shopify/hydrogen';
import {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';
import {motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Heading } from '../ui';

/***
 * The banner shown first when visiting the homepage.
 * Both on Desktop and Phones this Components takes up 100vw with no margin or max-width set
 */
export default function Banner({image}: {image: ImageType}) {
  const {scrollYProgress} = useScroll()

  const imageY = useSpring(useTransform(scrollYProgress,[0,0.2], [0, -200]), {
    stiffness: 200,
    damping: 20
  })

  const headingY = useSpring(useTransform(scrollYProgress, [0,0.4], [0, -100]),{
    stiffness: 100,
    damping: 20
  })


  return (
    <motion.div
      className="sticky top-0 -z-10  bg-custom-placeholder-green h-screen overflow-y-hidden grid place-items-center shadow-md relative"
      style={{
        y: imageY
      }}
    >
      <Image
        data={image}
        className="absolute inset-0 w-full h-full object-cover"
        alt={image.altText ?? 'Ceramics for your home'}
        loading="eager"
        widths={[500, 900, 1400]}
        sizes="(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px"
      />
      <div
        className="absolute inset-0 w-full h-full grid place-items-center"
      >
        <div className="lg:p-4 z-[2] text-custom-white grid place-items-center">
          <motion.div
            style={{
              y: headingY
            }}
            initial={{
              y:40,
              opacity:0,
            }}
            animate={{
              y:0,
              opacity:1,
            }}
            transition={{
              delay: .3,
            }}
          >

            <Heading size='lg' as="h1" className='drop-shadow-md'>
              Ceramics&nbsp;
              <br className="lg:hidden" />
              for&nbsp;your&nbsp;
              <br className="lg:hidden" />
              home.
            </Heading>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
