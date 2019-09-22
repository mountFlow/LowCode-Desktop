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
                    <draggable :list="layout"
                               :options="{sort:false}"
                               :group="{ name: 'layouts', pull: 'clone', put: false}"
                               :clone="cloneLayout"
                               @choose="choosLayouts"
                               style="position: relative;">
                        <ComponentContainer v-for="item in layout"
                                            :key="item.id"
                                            :name="item.name"
                                            type="layout"
                                            :componentName="item.componentName">
                        </ComponentContainer>
                    </draggable>
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
    let layoutGlobalId = 100;
    let compnentGlobalId = 100

    export default {
        name: 'LeftComponents',
        data(){
          return {
              dragging: false,
              layout: [
                  {name:'布局 1',id: 0, componentName: 'Iflex',
                      num: [{
                              itemList: []
                          }]
                  },
                  {name:'布局 1:1',id: 1, componentName: 'Iflex',
                      num: [{
                          itemList: []
                      },{
                          itemList: []
                      }]},
                  {name:'布局 1:1:1',id: 2, componentName: 'Iflex',
                      num: [{
                          itemList: []
                      },{
                          itemList: []
                      },{
                          itemList: []
                      }]},
                  {name:'布局 1:1:1:1',id: 3, componentName: 'Iflex',
                      num: [{
                          itemList: []
                      },{
                          itemList: []
                      },{
                          itemList: []
                      },{
                          itemList: []
                      }]},
                  {name:'布局 1:1:1:1:1',id: 4, componentName: 'Iflex',
                      num: [{
                          itemList: []
                      },{
                          itemList: []
                      },{
                          itemList: []
                      },{
                          itemList: []
                      },{
                          itemList: []
                      }]},
              ],
              list: [
                  {name:'按钮',id: 0, componentName: 'Ibutton'},
                  {name:'输入框',id: 1, componentName: 'Iinput'},
                  {name:'选项',id: 2, componentName: 'Iradio'},
                  {name:'图标',id: 3, componentName: 'Iicon'},
                  {name:'文本',id: 4, componentName: 'Itext'},
                  {name:'进度条',id: 5, componentName: 'Iprogress'},
                  {name:'滑动选择',id: 6, componentName: 'Islider'},
                  {name:'开关选择',id: 7, componentName: 'Iswitch'},
                  {name:'多行输入',id: 8, componentName: 'Itextarea'},
                  {name:'图像',id: 9, componentName: 'Iimage'},
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
                    nullNum.push({itemList:[]})
                }
                newObj.num = nullNum
                return newObj
            },
            cloneComponent(cloneObj){
                let newObj = {...cloneObj}
                compnentGlobalId++
                newObj.id = compnentGlobalId
                return newObj
            },
            choosComponents(){
                console.log('left-choosComponents')
                this.$store.commit('setIflexGroup',{iflexGroup:'components'})
            },
            choosLayouts(){
                console.log('left-choosLayouts')
                this.$store.commit('setIflexGroup',{iflexGroup:'layouts'})
            }
        },
        components:{
            ComponentContainer,
            draggable
        }
    }
</script>

<style >
</style>
