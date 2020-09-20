/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';

import { Label } from 'components';

export default [
  {
    title: 'Pages',
    pages: [
      // {
      //   title: 'Dashboards',
      //   href: '/dashboards',
      //   icon: DashboardIcon,
      //   children: [
      //     {
      //       title: 'Default',
      //       href: '/dashboards/default'
      //     },
      //     {
      //       title: 'Analytics',
      //       href: '/dashboards/analytics'
      //     }
      //   ]
      // },
      // {
      //   title: 'Management',
      //   href: '/management',
      //   icon: BarChartIcon,
      //   children: [
      //     {
      //       title: 'Customers',
      //       href: '/management/customers'
      //     },
      //     {
      //       title: 'Customer Details',
      //       href: '/management/customers/1/summary'
      //     },
      //     {
      //       title: 'Projects',
      //       href: '/management/projects'
      //     }
      //   ]
      // },
      // {
      //   title: 'Social Feed',
      //   href: '/social-feed',
      //   icon: PeopleIcon
      // },
      // {
      //   title: 'Profile',
      //   href: '/profile',
      //   icon: PersonIcon,
      //   children: [
      //     {
      //       title: 'Timeline',
      //       href: '/profile/1/timeline'
      //     },
      //     {
      //       title: 'Connections',
      //       href: '/profile/1/connections'
      //     },
      //     {
      //       title: 'Projects',
      //       href: '/profile/1/projects'
      //     },
      //     {
      //       title: 'Reviews',
      //       href: '/profile/1/reviews'
      //     }
      //   ]
      // },
      {
        title: 'Blog',
        href: '/blogs',
        icon: FolderIcon,
        label: () => <Label color={colors.green[500]}>New</Label>,
        children: [
          {
            title: 'Browse',
            href: '/blogs'
          },
          {
            title: 'Create',
            href: '/blogs/create'
          },
          // {
          //   title: 'Overview',
          //   href: '/blogs/1/overview'
          // },
          // {
          //   title: 'Files',
          //   href: '/blogs/1/files'
          // },
          // {
          //   title: 'Activity',
          //   href: '/blogs/1/activity'
          // },
          // {
          //   title: 'Subscribers',
          //   href: '/blogs/1/subscribers'
          // }
        ]
      },
      // {
      //   title: 'Chat',
      //   href: '/chat',
      //   icon: ChatIcon,
      //   label: () => (
      //     <Label color={colors.red[500]} shape="rounded">
      //       4
      //     </Label>
      //   )
      // },

      // {
      //   title: 'Authentication',
      //   href: '/auth',
      //   icon: LockOpenIcon,
      //   children: [
      //     {
      //       title: 'Login',
      //       href: '/auth/login'
      //     },
      //     {
      //       title: 'Register',
      //       href: '/auth/register'
      //     }
      //   ]
      // },
      // {
      //   title: 'Errors',
      //   href: '/errors',
      //   icon: ErrorIcon,
      //   children: [
      //     {
      //       title: 'Error 401',
      //       href: '/errors/error-401'
      //     },
      //     {
      //       title: 'Error 404',
      //       href: '/errors/error-404'
      //     },
      //     {
      //       title: 'Error 500',
      //       href: '/errors/error-500'
      //     }
      //   ]
      // }
    ]
  },
  {
    title: 'Support',
    pages: [
      {
        title: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
        children: [
          {
            title: 'General',
            href: '/settings/general'
          },
          {
            title: 'Subscription',
            href: '/settings/subscription'
          },
          {
            title: 'Notifications',
            href: '/settings/notifications'
          },
          {
            title: 'Security',
            href: '/settings/security'
          }
        ]
      }
    ]
  }
];
