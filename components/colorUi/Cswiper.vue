<template>
    <view>
        <swiper class="screen-swiper xxx"
                :class="dotStyle?'square-dot':'round-dot'"
                :style="styleObj"
                :indicator-dots="true"
                :circular="true"
                :autoplay="true"
                interval="5000"
                duration="500">
            <swiper-item v-for="(item,index) in swiperList" :key="index">
                <image :src="item.url" mode="aspectFill" ></image>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    export default {
        name: "Cswiper",
        props:{
            dotStyle: {
                type: Boolean,
                default: false
            },
            swiperList: {
                type: Array,
                default: () => ([{
                    id: 0,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
                }, {
                    id: 1,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
                }, {
                    id: 2,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
                }, {
                    id: 3,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
                }, {
                    id: 4,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
                }, {
                    id: 5,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
                }, {
                    id: 6,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
                }])
            }
        },
        data(){
            return {
                styleObj: {
                    zoom: 375 / document.body.clientWidth
                }
            }
        },
        created(){
            console.log(document.body.clientWidth)
        }
    }
</script>

<style scoped>
</style>
