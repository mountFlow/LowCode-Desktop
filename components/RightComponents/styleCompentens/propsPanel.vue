<template>
    <div>
        <el-form-item :label="item" class="i-form-item" :key="index" v-for="(item,index) in objKey">
            <el-input v-if="typeof value[item] !== 'boolean'"
                      style="width: 81%;margin-right: 4%;"
                      type="text"
                      v-model="value[item]"
                      size="mini">
            </el-input>
            <el-select  style="width: 81%;margin-right: 4%;"
                        v-if="typeof value[item] === 'boolean'"
                        v-model="value[item]"  size="mini"
                        placeholder="请选择布尔值">
                <el-option :label="item + ''"
                           :value="item"
                           v-for="item in [true,false]"></el-option>
            </el-select>
            <i @click="deleteProps(item)" class="el-icon-remove" style="font-size: 16px;color: #a8a8a8"></i>
            <!--<el-tooltip class="item" effect="dark" :content="'以 - 作为分割符，比例最大为'" placement="top-start">-->
                <!--<div style="display: inline-block;vertical-align: top;margin-right: 10px">-->
                    <!--<i class="el-icon-question" style="font-size: 16px"></i>-->
                <!--</div>-->
            <!--</el-tooltip>-->
        </el-form-item>

        <el-card class="box-card" v-if="addPropsShow" style="margin-bottom: 20px;">
            <el-form :rules="addPropsFormRules"  :model="addPropsForm"  ref="addPropsForm" label-width="80px" :inline="true">
                <el-form-item label="props-key" prop="key">
                    <el-input v-model="addPropsForm.key"
                              size="mini"></el-input>
                </el-form-item>
                <el-form-item label="值类型" prop="type">
                    <el-select v-model="addPropsForm.type"  size="mini" placeholder="请选择值的输入类型"
                               @change="selectCheck"
                    >
                        <el-option :label="item.label" :value="item.value" v-for="item in selectType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="默认值" prop="type" v-if="addPropsForm.type === 'boolean'">
                    <el-select v-model="addPropsForm.defaultValue"  size="mini" placeholder="请选择默认值">
                        <el-option :label="item + ''" :value="item" v-for="item in [true,false]"></el-option>
                    </el-select>
                </el-form-item>
                <el-card class="box-card" v-if="typeIsSelect" style="margin-bottom: 20px;">
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
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addPropsForm')">添加</el-button>
                    <el-button @click="resetForm('addPropsForm')">重置</el-button>
                    <el-button @click="closeForm">关闭</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <div style="display: flex;justify-content: center">
            <i class="el-icon-circle-plus-outline" style="font-size: 25px;font-weight: 600;color: #a8a8a8;cursor: pointer" @click="addProps"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "propsPanel",
        props: {
            objKey: {
                type: Array,
                default: () => []
            },
            value: {
                type: Object,
                default: () => {}
            }
        },
        data(){
            return {
                showTipAdd: false,
                typeIsSelect: false,
                selectType:[{label: '字符串',value:'text'},
                    {label: '布尔',value:'boolean'},
                ],
                selectKeyValue: [
                    {label:'',value:''}
                ],
                addPropsForm: {
                    key: '',
                    type: '',
                    select: '',
                    defaultValue: false
                },
                addPropsFormRules: {

                },
                addPropsShow: false
            }
        },
        methods: {
            deleteProps(val){
                this.$store.commit('deletePropsValue',{key:val})
            },
            addProps() {
                this.addPropsShow = true
            },
            selectCheck(val){
                if (val === 'select'){
                    this.typeIsSelect = true
                } else {
                    this.typeIsSelect = false
                }
            },
            deleteKeyValue(index){
                this.selectKeyValue.splice(index,1)
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
                    this.selectKeyValue.push({key:'',value:''})
                } else {
                    this.showTipAdd = true
                    setTimeout(()=>{
                        this.showTipAdd = false
                    },800)
                }
            },
            submitForm(ref){
                this.$refs[ref].validate((valid) => {
                    if (valid) {

                        if (this.addPropsForm.type === 'select'){
                            if (this.checkSelectKeyValue()){
                                this.addPropsForm.select = this.selectKeyValue
                            }else {
                                return false
                            }
                        } else if (this.addPropsForm.type === 'boolean'){
                            this.addPropsForm.select = [
                                {label:'真',value:true},
                                {label:'假',value:false}
                            ]
                        } else {
                            this.addPropsForm.defaultValue = ''
                        }
                        console.log(this.addPropsForm)
                        this.$store.commit('addPropsValue',this.addPropsForm)
                        this.resetForm('addPropsForm')
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(ref){
                this.$refs[ref].resetFields();
                this.selectKeyValue= [
                    {label:'',value:''}
                ]
                this.addPropsForm = {key: '',type: ''}
            },
            closeForm(){
                this.addPropsShow = false
            }
        }
    }
</script>

<style scoped>
    .i-form-item {
        width: 75%;
    }

    .i-form-item-tip {

    }

    .form-line {
    }

    .style-json {
    }
</style>
