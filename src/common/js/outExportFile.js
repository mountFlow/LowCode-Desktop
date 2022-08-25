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
        if (map[key] && map[key] !== ''){
            let val = map[key]
            if (val === '0upx' || val === '0px'){
                val = '0'
            }
            str += ( '        ' + humpToLine(key) + ": " + val + ";\n")
        }
    }
    str += "    }\n"
    return str

}

/**
 * 将props（指的是标签中的自定义数据） 中的数据转化为字符串
 * @param itemListItem
 * @param byDataArr
 * @returns {string}
 */
let propsValueToString = (itemListItem,byDataArr) => {
    let result = ''
    let {id,componentName,propsValue} = itemListItem
    for (let i = 0; i < propsValue.length; i++) {
        let {key,value,defaultValue,toDataOrHtml,type,dataName} = propsValue[i]
        if (defaultValue === value || key === 'text'){
            continue
        }
        if (toDataOrHtml === 'data'){
            result += ' :'
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
                cacheResult += `="${value}"`
            } else {
                cacheResult += `="${value}"`
            }
            result += ' '
            result += cacheResult
        }
    }
    return result
}

/**
 * 从数据里面提取出引用到的类，用于在style标签生成，并找出自定义生成的组件
 * @param list 数据
 * @param classMap 存放class的键值对
 * @param customClass 全局保存的class
 * @param myComponentsMap 存放找到的组件是，用户自定义生成的组件
 * @returns {string}
 */
let iteratorList = (list,classMap,customClass,myComponentsMap) => {
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
                myComponentsMap[list[item].name] = 1
            }

            if (list[item].componentName === 'Iflex'){
                classStr += iteratorList(list[item].num,classMap,customClass,myComponentsMap)
            } else if (list[item].componentName === undefined) {
                classStr += iteratorList(list[item].itemList,classMap,customClass,myComponentsMap)
            }
        }
    }
    return classStr

}

let beforDisposeListToClassDataString = (list,customClass,mode) => {
    let classMap = {}
    let myComponentsMap = {}
    let classStr = iteratorList(list,classMap,customClass,myComponentsMap)
    return {classData:renderComponentsTemplateByStyle(classStr,mode),myComponentsMap}
}

/**
 * 用于生成 在vue中components 需要的数据。自定义组件的引入数据
 * @param myComponentsMap 用户自定义生成组件的名字
 * @returns {{importCompentsStr: string, componentsObjStr: string}}
 */
let beforDisposeListToMyCompentsString = (myComponentsMap) => {
    let importCompentsStr = ""
    let componentsObjStr = "components:{\n"
    Object.keys(myComponentsMap).forEach(e=>{
        importCompentsStr += `import ${e} from '@/components/${e}'\n`
        componentsObjStr += `            ${e},\n`
    })
    componentsObjStr += '        }\n'
    return {importCompentsStr,componentsObjStr}
}

/**
 * 渲染html部分
 * @param itemListItem
 * @param byDataArr // 存储 vue 中data部分 的数据
 * @returns {*}
 */
let renderComponentsTemplate = (itemListItem,byDataArr) => {
    // 这是用来查找模板的
    let componentsName = itemListItem.componentName
    // 这是用来渲染模板的
    let componentName = itemListItem.componentName

    // 自定义的组件
    if (componentsName === 'MyComponentsEntity'){
        // .name 是组件中文名。但如果是自定义组件（MyComponentsEntity）。则是组件名
        componentName = humpToLine(itemListItem.name)
    }

    let text = ''
    if (COMPONENTS_TEMPLATE[componentsName] === undefined){
        // 一般的基础组件。则使用默认模板
        componentsName = 'defaultTemplate2'
        itemListItem.propsValue.forEach(e=>{
            // 用是否在标签数据项里面包含‘text’来定义是不是用闭合标签。因为一般text 表示如：<button>text</button>
            if (e.key === 'text'){
                text = e.value
                componentsName = 'defaultTemplate'
                return
            }
        })
    } else {
        // 组件的内容是否是被提前定义了的，如果是的话，直接引用已定义的模板数据，一般用于第三方组件。如ColorUI的组件
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
    let lineFeed = false
    byDataArr.forEach(e=>{
        if (lineFeed){
            result += '\n                '
        }
        let dataKey = e.componentsName + 'ByData'
        // 如果有提前定义
        if (COMPONENTS_TEMPLATE[dataKey] !== undefined){
            let x = ejs.render(COMPONENTS_TEMPLATE[dataKey],{id:e.id},{rmWhitespace:false})
            if(x !== ''){
                result += x
                result += ','
                lineFeed = true
            }
        } else {
            let {key,value,id,type,componentsName,dataName} = e
            if (dataName && dataName !== ''){
                result += `${dataName}: `
                lineFeed = true
            } else if (key){
                result += `${componentsName + key + id}: `
                lineFeed = true
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

/**
 * 生成style标签的内容，元素中需要的类
 * @param classStr
 * @param mode 模式：页面，组件
 * @returns {*}
 */
let renderComponentsTemplateByStyle = (classStr,mode) => {
    let x = ejs.render(fileTemplatesByStyle,{classStr,mode},{rmWhitespace:false})
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
 * @param customClass 全局存放的类
 * @param fileStyleAndClass 页面的样式和类
 * @param mode 组件模式或页面模式
 * @returns {*}
 */
let outExportStr = (list,customClass,fileStyleAndClass,mode = 'page') => {
    let byDataArr = [] // 存放模板需要的 data 的值
    let {classData,myComponentsMap} = beforDisposeListToClassDataString(list,customClass,mode)
    let {importCompentsStr,componentsObjStr} = beforDisposeListToMyCompentsString(myComponentsMap)
    let x = ejs.render(fileTemplates,{list,
        mode, // 页面模式 or 组件模式
        importCompentsStr, // import的内容
        componentsObjStr, // components的内容
        fileStyleAndClass, // 一个对象，存储iClass和iStyle
        fun:_outExportItem, // 递归操作的方法，用于被模板调用
        humpToLine, // 名字驼峰转加横杆
        iStyleToString, // iStyle转化为字符串方法
        iClassToString, // Class转化为字符串方法
        classData, // <style>标签内的内容
        renderComponentsTemplate, // 用于渲染处组件部分的方法
        byDataArr, // 存放模板需要的 data 的值
        renderComponentsTemplateByScript // 渲染<script>标签的内容
    },{rmWhitespace:true},)

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
                let {dragList,fileStyleAndClass} = item
                let mode = 'page'
                if (!fileStyleAndClass){
                    fileStyleAndClass = {}
                    mode = 'component'
                }
                fileText = outExportStr(dragList,customClass,fileStyleAndClass,mode)
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
