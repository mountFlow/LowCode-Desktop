<template>
    <view>
        <view  v-if="type === 'basics'" class="content">
            <component :is="componentName" :name="name">{{name}}</component>
            <view class="title">
                {{name}}
            </view>
        </view>
        <view  v-if="type === 'layout'" >
            <view class="flex content-layout">
                <view class="  margin-0 content-layout-item" v-for="(item,index) in num" :class="item.layoutClass">1</view>
            </view>
        </view>
    </view>
</template>

<script>
    import basicsMixin from '@/common/js/importBasics'

    export default {
        mixins: [basicsMixin],
        name: 'ComponentContainer',
        props:{
            num: {
                type: Array,
                default: ()=>[]
            },
            type: {
                type: String,
                default: 'basics'
            },
            componentName:{
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
            }
        },
        components:{
        }
    }
</script>

<style scoped>
    .content{
        height: 75px;
        width: 75px;
        background-color: #d4d4d4;
        position: relative;
        border: 2px solid #ccc;
    }

    .content-layout{
        width: 100%;
        height: 35px;
        background-color: silver;
        position: relative;
        border: 2px solid #ccc;
    }

    .content-layout-item{
        cursor: move;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 2px;
        background-color: #675e6f;
        color: white;
    }

    .title{
        height: 20px;
        width: 100%;
        background-color: white;
        position: absolute;
        opacity: .4;
        bottom: 0;
    }
</style>
