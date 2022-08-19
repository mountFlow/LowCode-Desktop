<template>
    <el-row>
        <el-col :span="24">
            <el-collapse :value="['2','3','4']">
                <el-collapse-item name="1">
                    <template slot="title">
                        <view style="width: 100%;text-align: center">
                            布局组件
                        </view>
                    </template>
                    <left-compoents-by-layouts :layout="layout" :clone="cloneLayout" :choose="choosLayouts"></left-compoents-by-layouts>
                </el-collapse-item>
                <el-collapse-item name="2" >
                    <template slot="title">
                        <view style="width: 100%;text-align: center" >
                            普通组件
                        </view>
                    </template>
                    <draggable :list="list"
                               :clone="cloneComponent"
                               :options="{
                            sort:true
                            }"
                               :group="{ name: 'layouts', pull: 'clone', put: false}"
                               @choose="choosComponents"
                               class="components-class"
                               style="position: relative;display: flex;justify-content: center;flex-wrap: wrap;">
                        <ComponentContainer v-for="item in list"
                                            :key="item.id"
                                            :name="item.name"
                                            :componentName="item.componentName">
                        </ComponentContainer>
                    </draggable>
                </el-collapse-item>
                <el-collapse-item name="4" disabled>
                    <template slot="title">
                        <view style="width: 100%;text-align: center">
                            ColorUI组件
                        </view>
                    </template>
                    <draggable :list="colorUiList"
                               :clone="cloneComponent"
                               :options="{
                            sort:false
                            }"
                               :group="{ name: 'components', pull: 'clone', put: false}"
                               @choose="choosComponents"
                               class="components-class"
                               style="position: relative;display: flex;justify-content: center;flex-wrap: wrap;">
                        <ComponentContainer v-for="item in colorUiList"
                                            :key="item.id"
                                            :name="item.name"
                                            :componentName="item.componentName">
                        </ComponentContainer>
                    </draggable>
                </el-collapse-item>
                <el-collapse-item name="4" disabled>
                    <template slot="title">
                        <view style="width: 100%;text-align: center">
                            表单组件
                        </view>
                    </template>
                    <draggable :list="formList"
                               :clone="cloneComponent"
                               :options="{
                            sort:false
                            }"
                               :group="{ name: 'components', pull: 'clone', put: false}"
                               @choose="choosComponents"
                               class="components-class"
                               style="position: relative;display: flex;justify-content: center;flex-wrap: wrap;">
                        <ComponentContainer v-for="item in formList"
                                            :key="item.id"
                                            :name="item.name"
                                            :componentName="item.componentName">
                        </ComponentContainer>
                    </draggable>
                </el-collapse-item>
                <el-collapse-item name="3" disabled>
                    <template slot="title">
                        <view style="width: 100%;text-align: center">
                            我的组件
                        </view>
                    </template>
                    <draggable :list="myComponentsList"
                               :clone="cloneMyComponent"
                               :options="{
                            sort:false
                            }"
                               :group="{ name: 'components', pull: 'clone', put: false}"
                               @choose="choosComponents"
                               class="components-class"
                               style="position: relative;display: flex;justify-content: center;flex-wrap: wrap;">
                        <my-components v-for="item in myComponentsList"
                                            :key="item.id"
                                            :name="item.name"
                                            :list="item.list"
                                            :componentName="item.componentName">
                        </my-components>
                        <my-components @addMyComponents="addMyComponents">
                        </my-components>
                    </draggable>
                </el-collapse-item>
            </el-collapse>

        </el-col>
    </el-row>
</template>

<script>
    import { VueDraggableNext } from 'vue-draggable-next';
    import store from './store'

    let layoutGlobalId = 100;
    let compnentGlobalId = 100

    export default {
        name: 'LeftComponents',
        data(){
          return {
              dragging: false,
              layout: [
                  {name:'布局 1',id: 0, componentName: 'Iflex',
                      iStyle:{},
                      iClass: [],
                      num: [{
                          iStyle:{},
                          iClass: [],
                          itemList: [],
                          layoutClass:'flex-sub',
                      }]
                  },
                  {name:'布局 2:2',id: 1, componentName: 'Iflex',
                      iStyle:{},
                      iClass: [],
                      num: [{
                          iStyle:{},
                          iClass: [],
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          iClass: [],
                          layoutClass:'flex-sub',
                          itemList: []
                      }]},
                  {name:'布局 3:3:3',id: 2, componentName: 'Iflex',
                      iStyle:{},
                      iClass: [],
                      num: [{
                          iClass: [],
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iClass: [],
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          iClass: [],
                          layoutClass:'flex-sub',
                          itemList: []
                      }]},
                  {name:'布局 1:1:1:1',id: 3, componentName: 'Iflex',
                      iStyle:{},
                      iClass: [],
                      num: [{
                          iClass: [],
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          iClass: [],
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          iClass: [],
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          iClass: [],
                          layoutClass:'flex-sub',
                          itemList: []
                      }]},
                  {name:'布局 1:1:1:1:1',id: 4, componentName: 'Iflex',
                      iStyle:{},
                      iClass: [],
                      num: [{
                          iClass: [],
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iClass: [],
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          iClass: [],
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iClass: [],
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          iClass: [],
                          layoutClass:'flex-sub',
                          itemList: []
                      }]},
              ],
          }
        },
        methods:{
            addMyComponents(){
                this.$store.commit('setPatternComponentslList',{list: []})
                this.$store.commit('setPattern',{pattern: 'component'})
            },
            changeInfo(evt){
                this.listNull = []
            },
            cloneLayout(cloneObj) {
                let newObj = {...cloneObj}
                layoutGlobalId++
                newObj.id = layoutGlobalId
                let nullNum = []
                for (let i = 0; i < newObj.num.length; i++) {
                    let {layoutClass,} = newObj.num[i]
                    nullNum.push({itemList:[],layoutClass,iStyle:{},iClass:[]})
                }
                newObj.iStyle = {}
                newObj.iClass = []
                newObj.num = nullNum
                return newObj
            },
            cloneComponent(cloneObj){
                let newObj = JSON.parse(JSON.stringify(cloneObj))
                compnentGlobalId++
                newObj.id = compnentGlobalId
                return newObj
            },
            cloneMyComponent(cloneObj){
                let newObj = {...cloneObj}
                compnentGlobalId++
                newObj.id = compnentGlobalId
                newObj.iStyle = {}
                newObj.iClass = []
                return newObj
            },
            choosComponents(){
                this.$store.commit('setIflexGroup',{iflexGroup:'components'})
            },
            choosLayouts(){
                this.$store.commit('setIflexGroup',{iflexGroup:'layouts'})
            },
            filterListFun(list){
                let filterListStr = JSON.stringify(list)
                filterListStr =filterListStr.replace(/"Iflex"/g,'"SimpleIflex"')
                return JSON.parse(filterListStr)
            },
        },
        computed:{
            list(){
               return this.$store.state.componentsInfo.list
            },
            colorUiList(){
                return this.$store.state.componentsInfo.colorUiList
            },
            formList(){
                return this.$store.state.componentsInfo.formList
            },
            myComponentsList(){
                let id = 777
                //  {name:'按钮',id: 0, componentName: 'Ibutton',iStyle:{},iClass: [],propsValue: []},
                let list = []
                let componentsList = this.$store.state.patternComponents.componentsList
                Object.keys(componentsList).map((key)=>{
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
        components:{
            draggable: VueDraggableNext
        }
    }
</script>

<style>
</style>
