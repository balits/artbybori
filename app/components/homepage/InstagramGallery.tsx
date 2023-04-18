import clsx from 'clsx';
import {SiInstagram} from 'react-icons/si';
import {Container} from '../global/Container';

export default function InstagramGallery({mt = 'mt-16'}: {mt?: string}) {
  return (
    <Container
      className={clsx(
        'mb-10 grid grid-cols-2 grid-rows-4 gap-2 md:grid-cols-4 md:grid-rows-2',
        mt,
      )}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
        <div
          key={v}
          className="grid place-items-center relative group bg-custom-placeholder-green aspect-square overflow-hidden cursor-pointer transition-all filter hover:brightness-90 active:brightness-70"
        >
          <SiInstagram className="w-1/6 aspect-square text-custom-white opacity-0 transition-opacity  group-hover:opacity-100" />
        </div>
      ))}
    </Container>
  );
}
