<template>
	<div class="home">
		<el-container>
			<el-header>
				<eu-header>
				</eu-header>
			</el-header>
			<el-container>
				<el-aside width="25%">
					<LeftComponents></LeftComponents>
				</el-aside>
				<el-main style="position: relative">
					<eu-edit-tool></eu-edit-tool>
					<PhoneFrame></PhoneFrame>
				</el-main>
				<el-aside width="25%" style="padding-top: 10px">
					<RightComponents></RightComponents>
				</el-aside>
			</el-container>
		</el-container>
	</div>
</template>

<script>
    import PhoneFrame from '@/components/PhoneFrame/PhoneFrame'
    import LeftComponents from '@/components/LeftComponents/LeftComponents'
	import EuHeader from '@/components/frameComponents/EuHeader'
	import EuEditTool from '@/components/frameComponents/EuEditTool'
	import RightComponents from '@/components/RightComponents/RightComponents'

    export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		},
		computed:{
            name(){
                return this.$store.state.iflexGroup
			},
		},
		components:{
            PhoneFrame,
            LeftComponents,
            EuHeader,
            EuEditTool,
            RightComponents
		}
	}
</script>

<style lang="scss">
	.el-header, .el-footer {
		background-color: white;
		color: #333;
		text-align: center;
		line-height: 60px;
		border-bottom: #c8c7cc solid 1px;
	}

	.el-aside {
		background-color: white;
		color: #333;
		text-align: center;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		height: calc(100vh - 60px);
		width: 50%;
		display: flex !important;
		justify-content: center !important;
		overflow: hidden;
	}

	body > .el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
	}

	.el-container:nth-child(7) .el-aside {
	}

</style>
