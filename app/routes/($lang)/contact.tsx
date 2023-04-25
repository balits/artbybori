import {Container} from '~/components/global/Container';
import {json, type ActionArgs} from '@shopify/remix-oxygen';
import {useActionData, useFetcher, Form, useNavigation} from '@remix-run/react';
import InstagramGallery from '~/components/homepage/InstagramGallery';
import {useState} from 'react';
import { seoPayload } from '~/lib/seo.server';
import { Heading, Button } from '~/components/ui';

export async function action({request, params, context}: ActionArgs) {
  const body = await request.formData();
  const formObject = Object.fromEntries(body);

  const response = await fetch("https://formspree.io/f/mlekaald", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formObject)
  })

  const status = {
    error: !response.ok,
  }

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

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen max-h-fit w-full grid place-items-center scaling-mt-header">
        <Container className="grid grid-cols-1 grid-flow-row gap-20 md:gap-32 lg:gap-40">
          <div className="mt-12 grid grid-cols-1 gap-y-12 md:gap-y-0 md:grid-cols-2 lg:gap-12">
            <Heading as="h1" size='lg' font='font-sans' className="font-bold">
              <span className='lg:hidden'>Get in touch.</span>
              <span className='hidden lg:inline-block'>Get&nbsp;in&nbsp;touch.</span>
            </Heading>

            <div className="flex flex-col justify-center">
              <strong className="mb-1">Need help?</strong>
              <p className="text-sm">
                {' '}
                If you have questions or need any general information, please
                feel free to contact us!{' '}
              </p>
            </div>
          </div>

          <ContactForm />
        </Container>
      </div>

      <FAQ />

      <InstagramGallery />
    </>
  );
}

function ContactForm() {
  const data = useActionData<typeof action>();

  console.log(data)

  const [fullName, setFullName] = useState((data?.formObject.fullName as string) ?? '');
  const [email, setEmail] = useState((data?.formObject.email as string) ?? '');
  const [message, setMessage] = useState((data?.formObject.message as string) ?? '');

  const navigation = useNavigation();

  return (
    <Form
      method="post"
      preventScrollReset
      className="grid grid-cols-1 grid-flow-row gap-16 pb-4"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
        <div>
          <label className="block font-bold " htmlFor="fullname">
            Full name
          </label>
          <input
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
        <div>
          <label className="block font-bold" htmlFor="email">
            Email Address
          </label>
          <input
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

      <div>
        <label className="block font-bold" htmlFor="message">
          Message
        </label>
        {/*TODO: make this bigger */}
        <textarea
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

      <div className='w-full flex gap-x-2 items-center'>
        <Button
          className="text-lg font-medium uppercase py-2 px-20 rounded-none"
          type="submit"
          disabled={navigation.state === 'submitting'}
        >
          {navigation.state === 'submitting' ? 'Submiting...' : 'Submit'}
        </Button>
      </div>
    </Form>
  );
}

function FAQ() {
  return (
    <section
      id="faq"
      className="w-full bg-custom-signature-green text-custom-white flex items-center justify-center py-[30vh] -scroll-m-12"
    >
      <Container className="grid grid-cols-1 gap-28 lg:grid-cols-2 lg:gap-8">
        <h2 className="text-6xl md:text-7xl lg:text-8xl  font-cantata">
          Frequently
          <br />
          asked
          <br />
          questions.
        </h2>

        <div className="space-y-4 md:space-y-6 lg:space-y-4 text-custom-white ">
          <details className="contact-details">
            <summary className="contact-summary">
              Are pieces microwave/dishwasher safe?
            </summary>
            <p className="p-2 mb-2 ">
              They are generally safe for microwaves and dishwashers, but to
              ensure the longevity of your new hand-made ceramics, is strongly
              recommended hand-washing them.
            </p>
          </details>

          <details className="contact-details">
            <summary className="contact-summary">
              Do you accept custom orders or wholesales?
            </summary>
            <p className="p-2 mb-2 ">
              Email me your idea at artbybori@gmail.com and we will talk!
            </p>
          </details>

          <details className="contact-details">
            <summary className="contact-summary">
              Do you have Workshops?
            </summary>
            <p className="p-2 mb-2">
              Not at the moment, but in the future I want to do classes.
            </p>
          </details>

          <details className="contact-details">
            <summary className="contact-summary">
              Is international shipping available?
            </summary>
            <p className="p-2 mb-2">
              Unfortunately we only ship inside the European Union, but in the
              future we want to extend to international shipping.
            </p>
          </details>

          <details className="contact-details">
            <summary className="contact-summary">
              Do you accept returns or refunds?
            </summary>
            <p className="p-2 mb-2">
              We do not accept returns or exchanges unless the item was damaged
              upon arrival. In the unfortunate event that an item is blemished
              during transport, please reach out to us at artbybori@gmail.com
              with pictures of the product and we will work out the best
              solution for you!
            </p>
          </details>
        </div>
      </Container>
    </section>
  );
}

