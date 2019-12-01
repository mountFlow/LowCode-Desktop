<template>
    <text  v-bind="propsValueMap">{{ propsValueMap.text}}</text>
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        name: 'Itext',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                default: () => ([{key:'text',value:'文本'}])
            }
        }
    }
</script>

<style scoped>

</style>
