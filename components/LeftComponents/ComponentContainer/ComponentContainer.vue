<template>
    <view style="position: relative;">
        <view style="position: absolute;left:0;top: 0;right: 0;bottom: 0;z-index: 10"
              @mouseover="onfocusTip" @mouseout="offfocusTip"  @mousedown="onmousedown"
        ></view>
        <view  v-if="type === 'basics' && componentName.startsWith('I')" class="content">
            <component :is="componentName" :name="name">{{name}}</component>
        </view>
        <view class="title" :class="[componentName.startsWith('I') ? '':'simple-component-name']" v-if="type === 'basics'">
            {{name}}
        </view>
        <view  v-if="type === 'layout'" >
            <view class="flex content-layout">
                <view class="  margin-0 content-layout-item" v-for="(item,index) in num" :class="item.layoutClass">1</view>
            </view>
        </view>
    </view>
</template>

<script>
    import basicsMixin from '@/common/js/importBasics'

    export default {
        mixins: [basicsMixin],
        name: 'ComponentContainer',
        props:{
            num: {
                type: Array,
                default: ()=>[]
            },
            type: {
                type: String,
                default: 'basics'
            },
            componentName:{
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
            }
        },
        methods:{
            onmousedown(){
                // 非基础组件
                if (!this.componentName.startsWith('I')){
                    this.$store.commit('setShowComponentPreview',{showComponentPreview: false})
                }
            },
            offfocusTip(){
                // 非基础组件
                if (!this.componentName.startsWith('I')) {
                    this.$store.commit('setShowComponentPreview', {showComponentPreview: false})
                }
            },
            onfocusTip(){
                // 非基础组件
                if (!this.componentName.startsWith('I')) {
                    this.$store.commit('setComponentPreviewName', {componentPreviewName: this.componentName})
                    this.$store.commit('setShowComponentPreview', {showComponentPreview: true})
                }
            }
        },
        components:{
        }
    }
</script>

<style scoped>
    .content{
        height: 55px;
        width: 75px;
        background-color: #ffffff;
        position: relative;
        border: 2px solid #f7f9fa;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: none;
        overflow: hidden;
    }

    .content-layout{
        width: 100%;
        height: 35px;
        background-color: silver;
        position: relative;
        border: 2px solid #ccc;
    }

    .content-layout-item{
        cursor: move;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 2px;
        background-color: #675e6f;
        color: white;
    }

    .title{
        height: 20px;
        width: 100%;
        background-color: white;
        border: 2px solid #f7f9fa;
        border-top: none;
        color: #cccccc;
        line-height: 20px;
    }

    .tip-content-show{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 225px;
        height: 385px;
        box-shadow: 0px 0px 1px 1px #1a1a1a;
        z-index: 9999;
        background-color: white;
        border: blue solid 2px;
    }
    .tip-content-show-content{
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .simple-component-name{
        width: 75px;
        padding: 10px 0;
        height: auto;
        border-top: 2px solid #f7f9fa;
    }
</style>
