export const apis = {
  getAllMockDataList: '/mock/get-all',
  getProfile: '/profile/get-profile',
  updateImgProfile: '/profile/update-image',
  makeProfilePic: '/profile/set-profile-picture',
  getProfileById: '/profile/get-profile-by-id',
} as const;

export const authApi = {
  sendOtpLogin: '/auth/send-mobile-otp',
  verifyOtpLogin: '/auth/verify-mobile-otp',
  getCaptcha: '/auth/get-captcha',
  login: '/auth/login',
  googleAuthApi: '/auth/google-auth',
  loginWithOtp: '/auth/send-otp-via-mobile',
  loginVerifyOtp: '/auth/verify-otp-and-login',
  register: '/auth/register',
  sendOtpViaEmail: '/auth/send-otp',
  verifyOtp: '/auth/verify-otp',
  resetPassword: '/auth/reset-password',
  getUser: '/user/get-user',
  updateDeviceToken: '/user/update-device-token',
  updateProfileImg: '/user/upload-image-url',
  updateProfile: '/user/update-profile',
  changePassword: '/user/change-password',
} as const;
