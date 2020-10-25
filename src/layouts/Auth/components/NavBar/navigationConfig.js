import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

export const navigationConfig = t => {
  // const blogSubmenu = categories.map(category => {
  //   return { title: category.name, href: `/blogs/categories/${category.id}` };
  // });
  return [
    {
      title: 'Pages',
      pages: [
        {
          title: t('top_bar:home'),
          href: '/home'
        },
        {
          title: t('top_bar:media'),
          href: '/#',
          children: [
            {
              title: t('top_bar:videos'),
              href: '/watch'
            },
            {
              title: t('top_bar:audios'),
              href: '/listen'
            }
          ]
        },
        {
          title: t('top_bar:blogs'),
          href: '/blogs'
        },
        {
          title: t('top_bar:mix'),
          href: '/#'
        },
        {
          title: t('top_bar:faq'),
          href: '/faq'
        },
        {
          title: t('top_bar:about'),
          href: '/#'
        }
      ]
    },
    {
      title: 'Auth',
      pages: [
        {
          title: t('top_bar:forum'),
          href: '/forum',
          icon: ForumOutlinedIcon
        },
        {
          title: 'Login',
          href: '/login',
          icon: LockOpenIcon
        },
        {
          title: 'Signup',
          href: '/register',
          icon: PersonIcon
        }
      ]
    }
  ];
};
