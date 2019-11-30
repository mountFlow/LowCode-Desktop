<template>
    <view class="cu-form-group">
        <view class="title">时间选择</view>
        <picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
            <view class="picker">
                {{time}}
            </view>
        </picker>
    </view>
</template>

<script>
    export default {
        name: "FromSelect",
        data(){
            return {
                picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
                index: 0,
                time: '12:01',
            }
        },
        methods: {
            TimeChange(e) {
                this.time = e.detail.value
            },
            PickerChange(e) {
                this.index = e.detail.value
            },
        }
    }
</script>

<style scoped>
    .cu-form-group{
        zoom: .19;
    }
</style>
