<template>
    <view>
        <div style="display: flex;flex-wrap: wrap" class="form-line" >
            <template v-for="(item,index) in formList">
                <el-form-item v-show="haveMustCheck(item)" :label="item.label" class="i-form-item" :key="index">
                    <el-input v-if="item.type !== 'color' && item.type !== 'select' && item.type !== 'border'"
                              v-model="value[item.key]"
                              :type="item.type"
                              size="mini"
                              @input="item.haveDirection === true ? paddingChange($event,index) : null"
                              @focus="item.haveDirection === true ? paddingMarginDirectionFun(true,index) : null"
                    >
                    </el-input>
                    <div v-if="item.type === 'color'" style="display: inline-block;width: 120px;text-align: left;">
                        <el-color-picker v-model="value[item.key]" :show-alpha="true"></el-color-picker>
                    </div>

                    <template v-if="item.type === 'border'">
                        <border :ikey="item.key" v-model="item.data" @choose="borderListShow = true"></border>
                    </template>

                    <el-select v-if="item.type === 'select'"
                               v-model="value[item.key]"
                               placeholder="请选择"
                               clearable
                    >
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
        <el-form-item label="样式配置" style="margin: 15px 0">
            <el-input class="style-json" type="textarea" v-model="iStyleJson" :autosize="{ minRows:6 }"></el-input>
        </el-form-item>
    </view>
</template>

<script>
    import border from './border'
    import {dIndex,arrIndex,borderList} from '@/common/js/styleExternalData'

    export default {
        name: 'stylePanel',
        props:{
            value: {
                type: Object,
                default: ()=>{}
            }
        },
        data(){
            return {
                paddingMarginDirection: false,
                checkMOrP: '',
                arrIndex:arrIndex,
                borderList:borderList,
                borderListShow: false
            }
        },
        methods:{
            /**
             * 校验样式依赖关系
             * 控制是否显示
             */
            haveMustCheck(item){
                let {must} = item
                if (must){
                    let {key,value} = must
                    let parent = this.value[key]
                    if ( parent && parent===value ){
                        return true
                    }
                    return false
                }else {
                    return true
                }
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
            directionFun(d,val,index){
                let mp = this.formList[index].key
                let style = this.value
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
                this.computedMarginOrPadding(this.value[this.formList[index].key],index)
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
            formList(){
                return this.$store.state.currentCheckAttr.formList
            },
            list(){
                return this.$store.state.list
            },
            iStyleJson: {
                get(){
                    return JSON.stringify(this.value,null,'    ')
                },
                set(val){
                    this.$emit('input', JSON.parse(val));
                }
            },
        },
        components:{
            border
        }
    }
</script>

<style scoped>
    .i-form-item{
        width: 50%;
    }

    .form-line{
    }

    .style-json{
    }
</style>
