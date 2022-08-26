<template>
    <div style="width: 100%;display: flex;justify-content: center;margin-top: 15px;">
      <!--  绑定store中的propsmap，得到其中传过来的参数，同步在组件处显示 -->
    <el-button v-bind="propsValueMap"
            :ref="'Ibutton-' + dataIIndex"
            @mouseup="initComponenSizeStyle('Ibutton-' + dataIIndex)"
    >{{propsValueMap.text}}</el-button>
    </div>
</template>

<script>
         //导入每个组件都必备的方法，增加代码复用
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        //设置自定义组件的名称
        name: 'Ibutton',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                //设置默认的propmap值
                default: () => ([{key:'text',value:'按钮'}])
            }
        }
    }
</script>

<style >
    button{
        /*resize: both;*/
    }
</style>
