<template>
    <el-row>
        <el-col :span="22" :offset="1" style="">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane v-if="centerValue === 'page'" label="目录" name="four">
                    <right-com-catalog></right-com-catalog>
                </el-tab-pane>
                <el-tab-pane label="props" name="five">
                    <el-form ref="form" label-width="80px" label-position="right">
                        <el-form-item label="组件名称">
                            <el-input :value="currentCompentenName" disabled size="mini"></el-input>
                        </el-form-item>
                        <el-divider><span style="color: #DCDFE6">组件传值</span></el-divider>
                        <props-panel v-model="propsValue"></props-panel>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="属性" name="first">
                        <el-form ref="form" label-width="80px" label-position="right">
                            <el-form-item label="组件名称">
                                <el-input :value="currentCompentenName" disabled size="mini"></el-input>
                            </el-form-item>
                            <el-divider><span style="color: #DCDFE6">属性</span></el-divider>

                            <el-form-item label="设置类" >
                                <el-select multiple style="width: 100%" v-model="iClass"  size="small" placeholder="请选择现有的类">
                                    <el-option :label="item.name"
                                               :value="item.name"
                                               :key="index"
                                               v-for="(item,index) in customClassList">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <style-panel v-show="currentCompentenName !== ''" v-model="iStyle"></style-panel>
                        </el-form>
                </el-tab-pane>
                <el-tab-pane label="自定属性" name="second">
                    <right-com-style-add ></right-com-style-add>
                </el-tab-pane>
                <el-tab-pane label="制定类" name="three">
                    <right-com-class-add></right-com-class-add>
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
    import rightComCatalog from './rightComCatalog'
    import propsPanel from './styleCompentens/propsPanel'

    export default {
        name: 'RightComponents',
        data(){
            return {
                editItemClass: '',
            }
        },
        watch:{
            centerValue(val){
                if (val === 'page'){
                    this.$store.commit('setRightAideTabActiveName',{rightAideTabActiveName:'four'})
                }else {
                    this.$store.commit('setRightAideTabActiveName',{rightAideTabActiveName:'first'})
                }
            }
        },
        methods:{
            handleClick(){

            }
        },
        computed:{
            activeName:{
                get(){
                    return this.$store.state.rightAideTabActiveName
                },
                set(val){
                   this.$store.commit('setRightAideTabActiveName',{rightAideTabActiveName:val})
                }
            },
            centerValue(){
                return this.$store.state.pattern
            },
            propsValue() {
                if (this.$store.state.currentCheckAttr.item){
                    return this.$store.state.currentCheckAttr.item.propsValue
                }
                return undefined
            },
            customClassList(){
                let customClass = this.$store.state.currentCheckAttr.customClass
                let customClassList = []
                Object.keys(customClass).forEach(function(key){
                    customClassList.push({
                        name: key,
                        value: customClass[key]
                    })
                });
                return customClassList
            },
            currentCompentenName(){
                if (this.$store.state.currentCheckAttr.item){
                    return this.$store.state.currentCheckAttr.item.name
                }
                return ''
            },
            iStyle: {
                get(){
                    if (this.$store.state.currentCheckAttr.item){
                        return this.$store.state.currentCheckAttr.item.iStyle
                    }
                    return {}
                },
                set(val){
                    this.$store.commit('setCurrentCheckItemStyle',val)
                }
            },
            iClass: {
                get(){
                    if (this.$store.state.currentCheckAttr.item){
                        return this.$store.state.currentCheckAttr.item.iClass
                    }
                    return []
                },
                set(val){
                    this.$store.commit('setCurrentCheckItemClass',val)
                }
            }
        },
        components:{
            rightComStyleAdd,
            stylePanel,
            rightComClassAdd,
            rightComCatalog,
            propsPanel
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
