<template>
    <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            draggable
            @node-click="nodeClick"
            :allow-drop="allowDrop"
            :allow-drag="allowDrag">
         <span class="custom-tree-node" slot-scope="{ node, data }">
              <template v-if="data.type === 'folder'">
                  <span><i class="el-icon-folder" style="margin-right: 5px"></i>{{ node.label }}</span>

                   <div>
                     <i class="el-icon-upload" style="margin-right: 5px"></i>
                    <i class="el-icon-plus" style="margin-right: 5px"></i>
                    <i class="el-icon-delete" style="margin-right: 5px"></i>
                </div>
              </template>
             <template v-else>
                     <span><svg class="icon" aria-hidden="true">
                          <use v-bind:xlink:href="'#icon' + data.type"></use>
                        </svg>{{ node.label }}</span>

                <div>
                     <i class="el-icon-upload" style="margin-right: 5px"></i>
                    <i class="el-icon-delete" style="margin-right: 5px"></i>
                </div>
              </template>
         </span>
    </el-tree>
</template>

<script>
    import iconFont from 'static/iconfont'

    export default {
        name: "FilePanel",
        data() {
            return {}
        },
        methods: {
            nodeClick(data, node, component){
                this.$store.commit('setCheckFile',data)
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
            }
        },
        computed:{
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
</style>
