<template>
    <el-row>
        <el-col :span="24">
            <view style="position: relative;display: flex;justify-content: space-around">
                <ComponentContainer :name="'按钮'" :componentName="'uni-button'"></ComponentContainer>
                <ComponentContainer :name="'输入框'" :componentName="'Iinput'"></ComponentContainer>
                <ComponentContainer :name="'选项'" :componentName="'Iradio'"></ComponentContainer>
            </view>
        </el-col>
    </el-row>
</template>

<script>
    import ComponentContainer from '@/components/LeftComponents/ComponentContainer/ComponentContainer'

    export default {
        name: 'LeftComponents',
        components:{
            ComponentContainer
        }
    }
</script>

<style scoped>

</style>
