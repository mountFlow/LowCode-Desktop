<template>
    <button v-bind="propsValue"
            :ref="'Ibutton-' + dataIIndex"
            @mouseup="initComponenSizeStyle('Ibutton-' + dataIIndex)"
    >{{propsValue.value}}</button>
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        name: 'Ibutton',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            name:{
                type: String,
                default: '按钮'
            },
            propsValue: {
                type: Object,
                default: () => ({
                    value: '按钮'
                })
            }
        }
    }
</script>

<style >
    button{
        resize: both;
    }
</style>
