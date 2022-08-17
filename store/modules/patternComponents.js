import vue from 'vue'
import {getCachesPatternComponents, cachesPatternComponents} from 'common/js/localStore'

const patternComponents = {
    state: {
        componentsList: {}, // 存储我的组件的list 群
        list: [], // 临时list，设计时用的
    },
    mutations: {
        setPatternComponentslList(state, data) {
            state.list = data.list
        },
        initComponentsList(state, obj) {
            state.componentsList = obj
        },
        deleteComponentsListKey(state, data) {
            state.componentsList[data.key] = undefined
            vue.delete(state.componentsList, data.key)
            cachesPatternComponents(state.componentsList)
        },
        setComponentsList(state, data) {
            let {name, list} = data
            vue.set(state.componentsList, name, list)
            cachesPatternComponents(state.componentsList)
        }
    },
    getters: {},
    actions: {
        initComponentsList({commit}) {
            commit('initComponentsList', getCachesPatternComponents())
        }
    }
}

export default patternComponents
