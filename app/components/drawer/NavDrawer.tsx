import {Drawer, DrawerProps} from '~/components/Drawer';
import Nav from '../global/Nav';

/*
 * A reexport of `Drawer` that slides in from the left and displays informations about the current Cart
 * Uses the same `DrawerProps` type as the `Drawer` itself.
 * */
export default function NavDrawer({
  heading,
  open,
  onClose,
  openFrom,
}: DrawerProps) {
  return (
    <Drawer heading={heading} open={open} onClose={onClose} openFrom={openFrom}>
      <div className="h-full w-full">
        <Nav
          flexDirection="col"
          className="px-4"
          closeSidebarOnClick={onClose}
        />
      </div>
    </Drawer>
  );
}
