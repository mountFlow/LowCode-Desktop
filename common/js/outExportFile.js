import ejs from 'ejs'
import FileSaver     from 'file-saver'
import JSZip from 'jszip'
import {fileTemplates,itemTemplates} from 'templates/index'
import {humpToLine,iStyleToString,iClassToString} from 'common/js/utils'

let _outExportItem = (list,fun) => {
    let x = ejs.render(itemTemplates,{list,fun,humpToLine,iStyleToString,iClassToString})
    return x
}

let outExportFile = (fileName,list) => {
    console.log(list)

    let x = ejs.render(fileTemplates,{list,fun:_outExportItem,humpToLine,iStyleToString,iClassToString},{rmWhitespace:true},)
    console.log(x)
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

export {outExportFile,outExportFolder}
