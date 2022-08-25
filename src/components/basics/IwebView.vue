<template>
    <web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html" style="height: 55px;width: 75px;overflow: hidden;"></web-view>
</template>

<script>
    export default {
        name: 'IwebView',
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
