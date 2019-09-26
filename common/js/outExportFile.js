import ejs from 'ejs'
import FileSaver     from 'file-saver'
import JSZip from 'jszip'
import {fileTemplates} from 'templates/index'

let outExportFile = (fileName,list) => {
    let x = ejs.render(fileTemplates,{list})
    console.log(x)
    /*const zip = new JSZip()
    zip.file(fileName, x)
    zip.generateAsync({
        type: "blob"
    }).then((blob) => {
        FileSaver.saveAs(blob, `test.zip`)
    }, (err) => {
        alert('导出失败')
    })*/
}

let outExportFolder = (folderName,obj) => {

}

export {outExportFile,outExportFolder}
