const typeOf = (value: any): {
    value: string,
    isArray(): boolean,
    isFunction(): boolean,
    isString(): boolean,
    isObject(): boolean,
    isNumber(): boolean,
    isEmpty(): boolean,
} => {
    const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    return {
        value: type,
        isArray: () => type === 'array',
        isFunction: () => type === 'function',
        isString: () => type === 'string',
        isObject: () => type === 'object',
        isNumber: () => type === 'number',
        isEmpty: () => type === 'array' ? value.length <= 0 : !value,
    }
}

const getProviderName = (provider: { constructor: { toString: () => string; }; }) => {
    return provider.constructor.toString().split(' ')[1].replace('AuthProvider', '');
}

export {typeOf, getProviderName};