const euEditTool = {
    state: {
        addProjectModel: false,
        addFileModel: false
    },
    mutations: {
        setAddProjectModel(state,data){
            state.addProjectModel = data.addProjectModel
        },
        setAddFileModel(state,data){
            state.addFileModel = data.addFileModel
        }
    },
    getters: {
    },
    actions: {
    }
}

export default euEditTool

