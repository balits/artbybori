import clsx from 'clsx';
import {SiInstagram} from 'react-icons/si';
import {Container} from '../global/Container';

/***
 * This component renders 6 pics from Instagram (pagination to be implemented).
 */
export default function InstagramGallery({
  mt = 'mt-16'
}: {
    mt?: string
  }) {

  const feed = [1,2,3,4,5,6];

  return null
  return (
    <Container
      as={"section"}
      className={clsx(
        'mb-10  grid place-items.center',
        mt,
      )}
    >
      <ul className='grid grid-cols-2 grid-rows-3 md:grid-rows-3 md:grid-cols-2 '>
        {feed.map((post) => (
          <li key={post}>
            <div className='group bg-custom-placeholder-green aspect-square h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-[150px] sm:w-[250px] md:w-[300px] lg:w-[350px]'>
              <SiInstagram className="w-5 h-5 lg:w-8 lg:h-8 text-custom-white basic-animation  opacity-0 group-hover:opacity-100" />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
