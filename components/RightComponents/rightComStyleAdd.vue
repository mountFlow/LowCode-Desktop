<template>
    <el-form :rules="rules"  :model="form"  ref="ruleForm" label-width="80px">
        <el-form-item label="中文标签" prop="label">
            <el-input v-model="form.label"
                      size="mini"></el-input>
        </el-form-item>
        <el-form-item label="样式名称" prop="key">
            <el-input v-model="form.key"
                      size="mini"></el-input>
        </el-form-item>
        <el-form-item label="值类型" prop="type">
            <el-select v-model="form.type"  size="mini" placeholder="请选择活动区域">
                <el-option :label="item.label" :value="item.value" v-for="item in selectType"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'RightComStyleAdd',
        data() {
            return {
                selectType:[{label: '字符串',value:'text'},
                    {label: '选项',value:'select'},
                    {label: '颜色',value:'color'},
                    {label: '数字',value:'number'},
                ],
                form: {
                    label: '',
                    key: '',
                    type: '',
                    select: ''
                },
                rules: {
                    label: [
                        { required: true, message: '请输入中文标签', trigger: 'blur' }
                    ],
                    key: [
                        { required: true, message: '请输入样式名称（英文）', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择输入类型', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
