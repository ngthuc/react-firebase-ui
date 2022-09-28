const typeOf = (value: any) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

const isArr = (value: any) => typeOf(value) === 'array';
const isFn = (value: any) => typeOf(value) === 'function';
const isStr = (value: any) => typeOf(value) === 'string';
const isObj = (value: any) => typeOf(value) === 'object';
const isNumber = (value: any) => typeOf(value) === 'number';

const isEmpty = (value: any) => {
    return isArr(value) ? value.length <= 0 : !value;
}

enum AUTH_TYPE {
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

export {
    typeOf, isArr, isEmpty, isFn, isObj, isStr, isNumber, AUTH_TYPE
}