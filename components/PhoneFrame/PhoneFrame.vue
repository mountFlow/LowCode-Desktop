<template>
    <view class="phone" :style="phoneStyle" ref="contextMenuTarget">
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

        <vue-context-menu class="right-menu"
                          :target="contextMenuTarget"
                          :show="contextMenuVisible"
                          @update:show="contextMenuVisibleFun">
            <a href="javascript:" @click="deleteDataIndex">删除</a>
        </vue-context-menu>
    </view>
</template>

<script>
    import draggable from '@/common/js/vuedraggable'
    import basicsMixin from '@/common/js/importBasics'
    import Iflex from '@/components/basics/Iflex'
    import { component as VueContextMenu } from '@xunlei/vue-context-menu'

    export default {
        mixins: [basicsMixin],
        name: 'PhoneFrame',
        props:{
        },
        watch: {
        },
        data(){
          return {
              contextMenuTarget: undefined,
              contextMenuVisible: false,
              dragging: false,
              time: ''
          }
        },
        mounted(){
            this.contextMenuTarget = this.$refs.contextMenuTarget.$el
        },
        created(){
            this.startTime()
        },
        methods:{
            contextMenuVisibleFun(show){
                this.contextMenuVisible = show
            },
            deleteDataIndex(){
                // do delete action
            },
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
            phoneStyle(){
                let rote = this.$store.state.phoneSize / 100
                return {
                    zoom: rote
                }
            },
          /*list:{
            get() {
                return this.$store.state.list
            },
            set(value){
                this.$store.commit('setGlobalList',{list:value})
            }
          }*/
            list:{
                get() {
                    console.log(this.$store.state.project.checkFile)

                    switch (this.$store.state.pattern) {
                        case 'page':
                            return this.$store.state.project.checkFile.dragList
                        case 'component':
                            return this.$store.state.patternComponents.list
                    }
                },
                set(value){
                    switch (this.$store.state.pattern) {
                        case 'page':
                            this.$store.commit('setCheckFileDragList',value)
                            break
                        case 'component':
                            this.$store.commit('setPatternComponentslList',value)
                            break
                    }
                }
            }
        },
        components:{
            draggable,
            Iflex,
            VueContextMenu
        }
    }
</script>

<style lang="scss">

    $phoneWidth: 375px;
    $phoneHeight: 667px;
    $rote: 0.2;

    $windowsWidth: $phoneWidth / 0.2;

    $onePx: $windowsWidth / 750 * 0.2;

    .phone{
        width: $phoneWidth;
        height: $phoneHeight;
        background-color: white;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        overflow: scroll;
    }

    .sortable-fallback{
        display: none;
    }

    .phone-top{
        height: 25px;
        width: 100%;
        background-color: black;
        display: flex;
        align-items: center;
        color: #aeb1b7;
        justify-content: space-between;
        padding: 0 10px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        font-size: 12px;

        i {
            color: rgb(174, 177, 183);
            font-weight: 600;
        }
    }
    .phone-top-blok{
        height: 25px;
        width: 100%;
    }


    a {
        color: #333;
    }
    .right-menu {
        position: fixed;
        background: #fff;
        border: solid 1px rgba(0, 0, 0, .2);
        border-radius: 3px;
        z-index: 999999;
        display: none;
    }
    .right-menu a {
        width: 75px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        display: block;
        color: #1a1a1a;
    }
    .right-menu a:hover {
        background: #eee;
        color: #fff;
    }
    .right-menu {
        border: 1px solid #eee;
        box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
        border-radius: 1px;
    }
    a {
        text-decoration: none;
    }
    .right-menu a {
        padding: 2px;
    }
    .right-menu a:hover {
        background: #42b983;
    }
    path {
        fill: black;
    }
</style>
