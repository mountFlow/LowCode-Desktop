<template>
    <div>
        <template v-for="(item,index) in value">
            <el-form-item :label="item.label" class="i-form-item" :key="index" >
                <el-input v-if="item.type !== 'boolean' && item.type !== 'select'"
                          style="width: 81%;margin-right: 4%;"
                          type="text"
                          v-model="item.value"
                          size="mini">
                </el-input>
                <el-select  style="width: 81%;margin-right: 4%;"
                            v-if=" item.type === 'select'"
                            v-model="item.value"  size="mini"
                            placeholder="请选择值">
                    <el-option :label="item2.label + ''"
                               :value="item2.value"
                               v-for="item2 in item.select"></el-option>
                </el-select>
                <el-select  style="width: 81%;margin-right: 4%;"
                            v-if="item.type === 'boolean'"
                            v-model="item.value"  size="mini"
                            placeholder="请选择值">
                    <el-option :label="item2.label + ''"
                               :value="item2.value"
                               v-for="item2 in [{label: 'true', value: 'true'},
                                {label: 'false', value: 'false'}]"></el-option>
                </el-select>
                <!--<el-tooltip class="item" effect="dark" :content="'以 - 作为分割符，比例最大为'" placement="top-start">-->
                <!--<div style="display: inline-block;vertical-align: top;margin-right: 10px">-->
                <!--<i class="el-icon-question" style="font-size: 16px"></i>-->
                <!--</div>-->
                <!--</el-tooltip>-->

            </el-form-item>
            <div v-if="item.toDataOrHtml === 'data'" style="width: 100%;margin-top: -22px;margin-bottom: 22px">
                <label style="width: 100px;margin-right: 10px;font-size: 10px;color: #606266">{{item.label}}的dataName</label>
                <el-input
                        style="width:calc(81% - 110px)"
                        type="text"
                        v-model="item.dataName"
                        placeholder="不填则自动生成"
                        size="mini">
                </el-input>
            </div>
        </template>

    </div>
</template>

<script>
    import keyValueSelect from './keyValueSelect'

    export default {
        name: "propsPanel",
        props: {
            value: {
                type: Array,
                default: () => []
            }
        },
        data(){
            return {
                showTipAdd: false,
                typeIsSelect: false,
                selectType:[{label: '字符串',value:'String'},
                    {label: '布尔',value:'boolean'},
                    {label: '自定义选项',value:'select'}
                ],
                selectToDataOrHtml:[{label: 'HTML',value:'html'},
                    {label: 'Data',value:'data'},
                ],
                selectKeyValue: [
                    {label:'',value:''}
                ],
                addPropsForm: {
                    label: '',
                    key: '',
                    type: '',
                    select: '',
                    defaultValue: '',
                    value: '',
                    toDataOrHtml: 'html'
                },
                addPropsFormRules: {

                },
                addPropsShow: false
            }
        },
        methods: {
            selectCheck(val){
                this.addPropsForm.defaultValue = ''
                if (val === 'select'){
                    this.typeIsSelect = true
                } else {
                    this.typeIsSelect = false
                }
            },
            deleteKeyValue({index}){
                this.selectKeyValue.splice(index,1)
            },
            addSelectKeyValue(val){
                this.selectKeyValue.push(val)
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
            submitForm(ref){
                this.$refs[ref].validate((valid) => {
                    if (valid) {

                        if (this.addPropsForm.type === 'select'){
                            if (this.checkSelectKeyValue()){
                                this.addPropsForm.select = this.selectKeyValue
                            }else {
                                return false
                            }
                        } else if (this.addPropsForm.type === 'boolean') {
                            this.addPropsForm.select = [
                                {label: '真', value: true},
                                {label: '假', value: false}
                            ]
                        }
                        this.$store.commit('addPropsValue',this.addPropsForm)
                        this.$store.dispatch('updataComponentsInfo')

                        this.resetForm(ref)
                    } else {
                        return false;
                    }
                });
            },
            resetForm(ref){
                this.$refs[ref].resetFields();
                this.selectKeyValue= [
                    {label:'',value:''}
                ]
                this.addPropsForm = {
                    label: '',
                    key: '',
                    type: '',
                    select: '',
                    defaultValue: '',
                    toDataOrHtml: 'html'
                }
            },
            closeForm(){
                this.addPropsShow = false
            }
        },
        components:{
            keyValueSelect
        }
    }
</script>

<style scoped>
    .i-form-item {
        width: 100%;
    }

    .i-form-item-tip {

    }

    .form-line {
    }

    .style-json {
    }
</style>
