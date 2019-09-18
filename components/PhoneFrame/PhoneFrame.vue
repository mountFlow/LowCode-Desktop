<template>
    <view class="phone">
        <draggable group="people" :list="list"
                   @change="changeInfo"
        >
            <template v-for="(item,index) in list">
                <component :key="index" :is="item.componentName">{{item.name}}</component>
            </template>
        </draggable>
        <view>
            {{list}}
        </view>
    </view>
</template>

<script>
    import draggable from 'vuedraggable'
    import basicsMixin from '@/common/importBasics'

    export default {
        mixins: [basicsMixin],
        name: 'PhoneFrame',
        data(){
          return {
              list:[],
              dragging: false
          }
        },
        methods:{
            changeInfo(evt){
                console.log(evt)
            }
        },
        components:{
            draggable
        }
    }
</script>

<style scoped>
    .phone{
        width: 375px;
        height: 667px;
        background-color: silver;
        position: relative;
    }
</style>
