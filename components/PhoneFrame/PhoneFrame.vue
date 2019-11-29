<template>
    <view class="phone-s">
        <view class="phone" :style="phoneSize" ref="contextMenuTarget" >
            <view v-show="showComponentPreview" class="tip-content-show">
                <view class="tip-content-show-content">
                    <template v-if="componentPreviewName !== 'myComponent'">
                        <component :is="componentPreviewName"></component>
                    </template>
                    <template v-if="componentPreviewName === 'myComponent'">
                        <my-components-entity :list="myComponentPreviewData"></my-components-entity>
                    </template>
                </view>
            </view>
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
                       @change="draggableChange"
                       :style="[computedClassToStyle(phoneClass),phoneStyle]"
                       style="position: absolute;top: 25px;bottom: 0;left: 0;right: 0"
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
    import MyComponentsEntity from '../LeftComponents/ComponentContainer/MyComponents/MyComponentsEntity'

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
            checkBackground(){
                alert(1)
            },
            contextMenuVisibleFun(show){
                this.contextMenuVisible = show
            },
            deleteDataIndex(){
                // do delete action
                console.log('deleteDataIndex')
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
            },
            computedClassToStyle(classNames){
                let style = {}
                classNames.forEach(e=>{
                    style = {...style,...this.customClass[e]}
                })
                return style
            },
            /**
             * 会和另一个重复执行2遍，TODO 暂时没想到什么好的解决方法
             * @param e
             */
            draggableChange(e){
                this.$store.dispatch('cachesFolder')
            }
        },
        computed:{
            myComponentPreviewData(){
                return this.$store.state.myComponentPreviewData
            },
            componentPreviewName(){
                return this.$store.state.componentPreviewName
            },
            showComponentPreview(){
                return this.$store.state.showComponentPreview
            },
            customClass(){
                return  this.$store.state.currentCheckAttr.customClass
            },
            phoneClass(){
                switch (this.$store.state.pattern) {
                    case 'page':
                        return this.$store.state.project.checkFile.fileStyleAndClass.iClass
                    default:
                        return []
                }
            },
            phoneSize(){
                let rote = this.$store.state.phoneSize / 100
                return {
                    // zoom: rote,
                    transform: `scale(${rote})`,
                    top: `${this.$store.state.phoneSize - 100}%`
                }
            },
            phoneStyle(){
                switch (this.$store.state.pattern) {
                    case 'page':
                        return this.$store.state.project.checkFile.fileStyleAndClass.iStyle
                    default:
                        return {}
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
            VueContextMenu,
            MyComponentsEntity
        }
    }
</script>

<style lang="scss">

    $phoneWidth: 375px;
    $phoneHeight: 667px;
    $rote: 0.2;

    $windowsWidth: $phoneWidth / 0.2;

    $onePx: $windowsWidth / 750 * 0.2;

    .phone-s{
        width: $phoneWidth;
        height: $phoneHeight;
        position: relative;
        margin-left: auto;
        margin-right: auto;
    }

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
        flex-direction: row;
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
        flex-direction: column;
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



    .tip-content-show{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 375px;
        box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
        z-index: 9999;
        background-color: white;
        border: rgba(169, 169, 173, 0.96) solid 2px;
    }
    .tip-content-show-content{
        width: 100%;
        position: relative;
        overflow: hidden;
    }
</style>
