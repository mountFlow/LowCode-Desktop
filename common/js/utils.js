let humpToLine = (str) =>{
    return str.replace(/([A-Z])/g,"-$1").toLowerCase();
}

let iStyleToString = (obj) => {
    let str = ''
    for (let key in obj){
        str += ( humpToLine(key) + ':' + obj[key] + ';')
    }
    return str
}

let iClassToString = (arr) => {
    let str = ''
    for (let iClass in arr){
        str += (' ' + iClass)
    }
    return str
}

export {humpToLine,iStyleToString,iClassToString}
