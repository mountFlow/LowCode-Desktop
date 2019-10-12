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
                <el-collapse-item name="2" disabled>
                    <template slot="title">
                        <view style="width: 100%;text-align: center">
                            普通组件
                        </view>
                    </template>
                    <draggable :list="list"
                               :clone="cloneComponent"
                               :options="{
                            sort:false
                            }"
                               :group="{ name: 'components', pull: 'clone', put: false}"
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
    import ComponentContainer from '@/components/LeftComponents/ComponentContainer/ComponentContainer'
    import draggable from '@/common/js/vuedraggable'
    import LeftCompoentsByLayouts from './LeftCompoentsByLayouts'
    import MyComponents from './ComponentContainer/MyComponents/MyComponents'

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
              list: [
                  {name:'按钮',id: 0, componentName: 'Ibutton',iStyle:{},iClass: [],propsValue: {}},
                  {name:'输入框',id: 1, componentName: 'Iinput',iStyle:{},iClass: [],propsValue: {value: 'hello',password: true}},
                  {name:'选项',id: 2, componentName: 'Iradio',iStyle:{},iClass: [],propsValue: {}},
                  {name:'图标',id: 3, componentName: 'Iicon',iStyle:{},iClass: [],propsValue: {}},
                  {name:'文本',id: 4, componentName: 'Itext',iStyle:{},iClass: [],propsValue: {text:'文本'}},
                  {name:'进度条',id: 5, componentName: 'Iprogress',iStyle:{},iClass: [],propsValue: {}},
                  {name:'滑动选择',id: 6, componentName: 'Islider',iStyle:{},iClass: [],propsValue: {}},
                  {name:'开关选择',id: 7, componentName: 'Iswitch',iStyle:{},iClass: [],propsValue: {}},
                  {name:'多行输入',id: 8, componentName: 'Itextarea',iStyle:{},iClass: [],propsValue: {value:'这是一段长文本'}},
                  {name:'图像',id: 9, componentName: 'Iimage',iStyle:{},iClass: [],propsValue: {}},
                  // {name:'webView',id: 3, componentName: 'IwebView'},
              ],
              colorUiList: [
                  {name:'轮播图',id: 10, componentName: 'Cswiper',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'图标',id: 11, componentName: 'Cicon',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'按钮',id: 12, componentName: 'Cbutton',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'标签',id: 13, componentName: 'Ctag',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'头像',id: 14, componentName: 'Cavatar',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'进度条',id: 15, componentName: 'Cprogress',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'导航栏',id: 16, componentName: 'Cnav',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'宫格列表',id: 17, componentName: 'ClistGrid',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'菜单列表',id: 18, componentName: 'Clist',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'卡片',id: 19, componentName: 'Ccard',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'时间线',id: 20, componentName: 'Ctimeline',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'步骤条',id: 21, componentName: 'Csteps',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
              ],
              formList: [
                  {name:'输入框',id: 22, componentName: 'FormInput',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'输入框2',id: 23, componentName: 'FormInput2',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'选择框',id: 24, componentName: 'FromSelect',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'时间选择',id: 25, componentName: 'FromSelectByTime',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'日期选择',id: 26, componentName: 'FromSelectByDate',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'开关',id: 27, componentName: 'FromSwitch',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'单选操作',id: 28, componentName: 'FormRadio',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
                  {name:'图片上传',id: 29, componentName: 'FormUpdataImage',iStyle:{},iClass: [],propsValue: {},upxSwitch: false},
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
                let newObj = {...cloneObj}
                compnentGlobalId++
                newObj.id = compnentGlobalId
                newObj.iStyle = {}
                newObj.iClass = []
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
            myComponentsList(){
                let id = 777
                //  {name:'按钮',id: 0, componentName: 'Ibutton',iStyle:{},iClass: [],propsValue: {}},
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
                        propsValue: {},
                        list: filterComponentsList
                    })
                })
                return list
            }
        },
        components:{
            ComponentContainer,
            draggable,
            LeftCompoentsByLayouts,
            MyComponents
        }
    }
</script>

<style>
</style>
