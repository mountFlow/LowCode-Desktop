<template>
    <el-card class="box-card" style="margin-bottom: 20px;">
        <div style="display: flex;flex-wrap: wrap;justify-content: center">
            <div style="width: 100%;display: flex;margin-top: 10px;align-items: center" v-for="(item,index) in selectKeyValue">
                <div class="add-select-input" >
                    <label>label</label>
                    <el-input v-model="item.label"
                              size="mini"></el-input>
                </div>
                <div class="add-select-input" >
                    <label>value</label>
                    <el-input v-model="item.value"
                              size="mini"></el-input>
                </div>
                <i class="el-icon-delete" style="margin-left: 5px" @click="deleteKeyValue(index)"></i>
            </div>
            <div style="margin-top: 20px">
                <el-popover
                        placement="top"
                        width="150"
                        v-model="showTipAdd"
                        trigger="manual"
                        content="请填写完整信息再添加">
                    <el-button slot="reference" type="primary" @click="addSelectKeyValue" size="mini">添加</el-button>
                </el-popover>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: 'keyValueSelect',
        props:{
            selectKeyValue:{
                type: Array,
                default: () => []
            }
        },
        data(){
            return {
                showTipAdd: false
            }
        },
        methods:{
            deleteKeyValue(index){
                this.$emit('deleteKeyValue',{index})
            },
            checkSelectKeyValue(){
                for (let i = 0; i < this.selectKeyValue.length; i++) {
                    let item = this.selectKeyValue[i]
                    if (item.label === '' || item.value === ''){
                        return false
                    }
                }
                return true
            },
            addSelectKeyValue(){
                if (this.checkSelectKeyValue()){
                    this.$emit('addSelectKeyValue',{key:'',value:''})
                } else {
                    this.showTipAdd = true
                    setTimeout(()=>{
                        this.showTipAdd = false
                    },800)
                }
            },
        }
    }
</script>

<style scoped>

</style>
