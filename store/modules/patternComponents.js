import vue from 'vue'

const patternComponents = {
    state: {
        list: [],
    },
    mutations: {
        setPatternComponentslList(state,data){
            state.list = data.list
        },
    },
    getters: {
    },
    actions: {
    }
}

export default patternComponents
