<template>
    <div style="height: 100%;">
        <el-tabs type="border-card" value="tab1" style="height: 100%;">
            <el-tab-pane name="tab1" label="组件属性" >
                <el-card class="box-card">
                    <el-form ref="form" label-width="80px" label-position="right">
                        <el-form-item label="当前选中:">
                            <!-- 直接从store中读到当前单击选中的元素 -->
                            <el-tag size="large">{{currentCompentenName}}</el-tag>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card class="box-card" style="margin-top: 30px;">
                    <el-form ref="form" label-width="80px" label-position="right">
                        <!-- 对单击选中的元素进行属性的修改 -->
                        <props-panel v-model="propsValue"></props-panel>
                    </el-form>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="通用属性" name="first">
                <el-card class="box-card">
                    <el-form ref="form" label-width="80px" label-position="right">
                        <el-form-item label="当前选中:">
                            <el-tag size="large">{{currentCompentenName}}</el-tag>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card class="box-card" style="margin-top: 30px;">
                    <el-form ref="form" label-width="80px" label-position="right">

                        <style-panel v-show="currentCompentenName !== ''" v-model="iStyle"></style-panel>
                    </el-form>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {
        dIndex,
        arrIndex,
        borderList
    } from '@/common/js/styleExternalData'
    import rightComStyleAdd from './rightComStyleAdd'
    import stylePanel from './styleCompentens/stylePanel'
    import rightComClassAdd from './rightComClassAdd'
    import rightComCatalog from './rightComCatalog'
    import propsPanel from './styleCompentens/propsPanel'

    export default {
        name: 'RightComponents',
        data() {
            return {
                editItemClass: '',
            }
        },
        watch: {
            centerValue(val) {
                if (val === 'page') {
                    this.$store.commit('setRightAideTabActiveName', {
                        rightAideTabActiveName: 'four'
                    })
                } else {
                    this.$store.commit('setRightAideTabActiveName', {
                        rightAideTabActiveName: 'first'
                    })
                }
            }
        },
        methods: {
            handleClick() {

            }
        },
        computed: {
            activeName: {
                get() {
                    return this.$store.state.rightAideTabActiveName
                },
                set(val) {
                    this.$store.commit('setRightAideTabActiveName', {
                        rightAideTabActiveName: val
                    })
                }
            },
            centerValue() {
                return this.$store.state.pattern
            },
            propsValue() {
                if (this.$store.state.currentCheckAttr.item) {
                    return this.$store.state.currentCheckAttr.item.propsValue
                }
                return undefined
            },
            customClassList() {
                let customClass = this.$store.state.currentCheckAttr.customClass
                let customClassList = []
                Object.keys(customClass).forEach(function(key) {
                    customClassList.push({
                        name: key,
                        value: customClass[key]
                    })
                });
                return customClassList
            },
            currentCompentenName() {
                if (this.$store.state.currentCheckAttr.item) {
                    return this.$store.state.currentCheckAttr.item.name
                }
                return ''
            },
            iStyle: {
                get() {
                    if (this.$store.state.currentCheckAttr.item) {
                        return this.$store.state.currentCheckAttr.item.iStyle
                    }
                    return {}
                },
                set(val) {
                    this.$store.commit('setCurrentCheckItemStyle', val)
                }
            },
            iClass: {
                get() {
                    if (this.$store.state.currentCheckAttr.item) {
                        return this.$store.state.currentCheckAttr.item.iClass
                    }
                    return []
                },
                set(val) {
                    this.$store.commit('setCurrentCheckItemClass', val)
                }
            }
        },
        components: {
            rightComStyleAdd,
            stylePanel,
            rightComClassAdd,
            rightComCatalog,
            propsPanel
        }
    }
</script>

<style scoped lang="scss">
    .text {
        font-size: 14px;
    }

    .attrLine {
        display: flex;
    }

    .el-form-item {
        margin-bottom: 5px;
    }
</style>
