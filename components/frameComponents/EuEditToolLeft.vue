<template>
    <div class="tool">
        <template v-if="(pattern === 'component') || (checkFile && checkFile.isCanDrag === true)">
            <div class="tool-item" >
                <el-tooltip class="item" effect="dark" content="把组件托到这里删除" placement="right">
                    <draggable :group="{ name: deleteGroupName}"
                               :options="{
                                }"
                               :sort="false"
                               class="tool-item-icon"
                               @change="draggableChange"
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
                        :min="100"
                        :step="5"
                        :max="150"
                        input-size="mini"
                        height="100px">
                </el-slider>
            </div>

            <div class="tool-item" v-if="pattern === 'component'">
                <el-tooltip class="item" effect="dark" content="保存组件" placement="right">
                    <div class="tool-item-icon" style="background-color: #00d2dc" @click="saveComponenet">
                        <i class=" el-icon-s-check" style="font-size: 23px;color: white;"></i>
                    </div>
                </el-tooltip>
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
                @close="closeAddFileModel('addFileForm')"
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
                    <el-button @click="closeAddFileModel('addFileForm')">取 消</el-button>
                    <el-button type="primary" @click="yesAddFile('addFileForm')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
                title="保存组件"
                :visible="saveComponentModel"
                width="30%"
                @close="closeComponentsModel"
                center>
            <el-form ref="addComponentsFrom" :model="addComponentsFrom" :rules="addComponentsFromRule" label-width="80px">
                <el-form-item label="组件名称" prop="ComponentName">
                    <el-input v-model="addComponentsFrom.ComponentName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="closeComponentsModel">取 消</el-button>
                    <el-button type="primary" @click="yesAddComponents('addComponentsFrom')">确 定</el-button>
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

    let validateComponentName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入组件名称'));
            } else {
                let regx = /^[a-zA-Z]+$/;
                if (!regx.test(value)){
                    callback(new Error('名称只能由大小写字母组成'));
                }else {
                    callback();
                }
            }
        };

    export default {
        name: 'EuEditTool',
        data(){
            return {
                saveComponentModel: false,
                addComponentsFrom:{
                    ComponentName: ''
                },
                addComponentsFromRule:{
                    ComponentName:[{ validator:validateComponentName ,trigger: 'blur' },]
                },

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
        created(){

        },
        watch:{
            addFileModel(val){
                if(val){
                    this.$refs['addFileForm'].clearValidate()
                }
            }
        },
        methods:{
            yesAddComponents(ref){
                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        let name = this.addComponentsFrom.ComponentName
                        let list = this.$store.state.patternComponents.list
                        if (list.length === 0){
                            this.$notify.error({
                                title: '错误',
                                message: '组件内容为空！'
                            });
                            return false
                        }
                        this.$store.commit('setComponentsList',{name,list})
                        this.$store.commit('setPatternComponentslList',{list:[]})
                        this.closeComponentsModel()
                    } else {
                        return false;
                    }
                });
            },
            closeComponentsModel(){
                this.addComponentsFrom.ComponentName = ''
                this.saveComponentModel = false
            },
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
                let list = []
                let fileStyleAndClass = {}
                let mode = 'page'
                switch (this.$store.state.pattern) {
                    case 'page':
                        list = this.checkFile.dragList
                        this.form.fileName = this.checkFile.label.replace('.vue','')
                        fileStyleAndClass = this.checkFile.fileStyleAndClass
                        break
                    case 'component':
                        list = this.$store.state.patternComponents.list
                        mode = 'component'
                        break
                }

                let showDialogData = outExportStr(list,this.$store.state.currentCheckAttr.customClass,fileStyleAndClass,mode)
                this.showDialogData = showDialogData.replace(VUE_NAME,this.form.fileName)
                this.dialogTableVisible = true
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
            closeAddFileModel(formName = undefined){
                this.addFileForm.fileName = ''
                this.addFileForm.fileType = '0'
                this.addFileForm.isAddPagePath = false
                this.$store.commit('setAddFileModel',{addFileModel: false})
            },
            yesAddProject(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        try {
                            this.$store.commit('addNewProject',{projectName: this.addProjcetFrom.projectName,projectType: this.addProjcetFrom.projectType})
                            this.$store.commit('setCurrentProjcetIndex',{index:this.$store.state.project.list.length - 1})
                            this.closeProjectModel()
                        }catch (e) {
                            this.$notify.error({
                                title: '错误',
                                message: e.msg
                            });
                        }
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
                        let checkFolder = this.$store.state.project.checkFolder
                        let item = this.$store.state.project.checkFolder.children
                        let id = this.$store.state.project.checkFolder.children.length > 0 ? item[item.length - 1].id + 1 : 1
                        // 文件夹类型
                        if (this.addFileForm.fileType === '0'){
                            // 卧槽，我居然直接push ，（值得一提的是，这里因为checkFolder是指针，改变这里会同步改变project的list，省事了）
                            this.$store.state.project.checkFolder.children.push({
                                id,
                                type: 'folder',
                                path: checkFolder.path + '/' + this.addFileForm.fileName,
                                label: this.addFileForm.fileName,
                                isCanDrag: false,  // 是不是可以拖拽编辑不是则就是只提供展示
                                children: []
                            })
                        } else {
                            // 拖拽文件类型
                            let label = this.addFileForm.fileName.replace('.vue','') + '.vue'
                            let fileNode = {
                                id,
                                type: 'vue-file',
                                path: checkFolder.path + '/' + label,
                                label: label,
                                isCanDrag: true,  // 是不是可以拖拽编辑不是则就是只提供展示
                                dragList: [], // 可编辑list
                                fileStyleAndClass: {
                                    iStyle: {},
                                    iClass: []
                                }, // 文件背景样式，本不应该写在外层，应与dragList合为一个对象，但这个后面才想到，改起来有点麻烦
                            }

                            if (this.addFileForm.isAddPagePath){
                                let {list,currentProjcetIndex} = this.$store.state.project
                                let currenetProject = list[currentProjcetIndex]
                                let currentProjectListData = currenetProject.listData

                                for (let i = 0; i <currentProjectListData.length; i++) {
                                    let item = currentProjectListData[i]
                                    if (item.label === 'pages.json'){

                                        if (!item.params['paramByPages']){
                                            item.params['paramByPages'] = [fileNode.path.replace('.vue','')]
                                        }else{
                                            item.params['paramByPages'].push(fileNode.path.replace('.vue',''))
                                        }
                                    }
                                }
                            }
                            this.$store.state.project.checkFolder.children.push(fileNode)
                        }
                        this.$store.dispatch('cachesFolder')
                        this.closeAddFileModel(formName)
                    } else {
                        return false;
                    }
                });
            },
            saveComponenet(){
                this.saveComponentModel = true
            },
            draggableChange(e){
                console.log(e)
                if (e.added){
                    this.delMyComponentsToFolder(e.added)
                }
            },
            delMyComponentsToFolder(el){
                let {componentName} = el.element
                if (componentName === "MyComponentsEntity") {
                    this.$store.dispatch('delCompentsFile',{componentName:el.element.name})
                }
            },
        },
        computed:{
            pattern(){
                return this.$store.state.pattern
            },
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
