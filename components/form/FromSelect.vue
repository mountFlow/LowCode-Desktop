<template>
    <view class="cu-form-group">
        <view class="title">普通选择</view>
        <picker @change="PickerChange" :value="index" :range="picker">
            <view class="picker">
                {{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
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
                index: 0
            }
        },
        methods: {
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
