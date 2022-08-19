<template>
    <switch  v-bind="propsValueMap" />
</template>

<script>
    import commoMethodsByBasicsComponents from "../../common/js/commoMethodsByBasicsComponents";

    export default {
        name: 'Iswitch',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                default: () => ([{key:'checked',value:'true'},])
            }
        }
    }
</script>

<style scoped>
    uni-switch::after, uni-switch::before{
        font-size: 16px;
    }
</style>
