const typeOf = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

const isArr = (value) => typeOf(value) === 'array';
const isFn = (value) => typeOf(value) === 'function';
const isStr = (value) => typeOf(value) === 'string';
const isObj = (value) => typeOf(value) === 'object';
const isNumber = (value) => typeOf(value) === 'number';

const isEmpty = (value) => {
    return isArr(value) ? value.length <= 0 : !value;
}

const getProviderName = (provider) => {
    return provider.constructor.toString().split(' ')[1].replace('AuthProvider', '');
}

export {
    typeOf, isArr, isEmpty, isFn, isObj, isStr, isNumber, getProviderName
}