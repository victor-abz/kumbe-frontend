import uuid from 'uuid/v1';
/**
 *
 * @param {*} accessLevel System users access
 */
export const toUserAccess = accessLevel => {
  switch (Number(accessLevel)) {
    case 1:
      return 'Administrator';
    case 2:
      return 'Modulator';
    case 3:
      return 'Editor';
    default:
      return 'System User';
  }
};
// Local-storaage
export const AUTH_TOKEN = 'auth-token';
export const UPLOADED_FILE_NAME = 'file-name';

// Media file resources
export const audiosPath = `${process.env.REACT_APP_API_URL}/api/res/audios`;
export const profilePicPath = `${process.env.REACT_APP_API_URL}/api/res/profiles`;
export const imagesPath = `${process.env.REACT_APP_API_URL}/api/res/images`;

export const systemLanguages = [
  {
    id: uuid(),
    name: 'English',
    shortName: 'en'
  },
  {
    id: uuid(),
    name: 'Kinyarwanda',
    shortName: 'kin'
  }
];
export const mapSliders = (sliders = []) => {
  let newSliders = [];
  sliders.map(item => {
    const sliderIndex = newSliders.findIndex(
      s => s.uniqueSign === item.uniqueSign
    );
    if (sliderIndex < 0) {
      const texts = sliders
        .filter(el => el.uniqueSign === item.uniqueSign)
        .map(it => ({
          lang: it.language.shortName,
          title: it.title,
          caption: it.caption,
          clickText: it.clickText,
          categoryId: it.categoryId
        }));
      newSliders.push({
        id: item.id,
        position: item.position,
        titleColor: item.titleColor,
        bgColor: item.bgColor,
        captionColor: item.captionColor,
        imageLink: item.imageLink,
        createdAt: item.createdAt,
        uniqueSign: item.uniqueSign,
        textContents: texts
      });
    }
    return null;
  });
  return newSliders;
};
