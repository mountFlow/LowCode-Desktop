<template>
    <div class="tool">

        <div class="tool-item">
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
            <el-tooltip class="item" effect="dark" content="点击导出uni代码" placement="right">
                <div class="tool-item-icon" @click="outPort">
                    <i class="el-icon-upload" style="font-size: 23px;color: white;"></i>
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

        <el-dialog title="代码演示" :visible.sync="dialogTableVisible">
            <div>
                <pre class="code">{{showDialogData}}</pre>
                <el-form :inline="true" :model="form" :rules="rule" ref="ruleForm" class="demo-form-inline" style="margin-top: 25px;margin-bottom: 0">
                    <el-form-item label="文件名" prop="fileName">
                        <el-input v-model="form.fileName" placeholder="输入导出文件名">
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
            <el-form ref="form" :model="addProjcetFrom" :rules="addProjcetFromRule" label-width="80px">
                <el-form-item label="项目名称" prop="projectName">
                    <el-input v-model="addProjcetFrom.projectName"></el-input>
                </el-form-item>
                <el-form-item label="项目类型">
                    <el-input v-model="addProjcetFrom.projectType" disabled></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="closeProjectModel">取 消</el-button>
                    <el-button type="primary" @click="yesAddProject">确 定</el-button>
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
    import {outExportFileByStr,outExportFileByList,outExportFolder,outExportStr} from '@/common/js/outExportFile'

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
                }
            }
        },
        methods:{
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

                this.showDialogData = outExportStr(this.$store.state.list,this.$store.state.currentCheckAttr.customClass)
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
            yesAddProject(){
                this.$store.commit('addNewProject',{projectName: this.addProjcetFrom.projectName,projectType: this.addProjcetFrom.projectType})
                this.$store.commit('setCurrentProjcetIndex',{index:this.$store.state.project.list.length - 1})
                this.closeProjectModel()
            }
        },
        computed:{
            deleteGroupName(){
                return this.$store.state.deleteGroupName
            },
            addProjectModel(){
                return this.$store.state.euEditTool.addProjectModel
            }
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
