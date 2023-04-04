import {Drawer, DrawerProps} from '~/components/Drawer';
import Nav from '../global/Nav';

/*
 * A reexport of `Drawer` that slides in from the left and displays informations about the current Cart
 * Uses the same `DrawerProps` type as the `Drawer` itself.
 * */
export default function CartDrawer({
  heading,
  open,
  onClose,
  openFrom,
}: DrawerProps) {
  return (
    <Drawer heading={heading} open={open} onClose={onClose} openFrom={openFrom}>
      <div className="h-full w-full">
        <Nav flexDirection="col" className="p-4" onClick={onClose} />
      </div>
    </Drawer>
  );
}
