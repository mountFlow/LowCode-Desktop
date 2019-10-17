/**
 * 本地存储，存储属性，样式，目录文件组件等
 */
// -------------------基础方法---------------------
let _setLocalStore = (key,data = '') => {
    uni.setStorage({key, data})
}

let _getLocalStore = (key) => {
    return uni.getStorageSync(key)
}

// ------------------------------------------------

let storeKey = {
    FOLDER_LIST: 'FOLDER_LIST_KEY', // 目录Obje，几乎主要的数据都保存在这里
    STYLE_LIST: 'STYLE_LIST_KEY', // 存储已生成的style，当用户在已有的基础上增加style时覆盖系统原有的数据
    CLASS_LIST: 'CLASS_LIST_KEY', // 存储用户生成的class数据
    COMPONENT_DATA: 'COMPONENT_DATA_KEY', // 存储自定义的组件
    BASICS_COMPONENT_DATA: 'BASICS_COMPONENT_DATA_KEY', // 存储自带组件的数据
}

/**
 * 存储或刷新系统项目数据
 * @param data
 */
let cachesFolder = (data) => {
    let dataStr = JSON.stringify(data)
    _setLocalStore(storeKey.FOLDER_LIST , dataStr)
}

/**
 * 返回缓存中的系统项目数据
 */
let getCachesFolder = () => {
    let result = _getLocalStore(storeKey.FOLDER_LIST )
    if (result && result !== ''){
        return JSON.parse(result)
    }
    return []
}

let cachesClass = (data) => {
    let dataStr = JSON.stringify(data)
    _setLocalStore(storeKey.CLASS_LIST , dataStr)
}
let getCachesClass = () => {
    let result = _getLocalStore(storeKey.CLASS_LIST )
    if (result && result !== ''){
        return JSON.parse(result)
    }
    return {}
}

let cachesStyle = (data) => {
    let dataStr = JSON.stringify(data)
    _setLocalStore(storeKey.STYLE_LIST , dataStr)
}
let getCachesStyle = () => {
    let result = _getLocalStore(storeKey.STYLE_LIST )
    if (result && result !== ''){
        return JSON.parse(result)
    }
    return undefined
}

let cachesPatternComponents = (data) => {
    let dataStr = JSON.stringify(data)
    _setLocalStore(storeKey.COMPONENT_DATA , dataStr)
}
let getCachesPatternComponents = () => {
    let result = _getLocalStore(storeKey.COMPONENT_DATA )
    if (result && result !== ''){
        return JSON.parse(result)
    }
    return {}
}

let cachesComponentsInfo = (data) => {
    let dataStr = JSON.stringify(data)
    _setLocalStore(storeKey.BASICS_COMPONENT_DATA , dataStr)
}
let getCachesComponentsInfo = () => {
    let result = _getLocalStore(storeKey.BASICS_COMPONENT_DATA )
    if (result && result !== ''){
        return JSON.parse(result)
    }
    return undefined
}

export {storeKey,
    cachesFolder,
    getCachesFolder,
    getCachesClass,
    cachesClass,
    cachesStyle,
    getCachesStyle,
    getCachesPatternComponents,
    cachesPatternComponents,
    cachesComponentsInfo,
    getCachesComponentsInfo}
