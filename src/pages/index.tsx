import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import { FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@remix-run/router/dist/router';
import { Authorization } from './authorization';

const router: Router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World</div>,
  },
  {
    path: '/auth',
    element: <Authorization/>,
  },
]);

export const Routing: FC = () => (
  <RouterProvider router={router}/>
);
