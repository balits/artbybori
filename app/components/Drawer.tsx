import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from './global/Icon';
import { Heading } from './ui';

export type DrawerProps = {
  heading: string | JSX.Element;
  open: boolean;
  onClose: () => void;
  openFrom: 'right' | 'left';
  children?: React.ReactNode;
};

/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - right, left
 * @param children - react children node.
 */
export function Drawer({
  heading,
  open,
  onClose,
  openFrom = 'right',
  children,
}: DrawerProps) {
  const offScreen = {
    right: 'translate-x-full',
    left: '-translate-x-full',
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <aside aria-roledescription="sidebar" className="fixed inset-0">
          <div className="absolute inset-0 overflow-hidden ">
            <div
              className={`fixed h-screen flex  ${openFrom === 'right' ? 'right-0' : ''
                }`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={offScreen[openFrom]}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={offScreen[openFrom]}
              >
                <Dialog.Panel className="overflow-auto w-screen md:w-[55vw] lg:w-[30vw]  w-sidebar text-left align-middle transition-all transform shadow-md h-screen-dynamic bg-custom-white px-4 ">
                  <header className="bg-custom-white w-full header-height flex  items-center justify-between sticky top-0 justify-between z-[52]" >
                    <Dialog.Title>
                      <Heading
                        as="span"
                        size='sm'
                        font='font-sans'
                        bold
                        id="cart-contents"
                      >
                        {heading}
                      </Heading>
                    </Dialog.Title>
                      <button
                        type="button"
                        className="p-4 transition"
                        onClick={onClose}
                        data-test="close-cart"
                      >
                        <X aria-label="Close panel" className="w-5 h-5" />
                      </button>
                  </header>
                  <div className='h-full z-[51]'>
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </aside>
      </Dialog>
    </Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;

export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}
