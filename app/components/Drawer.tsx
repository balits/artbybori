import {Component, Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {HiX} from 'react-icons/hi';

export type DrawerProps = {
  heading: string | Component;
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

        <div className="fixed inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`fixed inset-y-0 flex max-w-full ${
                openFrom === 'right' ? 'right-0' : ''
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
                <Dialog.Panel className="w-screen max-w-lg text-left align-middle transition-all transform shadow-md h-screen-dynamic bg-custom-white">
                  <header
                    className={`mb-4 w-full header-height flex ${
                      openFrom === 'left' ? 'flex-row-reverse' : 'flex-row'
                    } items-center justify-between sticky top-0 justify-between`}
                  >
                    <button
                      type="button"
                      className="p-4 transition"
                      onClick={onClose}
                      data-test="close-cart"
                    >
                      <HiX aria-label="Close panel" className="w-5 h-5" />
                    </button>
                    <Dialog.Title>
                      <div
                        className="p-4 text-2xl font-medium"
                        id="cart-contents"
                      >
                        {heading}
                      </div>
                    </Dialog.Title>
                  </header>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
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
