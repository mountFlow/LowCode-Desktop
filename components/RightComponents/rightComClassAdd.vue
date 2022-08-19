<template>
    <el-form :rules="rules"  :model="form"  ref="ruleForm" label-width="80px">
        <div class="add-select-input" style="width: 100%;">
            <label style="color: #aaaaaa;font-size: 14px">编辑类</label>
            <el-select v-model="editItemClass"  size="mini" placeholder="请选择现有的类"
                       @change="editItemIndexSelect"
            >
                <el-option :label="item.name"
                           :value="item.name"
                           :key="index"
                           v-for="(item,index) in customClassList">
                </el-option>
            </el-select>
            <el-button size="mini" style="margin-left: 15px" type="primary" v-show="editOrAdd === 'edit'" @click="addClass">添加类</el-button>
            <el-button size="mini" style="margin-left: 15px" type="danger" @click="deleteClassAttr">删除类</el-button>
        </div>
        <el-divider><span style="color: #DCDFE6">分割线</span></el-divider>
        <el-form-item label="类名" style="width: 70%" prop="className">
            <el-input size="mini" v-model="form.className" type="text"></el-input>
        </el-form-item>

        <style-panel v-model="iStyle"></style-panel>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{editOrAdd === 'add' ? '添加':'编辑'}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import stylePanel from './styleCompentens/stylePanel'

    let refuseEditType = {
        'border': 1,
        'padding': 1,
        'margin': 1
    }

    export default {
        name: 'RightComStyleAdd',
        data() {
            return {
                editItemClass: '',
                iStyle:{},
                form: {
                  className: ''
                },
                rules: {
                    className: [
                        { required: true, message: '请输入样式类名', trigger: 'blur' }
                    ]
                },
                editOrAdd: 'add',
                oldKey: '',
                editItemIndex: '',
                showTipAdd: false,
                showTipSave: false,
                typeIsSelect: false,
                openMustValue: true,
                mustValueType: 'input',
                mustValueValue: '',
                mustValueIndex: '',
                mustKeyIndex: '',
                selectType:[{label: '字符串',value:'text'},
                    {label: '选项',value:'select'},
                    {label: '颜色',value:'color'},
                    {label: '数字',value:'number'},
                ],
                selectKeyValue: [
                    {label:'',value:''}
                ],
            }
        },
        methods:{
            validateMustValue(rule, value, callback) {
                if (this.openMustValue === false && this.mustValueValue === '') {
                    callback(new Error('如果选择了依赖项，必须输入依赖值'));
                } else {
                    callback();
                }
            },
            mustValueSelect(){
                this.form.must['value'] = this.mustValueValue
            },
            clearMust(){
                this.form.must = ''
                this.openMustValue= true
                this.mustValueType= 'input'
                this.mustValueValue = ''
                this.mustValueIndex = ''
                this.mustKeyIndex = ''
            },
            mustKeySelect(){
                if (this.mustKeyIndex === ''){
                    this.clearMust()
                    return
                }

                let mustItem = this.formList[this.mustKeyIndex]
                this.form.must = {
                    key: mustItem.key,
                    value: ''
                }
                if (mustItem.type === 'select'){
                    this.mustValueType = 'select'
                }else {
                    this.mustValueType = 'input'
                }
                this.mustValueIndex = ''
                this.mustValueValue = ''
                this.openMustValue = false
            },
            deleteClassAttr(){
                this.$store.commit('deleteCustomClass',{name:this.editItemClass})
                this.resetForm('ruleForm')
                this.openSussese('成功','删除类成功')
            },
            addClass(){
                this.resetForm('ruleForm')
                this.editOrAdd = 'add'
            },
            findListByKeyRetuenIndex(key){
                for (let i = 0; i < this.formList.length; i++) {
                    if (this.formList[i].key === key){
                        return i
                    }
                }
                return -1
            },
            editItemIndexSelect(val){
                let editItem = this.$store.state.currentCheckAttr.customClass[val]
                this.form.className = val
                this.editOrAdd = 'edit'
                this.oldKey = val
                this.iStyle = editItem
            },
            /**
             * 校验
             */
            checkSelectKeyValue(){
                for (let i = 0; i < this.selectKeyValue.length; i++) {
                    let item = this.selectKeyValue[i]
                    if (item.key === '' || item.value === ''){
                        return false
                    }
                }
                return true
            },
            deleteKeyValue(index){
                this.selectKeyValue.splice(index,1)
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
            selectCheck(val){
                if (val === 'select'){
                    this.typeIsSelect = true
                } else {
                    this.typeIsSelect = false
                }
            },
            openSussese(title = '成功',msg = '创建类成功'){
                this.$notify({
                    title,
                    message: msg,
                    type: 'success'
                });
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let val = {
                            name: this.form.className,
                            value: this.iStyle
                        }
                        this.$store.commit('setCustomClass',val)

                        this.resetForm('ruleForm')
                        this.openSussese('成功',this.editOrAdd === 'add' ? '创建类成功' : '编辑类成功')

                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.iStyle = {}
                this.editItemClass = ''

                this.typeIsSelect = false
                this.selectKeyValue = [
                    {key:'',value:''}
                ]
                this.editOrAdd = 'add'
                this.editItemIndex = ''
                this.oldKey = ''

                this.openMustValue= true
                this.mustValueType= 'input'
                this.mustValueValue = ''
                this.mustValueIndex = ''
                this.mustKeyIndex = ''
            }
        },
        computed:{
            customClassList(){
                let customClass = this.$store.state.currentCheckAttr.customClass
                let customClassList = []
                Object.keys(customClass).forEach(function(key){
                    customClassList.push({
                        name: key,
                        value: customClass[key]
                    })
                });
                return customClassList
            },
            formList(){
                let editFromList = this.$store.state.currentCheckAttr.formList;
                let newEditFromList = []
                for (let i = 0; i <editFromList.length; i++) {
                    let item = editFromList[i]
                    if (refuseEditType[editFromList[i].key] === 1){
                        item.disabled = true
                    }
                    newEditFromList.push(editFromList[i])
                }
                return newEditFromList
            }
        },
        components:{
            stylePanel
        }
    }
</script>

<style scoped lang="scss">
    .add-select-input{
        width: 50%;
        display: flex;
        align-items: center;

        label {
            width: 100px;
        }
    }
</style>
