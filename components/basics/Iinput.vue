<template>
    <div style="width: 80%;display: flex;justify-content: center;margin: 30px; ">
    <div style="width: 40%;margin-top: 10px;">
    {{propsValueMap.test}}
    </div>
    <el-input class="i-input" v-bind="propsValueMap"/>
    </div>
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        name: 'Iinput',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                default: () => [{key:'text',value:'按钮'},
                ]
            },
            
        }
    }
</script>

<style scoped>
    .i-input{

    }
</style>
