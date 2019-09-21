<template>
    <button>{{name}}</button>
</template>

<script>
    export default {
        name: 'Ibutton',
        props:{
            name:{
                type: String,
                default: '按钮'
            }
        }
    }
</script>

<style >

</style>
