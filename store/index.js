import Vue from 'vue'
import Vuex from 'vuex'
import currentCheckAttr from './modules/currentCheckAttr'
import euEditTool from './modules/euEditTool'
import project from './modules/project'
import patternComponents from './modules/patternComponents'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        pattern: 'page',
        list: [],
        deleteGroupName: 'layouts',
        iflexGroup: 'components',
        showFlexDraggalbeHandle: true,
        preview: true,
        phoneSize: 100
    },
    mutations: {
        setPattern(state,data){
            state.pattern = data.pattern
        },
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
        /**
         * 初始化缓存数据
         * @param dispatch
         */
        initData({dispatch}){
            dispatch('initProject')
            dispatch('initCustomClass')
            dispatch('initFromStyleList')
            dispatch('initComponentsList')
        }
    },

    modules:{
        currentCheckAttr,
        euEditTool,
        project,
        patternComponents
    }
})

export default store
