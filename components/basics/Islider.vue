<template>
    <slider v-bind="propsValueMap"/>
</template>

<script>
    import commoMethodsByBasicsComponents from "../../common/js/commoMethodsByBasicsComponents";

    export default {
        name: 'Islider',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                default: () => ([{key:'value',value:'60'},{key:'step',value:'1'}])
            }
        }
    }
</script>

<style scoped>

</style>
