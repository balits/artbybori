import clsx from 'clsx';
import {SiInstagram} from 'react-icons/si';
import {Container} from '../global/Container';

export default function InstagramGallery({mt = 'mt-16'}: {mt?: string}) {
  return (
    <Container
      className={clsx(
        'w-full mb-10 grid grid-cols-2 grid-rows-4 gap-2 md:grid-cols-4 md:grid-rows-2',
        mt,
      )}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
        <div
          key={v}
          className="w-full aspect-square grid place-items-center  group bg-custom-placeholder-green cursor-pointer basic-animation filter hover:brightness-90 active:brightness-70"
        >
          <SiInstagram className="w-3 h-3 md:w-8 md:h-8 lg:w-10 lg:h-10 text-custom-white opacity-0 basic-animation group-hover:opacity-100" />
        </div>
      ))}
    </Container>
  );
}
