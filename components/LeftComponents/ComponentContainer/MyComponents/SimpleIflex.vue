<template>
    <view class="flex i-flex-r" style="position: relative"
          :style="[computedClassToStyle(iClass),computedStyleToStyle(iStyle)]"
          :class="iClass"
    >
        <view class="margin-0  i-flex"
              :class="[item.layoutClass]"
              v-for="(item,index0) in num"
              :style="[computedClassToStyle(item.iClass),computedStyleToStyle(item.iStyle)]"
        >
            <template v-for="(item2,index) in item.itemList">
                <component :key="index" :is="item2.componentName"
                           v-bind="item2"
                           :propsValue = "item2.componentName !== 'Iflex' ? item2.propsValue: undefined"
                           :style="item2.componentName !== 'Iflex'? [computedClassToStyle(item2.iClass),computedStyleToStyle(item2.iStyle)]:''"
                           @handresize="handresize"
                >
                </component>
            </template>
        </view>
    </view>
</template>

<script>
    import basicsMixin from '@/common/js/importBasics'

    export default {
        name: "SimpleIflex",
        mixins: [basicsMixin],
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
            flexDraggalbeHandle(flag){
                this.isDraggalbe = flag
            }
        },
        computed:{
        }
    }
</script>


<style lang="scss">

    .sortable-fallback{
    }
    .i-flex{
        min-height: 20px;
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

