<template>
    <view class="cu-form-group">
        <view class="title">日期选择</view>
        <picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
            <view class="picker">
                {{date}}
            </view>
        </picker>
    </view>
</template>

<script>
    export default {
        name: "FromSelectByDate",
        data(){
            return {
                date: '2018-12-25',
            }
        },
        methods:{
            DateChange(e) {
                this.date = e.detail.value
            },
        }
    }
</script>

<style scoped>
    .cu-form-group{
        zoom: .19;
    }
</style>
