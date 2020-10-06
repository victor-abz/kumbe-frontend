
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
export const navigationConfig = t => [
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
        title: t('top_bar:mix'),
        href: '/#'
      },
      {
        title: t('top_bar:faq'),
        href: '/#'
      },
      {
        title: t('top_bar:about'),
        href: '/#'
      },
    ]
  },
  {
    title: 'Auth',
    pages: [
      {
        title: 'Login',
        href: '/login',
        icon: LockOpenIcon,
      },
      {
        title: 'Signup',
        href: '/register',
        icon: PersonIcon,
      }
    ]
  }
];
