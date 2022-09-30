const typeOf = (value: any) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

const isArr = (value: any) => typeOf(value) === 'array';
const isFn = (value: any) => typeOf(value) === 'function';
const isStr = (value: any) => typeOf(value) === 'string';
const isObj = (value: any) => typeOf(value) === 'object';
const isNumber = (value: any) => typeOf(value) === 'number';

const isEmpty = (value: any) => {
    return isArr(value) ? value.length <= 0 : !value;
}

const getProviderName = (provider: any) => {
    return provider.constructor.toString().split(' ')[1].replace('AuthProvider', '');
}

export {
    typeOf, isArr, isEmpty, isFn, isObj, isStr, isNumber, getProviderName
}