import projectDefaultData from 'common/js/projectDefaultData'
import {cachesFolder,getCachesFolder} from 'common/js/localStore'

const project = {
    state: {
        currentProjcetIndex: '',
        list: [], // 项目的总数据。
        checkFile:undefined, // 选中的文件
        checkFolder: undefined // 选中的文件夹
    },
    mutations: {
        setCheckFolder(state,data){
            state.checkFolder = data
        },
        setCheckFile(state,file){
            state.checkFile = file
        },
        setCheckFileDragList(state,list){
            state.checkFile.draglist = list
        },
        setCurrentProjcetIndex(state,{index}){
            state.currentProjcetIndex = index
        },
        setProjcetList(state,data){
            state.list = data
        },
        addNewProject(state,{projectName,projectType}){
            state.list.forEach(e=>{
                if (projectName === e.projectName) {
                    throw {msg: '已存在同名项目名！'}
                }
            })
            state.list.push({
                projectName: projectName,
                projectType: projectType,
                listData: JSON.parse(JSON.stringify(projectDefaultData))
            })
            cachesFolder(state.list)
        },
        deleteProject(state){
            state.list.splice(state.currentProjcetIndex,1)
            cachesFolder(state.list)
        },
        addFileToProjectByList(state){

        }
    },
    getters: {
    },
    actions: {
        deleteProject({commit}){
            commit('setCheckFile',undefined)
            commit('deleteProject')
            commit('setCurrentProjcetIndex',{index:''})
        },
        cachesFolder({state}){
            cachesFolder(state.list)
        },
        /**
         * 初始化文件list ，缓存用
         */
        initProject({commit}){
            let data = getCachesFolder()
            commit('setProjcetList',data)
        }
    }
}

export default project

