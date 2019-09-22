<template>
    <view class="tool">
        <view class="tool-item">
            <draggable :group="{ name: deleteGroupName}"
                       :options="{
                       }"
                       :sort="false"
                       class="tool-item-icon"
            >
                <i class="el-icon-delete-solid" style="font-size: 23px;color: white;"></i>
            </draggable>
        </view>
    </view>
</template>

<script>
    import draggable from '@/common/js/vuedraggable'

    export default {
        name: 'EuEditTool',
        computed:{
            deleteGroupName(){
                return this.$store.state.deleteGroupName
            }
        },
        components:{
            draggable
        }
    }
</script>

<style scoped lang="scss">
    .tool{
        $toolWidth: 50px;

        position: absolute;
        left: 10px;
        top: 20px;
        width: $toolWidth;
        height: 500px;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        border: silver solid 1px;

    &-item{
         width: $toolWidth;
         height: $toolWidth;
         display: flex;
         justify-content: center;
         align-items: center;

    &-icon{
         width: $toolWidth * 0.8;
         height: $toolWidth * 0.8;
         background-color: red;
         display: flex;
         justify-content: center;
         align-items: center;
         border-radius: $toolWidth;
     }
    }
    }
</style>
