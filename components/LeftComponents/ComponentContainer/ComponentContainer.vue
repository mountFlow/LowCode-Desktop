<template>
    <view class="content">
        <component :is="componentName">{{name}}</component>
        <view class="title">
            {{name}}
        </view>
    </view>
</template>

<script>
    import basicsMixin from '@/common/importBasics'

    export default {
        mixins: [basicsMixin],
        name: 'ComponentContainer',
        props:{
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
        background-color: silver;
        position: relative;
        border: 2px solid #ccc;
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
