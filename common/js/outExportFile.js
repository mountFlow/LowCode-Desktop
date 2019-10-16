import ejs from 'ejs'
import FileSaver     from 'file-saver'
import JSZip from 'jszip'
import {fileTemplates,itemTemplates,fileTemplatesByScript,fileTemplatesByStyle} from 'templates/components'
import COMPONENTS_TEMPLATE from 'templates/componentsTemplate'
import {humpToLine,iStyleToString,iClassToString,getArrClassToMap,formatStrByHtml} from 'common/js/utils'
import PROJECT from 'templates/project'

const VUE_NAME = 'This#is#fileName'

let classMapToString = (map) => {
    let str = '{\n'
    for (let key in  map){
        str += ( '        ' +key + ":" + map[key] + ";\n")
    }
    str += "    }\n"
    return str

}

let propsValueToString = (itemListItem,byDataArr) => {
    let result = ''
    let {id,componentName,propsValue} = itemListItem
    for (let i = 0; i < propsValue.length; i++) {
        let {key,value,defaultValue,toDataOrHtml,type,dataName} = propsValue[i]
        if (defaultValue === value || key === 'text'){
            continue
        }
        if (toDataOrHtml === 'data'){
            result += ':'
            result += key
            if (dataName && dataName !== ''){
                result += `="${dataName}" `
            } else {
                result += `="${componentName + key + id}" `
            }

            if (byDataArr.length > 0){
                id = byDataArr[byDataArr.length - 1 ].id + 1
            }
            byDataArr.push({
                componentsName:componentName,key,value,id,type,dataName
            })
        } else if (toDataOrHtml === 'html'){
            let cacheResult = key
            if (type === 'boolean'){
                cacheResult = ':' + cacheResult
                cacheResult += `="${value}" `
            } else {
                cacheResult += `="${value}" `
            }
            result += cacheResult
        }
    }
    return result
}

let iteratorList = (list,classMap,customClass,myComponentsArr) => {
    let classStr = ""

    if (Object.prototype.toString.call(list) === '[object Array]'){
        for (let item in list){
            let iClass = list[item].iClass
            iClass.forEach(classItem => {
                if(!classMap[classItem] && customClass[classItem]){
                    classMap[classItem] = customClass[classItem]
                    classStr += ('    .' + classItem + " ")
                    classStr += classMapToString(classMap[classItem])
                }
            })

            if (list[item].componentName === 'MyComponentsEntity'){
                myComponentsArr.push(list[item].name)
            }

            if (list[item].componentName === 'Iflex'){
                classStr += iteratorList(list[item].num,classMap,customClass,myComponentsArr)
            } else if (list[item].componentName === undefined) {
                classStr += iteratorList(list[item].itemList,classMap,customClass,myComponentsArr)
            }
        }
    }
    return classStr

}

let beforDisposeListToClassDataString = (list,customClass) => {
    let classMap = {}
    let myComponentsArr = []
    let classStr = iteratorList(list,classMap,customClass,myComponentsArr)
    return {classStr:renderComponentsTemplateByStyle(classStr),myComponentsArr}
}
let beforDisposeListToMyCompentsString = (myComponentsArr) => {
    let importCompentsStr = ""
    let componentsObjStr = "components:{\n"
    myComponentsArr.forEach( e=>{
        importCompentsStr += `import ${e} from '@/components/${e}'\n`
        componentsObjStr += `            ${e},\n`
    })
    componentsObjStr += '        }\n'
    return {importCompentsStr,componentsObjStr}
}

/**
 * 渲染html部分
 * @param itemListItem
 * @param byDataArr
 * @returns {*}
 */
let renderComponentsTemplate = (itemListItem,byDataArr) => {
    // 这是用来查找模板的
    let componentsName = itemListItem.componentName
    // 这是用来渲染模板的
    let componentName = itemListItem.componentName

    // 自定义的组件
    if (componentsName === 'MyComponentsEntity'){
        componentName = itemListItem.name
    }

    let text = ''
    if (COMPONENTS_TEMPLATE[componentsName] === undefined){
        componentsName = 'defaultTemplate2'
        itemListItem.propsValue.forEach(e=>{
            if (e.key === 'text'){
                text = e.value
                componentsName = 'defaultTemplate'
                return
            }
        })
    } else {
        byDataArr.push({
            componentsName,id:itemListItem.id
        })
    }
    let x = ejs.render(COMPONENTS_TEMPLATE[componentsName],{componentName,itemListItem,iStyleToString,iClassToString,propsValueToString,byDataArr,text},{rmWhitespace:true})
    return x
}

/**
 * 渲染data部分
 * @param byDataArr
 */
