<template>
    <div>
        <div class="add-select-input" style="width: 100%;">
            <label style="color: #aaaaaa;font-size: 14px;margin-right: 10px">选择项目</label>
            <el-select v-model="currentProjcetName" placeholder="请选择" size="mini" style="width: 45%">
                <el-option
                        v-for="item in projectList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-button type="primary" size="mini" style="margin-left: 15px" @click="addProject">创建项目</el-button>
        <el-button size="mini" style="margin-left: 15px" @click="exportProject"><i class="el-icon-upload el-icon--right"></i>导出项目</el-button>
        <el-popover
                placement="top"
                width="160"
                v-model="deleteVisible">
            <p>确定删除该项目？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="deleteVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteProject">确定</el-button>
            </div>
            <el-button slot="reference" size="mini" style="margin-left: 15px" type="danger">删除项目</el-button>
        </el-popover>
        <el-divider><span style="color: #DCDFE6">目录</span></el-divider>

        <file-panel></file-panel>
    </div>
</template>

<script>
    import FilePanel from '@/components/frameComponents/FilePanel'
    import {outExportFolder} from 'common/js/outExportFile'

    export default {
        name: "rightComCatalog",
        data(){
            return {
                deleteVisible: false
            }
        },
        methods:{
            deleteProject(){
                this.$store.dispatch('deleteProject')
                this.deleteVisible = false
            },
            exportProject(){
                let {currentProjcetIndex,list} = this.$store.state.project
                let fileName = list[currentProjcetIndex].projectName
                let folderList = list[currentProjcetIndex].listData
                let customClass = this.$store.state.currentCheckAttr.customClass
                outExportFolder(fileName,folderList,customClass,{projectName:this.currentProjcetName})
            },
            addProject(){
                this.$store.commit('setAddProjectModel',{addProjectModel: true})
            }
        },
        computed:{
            currentProjcetName:{
                get(){
                    let {currentProjcetIndex,list} = this.$store.state.project
                    if (currentProjcetIndex !== ''){
                        return list[currentProjcetIndex].projectName
                    }
                    return ''
                },
                set(value){
                    this.$store.commit('setCurrentProjcetIndex',{index:value})
                }
            },
            projectList(){
                let list = this.$store.state.project.list
                let newList = []
                for (let i = 0; i < list.length; i++) {
                    newList.push({
                        value:i,
                        label: list[i].projectName
                    })
                }
                return newList
            },
        },
        components: {
            FilePanel
        }
    }
</script>

<style scoped lang="scss">
    .add-select-input{
        width: 50%;
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        label {
            width: 100px;
        }
    }
</style>
