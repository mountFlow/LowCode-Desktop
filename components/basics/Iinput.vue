<template>
    <input class="i-input" v-bind="propsValueMap" />
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        name: 'Iinput',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                default: () => [{key:'placeholder',value:'input'},]
            }
        }
    }
</script>

<style scoped>
    .i-input{

    }
</style>
