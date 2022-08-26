<template>
    <div style="width: 80%;display: flex;justify-content: center;margin-top: 10px;">
    
    <div style="width: 40%;">
    {{propsValueMap.test}}
    </div>
   <el-radio v-model="propsValueMap.radius" label="1">{{propsValueMap.label1}}</el-radio>
      <el-radio v-model="propsValueMap.radius" label="2">{{propsValueMap.label2}}</el-radio>
    </div>
    
</template>

<script>
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        name: 'Iradio',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                default: () => [{key:'v-model',value:'1'},]
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    uni-radio::before, uni-checkbox::before{
        font-size: 16px;
    }
</style>
