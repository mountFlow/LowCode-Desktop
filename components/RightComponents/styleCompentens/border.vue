<template>
    <el-popover
            placement="left"
            width="450"
            trigger="focus">
        <div style="display: flex;align-items: center;justify-content: space-around">
            <div>大小</div>
            <el-input slot="reference"
                      :value="computeValue(value,'size')"
                      type="text"
                      size="mini"
                      style="width: 95px"
                      @input="borderSizeInput"
            >
                <div slot="prefix" >
                    <el-popover
                            popper-class="my-none-el-popover"
                            placement="left"
                            @show="showElSliderFun(true)"
                            @hide="showElSliderFun(false)"
                            trigger="click">
                        <el-slider
                                :show-tooltip="false"
                                vertical
                                :value="showElSlider ? computeValueNumber(value,'size') : null"
                                @input="showElSlider ? borderSizeInput($event) : null"
                                :min="0"
                                :step="1"
                                :max="50"
                                input-size="mini"
                                height="250px">
                        </el-slider>
                        <i slot="reference" style="cursor: pointer"
                           class="el-icon-d-caret el-input__icon "></i>
                    </el-popover>
                </div>
                <div slot="suffix" v-if="unit !== undefined">{{unit}}</div>
            </el-input>
            <div>类型</div>
            <el-select placeholder="请选择"
                       style="width: 100px"
                       v-model="value.type"
                       @change="borderTypeInput"
            >
                <el-option
                        size="mini"
                        v-for="item2 in borderSelect"
                        :key="item2.value"
                        :label="item2.label"
                        :value="item2.value">
                </el-option>
            </el-select>
            <div>颜色</div>
            <el-color-picker :show-alpha="true" v-model="value.color" @change="borderColorInput"></el-color-picker>
        </div>
        <el-input slot="reference"
                  v-model="iStyle[ikey]"
                  type="text"
                  size="mini"
                  @input="inputBoder"
                  @focus="choose"
        >
        </el-input>
    </el-popover>
</template>

<script>
    import {borderSelect} from '@/common/js/styleExternalData'

    export default {
        name: 'border',
        data(){
            return {
                showElSlider: false,
                borderSelect:borderSelect
            }
        },
        props:{
            ikey:{
                type:String,
                default: ''
            },
            value: {
                type: Object,
                default: ()=>{}
            },
            unit: {
                type: String,
                default: ''
            }
        },
        methods: {
            clearValue(){
                this.borderSizeInput('')
            },
            showElSliderFun(showElSlider){
                this.showElSlider = showElSlider
            },
            inputBoder(e){
                if (e === ''){
                    delete this.iStyle[this.ikey]
                }
            },
            computeValue(item,key){
                return item[key] ? item[key].replace(eval('/'+ this.unit +'/g'),'') : ''
            },
            computeValueNumber(item,key){
                if (item[key]){
                    return parseFloat(item[key].replace(eval('/'+ this.unit +'/g'),''))
                }
            },
            choose(){
              this.$emit('choose')
            },
            emitInput(value){
                this.$emit('input',{...value})
            },
            borderSizeInput (val) {
                if (val === ''){
                    this.value.size = ''
                }else {
                    this.value.size = val + this.unit
                }
                this.emitInput(this.value)
                this.setBoderByIndex(0,this.value.size)
            },
            borderTypeInput(val){
                this.setBoderByIndex(1,val)
            },
            borderColorInput(val){
                this.setBoderByIndex(2,val)
            },
            setBoderByIndex(index,val){
                if (this.iStyle && !this.iStyle[this.ikey]) {
                    this.$set(this.iStyle, this.ikey, '')
                }
                let border = this.iStyle[this.ikey]
                let addrBorder = []
                if (border){
                    addrBorder = border.split('  ')
                }
                addrBorder[index] = val
                let res = addrBorder.join('  ')
                this.iStyle[this.ikey] = res
            }
        },
        computed:{
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
        }
    }
</script>

<style scoped>

    .adjust-size{
        line-height: normal;
        margin-top: 10px;
        width: 38px;
        font-size: 1.3em;
    }
</style>
