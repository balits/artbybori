import { Container, NoWrapContainer } from '~/components/global/Container';
import { json, type ActionArgs } from '@shopify/remix-oxygen';
import { useActionData, useFetcher, Form, useNavigation, useTransition } from '@remix-run/react';
import InstagramGallery from '~/components/homepage/InstagramGallery';
import { useRef, useState } from 'react';
import { seoPayload } from '~/lib/seo.server';
import { Heading, Button, Link, Text } from '~/components/ui';
import { motion, Variants, useInView } from "framer-motion"

export async function action({ request, params, context }: ActionArgs) {
  const body = await request.formData();
  const formObject = Object.fromEntries(body);

  const response = await fetch("https://formspree.io/f/xpzebkgj", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formObject)
  })

  const status = {
    error: !response.ok,
  }
  console.log(response)

  return json({
    formObject, status
  });
}

export async function loader() {
  const seo = seoPayload.customPage({
    title: "Contact",
    description: "Write a custom email, or read the frequently asked questions",
    url: "https://www.artbybori.com/contact"
  })

  return json({
    seo
  })
}
const lastVariant: Variants = {
  hidden: {
    y: 40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: .2,
      delay: 1.4
    }
  }
}

export default function ContactPage() {
  return (
    <>
      <div className="h-minus-header max-h-fit w-full grid place-items-center scaling-mt-header">
        <Container as="section" className="grid grid-cols-1 grid-flow-row gap-20 ">
          <div className=" grid grid-cols-1 gap-y-12 md:gap-y-0 md:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{
                y: "100%",
                opacity: .0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: .5,
                stiffness: 300,
                damping: 20
              }}
            >
              <Heading as="h2" size='lg' font='font-sans' className="font-bold">
                <span className='lg:hidden'>Get in touch.</span>
                <span className='hidden lg:inline-block'>Get&nbsp;in&nbsp;touch.</span>
              </Heading>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center md:pb-4"
              variants={lastVariant}
              initial="hidden"
              animate="visible"
            >
              <strong className="mb-1">Need help?</strong>
              <p className="text-sm">
                {' '}
                If you have questions or need any general information, please
                feel free to contact us!{' '}
              </p>
            </motion.div>
          </div>

          <ContactForm />
        </Container>
      </div>

      <FAQ />

      <ShopLocations />

      <InstagramGallery />
    </>
  );
}

function ContactForm() {
  const data = useActionData<typeof action>();

  const [fullName, setFullName] = useState((data?.formObject.fullName as string) ?? '');
  const [email, setEmail] = useState((data?.formObject.email as string) ?? '');
  const [message, setMessage] = useState((data?.formObject.message as string) ?? '');

  const navigation = useNavigation();

  const line: Variants = {
    hidden: {
      width: "0px",
      borderColor: "rgba(39,49,32, 0)"
    },
    visible: {
      width: "100%",
      borderColor: "rgba(39,49,32, 1)",
      transition: {
        type: "tween",
        duration: .8,
        delay: 1
      }
    }
  }

  const label: Variants = {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: .8,
        delay: 1
      }
    }
  }


  return data && data.status.error === false ? (
    <div className='w-full h-full '>
      <Text size='xl' bold className='mb-3'>Thank you!</Text>
      <Text>You message is being submitted right at this moment.</Text>
    </div>
  ) : (
    <Form
      method="post"
      preventScrollReset
      className="grid grid-cols-1 grid-flow-row gap-16 pb-4"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
        <div className='flex flex-col items-start justify-start'>
          <motion.label
            variants={label}
            initial="hidden"
            animate="visible"
            className="block font-bold" htmlFor="fullname">
            Full name
          </motion.label>
          <motion.input
            variants={line}
            initial="hidden"
            animate="visible"
            className="contact-input"
            type={'text'}
            id="fullName"
            name="fullName"
            aria-label="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col items-start justify-start'>
          <motion.label
            variants={label}
            initial="hidden"
            animate="visible"
            className="block font-bold" htmlFor="email">
            Email Address
          </motion.label>
          <motion.input
            variants={line}
            initial="hidden"
            animate="visible"
            className="contact-input"
            type={'email'}
            id="email"
            name="email"
            autoComplete={'email'}
            required
            aria-label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-col items-start justify-start'>
        <motion.label
          variants={label}
          initial="hidden"
          animate="visible"
          className="block font-bold" htmlFor="message">
          Message
        </motion.label>
        <motion.textarea
          variants={line}
          initial="hidden"
          animate="visible"
          className="contact-input"
          id="message"
          name="message"
          required
          maxLength={40000}
          aria-label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <motion.button
        className='w-full flex gap-x-2 items-center'
        variants={lastVariant}
        initial="hidden"
        animate="visible"
      >
        <Button
          as="span"
          className="text-lg font-medium uppercase py-2 px-20 "
          type="submit"
          disabled={navigation.state === 'submitting' || message.length < 10}
        >
          {navigation.state === 'submitting' ? 'Submiting...' : 'Submit'}
        </Button>
      </motion.button>
    </Form>
  );
}

