<template>
    <radio-group class="block" @change="RadioChange">
        <view class="cu-form-group ">
            <view class="title">单选操作(radio)</view>
            <radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
        </view>
        <view class="cu-form-group ">
            <view class="title">单选操作2(radio)</view>
            <radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
        </view>
    </radio-group>
</template>

<script>
    export default {
        name: "FormRadio",
        data(){
            return {
                radio: 'A',
            }
        },
        methods:{
            RadioChange(e) {
                this.radio = e.detail.value
            },
        }
    }
</script>

<style scoped>
    .cu-form-group{
        zoom: .19;
    }

    radio{
        zoom: 5;
        font-size: 1em;
    }

</style>
