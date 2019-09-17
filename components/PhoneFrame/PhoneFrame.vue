<template>
    <view class="phone">
        <draggable group="people" @start="drag=true" @end="drag=false">
`
        </draggable>
    </view>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: 'PhoneFrame',
        components:{
            draggable
        }
    }
</script>

<style scoped>
    .phone{
        width: 375px;
        height: 667px;
        background-color: silver;
        position: relative;
    }
</style>
