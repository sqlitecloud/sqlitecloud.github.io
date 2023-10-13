//core
import React from 'react';
//utils
import {
  logThis,
} from '../../js/utils';
//logo
import LogoSQLiteCloud from '../../../assets/logo/logo-mobile@4x.png';
//render
export default function Footer() {
  if (process.env.DEBUG == "true") logThis("Footer: ON RENDER");
  //render UI
  return (
    <footer aria-labelledby="footer-heading" className="bg-white border-t border-gray-200">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="pt-16">
            <div className="md:flex md:justify-start">
              <img
                src={LogoSQLiteCloud}
                alt=""
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 pb-10 md:flex md:items-center md:justify-between">
          <div className="text-left">
            <p className="text-sm text-gray-500">&copy; 2023 SQLite Cloud All Rights Reserved</p>
          </div>

          <div className="flex mt-8 space-x-2 items-start justify-start md:mt-0">
            <p className="px-3 border-l border-gray-200 text-sm text-slate-500">
              Template provided by <a href="https://tailwindui.com/" className="font-medium text-sky-600 hover:text-sky-700">Tailwind UI</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}