//core
import React, { Fragment, useState, useContext, useEffect } from 'react';
//utils
import {
  logThis,
} from '../../js/utils';
//logo
import LogoSQLiteCloud from '../../../assets/logo/logo-mobile@4x.png';
//render
export default function Header() {
  if (process.env.DEBUG == "true") logThis("Header: ON RENDER");
  //render UI
  return (
    <header className="relative z-10">
      <nav aria-label="Top">
        {/* Secondary navigation */}
        <div className="bg-white">
          <div className="border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:items-center">
                  <a href="/">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src={LogoSQLiteCloud}
                      alt=""
                    />
                  </a>
                </div>


                {/* Logo (lg-) */}
                <a href="/" className="lg:hidden">
                  <span className="sr-only">Your Company</span>
                  <img
                    src={LogoSQLiteCloud}
                    alt=""
                    className="h-8 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
