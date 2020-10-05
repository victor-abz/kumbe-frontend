export const AUTH_TOKEN = 'auth-token';
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
export const UPLOADED_FILE_NAME = 'file-name';
export const thumbnailsPath = `${process.env.REACT_APP_API_URL}/api/res/thumbnails`;
export const audiosPath = `${process.env.REACT_APP_API_URL}/api/res/audios`;
export const getThumbnail = (thumbnail, type) => {
  const videoThumbnail = thumbnail || 'default-video.jpg';
  const audioThumbnail = thumbnail || 'default-audio.png';
  const thumb = type === 'video' ? videoThumbnail : audioThumbnail;
  return `${thumbnailsPath}/${thumb}`;
};
