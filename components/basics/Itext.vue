<template>
    <text>{{ propsValue.text}}</text>
</template>

<script>
    export default {
        name: 'Itext',
        props:{
            propsValue: {
                type: Object,
                default: () => ({
                    text: '文本'
                })
            }
        }
    }
</script>

<style scoped>

</style>
