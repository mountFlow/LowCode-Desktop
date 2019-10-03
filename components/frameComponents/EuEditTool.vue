<template>
    <div class="tool">
        <template v-if="checkFile && checkFile.isCanDrag === true">
            <div class="tool-item" >
                <el-tooltip class="item" effect="dark" content="把组件托到这里删除" placement="right">
                    <draggable :group="{ name: deleteGroupName}"
                               :options="{
                       }"
                               :sort="false"
                               class="tool-item-icon"
                    >
                        <i class="el-icon-delete-solid" style="font-size: 23px;color: white;"></i>
                    </draggable>
                </el-tooltip>
            </div>
            <div class="tool-item">
                <el-tooltip class="item" effect="dark" content="点击查看uni代码" placement="right">
                    <div class="tool-item-icon" @click="outPort">
                        <i class="el-icon-view" style="font-size: 23px;color: white;"></i>
                    </div>
                </el-tooltip>
            </div>

            <div class="tool-item">
                <el-tooltip class="item" effect="dark" content="创建新项目" placement="right">
                    <div class="tool-item-icon" @click="addProject">
                        <i class="el-icon-circle-plus" style="font-size: 23px;color: white;"></i>
                    </div>
                </el-tooltip>
            </div>

            <div class="tool-item block" style="height: 130px">
                <el-slider
                        v-model="phoneSize"
                        vertical
                        :min="50"
                        :step="5"
                        :max="150"
                        input-size="mini"
                        height="100px">
                </el-slider>
            </div>

        </template>

        <el-dialog title="代码演示" :visible.sync="dialogTableVisible">
            <div>
                <pre class="code">{{showDialogData}}</pre>
                <el-form :inline="true" :model="form" :rules="rule" ref="ruleForm" class="demo-form-inline" style="margin-top: 25px;margin-bottom: 0">
                    <el-form-item label="文件名" prop="fileName">
                        <el-input v-model="form.fileName" disabled placeholder="输入导出文件名">
                            <span slot="suffix">.vue</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('ruleForm')">导出</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

        <el-dialog
                title="创建新项目"
                :visible="addProjectModel"
                width="30%"
                @close="closeProjectModel"
                center>
            <el-form ref="addProjectForm" :model="addProjcetFrom" :rules="addProjcetFromRule" label-width="80px">
                <el-form-item label="项目名称" prop="projectName">
                    <el-input v-model="addProjcetFrom.projectName"></el-input>
                </el-form-item>
                <el-form-item label="项目类型">
                    <el-input v-model="addProjcetFrom.projectType" disabled></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="closeProjectModel">取 消</el-button>
                    <el-button type="primary" @click="yesAddProject('addProjectForm')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
                title="增加文件"
                :visible="addFileModel"
                width="30%"
                @close="closeAddFileModel"
                center>
            <el-form ref="addFileForm" :model="addFileForm" :rules="addFileRule" label-width="80px">
                <el-form-item  label="文件名称" prop="fileName">
                    <el-input :value="addFileForm.fileName.replace('.vue','')" @input="addFileNameInput">
                        <span slot="append" v-if="addFileForm.fileType !== '0'">.vue</span>
                    </el-input>
                </el-form-item>
                <el-form-item label="文件类型" prop="fileType">
                    <el-select v-model="addFileForm.fileType" placeholder="请选择">
                        <el-option
                                v-for="item in addFileTypeSelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-checkbox v-show="addFileForm.fileType === '1'" style="margin-bottom: 20px" v-model="addFileForm.isAddPagePath" label="自动在pages.json中注册" name="type"></el-checkbox>
                <el-form-item>
                    <el-button @click="closeAddFileModel">取 消</el-button>
                    <el-button type="primary" @click="yesAddFile('addFileForm')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import draggable from '@/common/js/vuedraggable'
    import ejs from 'ejs'
    import FileSaver     from 'file-saver'
    import JSZip from 'jszip'
    import {outExportFileByStr,outExportFileByList,outExportFolder,outExportStr,VUE_NAME} from '@/common/js/outExportFile'

    let gloadFolderListId = 999

    export default {
        name: 'EuEditTool',
        data(){
            return {
                form:{
                  fileName: ''
                },
                rule:{
                    fileName:[  { required: true, message: '请输入导出文件名称', trigger: 'blur' },]
                },
                dialogTableVisible: false,
                showDialogData: '',

                addProjcetFrom:{
                    projectName: '',
                    projectType: 'uni-app'
                },
                addProjcetFromRule:{
                    projectName: [{required: true,message: '请输入项目名称'}],
                },

                addFileForm: {
                    fileName: '',
                    fileType: '0',
                    isAddPagePath: false
                },
                addFileRule: {
                    fileName: [{required: true,message: '请输入文件或文件夹名称'}],
                    fileType: [{required: true,message: '请选择文件类型'}],
                },
                addFileTypeSelect: [{
                    value: '0',
                    label: '文件夹'
                },{
                    value: '1',
                    label: '拖拽文件'
                }],
            }
        },
        methods:{
            addFileNameInput(val){
                if (this.addFileForm.fileType !== 'folder'){
                    this.addFileForm.fileName = val + '.vue'
                }
                this.addFileForm.fileName = val
            },
            addProject(){
                this.$store.commit('setAddProjectModel',{addProjectModel: true})
            },
            outPort(){
                // let x = ejs.render(xxx,{list:this.$store.state.list})
                // console.log(x)
                //
                // const zip = new JSZip()
                // let test = zip.folder("test");
                // const fileName = 'test.vue'
                // const fileName2 = 'test2.vue'
                // test.file(fileName, x)
                // zip.file(fileName2, x)
                // zip.generateAsync({
                //     type: "blob"
                // }).then((blob) => {
                //     FileSaver.saveAs(blob, `test.zip`)
                // }, (err) => {
                //     alert('导出失败')
                // })

                this.form.fileName = this.checkFile.label.replace('.vue','')
                let showDialogData = outExportStr(this.checkFile.dragList,this.$store.state.currentCheckAttr.customClass)
                this.showDialogData = showDialogData.replace(VUE_NAME,this.form.fileName)
                this.dialogTableVisible = true
                // outExportFile('a.vue',this.$store.state.list)

            },
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        outExportFileByStr(this.form.fileName + '.vue',this.showDialogData)
                    } else {
                        return false;
                    }
                });
            },
            closeProjectModel(){
                this.$store.commit('setAddProjectModel',{addProjectModel: false})
            },
            closeAddFileModel(){
                this.addFileForm.fileName = ''
                this.addFileForm.fileType = '0'
                this.$store.commit('setAddFileModel',{addFileModel: false})
            },
            yesAddProject(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.commit('addNewProject',{projectName: this.addProjcetFrom.projectName,projectType: this.addProjcetFrom.projectType})
                        this.$store.commit('setCurrentProjcetIndex',{index:this.$store.state.project.list.length - 1})
                        this.closeProjectModel()
                    } else {
                        return false;
                    }
                });

            },
            yesAddFile(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        if (this.$store.state.project.checkFolder){
                            if (!this.$store.state.project.checkFolder.children){
                                this.$set(this.$store.state.project.checkFolder,'children',[])
                            }
                        }else {
                            return false
                        }

                        if (this.addFileForm.fileType === '0'){
                            this.$store.state.project.checkFolder.children.push({
                                id: gloadFolderListId++,
                                type: 'folder',
                                label: this.addFileForm.fileName,
                                isCanDrag: false,  // 是不是可以拖拽编辑不是则就是只提供展示
                                children: []
                            })
                        } else {
                            let fileNode = {
                                id: gloadFolderListId++,
                                type: 'vue-file',
                                label: this.addFileForm.fileName,
                                isCanDrag: true,  // 是不是可以拖拽编辑不是则就是只提供展示
                                dragList: [] // 可编辑list
                            }

                            if (this.addFileForm.isAddPagePath){
                                let {list,currentProjcetIndex} = this.$store.state.project
                                let currenetProject = list[currentProjcetIndex]
                                let currentProjectListData = currenetProject.listData

                                for (let i = 0; i <currentProjectListData.length; i++) {
                                    let item = currentProjectListData[i]
                                    if (item.label === 'pages.json'){
                                        // TODO
                                        return
                                    }
                                }
                            }
                            this.$store.state.project.checkFolder.children.push(fileNode)
                        }

                        this.closeAddFileModel()
                    } else {
                        return false;
                    }
                });
            }
        },
        computed:{
            phoneSize: {
                get(){
                    return this.$store.state.phoneSize
                },
                set(val){
                    let obj = {phoneSize:val}
                    this.$store.commit('setPhoneSize',obj)
                }
            },
            deleteGroupName(){
                return this.$store.state.deleteGroupName
            },
            addProjectModel(){
                return this.$store.state.euEditTool.addProjectModel
            },
            addFileModel(){
                return this.$store.state.euEditTool.addFileModel
            },
            checkFile(){
                if (this.$store.state.project.checkFile){
                    return this.$store.state.project.checkFile
                }
                return {}
            },
        },
        components:{
            draggable
        }
    }
</script>

<style scoped lang="scss">
    .tool{
        $toolWidth: 50px;

        position: absolute;
        left: 10px;
        top: 20px;
        width: $toolWidth;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;

    &-item{
         width: $toolWidth;
         height: $toolWidth;
         display: flex;
         justify-content: center;
         align-items: center;
         cursor: pointer;

        &-icon{
             width: $toolWidth * 0.8;
             height: $toolWidth * 0.8;
             background-color: #ff5b3d;
             display: flex;
             justify-content: center;
             align-items: center;
             border-radius: $toolWidth;
            box-shadow: 0 2px 11px 3px rgba(0, 0, 0, 0.15), 0 0 6px 0px rgba(0, 0, 0, 0.04)
         }
    }
    }

    .code{
        font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
        color: #476582;
        padding: .25rem .5rem;
        margin: 0;
        font-size: 13px;
        background-color: rgba(27,31,35,.05);
        border-radius: 3px;
        user-select: text;
        text-align: left;
    }

</style>
