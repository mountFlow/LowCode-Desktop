const currentCheckAttr = {
    state: {
        item: undefined
    },
    mutations: {
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
                    currentObj = currentObj.num[index].itemList
                }
            }
            if (currentObj){
                commit('setCurrentCheckItem',currentObj)
            }
        }
    }
}

export default currentCheckAttr
