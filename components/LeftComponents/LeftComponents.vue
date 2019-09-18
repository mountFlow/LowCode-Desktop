<template>
    <el-row>
        <el-col :span="24">
            <draggable :list="list"
                       :options="{sort:false}"
                       :group="{ name: 'people', pull: 'clone', put: false}"
                       style="position: relative;display: flex;justify-content: center">
                    <ComponentContainer v-for="item in list"
                                        :key="item.id"
                                        :name="item.name"
                                        :componentName="item.componentName">
                    </ComponentContainer>
            </draggable>
            <draggable :group="{ name: 'people'}">
                <div>
                    删除
                </div>
            </draggable>
        </el-col>
    </el-row>
</template>

<script>
    import ComponentContainer from '@/components/LeftComponents/ComponentContainer/ComponentContainer'
    import draggable from 'vuedraggable'

    export default {
        name: 'LeftComponents',
        data(){
          return {
              dragging: false,
              list: [
                  {name:'按钮',id: 0, componentName: 'uni-button'},
                  {name:'输入框',id: 1, componentName: 'Iinput'},
                  {name:'选项',id: 2, componentName: 'Iradio'}
              ]
          }
        },
        methods:{
            changeInfo(evt){
                this.listNull = []
                console.log(evt)
            }
        },
        components:{
            ComponentContainer,
            draggable
        }
    }
</script>

<style scoped>

</style>
