import ejs from 'ejs'
import FileSaver     from 'file-saver'
import JSZip from 'jszip'
import {fileTemplates,itemTemplates} from 'templates/components'
import {humpToLine,iStyleToString,iClassToString,getArrClassToMap} from 'common/js/utils'

const VUE_NAME = 'This#is#fileName'

let classMapToString = (map) => {
    let str = '{\n    '
    for (let key in  map){
        str += (key + ":" + map[key] + ";\n")
    }
    str += "}\n"
    return str

}

let iteratorList = (list,classMap,customClass) => {
    let classStr = ""
    if (Object.prototype.toString.call(list) === '[object Array]'){
        for (let item in list){
            let iClass = list[item].iClass
            iClass.forEach(classItem => {
                if(!classMap[classItem] && customClass[classItem]){
                    classMap[classItem] = customClass[classItem]
                    classStr += (classItem + " ")
                    classStr += classMapToString(classMap[classItem])
                }
            })

            if (list[item].componentName === 'Iflex'){
                classStr += iteratorList(list[item].num,classMap,customClass)
            } else if (list[item].componentName === undefined) {
                classStr += iteratorList(list[item].itemList,classMap,customClass)
            }
        }
    }
    return classStr

}

let beforDisposeListToClassDataString = (list,customClass) => {
    let classMap = {}
    let classStr = iteratorList(list,classMap,customClass)
    return classStr
}

let _outExportItem = (list,fun) => {
    let x = ejs.render(itemTemplates,{list,fun,humpToLine,iStyleToString,iClassToString},{rmWhitespace:true})
    return x
}

let outExportStr = (list,customClass) => {
    let classData = beforDisposeListToClassDataString(list,customClass)
    let x = ejs.render(fileTemplates,{list,fun:_outExportItem,humpToLine,iStyleToString,iClassToString,classData},{rmWhitespace:true},)
    return x
}

let outExportFileByStr = (fileName,str) => {

    str = str.replace(VUE_NAME,fileName.replace('.vue',''))
    let blob = new Blob([str], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, fileName)
    // const zip = new JSZip()
    // zip.file(fileName, str)
    // zip.generateAsync({
    //     type: "blob"
    // }).then((blob) => {
    //     FileSaver.saveAs(blob, `test.zip`)
    // }, (err) => {
    //     alert('导出失败')
    // })
}

let outExportFileByList = (fileName,list) => {
    let x = outExportStr(list)
    const zip = new JSZip()
    zip.file(fileName, x)
    zip.generateAsync({
        type: "blob"
    }).then((blob) => {
        FileSaver.saveAs(blob, `test.zip`)
    }, (err) => {
        alert('导出失败')
    })
}

let outExportFolder = (folderName,obj) => {

}

export {outExportFileByStr,outExportFileByList,outExportFolder,outExportStr}
