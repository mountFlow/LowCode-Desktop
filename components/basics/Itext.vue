<template>
    <div class="testClass">
    <text  style="width: 80%; text-align:center; margin-right:20px;margin-bottom:10px;" v-bind="propsValueMap" :style="{color:textColor}">{{ propsValueMap.text}}</text>
    </div>
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {

        name: 'Itext',
        mixins: [commoMethodsByBasicsComponents],
        data(){
            return{
                //失败 没有实现
                textColor:propsValueMap.color
            }
            
        },
        props:{
            propsValue: {
                type: Array,
                default: () => ([{key:'text',value:'我是文本'}])
            }
        }
    }
</script>

<style scoped>
    .testClass{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 15px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        color: #302e2e;
        margin: 10px;
    }

</style>
