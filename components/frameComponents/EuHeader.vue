<template>
    <el-row>
        <el-col :span="6">
            <view style="display: flex;justify-content: flex-start;align-items: center;color: #675e6f">
                <h2>kill-9-ui</h2>
            </view>
        </el-col>
        <el-col :span="12">
            <view>
                <el-select v-model="centerValue" placeholder="请选择" size="mini"  style="width: 130px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </view>
        </el-col>
        <el-col :span="6">

            <view style="display: flex;align-items: center;font-size: 14px;color: #5f5e5e;justify-content: flex-end">

                <span style="margin-right: 5px">布局锁定</span>
                <el-switch
                        v-model="layoutLock"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
                <div style="width: 20px;"></div>
                <span style="margin-right: 5px">预览</span>
                <el-switch
                        v-model="preview"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </view>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'EuHeader',
        data(){
            return {
                options: [{
                    value: 'page',
                    label: '页面模式'
                },{
                    value: 'component',
                    label: '组件模式'
                }],
            }
        },
        computed:{
            centerValue: {
                set(val){
                    this.$store.commit('setPattern',{pattern: val})
                },
                get(){
                    return this.$store.state.pattern
                }
            },
            preview: {
                get(){
                    return this.$store.state.preview
                },
                set(val){
                    this.$store.commit('setPreview',{preview:val})
                }
            },
            layoutLock:{
                get(){
                    return this.$store.state.showFlexDraggalbeHandle
                },
                set(val){
                    this.$store.commit('setShowFlexDraggalbeHandle',{showFlexDraggalbeHandle:val})
                }
            }
        }
    }
</script>

<style scoped>
</style>
