import React from 'react';
import { colors } from '@material-ui/core';
import {
  CommentOutlined,
  FolderOutlined as FolderIcon,
  PermMediaOutlined,
  LocalLaundryService,
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  PersonOutlined as PersonIcon,
  QuestionAnswerOutlined as FAQIcon,
  SlideshowOutlined as SliderIcon
} from '@material-ui/icons';

import { Label } from 'components';
export const navigationConfig = t => [
  {
    title: 'Pages',
    pages: [
      {
        title: 'Dashboards',
        href: '/admin/dashboard',
        icon: DashboardIcon
      },
      {
        title: t('blog:name'),
        href: '/admin/blogs',
        icon: FolderIcon,
        label: () => <Label color={colors.green[500]}>New</Label>,
        children: [
          {
            title: t('blog:blog_browse'),
            href: '/admin/blogs'
          },
          {
            title: t('blog:title'),
            href: '/admin/blogs/create'
          }
        ]
      },
      {
        title: t('media:name'),
        href: '/admin/media',
        icon: PermMediaOutlined,
        children: [
          {
            title: t('media:title_media'),
            href: '/admin/media/medias'
          }
        ]
      },
      {
        title: t('comment:name'),
        href: '/admin/comments',
        icon: CommentOutlined
      },
      {
        title: t('settings:products'),
        href: '/admin/products',
        icon: LocalLaundryService
      },
      {
        title: t('settings:partners'),
        href: '/admin/partners',
        icon: PeopleIcon
      },
      {
        title: t('faqs:page_header'),
        href: '/admin/faqs',
        icon: FAQIcon
      },
      {
        title: t('slider:page_header'),
        href: '/admin/sliders',
        icon: SliderIcon
      }
    ]
  },
  {
    title: 'Settings',
    pages: [
      {
        title: t('settings:profile'),
        href: '/user/profile',
        icon: PersonIcon
      }
    ]
  }
];
