<template>
    <input type="text" class="i-input" placeholder="input" v-bind="propsValueMap"/>
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        name: 'Iinput',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped>
</style>
