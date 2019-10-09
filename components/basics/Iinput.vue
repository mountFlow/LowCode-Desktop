<template>
    <input type="text" class="i-input" placeholder="input" v-bind="propsValue"/>
</template>

<script>
    export default {
        name: 'Iinput',
        props:{
            propsValue: {
                type: Object,
                default: () => {}
            }
        }
    }
</script>

<style scoped>
</style>
