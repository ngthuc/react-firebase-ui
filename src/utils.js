function typeOf(value) {
    const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    return {
        value: type,
        isArray() {return type === 'array'},
        isFunction() {return type === 'function'},
        isString() {return type === 'string'},
        isObject() {return type === 'object'},
        isNumber() {return type === 'number'},
        isEmpty() {return type === 'array' ? value.length <= 0 : !value}
    }
}

function getProviderName(provider) {
    return provider.constructor.toString().split(' ')[1].replace('AuthProvider', '');
}

function filterPropKeys(parentField = {}, listKey = []) {
    return Object.keys(parentField).reduce((childField, key) => {
        if (listKey.includes(key)) {
            childField[key] = parentField[key];
        }
        return childField;
    }, {});
}

export {typeOf, getProviderName, filterPropKeys};