//config
import { config } from '../js/config';
//utils
import { logThis } from '../js/utils';
//core
import * as React from "react";
import { createRoot } from 'react-dom/client';

//components
import Root from "../page/Root";
//style
import '../style/style.css';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);