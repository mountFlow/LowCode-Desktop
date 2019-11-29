<template>
    <textarea auto-height v-bind="propsValue" style="" disabled/>
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'
    // TODO 长文本这玩意有bug，无法对文字拖动，只能拖空白处
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
