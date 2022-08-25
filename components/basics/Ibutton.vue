<template>
    <div style="width: 100%;display: flex;justify-content: center;margin-top: 15px;">
    <el-button v-bind="propsValueMap"
            :ref="'Ibutton-' + dataIIndex"
            @mouseup="initComponenSizeStyle('Ibutton-' + dataIIndex)"
    >{{propsValueMap.text}}</el-button>
    </div>
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        name: 'Ibutton',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
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
