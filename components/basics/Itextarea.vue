<template>
    <textarea auto-height v-bind="propsValue"/>
</template>

<script>
    export default {
        name: 'Itextarea',
        props:{
            propsValue: {
                type: Object,
                default: () => ({
                    value: '长文本'
                })
            }
        }
    }
</script>

<style scoped>

</style>
