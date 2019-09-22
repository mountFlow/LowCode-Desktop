import Vue from 'vue'
import Vuex from 'vuex'
import currentCheckAttr from './modules/currentCheckAttr'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        list: [],
        deleteGroupName: 'layouts',
        iflexGroup: 'components',
        showFlexDraggalbeHandle: true
    },

    mutations: {
        setGlobalList(state,data){
            state.list = data.list
        },
        setShowFlexDraggalbeHandle(state,data){
            state.showFlexDraggalbeHandle = data.showFlexDraggalbeHandle
        },
        setIflexGroup(state,data){
            state.iflexGroup = data.iflexGroup
        },
        setDeleteGroupName(state,data){
            state.deleteGroupName = data.deleteGroupName
        }
    },

    getters: {
    },

    actions: {
    },

    modules:{
        currentCheckAttr
    }
})

export default store
