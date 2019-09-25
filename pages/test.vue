<template>
	<view>
		<button @click="xxxx">test</button>
	</view>
</template>

<script>
	import ejs from 'ejs'

	export default {
		data() {
			return {

			}
		},
		methods: {
			xxxx(){
				ejs.renderFile('../templates/index.ejs', {
							title: 'ejs-index',  // 渲染的数据key: 对应到了ejs中的title
							index: '首页'},  // 渲染的数据key: 对应到了ejs中的index
						(err, data) => {
							if (err ) {
								console.log(err);
							} else {
								console.log(data);
							}
						})
			}
		}
	}
</script>

<style>

</style>
