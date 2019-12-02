<template>
   <view>
       <view class="cu-progress">
           <view class="bg-red" :style="[{ width:loading?'61.8%':''}]">61.8%</view>
       </view>
   </view>
</template>

<script>
    export default {
        name: "Cprogress",
        data(){
            return {
                loading: true
            }
        }
    }
</script>

<style scoped>
    .cu-progress{
        zoom: .2;
        flex-direction: column;
    }
</style>
