//core
import React from 'react';
//utils
import {
  logThis,
} from '../js/utils';
//components
import Navigation from '../components/navigation/Navigation';
import Home from './Home';
import Footer from '../components/footer/Footer';
//render
export default function Root() {
  if (process.env.DEBUG == "true") logThis("Root: ON RENDER");
  //render UI
  return (
    <div className="bg-white">
      <Navigation />
      <Home />
      <Footer />
    </div>
  )
}
