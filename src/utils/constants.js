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
      return 'System user';
    default:
      return 'Guest';
  }
};
// Local-storaage
export const AUTH_TOKEN = 'auth-token';
export const UPLOADED_FILE_NAME = 'file-name';

// Media file resources
export const audiosPath = `${process.env.REACT_APP_API_URL}/api/res/audios`;
export const profilePicPath = `${process.env.REACT_APP_API_URL}/api/res/profiles`;
export const imagesPath = `${process.env.REACT_APP_API_URL}/api/res/images`;
