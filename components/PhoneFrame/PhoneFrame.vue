<template>
    <view class="phone" :style="phoneStyle">
        <draggable group="layouts" :list="list"
                   @change="changeInfo"
                   style="height: 100%;width: 100%"
        >
            <template v-for="(item,index) in list">
                <component :key="index" :is="item.componentName"
                           v-bind="item"
                ></component>
            </template>
        </draggable>
    </view>
</template>

<script>
    import draggable from 'vuedraggable'
    import basicsMixin from '@/common/js/importBasics'
    import Iflex from '@/components/basics/Iflex'

    export default {
        mixins: [basicsMixin],
        name: 'PhoneFrame',
        data(){
          return {
              list:[],
              dragging: false,
              phoneStyle:{
                  fontSize: '32px'
              }
          }
        },
        methods:{
            changeInfo(evt){
                console.log(evt)
            }
        },
        components:{
            draggable,
            Iflex
        }
    }
</script>

<style lang="scss">

    $phoneWidth: 375upx;
    $phoneHeight: 667upx;

    .phone{
        width: $phoneWidth;
        height: $phoneHeight;
        background-color: silver;
        position: relative;
        transform: scale(.4,.4);
        margin-top: -55%;
    }
</style>
