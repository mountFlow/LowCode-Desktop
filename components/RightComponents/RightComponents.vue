<template>
    <el-row>
        <el-col :span="22" :offset="1" style="">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="属性" name="first">
                        <el-form ref="form" label-width="80px" label-position="right">
                            <el-form-item label="组件名称">
                                <el-input :value="currentCompentenName" disabled size="mini"></el-input>
                            </el-form-item>
                            <div style="display: flex;flex-wrap: wrap" class="form-line">
                                <template v-for="(item,index) in formList">
                                    <el-form-item :label="item.label" class="i-form-item" :key="index">
                                        <el-input v-if="item.type !== 'color' && item.type !== 'select' && item.type !== 'border'"
                                                  v-model="iStyle[item.key]"
                                                  :type="item.type"
                                                  size="mini"
                                                  @input="item.haveDirection === true ? paddingChange($event,index) : null"
                                                  @focus="item.haveDirection === true ? paddingMarginDirectionFun(true,index) : null"
                                        >
                                        </el-input>
                                        <div v-if="item.type === 'color'" style="display: inline-block;width: 120px;text-align: left;">
                                            <el-color-picker v-model="iStyle[item.key]" :show-alpha="true"></el-color-picker>
                                        </div>

                                        <template v-if="item.type === 'border'">
                                            <border :ikey="item.key" v-model="item.data" @choose="borderListShow = true"></border>
                                        </template>

                                        <el-select v-if="item.type === 'select'" v-model="iStyle[item.key]" placeholder="请选择">
                                            <el-option
                                                    size="mini"
                                                    v-for="item2 in item.select"
                                                    :key="item2.value"
                                                    :label="item2.label"
                                                    :value="item2.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>

                                    <template v-if="item.type === 'border'">
                                        <div style="display: flex; flex-wrap: wrap" class="form-line" v-show="borderListShow">
                                            <el-form-item :label="item2.label" class="i-form-item" v-for="item2 in borderList">
                                                <border :ikey="item2.key" v-model="item2.data" ></border>
                                            </el-form-item>
                                        </div>
                                        <el-divider v-if="borderListShow"><div style="cursor: pointer;" @click="borderListShow=false" ><span style="font-size: 14px;color: #ccc">收起</span><i class="el-icon-arrow-up" style="color: #ccc" ></i></div></el-divider>
                                    </template>

                                    <template v-if="item.haveDirection === true">
                                        <div style="display: flex; flex-wrap: wrap" class="form-line" v-show="item.showDirection">
                                            <el-form-item :label="item.key + item2.label" class="i-form-item" v-for="item2 in arrIndex">
                                                    <el-input v-model="item.padingOrMargin[item2.name]" @input="directionFun(item2.name,$event,index)"  size="mini">
                                                    </el-input>
                                            </el-form-item>
                                        </div>
                                        <el-divider v-if="item.showDirection"><div style="cursor: pointer;" @click="paddingMarginDirectionFun(false,index)" ><span style="font-size: 14px;color: #ccc">收起</span><i class="el-icon-arrow-up" style="color: #ccc" ></i></div></el-divider>
                                    </template>
                                </template>
                            </div>
                            <el-form-item label="样式配置">
                                <el-input class="style-json" type="textarea" v-model="iStyleJson" :autosize="{ minRows:6 }"></el-input>
                            </el-form-item>
                        </el-form>
                </el-tab-pane>
                <el-tab-pane label="自定义" name="second">
                    <right-com-style-add></right-com-style-add>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
    import border from './styleCompentens/border'
    import {dIndex,arrIndex,borderList} from '@/common/js/styleExternalData'
    import rightComStyleAdd from './rightComStyleAdd'

    export default {
        name: 'RightComponents',
        data(){
            return {
                activeName: 'first',
                paddingMarginDirection: false,
                checkMOrP: '',
                arrIndex:arrIndex,
                borderList:borderList,
                borderListShow: false,
                formList: [
                    {
                        label: '长度',
                        key: 'height',
                        type:'text'
                    },
                    {
                        label: '宽度',
                        key: 'width',
                        type:'text'
                    },{
                        label: '边角',
                        key: 'borderRadius',
                        type:'text'
                    },{
                        label: '边框',
                        key: 'border',
                        type:'border',
                        data: {
                            size: '',
                            type: '',
                            color: ''
                        }
                    },{
                        label: '内边距',
                        key: 'padding',
                        type:'text',
                        haveDirection: true,
                        showDirection: false,
                        padingOrMargin: {
                            left: '',
                            right: '',
                            top: '',
                            buttom: ''
                        }
                    },{
                        label: '外边距',
                        key: 'margin',
                        type:'text',
                        haveDirection: true,
                        showDirection: false,
                        padingOrMargin: {
                            left: '',
                            right: '',
                            top: '',
                            buttom: ''
                        }
                    },{
                        label: '字体大小',
                        key: 'fontSize',
                        type:'text'
                    },{
                        label: '字体宽度',
                        key: 'fontWeight',
                        type:'select',
                        select: [{
                            value: '500',
                            label: '正常'
                        }, {
                            value: '600',
                            label: '粗'
                        }]
                    },{
                        label: '字体颜色',
                        key: 'color',
                        type:'color'
                    },{
                        label: '字体方向',
                        key: 'textAlign',
                        type:'select',
                        select: [{
                            value: 'left',
                            label: '靠左'
                        }, {
                            value: 'center',
                            label: '居中'
                        }, {
                            value: 'right',
                            label: '靠右'
                        }]
                    },{
                        label: '背景色',
                        key: 'backgroundColor',
                        type:'color'
                    },
                ]
            }
        },
        watch:{
        },
        methods:{
            onmousewheel(){
                console.log(11)
            },
            arr2four(index,arr) {
                let newArr = arr
                if (index === 2){
                     newArr = [arr[0],arr[1],arr[0],arr[1]]
                }
                if (index === 1){
                     newArr = [arr[0],arr[0],arr[0],arr[0]]
                }
                if (index === 0){
                    newArr = [0,0,0,0]
                }
                return newArr
            },
            handleClick(){

            },
            directionFun(d,val,index){
                let mp = this.formList[index].key
                let style = this.iStyle
                let arrStyle = []
                if (style[mp]){
                    arrStyle = style[mp].split(" ")
                }
                arrStyle = this.arr2four(arrStyle.length,arrStyle)
                arrStyle[dIndex[d]] = val
                style[mp] = arrStyle.join(" ")

                this.$store.commit('setCurrentCheckItemStyle',style)
            },
            paddingMarginDirectionFun(flag,index){
                this.checkMOrP = this.formList[index].key
                this.formList[index].showDirection = flag
                this.computedMarginOrPadding(this.iStyle[this.formList[index].key],index)
            },
            paddingChange(val,index){
                this.computedMarginOrPadding(val,index)
            },
            computedMarginOrPadding(val,index){

                if (!val || val === ''){
                    this.formList[index].padingOrMargin.top = ''
                    this.formList[index].padingOrMargin.buttom = ''
                    this.formList[index].padingOrMargin.left = ''
                    this.formList[index].padingOrMargin.right = ''
                    return
                }
                val = val.toString().trim()
                let arrVal = val.split(" ")
                if (arrVal.length === 1){
                    this.formList[index].padingOrMargin.top = arrVal[0]
                    this.formList[index].padingOrMargin.buttom = arrVal[0]
                    this.formList[index].padingOrMargin.left = arrVal[0]
                    this.formList[index].padingOrMargin.right = arrVal[0]
                }else   if (arrVal.length === 2){
                    this.formList[index].padingOrMargin.top = arrVal[0]
                    this.formList[index].padingOrMargin.buttom = arrVal[0]
                    this.formList[index].padingOrMargin.left = arrVal[1]
                    this.formList[index].padingOrMargin.right = arrVal[1]
                }else if (arrVal.length === 4){
                    this.formList[index].padingOrMargin.top = arrVal[0]
                    this.formList[index].padingOrMargin.buttom = arrVal[2]
                    this.formList[index].padingOrMargin.left = arrVal[3]
                    this.formList[index].padingOrMargin.right = arrVal[1]
                }else {
                    this.formList[index].padingOrMargin.top = ''
                    this.formList[index].padingOrMargin.buttom = ''
                    this.formList[index].padingOrMargin.left = ''
                    this.formList[index].padingOrMargin.right = ''
                }
            }
        },
        computed:{
            list(){
                return this.$store.state.list
            },
            iStyleJson: {
                get(){
                    if (this.$store.state.currentCheckAttr.item){
                        return JSON.stringify(this.$store.state.currentCheckAttr.item.iStyle,null,'    ')
                    }
                    return ''
                },
                set(val){
                    this.$store.commit('setCurrentCheckItemStyle',JSON.parse(val))
                }
            },
            iStyle: {
                get(){
                    if (this.$store.state.currentCheckAttr.item){
                        return this.$store.state.currentCheckAttr.item.iStyle
                    }
                    return {}
                },
                set(val){
                    this.$store.commit('setCurrentCheckItemStyle',val)
                }
            },
            currentCompentenName(){
                if (this.$store.state.currentCheckAttr.item){
                    return this.$store.state.currentCheckAttr.item.name
                }
                return ''
            },
            currentCompentenItem(){
                if (this.$store.state.currentCheckAttr.item){
                    return this.$store.state.currentCheckAttr.item
                }
                return {}
            }
        },
        components:{
            border,
            rightComStyleAdd
        }
    }
</script>

<style scoped lang="scss">
    .i-form-item{
        width: 50%;
    }

    .text {
        font-size: 14px;
    }

    .attrLine{
        display: flex;
    }

    .el-form-item{
        margin-bottom: 5px;
    }

    .form-line{
    }

    .style-json{
    }
</style>
