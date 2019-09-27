<template>
    <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag">
         <span class="custom-tree-node" slot-scope="{ node, data }">
              <template v-if="data.type === 'folder'">
                  <span><i class="el-icon-folder" style="margin-right: 5px"></i>{{ node.label }}</span>
              </template>
             <template v-else-if="data.type === 'vue-file'">
                  <span><i class="el-icon-sunny" style="margin-right: 5px"></i>{{ node.label }}</span>
              </template>
             <template v-else>
                  <span><i class="el-icon-sunny" style="margin-right: 5px"></i>{{ node.label }}</span>
              </template>
         </span>
    </el-tree>
</template>

<script>
    export default {
        name: "FilePanel",
        data() {
            return {
                data: [{
                    id: 31,
                    label: 'components',
                    type: 'folder',
                    children: [{
                        id: 43,
                        label: '二级 1-1',
                        children: [{
                            id: 39,
                            label: '三级 1-1-1'
                        }, {
                            id: 130,
                            label: '三级 1-1-2'
                        }]
                    }]
                },{
                    id: 1,
                    label: 'pages',
                    type: 'folder',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: 'static',
                    type: 'folder',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    type: 'vue-file',
                    label: 'App.vue'
                },{
                    id: 11,
                    type: 'vue-file',
                    label: 'main.js'
                },{
                    id: 12,
                    type: 'vue-file',
                    label: 'manifest.json'
                },{
                    id: 13,
                    type: 'vue-file',
                    label: 'pages.json'
                },{
                    id: 14,
                    type: 'vue-file',
                    label: 'uni.scss'
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            handleDragStart(node, ev) {
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.label, dropType);
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
        }

    }
</script>

<style scoped>

</style>
