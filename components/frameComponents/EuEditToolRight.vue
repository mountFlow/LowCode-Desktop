<template>
    <div class="tool">
        <template v-if="(pattern === 'page') && (checkFile && checkFile.isCanDrag === true)">
            <div class="tool-item" >
                <el-tooltip class="item" effect="dark" content="选择背景样式" placement="right">
                    <div class="tool-item-icon" @click="checkBackgrand" style="color: white;font-size: 14px;">
                        背景
                    </div>
                </el-tooltip>
            </div>
        </template>
    </div>
</template>

<script>

    export default {
        name: 'EuEditTool',
        data(){
            return {
                color1:'#FFFFFF'
            }
        },
        methods:{
            checkBackgrand(){
                this.$store.dispatch('setCurrentCheckAttrNameComputedByBackGrand')
                this.$store.commit('setRightAideTabActiveName',{rightAideTabActiveName:'first'})
            }
        },
        computed:{
            pattern(){
                return this.$store.state.pattern
            },
            checkFile(){
                if (this.$store.state.project.checkFile){
                    return this.$store.state.project.checkFile
                }
                return {}
            },
        },
        components:{
        }
    }
</script>

<style scoped lang="scss">
    .tool{
        $toolWidth: 50px;

        position: absolute;
        right: 10px;
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
             background-color: #d5d7ff;
             display: flex;
             justify-content: center;
             align-items: center;
             border-radius: $toolWidth;
            box-shadow: 0 2px 11px 3px rgba(0, 0, 0, 0.15), 0 0 6px 0px rgba(0, 0, 0, 0.04)
         }
    }
    }

    .code{
        font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
        color: #476582;
        padding: .25rem .5rem;
        margin: 0;
        font-size: 13px;
        background-color: rgba(27,31,35,.05);
        border-radius: 3px;
        user-select: text;
        text-align: left;
    }

</style>
