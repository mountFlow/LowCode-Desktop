<template>
    
    <div style="width: 95%;padding: 0 2.5%">
        <view style="display: flex;justify-content: center;width: 100%">
            <draggable :list="layout" :options="{sort:false}" :group="{ name: 'layouts', pull: 'clone', put: false}"
                :clone="clone" @choose="choose" style="position: relative;width: 70%">
                <ComponentContainer v-for="item in layout" :key="item.id" :name="item.name" :num="item.num"
                    type="layout" :componentName="item.componentName">
                </ComponentContainer>
            </draggable>
        </view>
        <!--<el-divider><span style="color: #DCDFE6">拖动布局</span></el-divider>-->
    </div>
</template>

<script>
    import ComponentContainer from '@/components/LeftComponents/ComponentContainer/ComponentContainer'
    import draggable from '@/common/js/vuedraggable'

    let flexMap = [
        'flex-sub',
        'flex-twice',
        'flex-treble',
        'flex-four',
        'flex-five'
    ]
    let flexHash = {
        'flex-sub': 1,
        'flex-twice': 2,
        'flex-treble': 3,
        'flex-four': 4,
        'flex-five': 5
    }
    let layoutGlobalId = 1000;

    let maxLayoutRote = 5

    export default {
        name: "LeftCompoentsByLayouts",
        props: {
            clone: {
                type: Function,
                default: null
            },
            layout: {
                type: Array,
                default: () => []
            },
            choose: {
                type: Function,
                default: null
            }
        },
        data() {
            return {
                maxLayoutRote: maxLayoutRote,
                flexHash: flexHash,
                activeName: 'first',
                form: {
                    layoutRatio: ''
                },
                layoutCustom: [],
                formRule: {
                    layoutRatio: [{
                        validator: this.validateCustomValue,
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            validateCustomValue(rule, value, callback) {
                if (value === '') {
                    callback(new Error('请填写布局比例'));
                    return
                }
                let arrValue = value.split("-")
                for (let i = 0; i < arrValue.length; i++) {
                    let item = arrValue[i]
                    let itemRex = /^[1-5]$/
                    if (!itemRex.test(item)) {
                        callback(new Error(`布局比例在1-${maxLayoutRote}之间,并以 - 分割。`));
                        return
                    }
                }
                callback();
            },
            clearLayoutCustom() {
                this.layoutCustom = []
            },
            yes() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let value = this.form.layoutRatio
                        let arrValue = value.split("-")
                        let num = []
                        for (let i = 0; i < arrValue.length; i++) {
                            let index = (parseInt(arrValue[i]) - 1)
                            num.push({
                                layoutClass: flexMap[index],
                                itemList: [],
                                iStyle: {},
                                iClass: []
                            })
                        }
                        let name = arrValue.join(':')
                        this.layoutCustom.push({
                            name: `布局 ${name}`,
                            id: layoutGlobalId++,
                            componentName: 'Iflex',
                            iStyle: {},
                            num
                        })
                    } else {
                        return false;
                    }
                })
            }
        },
        components: {
            ComponentContainer,
            draggable
        }
    }
</script>

<style scoped>
    .content-layout-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 2px;
        background-color: #675e6f;
        color: white;
    }
</style>
