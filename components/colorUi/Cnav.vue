<template>
    <view class="phone-width">
        <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft" style="width: 100%;">
            <view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 10" :key="index" @tap="tabSelect" :data-id="index">
                Tab{{index}}
            </view>
        </scroll-view>
    </view>
</template>

<script>
    export default {
        name: "Cnav",
        data() {
            return {
                TabCur: 0,
                scrollLeft: 0
            };
        },
        methods: {
            tabSelect(e) {
                this.TabCur = e.currentTarget.dataset.id;
                this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
            }
        }
    }
</script>

<style scoped>

</style>
