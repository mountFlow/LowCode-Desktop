<template>
    <div>
        <div class="content" v-if="componentName !== ''">
            {{componentName}}
        </div>
        <div class="content-none" v-if="componentName === ''">
            <i class="el-icon-plus" @click="addMyComponents"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyComponents",
        props: {
            componentName: {
                type: String,
                default: ''
            }
        },
        methods:{
            addMyComponents(){
                this.$emit('addMyComponents')
            }
        }
    }
</script>

<style scoped lang="scss">
    .content{
        height: 55px;
        width: 75px;
        background-color: #ffffff;
        position: relative;
        border: 2px solid #f7f9fa;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content-none{
        height: 55px;
        width: 75px;
        background-color: #ffffff;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
            font-size: 40px;
            color: #a8a8a8;
            font-weight: 600;
        }
    }
</style>
