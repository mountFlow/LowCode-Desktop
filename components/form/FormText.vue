<template>
    <view class="cu-form-group ">
        <textarea maxlength="-1"  @input="textareaAInput" placeholder="多行文本输入框"></textarea>
    </view>
</template>

<script>
    export default {
        name: "FormText",
        data(){
            return{
                textareaAValue: ''
            }
        },
        methods:{
            textareaAInput(e) {
                this.textareaAValue = e.detail.value
            },
        }
    }
</script>

<style scoped>
    .cu-form-group{
        zoom: .19;
    }
</style>
