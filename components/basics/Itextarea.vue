<template>
    <textarea v-bind="propsValueMap" />
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
                default: () => ([{value: '长文本',key: 'value'},{value: 'true',key:'auto-height'}])
            }
        }
    }
</script>

<style scoped>

</style>
