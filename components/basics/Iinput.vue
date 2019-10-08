<template>
    <input type="text" placeholder="input" :value="value"/>
</template>

<script>
    export default {
        name: 'Iinput',
        props:{
            value: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>
