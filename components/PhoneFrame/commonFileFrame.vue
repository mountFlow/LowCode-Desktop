<template>
    <div style="height: calc(100vh - 60px);overflow:auto;background-color: rgba(27,31,35,.8);border-radius: 3px;margin: -20px">
        <pre class="code">{{fileText}}</pre>
    </div>
</template>

<script>
    let defaultTxt = '这里填写默认内容'

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
</style>
