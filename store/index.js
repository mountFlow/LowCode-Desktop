import Vue from 'vue'
import Vuex from 'vuex'
import currentCheckAttr from './modules/currentCheckAttr'
import euEditTool from './modules/euEditTool'
import project from './modules/project'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        list: [],
        deleteGroupName: 'layouts',
        iflexGroup: 'components',
        showFlexDraggalbeHandle: true,
        preview: true,
        phoneSize: 100
    },
    mutations: {
        setPhoneSize(state,data){
            state.phoneSize = data.phoneSize
        },
        setPreview(state,data){
            state.preview = data.preview
        },
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
        currentCheckAttr,
        euEditTool,
        project
    }
})

export default store
