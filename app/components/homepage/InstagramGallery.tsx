import clsx from 'clsx';
import {SiInstagram} from 'react-icons/si';
import Container from '../global/Container';

export default function InstagramGallery({
  className = '',
}: {
  className?: string;
}) {
  return (
    <Container className="mt-16 mb-10 grid grid-cols-2 grid-rows-4 gap-2 md:grid-cols-4 md:grid-rows-2">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
        <div
          key={v}
          className={clsx(
            'grid place-items-center relative group bg-custom-placeholder-green aspect-square overflow-hidden cursor-pointer transition-all filter hover:brightness-90 active:brightness-70',
            className,
          )}
        >
          <SiInstagram className="w-1/6 h-1/6 text-custom-white opacity-0 transition-opacity  group-hover:opacity-100" />
        </div>
      ))}
    </Container>
  );
}
