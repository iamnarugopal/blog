import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FiPower, FiKey, FiEdit, FiList, FiLogIn, FiUserPlus } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../../store/authenticationSlice";
import Logo from "../../../assets/images/logo.svg";


const Header = () => {
  const disppatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const isLogin = useSelector((state) => state.authentication.isLogin);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const logout = () => {
    disppatch(removeUser());
  };

  return (
    <header className="shrink-0 py-5">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="">
            <div className="text-white text-3xl font-bold uppercase">
              <Link to="/">
                <img src={Logo} alt="Logo" style={{ height: 40 }} />
              </Link>
            </div>
          </div>
          <div>
            <div className="flex gap-3">
              {isLogin ? (
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="bg-sky-600 text-white w-10 h-10 rounded-full">
                    {user?.name?.charAt(0).toUpperCase()}
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-slate-600 rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/add-blog"
                              className={classNames(
                                active ? "bg-sky-600" : "",
                                "text-white flex items-center gap-2 px-4 py-2 text-sm"
                              )}
                            >
                              <FiEdit /> Add Blog
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/my-blog"
                              className={classNames(
                                active ? "bg-sky-600" : "",
                                "text-white flex items-center gap-2 px-4 py-2 text-sm"
                              )}
                            >
                              <FiList /> My Blogs
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/change-password"
                              className={classNames(
                                active ? "bg-sky-600" : "",
                                "text-white flex items-center gap-2 px-4 py-2 text-sm"
                              )}
                            >
                              <FiKey /> Change Password
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={logout}
                              className={classNames(
                                active ? "bg-sky-600" : "",
                                "w-full text-white flex items-center gap-2 px-4 py-2 text-sm"
                              )}
                            >
                              <FiPower /> Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <>
                  <Link className="btn btn-outline-primary flex gap-2 items-center" to="/login">
                    <FiLogIn className="text-xl inline-block" />
                    <span className="hidden sm:inline-block">Login</span>
                  </Link>
                  <Link className="btn btn-primary flex gap-2 items-center" to="/signup">
                    <FiUserPlus className="text-xl inline-block" />
                    <span className="hidden sm:inline-block">Signup</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
