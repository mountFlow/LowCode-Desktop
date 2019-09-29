import projectDefaultData from 'common/js/projectDefaultData'

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
        addNewProject(state,{projectName,projectType}){
            state.list.push({
                projectName: projectName,
                projectType: projectType,
                listData: JSON.parse(JSON.stringify(projectDefaultData))
            })
        },
        deleteProject(state){
            state.list.splice(state.currentProjcetIndex,1)
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
    }
}

export default project

