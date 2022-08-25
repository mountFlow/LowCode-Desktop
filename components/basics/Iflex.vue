<template style="height: 100%;"    
            >
    <view style="height: 100%; border: #409eff solid 0.5px;  border-radius:5px;">
        <view class="flex-draggalbe-handle" v-if="showFlexDraggalbeHandle && preview" >
            <!-- 这里的:data-i-index="dataIIndex"用于右键删除-->
            
            <view class="handle-text"
                  v-if="num.length = 1"
                  :data-i-index="dataIIndex"
                  @mousedown="choosLayouts(dataIIndex,$event)">
                  <view  >表单容器</view></view>
            
        </view>

        <!--这里的重复代码不好处理，因为是嵌套，老是报错-->

        <template style="height: 100%;">
            <view class="flex i-flex-r" style="position: relative;height: 100%;"
                  :style="[computedClassToStyle(iClass),computedStyleToStyle(iStyle)]"
                  :class="iClass"
                  :data-i-index="dataIIndex"
            >
                <view class="margin-0 i-flex"
                      :class="[isIFlexClassBorder(num,index0),item.layoutClass]"
                      v-for="(item,index0) in num"
                      :dataIIndex="dataIIndex + '-' +index0"
                >
                    <draggable :group="iflexGroup" :list="item.itemList"
                               :options="{
                                }"
                               @choose="choosComponents"
                               @change="draggableChange"
                               style="height: 100%;"
                               :style="[computedClassToStyle(item.iClass),computedStyleToStyle(item.iStyle)]"
                    >
                        <template v-for="(item2,index) in item.itemList">
                            <component :key="index" :is="item2.componentName"
                                       :dataIIndex="dataIIndex + '-' + index0 + '-' +index"
                                       :data-i-index="dataIIndex + '-' + index0 + '-' +index"
                                       v-bind="item2"
                                       :propsValue = "item2.componentName !== 'Iflex' ? item2.propsValue: undefined"
                                       :style="item2.componentName !== 'Iflex'? [computedClassToStyle(item2.iClass),computedStyleToStyle(item2.iStyle)]:''"
                            >
                            </component>
                        </template>
                    </draggable>
                </view>
            </view>
        </template>
    </view>
</template>

<script>
    import draggable from '@/common/js/vuedraggable'
    import basicsMixin from '@/common/js/importBasics'
    import MyComponentsEntity from '@/components/LeftComponents/ComponentContainer/MyComponents/MyComponentsEntity'

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
                default: ()=>{style="height: 100%;"}
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
            }
        },
        methods:{
            handresize(val){
                let {width,height} = val
                let widthPx = parseInt(width.replace('px',''))
                let heightPx = parseInt(height.replace('px',''))

                let widthUpx = (widthPx / 375) * 750
                let heightUpx = (heightPx / 375) * 750
                if (this.$store.state.currentCheckAttr.item){
                    this.$set(this.$store.state.currentCheckAttr.item.iStyle,'width',widthUpx + 'upx')
                    this.$set(this.$store.state.currentCheckAttr.item.iStyle,'height',heightUpx + 'upx')
                }
            },
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
                let item = this.$store.state.currentCheckAttr.item
                if (item && item.upxSwitch === false) {
                    return styleObje
                }
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
                this.$store.dispatch('setCurrentCheckAttrNameComputed',{index})
                this.$store.commit('setDeleteGroupName',{deleteGroupName:'layouts'})
                this.$store.commit('setIflexGroup',{iflexGroup:'layouts'})
            },
            choosComponents(evt){
                if (!evt.item.firstChild || evt.item.firstChild.className !== 'flex-draggalbe-handle'){
                    let index = evt.item.dataset['iIndex']
                    this.$store.dispatch('setCurrentCheckAttrNameComputed',{index})
                    this.$store.commit('setDeleteGroupName',{deleteGroupName:'components'})
                    this.$store.commit('setIflexGroup',{iflexGroup:'components'})
                }
            },
            /**
             * 会和另一个重复执行2遍，TODO 暂时没想到什么好的解决方法
             * @param e
             */
            draggableChange(e){
                if (e.added){
                    this.addMyComponentsToFolder(e.added)
                }
                this.$store.dispatch('cachesFolder')
            },
            addMyComponentsToFolder(el){
                let {componentName,list} = el.element
                if (componentName === "MyComponentsEntity") {
                    this.$store.dispatch('addCompentsFile',{list,componentName:el.element.name})
                }
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
            draggable,
            MyComponentsEntity
        }
    }
</script>

<style lang="scss">

    .sortable-fallback{
    }
    .one-flex{
        width: 100%;
    }
    .i-flex{
        min-height: 20px;

        &-border-r {
        }
    }
    .handle-text{
        height:20px;
        text-align: center;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        background-color: transparent;
    }
    .flex-draggalbe-handle {
        $handleHeight: 10px;

        cursor: pointer;
        background-color: rgba(64, 158, 255, 100);
        width: 20%;
        border-bottom-left-radius:5px;
        border-bottom-right-radius:5px;
        
        &-top{
            height: $handleHeight;
            width: 100%;
        }
        &-top:hover{
            background-color: #98a8ff;
            border-bottom-left-radius:5px;
            border-bottom-right-radius:5px;
        }

        &-bottom{
            height: $handleHeight;
            display: flex;
            width: 100%;

            &-item{
                border-left: #ead2f7 solid 0.5px;
                border-right: #ead2f7 solid 0.5px;
                border-top: #ead2f7 solid 0.5px;
                background-color: #897c94;

                &-single{
                    border-left: #ead2f7 solid 0.5px;
                    border-right: #ead2f7 solid 0.5px;
                    border-top: #ead2f7 solid 0.5px;
                    background-color: #515894;
                }
                &-single:hover{
                    background-color: #ad9eba;
                }
            }
            &-item:hover{
                background-color: #ad9eba;
            }

        }
    }
    .flex-draggalbe-handle:hover{
        background-color: #98a8ff;
        border-bottom-left-radius:5px;
        border-bottom-right-radius:5px;
    }

    .sortable-fallback{
        display: none;
    }
</style>
