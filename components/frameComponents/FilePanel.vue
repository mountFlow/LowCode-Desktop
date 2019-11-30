<template>
    <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            draggable
            @node-click="nodeClick"
            @node-drop="nodeChange"
            :expand-on-click-node="false"
            :allow-drop="allowDrop"
            :allow-drag="allowDrag">
         <span class="custom-tree-node" slot-scope="{ node, data }">
              <template v-if="data.type === 'folder'">
                  <span><i class="el-icon-folder" style="margin-right: 5px"></i>{{ node.label }}</span>

                   <div style="color: #ccc" >
                     <i class="el-icon-upload right-icon" style="margin-right: 5px" @click="updateFolder(data)"></i>
                        <i class="el-icon-plus right-icon" @click="addFile(data,node)" style="margin-right: 5px"></i>
                       <!--<i class="el-icon-edit right-icon" style="margin-right: 5px"></i>-->
                    <i class="el-icon-delete right-icon" style="margin-right: 5px" @click="deleteFolder(node,data)"></i>
                </div>
              </template>
             <template v-else>
                     <span><svg class="icon" aria-hidden="true">
                          <use v-bind:xlink:href="'#icon' + data.type"></use>
                        </svg>{{ node.label }}</span>
                <div style="color: #ccc">
                     <i class="el-icon-upload right-icon" style="margin-right: 5px" @click.stop="updateFile(data)"></i>
                    <!--<i class="el-icon-edit right-icon" style="margin-right: 5px"></i>-->
                    <i class="el-icon-delete right-icon" style="margin-right: 5px" @click.stop="deleteFolder(node,data,$event)"></i>
                </div>
              </template>
         </span>
    </el-tree>
</template>

<script>
    import iconFont from 'static/iconfont'
    import {outCommonExportFile,outExportFolder,outExportStr,outExportFileByStr} from 'common/js/outExportFile'

    export default {
        name: "FilePanel",
        data() {
            return {}
        },
        methods: {
            nodeChange(){
                this.$store.dispatch('cachesFolder')
            },
            nodeClick(data, node, component){
                if (data.type !== 'folder'){

                    // 翻译普通模板文件
                    if (data.isCanDrag !== true ){
                        let params = data.params
                        data.fileText = outCommonExportFile(data.label,{projectName:this.currentProjcetNam, ...params})
                    }
                    // 组件模式
                    if ( data.id >= 10999){
                        this.$store.commit('setPattern',{pattern: 'component'})
                        let list = JSON.parse(JSON.stringify(data.dragList).replace(/SimpleIflex/g,'Iflex'))
                        this.$store.commit('setPatternComponentslList',{list})
                    }else {
                        this.$store.commit('setCheckFile',data)
                    }
                }
            },
            allowDrop(draggingNode, dropNode, type) {
                if (dropNode.data.label === '二级 3-1') {
                    return type !== 'inner';
                } else {
                    return true;
                }
            },
            allowDrag(draggingNode) {
                return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
            },
            addFile(data,node){
                // 这里data是个指针，所以打算直接传出去。
                this.$store.commit('setCheckFolder',data)
                this.$store.commit('setAddFileModel',{addFileModel: true})
            },
            updateFolder(data){
                let {children,label} = data
                if (children === undefined || children.length === 0){
                    this.$notify({
                        title: '导出失败',
                        message: '导出的目录为空',
                        type: 'warning'
                    });
                    return
                }
                let customClass = this.$store.state.currentCheckAttr.customClass
                outExportFolder(label,children,customClass,{})
            },
            updateFile(data){
                let fileText = ''
                if (data.isCanDrag === true){
                    let {fileStyleAndClass} = data
                    let mode = 'page'
                    if (!fileStyleAndClass){
                        fileStyleAndClass = {}
                        mode = 'components'
                    }
                    let customClass = this.$store.state.currentCheckAttr.customClass
                    fileText = outExportStr(data.dragList,customClass,fileStyleAndClass,mode)
                } else {
                    fileText = outCommonExportFile(data.label,{projectName:this.currentProjcetNam})
                }
                outExportFileByStr(data.label,fileText)
            },
            deleteFolder(node,data,e){
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
                this.$store.dispatch('cachesFolder')
                return false
            }
        },
        computed:{
            currentProjcetNam() {
                let {currentProjcetIndex,list} = this.$store.state.project
                if (currentProjcetIndex !== ''){
                    return list[currentProjcetIndex].projectName
                }
                return ''
            },
            data(){
                let {list,currentProjcetIndex } = this.$store.state.project
                if (currentProjcetIndex !== ''){
                    return list[currentProjcetIndex].listData
                }
                return []
            }
        }
    }
</script>

<style scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        margin-right: 5px;
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 8px;
    }

    .right-icon:hover{
        color: #3F536E;
    }
</style>
