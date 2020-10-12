/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import AuthLayout from './layouts/Auth';
import DashboardLayout from './layouts/Dashboard';
import DashboardAnalyticsView from './views/DashboardAnalytics';
import DashboardDefaultView from './views/DashboardDefault';
import PresentationView from './views/Presentation';

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
        path: '/admin/chat',
        exact: true,
        component: lazy(() => import('views/Chat'))
      },
      {
        path: '/admin/chat/:id',
        exact: true,
        component: lazy(() => import('views/Chat'))
      },
      {
        path: '/admin/dashboards/analytics',
        exact: true,
        component: DashboardAnalyticsView
      },
      {
        path: 'admin/dashboards/default',
        exact: true,
        component: DashboardDefaultView
      },
      {
        path: '/admin/management/customers',
        exact: true,
        component: lazy(() => import('views/BlogList'))
      },
      {
        path: '/admin/management/customers/:id',
        exact: true,
        component: lazy(() => import('views/CustomerManagementDetails'))
      },
      {
        path: '/admin/management/customers/:id/:tab',
        exact: true,
        component: lazy(() => import('views/CustomerManagementDetails'))
      },
      {
        path: '/admin/management/projects',
        exact: true,
        component: lazy(() => import('views/ProjectManagementList'))
      },
      {
        path: '/admin/profile/:id',
        exact: true,
        component: lazy(() => import('views/Profile'))
      },
      {
        path: '/admin/profile/:id/:tab',
        exact: true,
        component: lazy(() => import('views/Profile'))
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
        path: '/admin/blogs/:id',
        exact: true,
        component: lazy(() => import('views/ProjectDetails'))
      },
      {
        path: '/admin/blogs/:id/:tab',
        exact: true,
        component: lazy(() => import('views/ProjectDetails'))
      },
      {
        path: '/admin/blogs',
        exact: true,
        component: lazy(() => import('views/BlogList'))
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
        path: '/admin/social-feed',
        exact: true,
        component: lazy(() => import('views/SocialFeed'))
      }
      // {
      //   component: () => <Redirect to="/errors/error-404" />
      // }
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
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];

export default routes;
