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
                               style="position: relative;display: flex;justify-content: center;flex-wrap: wrap">
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
                      iStyle:{
                      },
                      num: [{
                          iStyle:{},
                          itemList: [],
                          layoutClass:'flex-sub',
                      }]
                  },
                  {name:'布局 2:2',id: 1, componentName: 'Iflex',
                      iStyle:{},
                      num: [{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      }]},
                  {name:'布局 3:3:3',id: 2, componentName: 'Iflex',
                      iStyle:{},
                      num: [{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      }]},
                  {name:'布局 1:1:1:1',id: 3, componentName: 'Iflex',
                      iStyle:{},
                      num: [{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      }]},
                  {name:'布局 1:1:1:1:1',id: 4, componentName: 'Iflex',
                      iStyle:{},
                      num: [{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      },{
                          iStyle:{},
                          layoutClass:'flex-sub',
                          itemList: []
                      }]},
              ],
              list: [
                  {name:'按钮',id: 0, componentName: 'Ibutton',iStyle:{}},
                  {name:'输入框',id: 1, componentName: 'Iinput',iStyle:{}},
                  {name:'选项',id: 2, componentName: 'Iradio',iStyle:{}},
                  {name:'图标',id: 3, componentName: 'Iicon',iStyle:{}},
                  {name:'文本',id: 4, componentName: 'Itext',iStyle:{}},
                  {name:'进度条',id: 5, componentName: 'Iprogress',iStyle:{}},
                  {name:'滑动选择',id: 6, componentName: 'Islider',iStyle:{}},
                  {name:'开关选择',id: 7, componentName: 'Iswitch',iStyle:{}},
                  {name:'多行输入',id: 8, componentName: 'Itextarea',iStyle:{}},
                  {name:'图像',id: 9, componentName: 'Iimage',iStyle:{}},
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
                    let {layoutClass,iStyle} = newObj.num[i]
                    nullNum.push({itemList:[],layoutClass,iStyle})
                }
                newObj.iStyle = {}
                newObj.num = nullNum
                return newObj
            },
            cloneComponent(cloneObj){
                let newObj = {...cloneObj}
                compnentGlobalId++
                newObj.id = compnentGlobalId
                newObj.iStyle = {}
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
