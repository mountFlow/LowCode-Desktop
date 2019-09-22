<template>
    <view>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="属性" name="first">
                {{currentCompentenName}}<br/>
                {{list}}
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        </el-tabs>
    </view>
</template>

<script>
    export default {
        name: 'RightComponents',
        data(){
            return {
                activeName: 'first'
            }
        },
        methods:{
            handleClick(){

            }
        },
        computed:{
            list(){
                return this.$store.state.list
            },
            currentCompentenName(){
                if (this.$store.state.currentCheckAttr.item){
                    return this.$store.state.currentCheckAttr.item.name
                }
                return ''
            }
        }
    }
</script>

<style scoped>

</style>
