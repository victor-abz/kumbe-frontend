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
