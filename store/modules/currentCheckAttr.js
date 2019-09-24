const currentCheckAttr = {
    state: {
        item: undefined,
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
            },{
                label: '显示',
                key: 'display',
                type:'select',
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
            },{
                label: 'flex-wrap',
                key: 'flex-wrap',
                must: {
                    key: 'display',
                    value: 'flex'
                },
                type:'select',
                select: [{
                    value: 'wrap',
                    label: '换行'
                }, {
                    value: 'nowrap',
                    label: '不换行'
                }]
            },{
                label: '水平',
                key: 'justify-content',
                must: {
                    key: 'display',
                    value: 'flex'
                },
                type:'select',
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
            },{
                label: '垂直',
                key: 'align-items',
                must: {
                    key: 'display',
                    value: 'flex'
                },
                type:'select',
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
        addFromStyleList(state,obj){
            state.formList.push(obj)
        },
        editFromStyleList(state,{index,value}){
            state.formList.splice(index,1,value)
        },
        deleteFromStyleList(state,{index}){
            state.formList.splice(index,1)
        },
        setCurrentCheckItem(state,obj){
            state.item = obj
        },
        setCurrentCheckItemStyle(state,style){
            if (state.item){
                state.item.iStyle = style
            }
        },
        setCurrentCheckAttrName(state,{name}){
            state.name = name
        },
        /**
         * 删除当前某个已被编辑过的样式属性,如果存在的话
         */
        deleteItemStyleAttr(state,{key}){
            if (key && key!==''){
                state.item.iStyle[key] = ''
                delete state.item.iStyle[key]
            }
        }
    },
    getters: {
    },
    actions: {
        setCurrentCheckAttrNameComputed({ state, commit, rootState },content){
            let {index} = content
            let arrIndex = index.split('-')
            let list = rootState.list
            let currentObj = list
            for (let i = 0; i < arrIndex.length; i++) {
                let index = parseInt(arrIndex[i])
                if (Object.prototype.toString.call(currentObj) === '[object Array]'){
                    currentObj = currentObj[index]
                } else {
                    if (i === arrIndex.length - 1){
                        let name = currentObj.name
                        currentObj = currentObj.num[index]
                        currentObj.name = name + ` 第${index+1}列`
                    }else {
                        currentObj = currentObj.num[index].itemList
                    }
                }
            }
            if (currentObj){
                commit('setCurrentCheckItem',currentObj)
            }
        }
    }
}

export default currentCheckAttr
