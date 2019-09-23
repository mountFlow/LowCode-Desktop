<template>
    <el-row>
        <el-col :span="6">
            <view>
                <h2>easy-ui</h2>
            </view>
        </el-col>
        <el-col :span="12">
            <view>
                <el-select v-model="centerValue" placeholder="请选择">
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
            <view style="display: flex;align-items: center;font-size: 14px;color: #5f5e5e">
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
                    value: 'uni-app',
                    label: 'uni-app'
                }],
                centerValue: 'uni-app',
            }
        },
        computed:{
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
