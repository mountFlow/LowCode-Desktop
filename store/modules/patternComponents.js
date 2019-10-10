import vue from 'vue'

const patternComponents = {
    state:{
        componentsList: {}, // 存储我的组件的list 群
        list: [], // 临时list，设计时用的
    },
    mutations: {
        setPatternComponentslList(state,data){
            state.list = data.list
        },
        setComponentsList(state,data){
            let {name,list} = data
            vue.set(state.componentsList,name,list)
        }
    },
    getters: {
    },
    actions: {
    }
}

export default patternComponents