let renderComponentsTemplateByData = (byDataArr) => {
    let result = ''
    let i = 0
    byDataArr.forEach(e=>{
        i++
        let dataKey = e.componentsName + 'ByData'
        if (COMPONENTS_TEMPLATE[dataKey] !== undefined){
            let x = ejs.render(COMPONENTS_TEMPLATE[dataKey],{id:e.id},{rmWhitespace:false})
            result += x
            result += ','
        } else {
            let {key,value,id,type,componentsName,dataName} = e
            if (i > 1){
                result += '\n                '
            }
            if (dataName && dataName !== ''){
                result += `${dataName}: `
            } else {
                result += `${componentsName + key + id}: `
            }
            switch (type) {
                case 'String':
                    result += `'${value}'`
                    result += ','
                    break
                case 'boolean':
                    result += value
                    result += ','
                    break
                case 'select':
                    result += `'${value}'`
                    result += ','
                    break
            }
        }
    })
    return result
}

let renderComponentsTemplateByScript = (byDataArr,importCompentsStr,componentsObjStr) => {
    let x = ejs.render(fileTemplatesByScript,{renderComponentsTemplateByData,byDataArr,importCompentsStr,componentsObjStr},{rmWhitespace:false})
    return x
}

let renderComponentsTemplateByStyle = (classStr) => {
    let x = ejs.render(fileTemplatesByStyle,{classStr},{rmWhitespace:false})
    return x
}

/**
 * 提供list 导出组件的渲染后的递归模板
 * @param list
 * @param fun
 * @returns {*}
 * @private
 */
let _outExportItem = (list,fun,byDataArr) => {
    let x = ejs.render(itemTemplates,{list,fun,humpToLine,iStyleToString,iClassToString,renderComponentsTemplate,byDataArr},{rmWhitespace:true})
    return x
}

/**
 * 从list 导出组件的渲染后的模板
 * @param list
 * @param customClass
 * @returns {*}
 */
let outExportStr = (list,customClass,fileStyleAndClass) => {
    let byDataArr = [] // 存放模板需要的 data 的值
    let {classData,myComponentsArr} = beforDisposeListToClassDataString(list,customClass)
    let {importCompentsStr,componentsObjStr} = beforDisposeListToMyCompentsString(myComponentsArr)
    let x = ejs.render(fileTemplates,{list,
        importCompentsStr,
        componentsObjStr,
        fileStyleAndClass,
        fun:_outExportItem,
        humpToLine,
        iStyleToString,
        iClassToString,
        classData,
        renderComponentsTemplate,
        byDataArr,
        renderComponentsTemplateByScript},{rmWhitespace:true},)

    x = formatStrByHtml(x)
    return x
}

/**
 * 提供单文件下载
 * @param fileName
 * @param str
 */
let outExportFileByStr = (fileName,str) => {
    str = str.replace(VUE_NAME,fileName.replace('.vue',''))
    let blob = new Blob([str], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, fileName)
}

/**
 * 从list 中提供下载，包含文件夹下的文件
 * @param fileName
 * @param list
 */
let outExportFolder = (fileName,list,customClass,commonFileParam) => {
    let pointer = new JSZip()
    pointer = _outExportFolder(fileName,list,customClass,commonFileParam,pointer)
    pointer.generateAsync({
        type: "blob"
    }).then((blob) => {
        FileSaver.saveAs(blob, `${fileName}.zip`)
    }, (err) => {
        alert('导出失败')
    })
}

let _outExportFolder = (fileName,list,customClass,commonFileParam,pointer) => {

    for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let itemName = item.label
        if (item.type === 'folder'){
            let newPointer = pointer.folder(itemName)
            let folderList = item.children
            if (folderList){
                _outExportFolder(itemName,folderList,customClass,commonFileParam,newPointer)
            }
        } else {
            let fileText = ""
            if (item.isCanDrag === true){
                let {dragList,fileStyleAndClass} = item.dragList
                fileText = outExportStr(dragList,customClass,fileStyleAndClass)
                fileText = fileText.replace(VUE_NAME,itemName.replace('.vue',''))
            } else {
                fileText = outCommonExportFile(item.label,commonFileParam)
            }
            pointer.file(itemName, fileText)

        }
    }
    return pointer
}

let outExportFileByList = (folderName,obj) => {

}

/**
 * 导出默认内容
 * @param fileName
 * @param params
 * @returns {*}
 */
let outCommonExportFile = (fileName,params) => {
    let fileNameKey = fileName.replace('.','').toLowerCase()
    let fileTemplateStr = PROJECT[fileNameKey]
    if (fileTemplateStr) {
        let x = ejs.render(fileTemplateStr,params)
        return x
    }
    return ""
}

export {outExportFileByStr,outExportFileByList,outExportFolder,outExportStr,outCommonExportFile,VUE_NAME}
