import projectDefaultData from 'common/js/projectDefaultData'
import {cachesFolder, getCachesFolder} from 'common/js/localStore'
import vue from 'vue'

const project = {
    state: {
        currentProjcetIndex: '', // 当前项目数据的下标
        list: [], // 项目的总数据。
        checkFile: undefined, // 选中的文件
        checkFolder: undefined // 选中的文件夹
    },
    mutations: {
        // 只能在根目录下
        addNewFolder(state, {data, currentProjcetIndex}) {
            state.list[currentProjcetIndex].listData.push(data)
        },
        addNewFile(state, {data, index, currentProjcetIndex}) {
            if (!state.list[currentProjcetIndex].listData[index].children) {
                vue.set(state.list[currentProjcetIndex].listData[index], 'children', [])
            }
            state.list[currentProjcetIndex].listData[index].children.push(data)
        },
        deleteFile(state, {folderIndexByCurrentProjcetIndex, index, currentProjcetIndex}) {
            state.list[currentProjcetIndex].listData[folderIndexByCurrentProjcetIndex].children.splice(index, 1)
        },
        setCheckFolder(state, data) {
            state.checkFolder = data
        },
        setCheckFile(state, file) {
            state.checkFile = file
        },
        setCheckFileDragList(state, list) {
            state.checkFile.draglist = list
        },
        setCurrentProjcetIndex(state, {index}) {
            state.currentProjcetIndex = index
        },
        setProjcetList(state, data) {
            state.list = data
        },
        addNewProject(state, {projectName, projectType}) {
            state.list.forEach(e => {
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
        deleteProject(state) {
            state.list.splice(state.currentProjcetIndex, 1)
            cachesFolder(state.list)
        },
        addFileToProjectByList(state) {

        }
    },
    getters: {},
    actions: {
        /**
         * 删除文件
         * @param commit
         * @param state
         * @param componentName
         */
        delCompentsFile({commit, state}, {componentName}) {
            let index = -1
            let folderIndexByCurrentProjcetIndex = -1
            let {currentProjcetIndex} = state
            let projectList = state.list[currentProjcetIndex].listData
            for (let i = 0; i < projectList.length; i++) {
                let e = projectList[i]
                if (e.label === 'components' && e.type === 'folder') {
                    folderIndexByCurrentProjcetIndex = i
                    let children = e.children
                    for (let j = 0; j < children.length; j++) {
                        if (children[j].label === componentName) {
                            index = j
                            break
                        }
                    }
                    break
                }
            }
            if (index > -1) {
                commit('deleteFile', {currentProjcetIndex, folderIndexByCurrentProjcetIndex, index})
            }
        },
        /**
         * 增加文件
         * @param commit
         * @param state
         * @param list
         * @param componentName
         */
        addCompentsFile({commit, state}, {list, componentName}) {
            // 当前项目
            let {currentProjcetIndex} = state
            let folderIndexByCurrentProjcetIndex = -1
            let projectList = state.list[currentProjcetIndex].listData
            for (let i = 0; i < projectList.length; i++) {
                let e = projectList[i]
                if (e.label === 'components' && e.type === 'folder') {
                    folderIndexByCurrentProjcetIndex = i

                    for (let j = 0; j < e.children.length; j++) {
                        let e2 = e.children[j]
                        if (e2.label === componentName + '.vue') {
                            console.log('重复则推出')
                            return
                        }
                    }
                    break
                }
            }

            let fileNodeId = 10999
            if (!projectList[folderIndexByCurrentProjcetIndex].children) {
                projectList[folderIndexByCurrentProjcetIndex].children = []
            } else {
                let _list = projectList[folderIndexByCurrentProjcetIndex].children
                if (_list.length > 0) {
                    fileNodeId = _list[_list.length - 1].id + 1
                }
            }
            let fileNode = {
                id: fileNodeId,
                type: 'vue-file',
                label: componentName + '.vue',
                isCanDrag: true,  // 是不是可以拖拽编辑不是则就是只提供展示
                dragList: list, // 可编辑list
            }

            if (folderIndexByCurrentProjcetIndex === -1) {
                // 自己建一个
                let dataId = 0
                if (projectList.length > 0) {
                    dataId = projectList[projectList.length - 1].id
                }
                let data = {
                    id: dataId,
                    type: 'folder',
                    label: 'components',
                    isCanDrag: false,  // 是不是可以拖拽编辑不是则就是只提供展示
                    children: [fileNode]
                }
                commit('addNewFolder', {data, currentProjcetIndex})
            } else {
                commit('addNewFile', {data: fileNode, index: folderIndexByCurrentProjcetIndex, currentProjcetIndex})
            }
        },
        /**
         * 删除项目
         * @param commit
         */
        deleteProject({commit}) {
            commit('setCheckFile', undefined)
            commit('deleteProject')
            commit('setCurrentProjcetIndex', {index: ''})
        },
        cachesFolder({state}) {
            cachesFolder(state.list)
        },
        /**
         * 初始化文件list ，缓存用
         */
        initProject({commit}) {
            let data = getCachesFolder()
            commit('setProjcetList', data)
        }
    }
}

export default project

