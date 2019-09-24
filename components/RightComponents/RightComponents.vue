<template>
    <el-row>
        <el-col :span="22" :offset="1" style="">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="属性" name="first">
                        <el-form ref="form" label-width="80px" label-position="right">
                            <el-form-item label="组件名称">
                                <el-input :value="currentCompentenName" disabled size="mini"></el-input>
                            </el-form-item>
                            <el-divider><span style="color: #DCDFE6">属性</span></el-divider>
                            <style-panel v-show="currentCompentenName !== ''" ></style-panel>
                        </el-form>
                </el-tab-pane>
                <el-tab-pane label="自定属性" name="second">
                    <right-com-style-add></right-com-style-add>
                </el-tab-pane>
                <el-tab-pane label="制定类" name="three">
                    <right-com-class-add></right-com-class-add>
                </el-tab-pane>
                <el-tab-pane label="目录" name="four">
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
    import {dIndex,arrIndex,borderList} from '@/common/js/styleExternalData'
    import rightComStyleAdd from './rightComStyleAdd'
    import stylePanel from './styleCompentens/stylePanel'
    import rightComClassAdd from './rightComClassAdd'

    export default {
        name: 'RightComponents',
        data(){
            return {
                activeName: 'first',
            }
        },
        watch:{
        },
        methods:{
            handleClick(){

            },
        },
        computed:{
            currentCompentenName(){
                if (this.$store.state.currentCheckAttr.item){
                    return this.$store.state.currentCheckAttr.item.name
                }
                return ''
            }
        },
        components:{
            rightComStyleAdd,
            stylePanel,
            rightComClassAdd
        }
    }
</script>

<style scoped lang="scss">
    .text {
        font-size: 14px;
    }

    .attrLine{
        display: flex;
    }

    .el-form-item{
        margin-bottom: 5px;
    }
</style>