function FAQ() {
  const list = {
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const heading: Variants = {
    hidden: {
      x: -50,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 300
      }
    }
  }

  const ref = useRef<HTMLDivElement>(null)

  const inView = useInView(ref, {
    once: true,
    amount: .5,
  })

  return (
    <div
      ref={ref}
      id="faq"
      className="w-full bg-custom-signature-green text-custom-white flex items-center justify-center py-[30vh] -scroll-m-12"
    >
      <Container as={"section"} className="grid grid-cols-1 gap-28 lg:grid-cols-2 lg:gap-8">
        <motion.h2
          variants={heading}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-6xl md:text-7xl lg:text-8xl  font-cantata"
        >
          Frequently
          <br />
          asked
          <br />
          questions.
        </motion.h2>

        <motion.div
          variants={list}
          animate={inView ? "visible" : "hidden"}
          className="space-y-4 md:space-y-6 lg:space-y-4 text-custom-white "
        >
          <motion.details variants={item} className="contact-details">
            <summary className="contact-summary">
              Are pieces microwave/dishwasher safe?
            </summary>
            <p className="p-2 mb-2 ">
              They are generally safe for microwaves and dishwashers, but to
              ensure the longevity of your new hand-made ceramics, is strongly
              recommended hand-washing them.
            </p>
          </motion.details>

          <motion.details variants={item} className="contact-details">
            <summary className="contact-summary">
              Do you accept custom orders or wholesales?
            </summary>
            <p className="p-2 mb-2 ">
              Email me your idea at artbybori@gmail.com and we will talk!
            </p>
          </motion.details>

          <motion.details variants={item} className="contact-details">
            <summary className="contact-summary">
              Do you have Workshops?
            </summary>
            <p className="p-2 mb-2">
              Not at the moment, but in the future I want to do classes.
            </p>
          </motion.details>

          <motion.details variants={item} className="contact-details">
            <summary className="contact-summary">
              Is international shipping available?
            </summary>
            <p className="p-2 mb-2">
              Unfortunately we only ship inside the European Union, but in the
              future we want to extend to international shipping.
            </p>
          </motion.details>


          <motion.details variants={item} className="contact-details">
            <summary className="contact-summary">
              Do you accept returns or refunds?
            </summary>
            <div className="p-2 mb-2 flex flex-col items-start justify-start gap-y-4">
              <p>If you not satisfied with your order you have 14 days after delivery to reach out to us at artbybori@gmail.com and we will work together to find a solution, whether it be an item refund and return (minus shipping) or a replacement piece (note: As some of my pieces are one-of-a-kind, your replacement may not be exactly the same as your original, but we will do our best to find a solution that works on both ends. Replacement items may take up to 6 weeks to complete). As noted above, shipping charges will not be refunded and the cost of return is on the customer.</p>
              <Link to="/policies/refund-policy" className="underline ">
                Learn more here.
              </Link>
            </div>
          </motion.details>
        </motion.div>
      </Container>
    </div>
  );
}

function ShopLocations() {
  return (
    <Container as="section" className='py-16 md:py-20 lg:py-24'>
        <Heading as={"h2"} >Where can you shop in person?</Heading>
        <Text size='md'  color='grey'>
          Find our products at a variety of retailers, including local cafes and stores.
        </Text>


      <ul className='w-full mt-8 md:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-16 place-items-center'>
        <LocationCard
          name='Kis Villa'
          socialHandle="kisvilla_delikat"
          website='http://kisvilla.hu/fooldal'
          location='Biatorbágy, Szabadság út 74'
          description='Find a wide selection of beautiful artworks from local artist, including some Art by Bori ceramics. Stop by for a coffee or a delicious breakfast and shop handmade goods!'
          imgUrl='https://cdn.shopify.com/s/files/1/0694/7661/4408/files/06AF968D-5E8E-420A-8E1F-441C51B8826E.jpg?v=1683387826'
        />
      </ul>
    </Container>
  )
}

function LocationCard({
  name,
  description,
  socialHandle,
  website,
  location,
  imgUrl
}: {
  name: string,
  socialHandle: string
  website?: string
  description: string,
  location: string,
  imgUrl: string
}) {
  return (
    <li className='rounded-md bg-placeholder-green relative group w-full'>
      <div className='relative  max-w-full aspect-square'>
        <img
          src={imgUrl}
          className='aspect-square absolute inset-0 w-full h-full object-cover rounded-md shadow-sm'
        />
      </div>
      <div className='mt-4 flex flex-col items-start justify-start w-full px-2'>

        <div className='inline-flex gap-x-6 items-center justify-center'>
          {website ? (
            <a href={website} target="_blank" rel='noopener' className='cursor-pointer'>
              <Text as="h4" size="xl" className='hover:underline' bold>{name}</Text>
            </a>
          ) : (
            <Text as="h4" size="xl" bold>{name}</Text>

          )}
          <a href={`https://www.instagram.com/${socialHandle}`} target="_blank" rel='noopener' >
            <Text as="span" className="lowercase hover:text-custom-grey before:content-['@']" color='lightgrey' bold >
              {socialHandle}
            </Text>
          </a>
        </div>

        <Text size='sm' color='lightgrey' className='mt-1' >{location}</Text>
        <Text color='grey' className='mt-3'>{description}</Text>
      </div>
    </li>
  )
}
