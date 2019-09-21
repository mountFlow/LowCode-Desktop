<template>
    <view class="flex">
        <view class="flex-sub bg-grey margin-0 radius i-flex" v-for="item in num">
            <draggable group="components" :list="item.itemList"
                       @change="changeInfo"
                       :options="{
                            forceFallback:true,
                       }"
                       style="height: 100%;width: 100%"
            >
                <template v-for="(item2,index) in item.itemList">
                    <component :key="index" :is="item2.componentName"
                               v-bind="item2"
                    ></component>
                </template>
            </draggable>
        </view>
    </view>
</template>

<script>
    import draggable from 'vuedraggable'
    import basicsMixin from '@/common/js/importBasics'

    export default {
        mixins: [basicsMixin],
        name: 'Iflex',
        props: {
            num: {
                type: Array,
                default: ()=>[]
            }
        },
        data(){
            return {
                fallbackClass:{
                    zoom: 0.4
                }
            }
        },
        methods:{
            changeInfo(evt){
                console.log(evt)
            }
        },
        components:{
            draggable
        }
    }
</script>

<style lang="scss">


    .i-flex{
        min-height: 25upx;
    }
</style>
