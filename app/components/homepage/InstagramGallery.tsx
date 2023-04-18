import clsx from 'clsx';
import {SiInstagram} from 'react-icons/si';
import {Container} from '../global/Container';

export default function InstagramGallery({mt = 'mt-16'}: {mt?: string}) {
  return (
    <Container
      as={"ul"}
      className={clsx(
        'mb-10  grid grid-cols-2 grid-rows-4 gap-2 md:grid-cols-4 md:grid-rows-2',
        mt,
      )}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
        <li
          key={v}
          className=""
        >
          <div className='bg-custom-black aspect-square'>

            <SiInstagram className="w-5 h-5 lg:w-8 lg:h-8 aspect-square text-custom-white opacity-0 basic-animation group-hover:opacity-100" />
          </div>
        </li>
      ))}
    </Container>
  );
}
