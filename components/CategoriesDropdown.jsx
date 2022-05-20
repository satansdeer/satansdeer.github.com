import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export function CategoriesDropdown() {
  return (
    <Menu as="div" className="relative flex">
      <Menu.Button className="inline-flex w-full justify-center focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11l-7 7-7-7"
          />
        </svg>
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
        <Menu.Items className="absolute -left-6 top-7 mt-2 w-56 origin-top-right rounded-md border bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 shadow-xl focus:outline-none">
          <div className="py-5 px-7 flex flex-grow flex-wrap items-center justify-between gap-4">
            <Menu.Item>{({ active }) => <a href="#">React</a>}</Menu.Item>
            <Menu.Item>{({ active }) => <a href="#">Typescript</a>}</Menu.Item>
            <Menu.Item>{({ active }) => <a href="#">Javascript</a>}</Menu.Item>
            <Menu.Item>{({ active }) => <a href="#">React</a>}</Menu.Item>
            <Menu.Item>{({ active }) => <a href="#">Javascript</a>}</Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
