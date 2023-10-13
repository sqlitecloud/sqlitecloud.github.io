//core
import React from 'react';
//utils
import {
  logThis
} from '../../js/utils';
import Header from './Header';
//render
export default function Navigation() {
  if (process.env.DEBUG == "true") logThis("Navigation: ON RENDER");
  //render UI
  return (
    <>
      <Header />
    </>
  )
}
