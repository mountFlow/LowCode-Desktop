import vue from 'vue'
import {getCachesClass, cachesClass, cachesStyle, getCachesStyle} from 'common/js/localStore'

const currentCheckAttr = {
    state: {
        contextMenuTarget: undefined, // 控制鼠標右鍵
        currentCheckIndex: '', //当前选中对应的下标
        item: undefined, // 當前选中的组件信息
        customClass: {}, // 存放全局创建的样式类
        // 保存样式的基本信息，可在页面修改
        formList: [
            {
                label: '高度',
                key: 'height',
                type: 'text',
                unit: 'rpx'
            },
            {
                label: '宽度',
                key: 'width',
                type: 'text',
                unit: 'rpx'
            }, {
                label: '边角',
                key: 'borderRadius',
                type: 'text',
                unit: 'rpx'
            }, {
                label: '边框',
                key: 'border',
                type: 'border',
                unit: 'rpx',
                data: {
                    size: '',
                    type: '',
                    color: ''
                }
            }, {
                label: '内边距',
                key: 'padding',
                type: 'text',
                unit: 'rpx',
                haveDirection: true,
                showDirection: false,
                padingOrMargin: {
                    left: '',
                    right: '',
                    top: '',
                    buttom: ''
                }
            }, {
                label: '外边距',
                key: 'margin',
                type: 'text',
                unit: 'rpx',
                haveDirection: true,
                showDirection: false,
                padingOrMargin: {
                    left: '',
                    right: '',
                    top: '',
                    buttom: ''
                }
            }, {
                label: '字体大小',
                key: 'fontSize',
                type: 'text',
                unit: 'rpx',
            }, {
                label: '字体宽度',
                key: 'fontWeight',
                type: 'select',
                select: [{
                    value: '500',
                    label: '正常'
                }, {
                    value: '600',
                    label: '粗'
                }]
            }, {
                label: '字体颜色',
                key: 'color',
                type: 'color'
            }, {
                label: '字体方向',
                key: 'textAlign',
                type: 'select',
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
            }, {
                label: '背景色',
                key: 'backgroundColor',
                type: 'color'
            }, {
                label: '显示',
                key: 'display',
                type: 'select',
                select: [{
                    value: 'flex',
                    label: 'flex'
                }, {
                    value: 'inline-block',
                    label: 'inline-block'
                }, {
                    value: 'inline',
                    label: 'inline'
                }, {
                    value: 'block',
                    label: 'block'
                }, {
                    value: 'none',
                    label: '不显示'
                }]
            }, {
                label: 'flex-wrap',
                key: 'flex-wrap',
                must: {
                    key: 'display',
                    value: 'flex'
                },
                type: 'select',
                select: [{
                    value: 'wrap',
                    label: '换行'
                }, {
                    value: 'nowrap',
                    label: '不换行'
                }]
            }, {
                label: '水平',
                key: 'justify-content',
                must: {
                    key: 'display',
                    value: 'flex'
                },
                type: 'select',
                select: [{
                    value: 'center',
                    label: '居中'
                }, {
                    value: 'flex-start',
                    label: '头开始'
                }, {
                    value: 'flex-end',
                    label: '尾开始'
                }, {
                    value: 'space-between',
                    label: 'space-around'
                }, {
                    value: 'space-around',
                    label: 'space-around'
                }]
            }, {
                label: '垂直',
                key: 'align-items',
                must: {
                    key: 'display',
                    value: 'flex'
                },
                type: 'select',
                select: [{
                    value: 'center',
                    label: '居中'
                }, {
                    value: 'flex-start',
                    label: '头开始'
                }, {
                    value: 'flex-end',
                    label: '尾开始'
                }, {
                    value: 'stretch',
                    label: 'stretch'
                }, {
                    value: 'baseline',
                    label: 'baseline'
                }]
            },
        ]
    },
    mutations: {
        deletePropsValue(state, {index}) {
            if (state.item) {
                state.item.propsValue.splice(index, 1)
            }
        },
        addPropsValue(state, obj) {
            if (state.item) {
                obj.value = obj.defaultValue
                state.item.propsValue.push({...obj})
            }
        },
        setContextMenuTarget(state, {contextMenuTarget}) {
            state.contextMenuTarget = contextMenuTarget
        },
        deleteCustomClass(state, {name}) {
            vue.set(state.customClass, name, undefined)
            vue.delete(state.customClass, name)
        },
        initCustomClass(state, obj) {
            state.customClass = obj
        },
        setCustomClass(state, {name, value}) {
            vue.set(state.customClass, name, value)
            cachesClass(state.customClass)
            // state.customClass[name] = value
        },
        initFromStyleList(state, obj) {
            state.formList = obj
        },
        addFromStyleList(state, obj) {
            state.formList.push(obj)
            cachesStyle(state.formList)
        },
        editFromStyleList(state, {index, value}) {
            state.formList.splice(index, 1, value)
            cachesStyle(state.formList)
        },
        deleteFromStyleList(state, {index}) {
            state.formList.splice(index, 1)
            cachesStyle(state.formList)
        },
        setCurrentCheckIndex(state, {index}) {
            state.currentCheckIndex = index
        },
        setCurrentCheckItem(state, obj) {
            state.item = obj
        },
        setCurrentCheckItemStyle(state, style) {
            if (state.item) {
                state.item.iStyle = style
            }
        },
        setCurrentCheckItemClass(state, iClass) {
            if (state.item) {
                state.item.iClass = iClass
            }
        },
        setCurrentCheckAttrName(state, {name}) {
            state.name = name
        },
        /**
         * 删除当前某个已被编辑过的样式属性,如果存在的话
         */
        deleteItemStyleAttr(state, {key}) {
            if (key && key !== '') {
                state.item.iStyle[key] = ''
                vue.delete(state.item.iStyle, key)
            }
        }
    },
    getters: {},
    actions: {
        /**
         * 刪除當前節點
         */
        deleteCurrentCheckeAttr({commit, state, rootState}) {
            let currentCheckIndex = state.currentCheckIndex
            let arrIndex = currentCheckIndex.split('-')
            if (arrIndex.length % 2 === 0) {
                arrIndex.pop()
            }
            let list = []
            switch (rootState.pattern) {
                case 'page':
                    list = rootState.project.checkFile.dragList
                    break
                case 'component':
                    list = rootState.patternComponents.list
                    break
                default:
                    return
            }
            let currentObj = list
            let oldCurrentObj = currentObj
            let i = 0
            for (i = 0; i < arrIndex.length; i++) {
                oldCurrentObj = currentObj
                let index = parseInt(arrIndex[i])
                if (Object.prototype.toString.call(currentObj) === '[object Array]') {
                    currentObj = currentObj[index]
                } else {
                    if (i === arrIndex.length - 1) {
                        currentObj = currentObj.num[index]
                    } else {
                        currentObj = currentObj.num[index].itemList
                    }
                }
            }
            oldCurrentObj.splice(parseInt(arrIndex[i - 1]), 1)
            commit('setCurrentCheckIndex', {index: ''})
            commit('setCurrentCheckItem', undefined)
        },
        /**
         * 从本地读取样式的基本信息
         * @param commit
         */
        initFromStyleList({commit}) {
            let data = getCachesStyle()
            if (data) {
                commit('initFromStyleList', getCachesStyle())
            }
        },
        // 从本地读取全局的样式
        initCustomClass({commit}) {
            commit('initCustomClass', getCachesClass())
        },
        // 设置背景样式
        setCurrentCheckAttrNameComputedByBackGrand({state, commit, rootState}) {
            if (rootState.project.checkFile) {
                let currentObj = rootState.project.checkFile.fileStyleAndClass
                currentObj.name = '页面背景'
                if (currentObj) {
                    commit('setCurrentCheckItem', currentObj)
                }
            }
        },
        // 根据鼠标点击事件，遍历出点击的相应节点组件信息
        setCurrentCheckAttrNameComputed({state, commit, rootState}, content) {
            let {index} = content
            let arrIndex = index.split('-')
            let list = []
            switch (rootState.pattern) {
                case 'page':
                    list = rootState.project.checkFile.dragList
                    break
                case 'component':
                    list = rootState.patternComponents.list
                    break
                default:
                    return
            }

            let currentObj = list
            for (let i = 0; i < arrIndex.length; i++) {
                let index = parseInt(arrIndex[i])
                if (Object.prototype.toString.call(currentObj) === '[object Array]') {
                    currentObj = currentObj[index]
                } else {
                    if (i === arrIndex.length - 1) {
                        let name = currentObj.name
                        currentObj = currentObj.num[index]
                        currentObj.name = name + ` 第${index + 1}列`
                    } else {
                        currentObj = currentObj.num[index].itemList
                    }
                }
            }
            if (currentObj) {
                commit('setCurrentCheckItem', currentObj)
            }
        }
    }
}

export default currentCheckAttr
