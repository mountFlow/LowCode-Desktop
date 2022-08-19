<template>
    <progress v-bind="propsValueMap"/>
</template>

<script>
    import commoMethodsByBasicsComponents from "../../common/js/commoMethodsByBasicsComponents";

    export default {
        name: 'Iprogress',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                default: () => [{key:'percent',value:'20'},{key:'stroke-width',value:'3'},{key:'show-info',value:'true'}]
            }
        }
    }
</script>

<style scoped>

</style>
