<template>
    <view>
        <view class="cu-form-group ">
            <view class="title">开关选择</view>
            <switch style="zoom: 5" @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
        </view>
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
</style>
