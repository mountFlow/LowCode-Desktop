<template>
    <view class="phone" :style="phoneStyle">
        <view class="phone-top">
            <view style="flex: 1"><i class="el-icon-more"></i>&nbsp;无服务</view>
            <view style="flex: 1;text-align: center">{{time}}</view>
            <view style="flex: 1;text-align: right"><i class="el-icon-chat-round"></i></view>
        </view>
        <view class="phone-top-blok">
        </view>
        <draggable group="layouts" :list="list"
                   :options="{
                   }"
                   style="height: calc(100% - 44px);width: 100%"
                   handle=".flex-draggalbe-handle"
        >
            <template v-for="(item,index) in list">
                <component :key="index" :is="item.componentName"
                           :dataIIndex="index + ''"
                           v-bind="item"
                ></component>
            </template>
        </draggable>
    </view>
</template>

<script>
    import draggable from '@/common/js/vuedraggable'
    import basicsMixin from '@/common/js/importBasics'
    import Iflex from '@/components/basics/Iflex'

    export default {
        mixins: [basicsMixin],
        name: 'PhoneFrame',
        data(){
          return {
              dragging: false,
              phoneStyle:{
                  fontSize: '32px'
              },
              time: ''
          }
        },
        created(){
            this.startTime()
        },
        methods:{
            getTime(){
                let now = new Date()
                let h = now.getHours();h = h < 10 ? ('0'+ h) : h
                let m = now.getMinutes();m = m < 10 ? ('0' + m ) : m
                this.time = h + ':' + m
            },
            startTime(){
                this.getTime()
                setInterval(()=>{
                    this.getTime()
                },30000)
            }
        },
        computed:{
          list:{
            get() {
                return this.$store.state.list
            },
            set(value){
                this.$store.commit('setGlobalList',{list:value})
            }
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
        background-color: white;
        position: relative;
        transform: scale(.4,.4);
        margin-top: -55%;
        overflow: scroll;
    }

    .sortable-fallback{
        display: none;
    }

    .phone-top{
        height: 44px;
        width: 100%;
        background-color: black;
        display: flex;
        align-items: center;
        color: #aeb1b7;
        justify-content: space-between;
        font-size: calc(10px / 0.4);
        padding: 0 calc(6px / 0.4);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;

        i {
            color: rgb(174, 177, 183);
            font-weight: 600;
        }
    }
    .phone-top-blok{
        height: 44px;
        width: 100%;
    }
</style>
