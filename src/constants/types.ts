export enum AUTH_TYPE {
    OTHER_AUTH = 0,
    CHECK_RECOVERY_EMAIL,
    EMAIL_AUTH,
    EMAIL_SIGNUP,
    PHONE_AUTH,
    RECOVERY_PASSWORD,
    VERIFY_OTP,
    VERIFY_EMAIL,
    VERIFY_PASSWORD,
    VERIFY_SUCCESS,
    VERIFY_FAILED,
}

export enum PROVIDER_TYPE {
    GOOGLE = 'google.com',
    GITHUB = 'github.com',
    PHONE = 'phone',
    EMAIL = 'password',
    FACEBOOK = 'facebook.com',
    TWITTER = 'twitter.com',
    MICROSOFT = 'microsoft.com',
    APPLE = 'apple.com',
    ZALO = 'zalo.me',
    ANONYMOUS = 'anonymous',
}