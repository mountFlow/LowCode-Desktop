let humpToLine = (str) =>{
    return str.replace(/([A-Z])/g,"-$1").toLowerCase();
}

let iStyleToString = (obj) => {
    let str = '\n\tstyle="'
    let styleContent = ""
    for (let key in obj){
        if (obj[key] !== ''){
            styleContent += ( humpToLine(key) + ':' + obj[key] + ';')
        }
    }
    if (styleContent === ""){
        return ""
    }
    str += styleContent
    str += '"'
    return str
}

let iClassToString = (arr,...builtInClass) => {

    if (arr.length === 0 && builtInClass.length === 0){
        return ""
    }

    let buildtInClassStr = builtInClass.join(' ')
    let str = ` class="${buildtInClassStr}`
    for (let iClass in arr){
        str += (' ' + iClass)
    }
    str += `"`
    return str
}

let getArrClassToMap = (arr,map) => {
    for (let arrItem in arr ){
        map[arrItem] = ""
    }
    return map
}

export {humpToLine,iStyleToString,iClassToString,getArrClassToMap}
