import projectDefaultData from 'common/js/projectDefaultData'

const project = {
    state: {
        currentProjcetIndex: '',
        list: [],
        checkFile:undefined // 选中的文件
    },
    mutations: {
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
                listData: projectDefaultData
            })
        },
    },
    getters: {
    },
    actions: {
    }
}

export default project

