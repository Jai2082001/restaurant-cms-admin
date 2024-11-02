import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Route from './routes/root';
import HomePage from './routes/HomePage';
import Product from './routes/Product'
import SiteEdit from './routes/SiteEdit';
import UserEdit from './routes/UserEdit';
import SocialEdit from './routes/SocialEdit';
import ErrorPage from './components/ErrorPage'
import CategoryEdit from './routes/CategoryEdit'
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Route></Route>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>
      },
      {
        path: 'productedit',
        element: <Product></Product>
      },
      {
        path: 'categoryedit',
        element: <CategoryEdit></CategoryEdit>
      },
      {
        path: 'siteedit',
        element: <SiteEdit></SiteEdit>
      },
      {
        path: 'useredit',
        element: <UserEdit></UserEdit>
      },
      {
        path: 'socialplatform',
        element: <SocialEdit></SocialEdit>
      }
    ]
  }
])
root.render(
  <RouterProvider router={router}></RouterProvider>
);

