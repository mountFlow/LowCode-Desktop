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
        position: relative;
        border: 2px solid #f7f9fa;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: none;
        overflow: hidden;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDkzNzZFN0RDODhFMTFFOEExOUJFNkQ0MTNFM0Q2OTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDkzNzZFN0VDODhFMTFFOEExOUJFNkQ0MTNFM0Q2OTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOTM3NkU3QkM4OEUxMUU4QTE5QkU2RDQxM0UzRDY5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOTM3NkU3Q0M4OEUxMUU4QTE5QkU2RDQxM0UzRDY5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PktroGEAAAAoSURBVHjaYvz06RMDDPDy8sLZTAw4AOkSjP///4dzPn/+TAs7AAIMAG56COJosoI3AAAAAElFTkSuQmCC);
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
