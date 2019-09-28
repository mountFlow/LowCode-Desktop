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
            <el-button size="mini" style="margin-left: 15px" type="danger" @click="addProject">创建项目</el-button>
        </div>
        <el-divider><span style="color: #DCDFE6">目录</span></el-divider>

        <file-panel></file-panel>
    </div>
</template>

<script>
    import FilePanel from '@/components/frameComponents/FilePanel'

    export default {
        name: "rightComCatalog",
        data(){
            return {
            }
        },
        methods:{
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
