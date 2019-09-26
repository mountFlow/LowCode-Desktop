<template>
    <el-row>
        <el-col :span="24">
            <el-collapse value="2">
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
            </el-collapse>

        </el-col>
    </el-row>
</template>

<script>
    import ComponentContainer from '@/components/LeftComponents/ComponentContainer/ComponentContainer'
    import draggable from '@/common/js/vuedraggable'
    import LeftCompoentsByLayouts from './LeftCompoentsByLayouts'

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
                  {name:'按钮',id: 0, componentName: 'Ibutton',iStyle:{},iClass: []},
                  {name:'输入框',id: 1, componentName: 'Iinput',iStyle:{},iClass: []},
                  {name:'选项',id: 2, componentName: 'Iradio',iStyle:{},iClass: []},
                  {name:'图标',id: 3, componentName: 'Iicon',iStyle:{},iClass: []},
                  {name:'文本',id: 4, componentName: 'Itext',iStyle:{},iClass: []},
                  {name:'进度条',id: 5, componentName: 'Iprogress',iStyle:{},iClass: []},
                  {name:'滑动选择',id: 6, componentName: 'Islider',iStyle:{},iClass: []},
                  {name:'开关选择',id: 7, componentName: 'Iswitch',iStyle:{},iClass: []},
                  {name:'多行输入',id: 8, componentName: 'Itextarea',iStyle:{},iClass: []},
                  {name:'图像',id: 9, componentName: 'Iimage',iStyle:{},iClass: []},
                  // {name:'webView',id: 3, componentName: 'IwebView'},

              ],
          }
        },
        methods:{
            changeInfo(evt){
                this.listNull = []
                console.log(evt)
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
            choosComponents(){
                this.$store.commit('setIflexGroup',{iflexGroup:'components'})
            },
            choosLayouts(){
                this.$store.commit('setIflexGroup',{iflexGroup:'layouts'})
            }
        },
        components:{
            ComponentContainer,
            draggable,
            LeftCompoentsByLayouts
        }
    }
</script>

<style>
</style>
