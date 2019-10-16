<template>
    <textarea auto-height v-bind="propsValue"/>
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        name: 'Itextarea',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                default: () => ([{value: '长文本',key: 'value'}])
            }
        }
    }
</script>

<style scoped>

</style>
