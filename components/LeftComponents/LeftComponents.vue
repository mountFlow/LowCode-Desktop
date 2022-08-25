<template>
    <div>
        <el-tabs type="border-card" value="tab1">
            <el-tab-pane name="tab1" label="组件库" style="">
                <el-row>
                    <el-col :span="24">
                        <el-collapse :value="['1','2','3','4']" style="margin-right: -20px;">
                            <el-collapse-item name="1"
                                style="margin-left: -20px; margin-top: -20px; margin-right: -40px;width: 100%">
                                <template slot="title">
                                    <view style="margin-left: 25px;width: 100%;font-size: 1.1em;text-align: left">
                                        布局组件
                                    </view>
                                </template>
                                <left-compoents-by-layouts :layout="layout" :clone="cloneLayout" :choose="choosLayouts">
                                </left-compoents-by-layouts>
                            </el-collapse-item>
                            <el-collapse-item name="2"
                                style="margin-left: -20px;  margin-right: -40px;width: 100%">
                                <template slot="title">
                                    <view style="margin-left: 25px;width: 100%;font-size: 1.1em;text-align: left">
                                        普通组件
                                    </view>
                                </template>
                                <draggable :list="list" :clone="cloneComponent" :options="{
                                sort:false
                                }" :group="{ name: 'components', pull: 'clone', put: false}" @choose="choosComponents"
                                           class="components-class"
                                           style="position: relative;display: flex;justify-content: center;flex-wrap: wrap;">
                                           <ComponentContainer v-for="item in list" :key="item.id" :name="item.name" :Icon="item.Icon"
                                               :componentName="item.componentName">
                                           </ComponentContainer>
                                       </draggable>
                            </el-collapse-item>
                            
                            <el-collapse-item name="3"
                                style="margin-left: -20px;  margin-right: -40px;width: 100%">
                                <template slot="title">
                                    <view style="margin-left: 25px;width: 100%;font-size: 1.1em;text-align: left">
                                        高级组件
                                    </view>
                                </template>
                                
                            </el-collapse-item>
                        </el-collapse>

                    </el-col>
                </el-row>

            </el-tab-pane>
            <el-tab-pane name="tab-pane-85618" label="表单模板">
                <draggable :list="myComponentsList" :clone="cloneMyComponent" :options="{
                            sort:false
                            }" :group="{ name: 'components', pull: 'clone', put: false}" @choose="choosComponents"
                    class="components-class"
                    style="position: relative;display: flex;justify-content: center;flex-wrap: wrap;">
                    <my-components v-for="item in myComponentsList" :key="item.id" :name="item.name" :list="item.list"
                        :componentName="item.componentName">
                    </my-components>
                    <my-components @addMyComponents="addMyComponents">
                    </my-components>
                </draggable>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import ComponentContainer from '@/components/LeftComponents/ComponentContainer/ComponentContainer'
    import draggable from '@/common/js/vuedraggable'
    import LeftCompoentsByLayouts from './LeftCompoentsByLayouts'
    import MyComponents from './ComponentContainer/MyComponents/MyComponents'

    let layoutGlobalId = 100;
    let compnentGlobalId = 100

    export default {
        name: 'LeftComponents',
        data() {
            return {
                dragging: false,
                layout: [{
                    name: '布局 1',
                    id: 0,
                    componentName: 'Iflex',
                    iStyle: {},
                    iClass: [],
                    num: [{
                        iStyle: {},
                        iClass: [],
                        itemList: [],
                        layoutClass: 'flex-sub',
                    }]
                }, ],
            }
        },
        methods: {
            addMyComponents() {
                this.$store.commit('setPatternComponentslList', {
                    list: []
                })
                this.$store.commit('setPattern', {
                    pattern: 'component'
                })
            },
            changeInfo(evt) {
                this.listNull = []
            },
            cloneLayout(cloneObj) {
                let newObj = {
                    ...cloneObj
                }
                layoutGlobalId++
                newObj.id = layoutGlobalId
                let nullNum = []
                for (let i = 0; i < newObj.num.length; i++) {
                    let {
                        layoutClass,
                    } = newObj.num[i]
                    nullNum.push({
                        itemList: [],
                        layoutClass,
                        iStyle: {},
                        iClass: []
                    })
                }
                newObj.iStyle = {}
                newObj.iClass = []
                newObj.num = nullNum
                return newObj
            },
            cloneComponent(cloneObj) {
                let newObj = JSON.parse(JSON.stringify(cloneObj))
                compnentGlobalId++
                newObj.id = compnentGlobalId
                return newObj
            },
            cloneMyComponent(cloneObj) {
                let newObj = {
                    ...cloneObj
                }
                compnentGlobalId++
                newObj.id = compnentGlobalId
                newObj.iStyle = {}
                newObj.iClass = []
                return newObj
            },
            choosComponents() {
                this.$store.commit('setIflexGroup', {
                    iflexGroup: 'components'
                })
            },
            choosLayouts() {
                this.$store.commit('setIflexGroup', {
                    iflexGroup: 'layouts'
                })
            },
            filterListFun(list) {
                let filterListStr = JSON.stringify(list)
                filterListStr = filterListStr.replace(/"Iflex"/g, '"SimpleIflex"')
                return JSON.parse(filterListStr)
            },
        },
        computed: {
            list() {
                return this.$store.state.componentsInfo.list
            },
            colorUiList() {
                return this.$store.state.componentsInfo.colorUiList
            },
            formList() {
                return this.$store.state.componentsInfo.formList
            },
            myComponentsList() {
                let id = 777
                //  {name:'按钮',id: 0, componentName: 'Ibutton',iStyle:{},iClass: [],propsValue: []},
                let list = []
                let componentsList = this.$store.state.patternComponents.componentsList
                Object.keys(componentsList).map((key) => {
                    let filterComponentsList = this.filterListFun(componentsList[key])
                    list.push({
                        name: key,
                        id: id++,
                        componentName: 'MyComponentsEntity',
                        iStyle: {},
                        iClass: {},
                        propsValue: [],
                        list: filterComponentsList
                    })
                })
                return list
            }
        },
        components: {
            ComponentContainer,
            draggable,
            LeftCompoentsByLayouts,
            MyComponents
        }
    }
</script>

<style>
</style>
