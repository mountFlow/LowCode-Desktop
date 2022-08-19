<template>
    <radio v-bind="propsValueMap"/>
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        name: 'Iradio',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                default: () => [{key:'checked',value:'true'},]
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    uni-radio::before, uni-checkbox::before{
        font-size: 16px;
    }
</style>
