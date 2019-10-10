<template>
    <view style="position: relative">
        <div style="position: absolute;left: 0;top: 0;right:0;bottom:0;z-index: 99;background-color: transparent"></div>
        <template v-for="(item,index) in list">
            <component :key="index" :is="item.componentName"
                       :dataIIndex="index + ''"
                       v-bind="item"
            ></component>
        </template>
    </view>
</template>

<script>
    import SimpleIflex from './SimpleIflex'

    export default {
        name: "MyComponentsEntity",
        props:{
            list: {
                type: Array,
                default: ()=>[]
            }
        },
        mounted(){
        },
        components:{
            SimpleIflex
        }
    }
</script>

<style scoped>

</style>
