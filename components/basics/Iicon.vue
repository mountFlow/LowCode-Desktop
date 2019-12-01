<template>
    <icon v-bind="propsValueMap" />
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        mixins: [commoMethodsByBasicsComponents],
        name: 'Iicon',
        props:{
            propsValue: {
                type: Array,
                default: () => [{key:'type',value:'success'},{key:'size',value:'26'}]
            }
        }
    }
</script>

<style scoped>

</style>
