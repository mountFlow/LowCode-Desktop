<template>
    <view class="content">
        <draggable group="people" @start="drag=true" @end="drag=false">
            <component :is="componentName">{{name}}</component>
            <input type="text" value="22323"/>
        </draggable>
        <view class="title">
            {{name}}
        </view>
    </view>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
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
            draggable,
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
