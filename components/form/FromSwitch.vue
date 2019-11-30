<template>
    <view class="cu-form-group ">
        <view class="title">开关选择</view>
        <switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
    </view>
</template>

<script>
    export default {
        name: "FromSwitch",
        data(){
            return {
                switchA: false,
            }
        },
        methods:{
            SwitchA(e) {
                this.switchA = e.detail.value
            },
        }
    }
</script>

<style scoped>
    .cu-form-group{
        zoom: .19;
    }

    switch{
        zoom: 5;
    }
</style>
