import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './router/router.jsx';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App router={router}/> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
