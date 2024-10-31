import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";
import { useAppDispatch } from "../../../lib/hooks";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { toggleMobileNav } from "../../../lib/features/app/app-slice";
import { MoveRight, X } from "lucide-react";
import { navItems } from "..";

export function MobileSideNav() {
  const { isMobileNavOpen } = useSelector((state: RootState) => state.app);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(toggleMobileNav());
  };

  return (
    <Dialog
      open={isMobileNavOpen}
      onClose={handleClose}
      className="relative z-10 bg-white"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden text-dark">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl p-4">
                <div className="flex items-start justify-between space-x-6">
                  <a href="/" className="">
                    <span className="sr-only">Max Store</span>
                    <img
                      alt="Max Store"
                      src={"/images/mini-max-logo.png"}
                      className={"h-[40px]"}
                    />
                  </a>

                  <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => handleClose()}
                        className="relative -m-2 p-2 text-gray-600 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <X aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                </div>

                <div className="flex pt-[40px] px-1">
                  <ul className="flex flex-col justify-center space-y-4 text-teal">
                    {navItems.map((item) => (
                      <li className="" key={item.title}>
                        <a
                          href={item.link}
                          className="hover:text-gray-900 text-teal text-md flex"
                        >
                          {item.title} <MoveRight className="pl-2" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
