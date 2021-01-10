import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import DashboardLayout from './layouts/Dashboard';
import PresentationView from './views/Home';
import Forum from './views/Forum/Forum';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/home" />
  },
  {
    path: '/admin',
    component: DashboardLayout,
    routes: [
      {
        path: '/admin/dashboard',
        exact: true,
        component: lazy(() => import('views/DashboardDefault'))
      },
      {
        path: '/admin/blogs/create',
        exact: true,
        component: lazy(() => import('views/BlogCreate'))
      },
      {
        path: '/admin/blogs/edit/:blogSlug',
        exact: true,
        component: lazy(() => import('views/BlogCreate'))
      },
      {
        path: '/admin/blogs',
        exact: true,
        component: lazy(() => import('views/BlogList'))
      },
      {
        path: '/admin/comments',
        exact: true,
        component: lazy(() => import('views/Comments'))
      },
      {
        path: '/admin/products',
        exact: true,
        component: lazy(() => import('views/ProductServices'))
      },
      {
        path: '/admin/media/medias',
        exact: true,
        component: lazy(() => import('views/Medias/AudioList'))
      },
      {
        path: '/admin/settings',
        exact: true,
        component: lazy(() => import('views/Settings'))
      },
      {
        path: '/admin/settings/:tab',
        exact: true,
        component: lazy(() => import('views/Settings'))
      },
      {
        path: '/admin/partners',
        exact: true,
        component: lazy(() => import('views/Partners'))
      },
      {
        path: '/admin/faqs',
        exact: true,
        component: lazy(() => import('views/AdminFAQs'))
      },
      {
        path: '/admin/sliders',
        exact: true,
        component: lazy(() => import('views/SliderSetting'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/user',
    component: DashboardLayout,
    routes: [
      {
        path: '/user/profile',
        exact: true,
        component: lazy(() => import('views/Settings'))
      },
      {
        path: '/user/profile/:tab',
        exact: true,
        component: lazy(() => import('views/Settings'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: AuthLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '*',
    component: AuthLayout,
    routes: [
      {
        path: '/home',
        exact: true,
        component: PresentationView
      },
      {
        path: '/blogs',
        exact: true,
        component: lazy(() => import('views/ViewBlogs'))
      },
      {
        path: '/blogs/categories/:id',
        exact: true,
        component: lazy(() => import('views/ViewBlogs'))
      },
      {
        path: '/blogs/:id',
        exact: true,
        component: lazy(() => import('views/Blog'))
      },
      {
        path: '/login',
        exact: true,
        component: lazy(() => import('views/Login'))
      },
      {
        path: '/faq',
        exact: true,
        component: lazy(() => import('views/FAQ'))
      },
      {
        path: '/register',
        exact: true,
        component: lazy(() => import('views/Register'))
      },
      {
        path: '/watch',
        exact: true,
        component: lazy(() => import('views/VideoHome'))
      },
      {
        path: '/watch/:videoId',
        exact: true,
        component: lazy(() => import('views/WatchVideo'))
      },
      {
        path: '/listen',
        exact: true,
        component: lazy(() => import('views/Listen'))
      },
      {
        path: '/photos',
        exact: true,
        component: lazy(() => import('views/ImagesGallery'))
      },
      {
        path: '/forum',
        component: Forum,
        routes: [
          {
            path: '/forum',
            exact: true,
            component: lazy(() => import('views/Forum/Feed'))
          },
          {
            path: '/forum/c/:id/',
            exact: true,
            component: lazy(() => import('views/Forum/Feed'))
          },
          {
            path: '/forum/q/:qId',
            exact: true,
            component: lazy(() => import('views/Forum/Question'))
          }
        ]
      },
      {
        path: '/about',
        exact: true,
        component: lazy(() => import('views/AboutUs'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];

export default routes;
