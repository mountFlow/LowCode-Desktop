<template>
	<div class="home">
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="25%">
					<LeftComponents></LeftComponents>
				</el-aside>
				<el-main>
					<PhoneFrame></PhoneFrame>
				</el-main>
				<el-aside width="25%">Aside</el-aside>
			</el-container>
		</el-container>
	</div>
</template>

<script>
    import PhoneFrame from '@/components/PhoneFrame/PhoneFrame'
    import LeftComponents from '@/components/LeftComponents/LeftComponents'

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
		components:{
            PhoneFrame,
            LeftComponents
		}
	}
</script>

<style>
	.el-header, .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
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
