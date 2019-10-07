<template>
    <view>
        <view class="flex-draggalbe-handle" v-show="showFlexDraggalbeHandle && preview">
            <view class="flex-draggalbe-handle-top" @mousedown="choosLayouts(dataIIndex)"></view>
            <view class="flex-draggalbe-handle-bottom">
                <view class="flex-draggalbe-handle-bottom-item"
                      :class="handleItem.layoutClass"
                      v-for="(handleItem,handleIndex) in num"
                      :key="handleIndex"
                      @mousedown="choosLayouts(dataIIndex + '-' + handleIndex)"
                ></view>
            </view>
        </view>
        <view class="flex i-flex-r" style="position: relative"
              :style="[computedClassToStyle(iClass),computedStyleToStyle(iStyle)]"
              :class="iClass"
              @mouseover="flexDraggalbeHandle(true)"
              @mouseout="flexDraggalbeHandle(false)"
        >
            <view class="margin-0  i-flex"
                  :class="[isIFlexClassBorder(num,index0),item.layoutClass]"
                  v-for="(item,index0) in num"
                  :dataIIndex="dataIIndex + '-' +index0"
            >
                <draggable :group="iflexGroup" :list="item.itemList"
                           :options="{
                            }"
                           @choose="choosComponents"
                           style="height: 100%;width: 100%"
                           :style="[computedClassToStyle(item.iClass),computedStyleToStyle(item.iStyle)]"
                >
                    <template v-for="(item2,index) in item.itemList">
                        <component :key="index" :is="item2.componentName"
                                   :dataIIndex="dataIIndex + '-' + index0 + '-' +index"
                                   :data-i-index="dataIIndex + '-' + index0 + '-' +index"
                                   v-bind="item2"
                                   :style="item2.componentName !== 'Iflex'? [computedClassToStyle(item2.iClass),computedStyleToStyle(item2.iStyle)]:''"
                        >
                        </component>
                    </template>
                </draggable>
            </view>
        </view>
    </view>
</template>

<script>
    import draggable from '@/common/js/vuedraggable'
    import basicsMixin from '@/common/js/importBasics'

    export default {
        mixins: [basicsMixin],
        name: 'Iflex',
        props: {
            dataIIndex:{
                type: String,
                default: '0'
            },
            num: {
                type: Array,
                default: ()=>[]
            },
            iStyle: {
                type: Object,
                default: ()=>{}
            },
            iClass: {
                type: Array,
                default: ()=>[]
            }
        },
        data(){
            return {
                fallbackClass:{
                    zoom: 0.4
                },
                isDraggalbe: false
            }
        },
        methods:{
            isIFlexClassBorder(num,index){
                if (!this.preview){
                    return ''
                }

                if(num.length - 1 === index ){
                    return 'i-flex-border-r'
                }
                return 'i-flex-border'
            },
            computedStyleToStyle(styleObje){
                let styleObjeStr = JSON.stringify(styleObje)
                let regx = /([0-9\.]+)(upx|rpx)/g
                let newStr = styleObjeStr.replace(regx,(a,b,c,d)=>{
                    let bFloat = parseFloat(b)
                    let px = (bFloat / 750) * 375
                    return px + 'px'
                })
                return JSON.parse(newStr)
            },
            computedClassToStyle(classNames){
                let style = {}
                classNames.forEach(e=>{
                    style = {...style,...this.customClass[e]}
                })
                return style
            },
            choosLayouts(index,evt){
                console.log('layouts')
                this.$store.dispatch('setCurrentCheckAttrNameComputed',{index})
                this.$store.commit('setDeleteGroupName',{deleteGroupName:'layouts'})
                this.$store.commit('setIflexGroup',{iflexGroup:'layouts'})
            },
            choosComponents(evt){
                let index = evt.item.dataset['iIndex']
                this.$store.dispatch('setCurrentCheckAttrNameComputed',{index})

                if (evt.item.firstChild.className !== 'flex-draggalbe-handle'){
                    this.$store.commit('setDeleteGroupName',{deleteGroupName:'components'})
                    this.$store.commit('setIflexGroup',{iflexGroup:'components'})
                }

            },
            flexDraggalbeHandle(flag){
                this.isDraggalbe = flag
            },
            dddd(){
                console.log('ddd')
            }
        },
        computed:{
            customClass(){
                return  this.$store.state.currentCheckAttr.customClass
            },
            preview(){
                return this.$store.state.preview
            },
            showFlexDraggalbeHandle(){
                return this.$store.state.showFlexDraggalbeHandle
            },
            iflexGroup(){
                return this.$store.state.iflexGroup
            }
        },
        components:{
            draggable
        }
    }
</script>

<style lang="scss">

    .sortable-fallback{
    }
    .i-flex{
        min-height: 20px;

        &-border {
            border-left: #675e6f solid 0.5px;
            border-bottom: #675e6f solid 0.5px;
        }

        &-border-r {
            border-left: #675e6f solid 0.5px;
            border-right: #675e6f solid 0.5px;
            border-bottom: #675e6f solid 0.5px;
        }
    }

    .flex-draggalbe-handle {
        $handleHeight: 16px;

        cursor: pointer;
        background-color: #675e6f;
        width: 100%;
        height: $handleHeight;

        &-top{
            height: $handleHeight/2;
            width: 100%;
        }
        &-top:hover{
            background-color: #ad9eba;
        }

        &-bottom{
            height: $handleHeight/2;
            display: flex;
            width: 100%;

            &-item{
                border-left: #ead2f7 solid 0.5px;
                border-right: #ead2f7 solid 0.5px;
                border-top: #ead2f7 solid 0.5px;
                background-color: #897c94;
            }
            &-item:hover{
                background-color: #ad9eba;
            }
        }
    }

    .sortable-fallback{
        display: none;
    }
</style>
