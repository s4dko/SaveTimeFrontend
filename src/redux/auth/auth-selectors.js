export const getIsAuthenticated = state => state.auth.isAuthorized;
export const getIsSignup = state => state.auth.isSignup;

export const getUserEmail = state => state.auth.user.email;
export const getUserAvatar = state => state.auth.user.avatar;
export const getUserTrelloKey = state => state.auth.user.trelloKey;
export const getUserTrelloToken = state => state.auth.user.trelloToken;
export const getUserTrelloBoardId = state => state.auth.user.trelloBoardId;
export const getLoadingUser = state => state.auth.loading;

export const getErrorSignup = state => state.auth.errorSignup;
export const getErrorLogin = state => state.auth.errorLogin;

export const getError = state => state.auth.error;

export const getStatusLoadingUser = state => state.auth.isLoadingUser;
