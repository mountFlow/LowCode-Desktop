<template>
    <view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
        <view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
            <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
                <view class="cu-tag badge" v-if="item.badge!=0">
                    <block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
                </view>
            </view>
            <text>{{item.name}}</text>
        </view>
    </view>
</template>

<script>
    export default {
        name: "ClistGrid",
        data(){
            return {
                cuIconList: [{
                    cuIcon: 'cardboardfill',
                    color: 'red',
                    badge: 120,
                    name: 'VR'
                }, {
                    cuIcon: 'recordfill',
                    color: 'orange',
                    badge: 1,
                    name: '录像'
                }, {
                    cuIcon: 'picfill',
                    color: 'yellow',
                    badge: 0,
                    name: '图像'
                }, {
                    cuIcon: 'noticefill',
                    color: 'olive',
                    badge: 22,
                    name: '通知'
                }, {
                    cuIcon: 'upstagefill',
                    color: 'cyan',
                    badge: 0,
                    name: '排行榜'
                }, {
                    cuIcon: 'clothesfill',
                    color: 'blue',
                    badge: 0,
                    name: '皮肤'
                }, {
                    cuIcon: 'discoverfill',
                    color: 'purple',
                    badge: 0,
                    name: '发现'
                }, {
                    cuIcon: 'questionfill',
                    color: 'mauve',
                    badge: 0,
                    name: '帮助'
                }, {
                    cuIcon: 'commandfill',
                    color: 'purple',
                    badge: 0,
                    name: '问答'
                }, {
                    cuIcon: 'brandfill',
                    color: 'mauve',
                    badge: 0,
                    name: '版权'
                }],
                gridCol: 3,
                gridBorder: false,
            }
        }
    }
</script>

<style scoped>
    .cu-list{
        zoom: .19;
    }
</style>
