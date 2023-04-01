import clsx from 'clsx';

type SliderProps = {
  items: Array<any>;
  className?: string;
};
export default function Slider({items, className = ''}: SliderProps) {
  return (
    <ul
      className={clsx(
        'w-full h-full grid grid-rows-1 grid-flow-col gap-10',
        className,
      )}
    >
      {items.map((item, idx) => {
        return (
          <li
            key={idx}
            className="w-[70vw] rounded-sm group relative aspect-square overflow-hidden cursor pointer transition-all delay-75 "
          >
            <div className="bg-custom-placeholder-green absolute inset-0 w-full h-full" />
          </li>
        );
      })}
    </ul>
  );
}

export function Fallback() {
  return <div>fallback</div>;
}
