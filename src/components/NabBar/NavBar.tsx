import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, LogoutIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { ActionIcon, useMantineColorScheme, Button } from "@mantine/core";

import { Sun, Moon } from "tabler-icons-react";

import shanlogo from "assets/images/SHAN Logo 2020.png";

import { useRecoilValue } from 'recoil';
import { userState } from 'recoil-state/state';
import { userTypes } from "types/userTypes";
import { matchPath, useLocation } from "react-router-dom"

const routes = [
  { name: "Database Search", path: "/" },
  { name: "Contact List", path: "/contact-list" },
  { name: "Staff List", path: "/staff-list" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const user = useRecoilValue<userTypes>(userState);
  const navigate = useNavigate();
  const [currentRoute, setCurrentRoute] = useState("/")

  const { pathname } = useLocation();
  let useNavigation = routes

  useEffect(() => {
    for (const route of routes) {
      if (matchPath({ path: route.path }, pathname)) {
        setCurrentRoute(route.path)
      }
    }
  }, [pathname])

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-6 sm:px-2 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute left-0 flex items-center hidden sm:block">
                {/* Mobile menu button*/}
                <Disclosure.Button style={{ border: "none" }} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-0">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex sm:items-center sm:justify-center items-stretch justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={shanlogo}
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={shanlogo}
                    alt="Workflow"
                  />
                </div>
                <div className="sm:hidden block ml-6">
                  <div className="flex space-x-4">
                    {useNavigation.map((item) => (
                      <Button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        variant="white"
                        className={classNames(
                          item.path === currentRoute
                            ? "bg-gray-900 text-white "
                            : "text-gray-300 hover:bg-gray-700",
                          "px-3 py-2 rounded-md text-sm font-medium hover:text-white"
                        )}
                        styles={() => ({
                          root: {
                            border: "none"
                          }
                        })}
                        aria-current={item.path === currentRoute ? "page" : undefined}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 static inset-auto ml-6 pr-0">
                <ActionIcon
                  className="darkmode-toggle-icon"
                  color={dark ? "yellow" : "blue"}
                  style={{ padding: 3, border: "none" }}
                  variant="outline"
                  radius={6}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
                >
                  {dark ? <Sun size={40} /> : <Moon size={40} />}
                </ActionIcon>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="flex text-sm rounded-full">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={shanlogo}
                        alt={user.username}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className={`origin-top-right absolute z-10 right-0 mt-2 w-48 bg-white ${dark && "bg-gray-700"} rounded-md shadow-xl py-1 ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                      <div className="m-2 border-b-2">
                        <p className={`text-sm opacity-60 ${dark ? "text-white" : "text-gray-700"}`}>Signed in as </p>
                        <div className="flex flex-row items-center text-center">
                          <img className="h-8 w-8 rounded-full" src={shanlogo} alt="users" />
                          <p className={`m-2 text-lg ${dark ? "text-white" : "text-gray-700"}`}>{user.username}</p>
                        </div>
                      </div>
                      <Menu.Item>
                        {({ active }: { active: boolean }) => (
                          <Button
                            onClick={() => navigate("/logout")}
                            variant="white"
                            style={{ border: "none" }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              `flex w-full px-4 py-2 text-sm ${dark ? "text-white" : "text-gray-700"} hover:bg-gray-300`
                            )}
                          >
                            Sign out
                          </Button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:block">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {useNavigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={classNames(
                    item.path === currentRoute
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "flex w-full px-3 py-2 rounded-md text-base font-medium"
                  )}
                  style={{ border: "none" }}
                  aria-current={item.path === currentRoute ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                onClick={() => navigate("/logout")}
                className={"flex flex-row w-full text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}
                style={{ border: "none" }}
              >
                <LogoutIcon className="w-6 h-6 mx-2" />
                <span>Sign out</span>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;