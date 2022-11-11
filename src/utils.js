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

function extractData(input = '', prefix = '', includeKey = [], excludeKey = []) {
    const fromTextToArray = input && input.match(new RegExp("([^?=&]+)(=([^&]*))?", 'g' ) || []);
    return fromTextToArray.length > 0 ? fromTextToArray.reduce((data, item) => {
        const itemArr = item.split('=');
        if (!itemArr[1] || (includeKey.length > 0 && !includeKey.includes(itemArr[0])) || (excludeKey.length > 0 && excludeKey.includes(itemArr[0])) || !itemArr[0].includes(prefix)) return data;
        data[itemArr[0].replace(prefix, '')] = itemArr[1];
        return data;
    }, {}) : {};
}

export {typeOf, getProviderName, filterPropKeys, extractData};