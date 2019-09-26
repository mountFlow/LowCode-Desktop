<template>
    <div class="tool">

        <div class="tool-item">
            <el-tooltip class="item" effect="dark" content="把组件托到这里删除" placement="right">
                <draggable :group="{ name: deleteGroupName}"
                           :options="{
                       }"
                           :sort="false"
                           class="tool-item-icon"
                >
                    <i class="el-icon-delete-solid" style="font-size: 23px;color: white;"></i>
                </draggable>
            </el-tooltip>
        </div>
        <div class="tool-item">
            <el-tooltip class="item" effect="dark" content="点击导出uni代码" placement="right">
                <div class="tool-item-icon" @click="outPort">
                    <i class="el-icon-upload" style="font-size: 23px;color: white;"></i>
                </div>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
    import draggable from '@/common/js/vuedraggable'
    import ejs from 'ejs'
    import FileSaver     from 'file-saver'
    import JSZip from 'jszip'
    import {outExportFile} from '@/common/js/outExportFile'

    export default {
        name: 'EuEditTool',
        methods:{
            outPort(){
                // let x = ejs.render(xxx,{list:this.$store.state.list})
                // console.log(x)
                //
                // const zip = new JSZip()
                // let test = zip.folder("test");
                // const fileName = 'test.vue'
                // const fileName2 = 'test2.vue'
                // test.file(fileName, x)
                // zip.file(fileName2, x)
                // zip.generateAsync({
                //     type: "blob"
                // }).then((blob) => {
                //     FileSaver.saveAs(blob, `test.zip`)
                // }, (err) => {
                //     alert('导出失败')
                // })

                outExportFile('a.vue',this.$store.state.list)

            }
        },
        computed:{
            deleteGroupName(){
                return this.$store.state.deleteGroupName
            }
        },
        components:{
            draggable
        }
    }
</script>

<style scoped lang="scss">
    .tool{
        $toolWidth: 50px;

        position: absolute;
        left: 10px;
        top: 20px;
        width: $toolWidth;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;

    &-item{
         width: $toolWidth;
         height: $toolWidth;
         display: flex;
         justify-content: center;
         align-items: center;
         cursor: pointer;

    &-icon{
         width: $toolWidth * 0.8;
         height: $toolWidth * 0.8;
         background-color: #ff5b3d;
         display: flex;
         justify-content: center;
         align-items: center;
         border-radius: $toolWidth;
        box-shadow: 0 2px 11px 3px rgba(0, 0, 0, 0.15), 0 0 6px 0px rgba(0, 0, 0, 0.04)
     }
    }
    }
</style>
