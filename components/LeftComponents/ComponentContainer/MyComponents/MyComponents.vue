<template>
    <div>
        <div class="content" v-if="name !== ''" @mouseenter="mouseenter" @mouseleave="mouseleave">
             <i v-show="showDelete" class="el-icon-error" style="position: absolute;right: 10px;top: 10px;font-size: 85px;color: red;opacity: .5;cursor: pointer;z-index: 999" @click="deleteMyComponents"></i>
             <my-components-entity :list="list"></my-components-entity>
        </div>
        <view class="title"  v-if="name !== ''">
            {{name}}
        </view>
        <div class="content-none" v-if="name === ''">
            <i class="el-icon-plus" @click="addMyComponents"></i>
        </div>
    </div>
</template>

<script>
    import MyComponentsEntity from './MyComponentsEntity'

    export default {
        name: "MyComponents",
        props: {
            name: {
                type: String,
                default: ''
            },
            list: {
                type: Array,
                default: ()=>[]
            }
        },
        data(){
            return {
                showDelete: false
            }
        },
        created(){
        },
        methods:{
            mouseenter(){
                this.$store.commit('setComponentPreviewName', {componentPreviewName: 'myComponent'})
                this.$store.commit('setShowComponentPreview', {showComponentPreview: true})
                this.$store.commit('setMyComponentPreviewData', {myComponentPreviewData: this.list})
                this.showDelete = true
            },
            mouseleave(){
                this.$store.commit('setShowComponentPreview', {showComponentPreview: false})
                this.showDelete = false
            },
            deleteMyComponents(){
                this.$store.commit('deleteComponentsListKey',{key:this.name})
            },
            addMyComponents(){
                this.$emit('addMyComponents')
            }
        },
        components:{
            MyComponentsEntity
        }
    }
</script>

<style scoped lang="scss">
    .content{
        height: 275px;
        width: 375px;
        background-color: #ffffff;
        position: relative;
        border: 2px solid #f7f9fa;
        display: flex;
        justify-content: center;
        align-items: center;
        zoom: 0.2;
        overflow: hidden;
    }

    .title{
        height: 100px;
        width: 100%;
        background-color: white;
        border: 10px solid #f7f9fa;
        border-top: none;
        color: #cccccc;
        font-size: 70px;
        line-height: 100px;
        zoom: 0.2;
    }

    .content-none{
        height: 55px;
        width: 75px;
        background-color: #ffffff;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        i {
            font-size: 40px;
            color: #a8a8a8;
            font-weight: 600;
        }
    }
</style>
