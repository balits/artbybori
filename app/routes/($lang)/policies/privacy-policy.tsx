import { json, type LoaderArgs } from '@shopify/remix-oxygen';
import { Heading, Text, Link } from '~/components/ui';
import { routeHeaders, CACHE_LONG } from '~/data/cache';
import { seoPayload } from '~/lib/seo.server';
import Container from '~/components/global/Container';
import { LeftArrow } from '~/components/global/Icon';

export const headers = routeHeaders;

export async function loader() {
  const seo = seoPayload.customPage({
    title: "Terms of Service",
    description: "Art by Bori store policies",
    url:"https//www.artbybori.com/policies/tos"
  })

  return json(
    {
      seo
    },
    {
      headers: {
        'Cache-Control': CACHE_LONG,
      },
    },
  );
}

export default function Policies() {
  return (
    <>
      <Container className='scaling-mt-header min-h-minus-header '>

          <Heading as="h1" spacing>
            Privacy Policiy
          </Heading>
          <Link to="/policies">
            <Text size="sm" className='inline-flex gap-x-2 items-center justify-center '>
              <LeftArrow />{' '}back to policies
            </Text>
          </Link>

        <div className="flex-grow w-full my-12">
          <iframe width='100%' height='1000' src='https://api.virtualjog.hu/api/v1/document/5262?access-token=0607f6531ce182df3d6b59ab6e9de106'></iframe>
        </div>
      </Container>
    </>
  );
}
