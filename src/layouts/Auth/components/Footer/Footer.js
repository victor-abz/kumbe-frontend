import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { getCategories } from 'redux/actions/category';
import { useSelector } from 'react-redux';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
// import { FontProvider, Typography } from 'website/src/components/Typography';

import { ColumnToRow, Item } from '@mui-treasury/components/flex';
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
import {
  EmailSubscribe,
  EmailTextInput,
  SubmitButton,
} from '@mui-treasury/components/EmailSubscribe';
import {
  CategoryProvider,
  CategoryTitle,
  CategoryItem,
} from '@mui-treasury/components/menu/category';
import {
  SocialProvider,
  SocialLink,
} from '@mui-treasury/components/socialLink';

import { useMagCategoryMenuStyles } from '@mui-treasury/styles/categoryMenu/mag';
import { usePoofSocialLinkStyles } from '@mui-treasury/styles/socialLink/poof';
import { useReadyEmailSubscribeStyles } from '@mui-treasury/styles/emailSubscribe/ready';
import { usePlainNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/plain';
import { useTranslation } from 'react-i18next';

const darkTheme = createMuiTheme({ palette: { type: 'dark' } });

const useStyles = makeStyles(({ palette, typography }) => ({
  top: {
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  middle: {
    backgroundColor: palette.type === 'dark' ? '#192D36' : palette.action.hover,
  },
  bottom: {
    backgroundColor:
      palette.type === 'dark' ? '#0F2128' : palette.action.selected,
  },
  newsletterText: {
    color: '#fff',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
  },
  form: {
    margin: 0,
    minWidth: 343,
    fontSize: '0.875rem',
  },
  legalLink: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    justifyContent: 'center',
    color: palette.text.hint,
    letterSpacing: '0.5px',
  },
  divider: {
    height: 2,
    margin: '-1px 0',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    filter: 'grayscale(80%)',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  info: {
    ...typography.caption,
    color: palette.text.hint,
    marginTop: 8,
  }
}));

const Footer = React.memo(function ArcAppFooter() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { categories } = useSelector(({ categoryGet }) => categoryGet );
  useEffect(() => {
    getCategories();
  }, []);
  console.log(categories);
  return (
    <Box width={'100%'}>
      <Box className={classes.top} position={'relative'} px={2} py={6}>
        <div className={classes.overlay}>
          <img
            alt={''}
            src={
              'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80'
            }
          />
        </div>
        <ThemeProvider theme={darkTheme}>
          <ColumnToRow
            at={'sm'}
            columnStyle={{ alignItems: 'center', textAlign: 'center' }}
            cssPosition={'relative'}
            gap={{ xs: 2, sm: 3, md: 4 }}
            rowStyle={{ justifyContent: 'center' }}
            wrap
          >
            <Item>
              <Typography className={classes.newsletterText}>
                <Typography>{t('top_bar:newsletterSubscribe')}</Typography>
              </Typography>
            </Item>
            <Item>
              <EmailSubscribe
                className={classes.form}
                inputClearedAfterSubmit
                onSubmit={email => alert(`Your email is ${email}.`)}
                useStyles={useReadyEmailSubscribeStyles}
              >
                <EmailTextInput placeholder={t('top_bar:emailPrompt')} />
                <SubmitButton>{t('top_bar:subscribe')}</SubmitButton>
              </EmailSubscribe>
            </Item>
          </ColumnToRow>
        </ThemeProvider>
      </Box>
      <Box className={classes.middle} px={2} py={10}>
        <Container disableGutters>
          <Grid container spacing={4}>
            <Grid item lg={3} md={4} xs={12}>
              <Box
                alt=""
                borderRadius={12}
                component={'img'}
                height={64}
                mt={-3}
                src="/images/HDI_logo.png"
                width={120}
              />
              <Typography className={classes.info}>
                <Typography index={1}>
                    Kicukiro, KN xxx, 3530, Kigali Rwanda
                </Typography>
              </Typography>

              <Typography className={classes.info}>
                <Typography index={1}>
                    admin@kumbe.rw
                </Typography>
              </Typography>
            </Grid>
            <Grid item lg={6} md={8} xs={12}>
              <Grid container spacing={2}>
                <Grid item sm={4} xs={6}>
                  <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                    <CategoryTitle>
                      <Typography>{t('top_bar:services')}</Typography>
                    </CategoryTitle>
                    <CategoryItem>
                      <Typography index={1}>Counselling</Typography>
                    </CategoryItem>
                    <CategoryItem>
                      <Typography index={1}>Condoms</Typography>
                    </CategoryItem>
                  </CategoryProvider>
                </Grid>
                <Grid item sm={4} xs={6}>
                  <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                    <CategoryTitle>
                      <Typography>{t('top_bar:popularcategories')}</Typography>
                    </CategoryTitle>
                    {
                      categories.map(({ name }, index)=> (
                        <CategoryItem index={index}>
                          <Typography index={1}>{name}</Typography>
                        </CategoryItem>

                      ))
                    }
                  </CategoryProvider>
                </Grid>
                <Grid item sm={4} xs={6}>
                  <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                    <CategoryTitle>
                      <Typography>{t('top_bar:infotitle')}</Typography>
                    </CategoryTitle>
                    <CategoryItem>
                      <Typography index={1}>{t('top_bar:about')}</Typography>
                    </CategoryItem>
                    <CategoryItem>
                      <Typography index={1}>{t('top_bar:faq')}</Typography>
                    </CategoryItem>
                  </CategoryProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={3} md={8} style={{ marginLeft: 'auto' }} xs={12}>
              <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                <CategoryTitle>
                  <Typography>{t('top_bar:subscribe')}</Typography>
                </CategoryTitle>
              </CategoryProvider>
              <SocialProvider useStyles={usePoofSocialLinkStyles}>
                <SocialLink brand={'Envelope'} />
                <SocialLink brand={'GooglePlus'} />
                <SocialLink brand={'Pinterest'} />
                <SocialLink brand={'Dribbble'} />
              </SocialProvider>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container disableGutters>
        <Divider className={classes.divider} />
      </Container>
      <Box className={classes.bottom} px={2} py={3}>
        <Container disableGutters>
          <ColumnToRow
            at={'md'}
            columnStyle={{ alignItems: 'center' }}
            rowStyle={{ alignItems: 'unset' }}
          >
            <Item grow ml={-2} shrink={0}>
              <NavMenu useStyles={usePlainNavigationMenuStyles}>
                <ColumnToRow at={'sm'}>
                  <NavItem className={classes.legalLink}>
                    <Typography>{t('top_bar:terms')}</Typography>
                  </NavItem>
                  <NavItem className={classes.legalLink}>
                    <Typography>{t('top_bar:privacy')}</Typography>
                  </NavItem>
                </ColumnToRow>
              </NavMenu>
            </Item>
            <Item>
              <Box py={1} textAlign={{ xs: 'center', md: 'right' }}>
                <Typography
                  color={'textSecondary'}
                  component={'p'}
                  variant={'caption'}
                >
                  <Typography index={1}>
                    © HDI Rwanda 2020 {t('top_bar:copyright')}
                  </Typography>
                </Typography>
              </Box>
            </Item>
          </ColumnToRow>
        </Container>
      </Box>
    </Box>
  );
});

export default Footer;