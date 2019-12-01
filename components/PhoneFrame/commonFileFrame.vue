<template>
    <div style="height: calc(100vh - 60px);overflow:auto;background-color: rgba(27,31,35,.8);border-radius: 3px;margin: -20px">
        <pre v-if="showDefaultTxt" class="code">{{fileText}}</pre>
        <div v-if="!showDefaultTxt" style="top: 0;left:0;bottom:0;right:0;position: relative;height: 100%;width: 100%;color: white;">
            <div class="left-tip">← 组件拖拽处</div>
            <div class="right-tip">项目或组件编辑区 →</div>
            <div class="top-tip"> ↑ <br/>编辑模式</div>
            <div class="center-tip">
                <p>.所有组件采用拖拽方式。</p>
                <p>.样式改变即使生效。</p>
                <p>.必须先布局再组件，组件只能放在布局里</p>
                <p>.几乎任何编辑都会实时保存到浏览器中。</p>
                <p>.项目还不成熟稳定，可以与我一同改进。</p>
            </div>
        </div>
    </div>
</template>

<script>
    let defaultTxt = '1.必须先布局再组件，组件只能放在布局里'

    export default {
        name: "commonFileFrame",
        data(){
            return {
            }
        },
        computed: {
            fileText(){
                if (this.$store.state.project.checkFile){
                    return this.$store.state.project.checkFile.fileText
                }
                return defaultTxt
            },
            showDefaultTxt(){
                if (this.$store.state.project.checkFile){
                    return true
                }
                return false
            }
        }
    }
</script>

<style scoped>
    .code{
        font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
        color: #eaeaea;
        padding: .25rem .5rem;
        margin: 0;
        font-size: 13px;
        user-select: text;
        text-align: left;
    }

    .left-tip{
        position: absolute;
        left: 10px;
        top: 50%;
    }

    .right-tip{
        position: absolute;
        right: 10px;
        top: 50%;
    }

    .top-tip{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10px;
        text-align: center;
    }

    .center-tip{
        width: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
</style>
