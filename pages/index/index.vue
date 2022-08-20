<template>
    <view class="home">
        <el-container>
			
            <el-header>
                <el-row>
                    <el-col :span="6">
                        <view style="display: flex;justify-content: flex-start;align-items: center;color: #409eff;">
                            <h2>LowCode-Desktop</h2>
                        </view>
                    </el-col>
                    <el-col :span="12">
                    </el-col>
                    <el-col :span="6">

                        <view
                            style="display: flex;align-items: center;font-size: 14px;color: #5f5e5e;justify-content: flex-end">
                            <div style="width: 20px;"></div>
                            <el-button type="primary" style="margin-top: 12px" round>预览</el-button>
                            <span ></span>
                            <a href="https://github.com/mountFlow/LowCode-Desktop" target="_blank" class="headPortrait">
                                <el-image style="width: 40px; height: 40px;border-radius: 40px;cursor: pointer"
                                    src="https://github.com/fluidicon.png" fit="fill"></el-image>
                            </a>
                      </view>
                    </el-col>
                </el-row>
            </el-header>
			
			
            <el-container>
				<!-- 左边组件栏 -->
                <el-aside width="25%">
                    <LeftComponents>
					</LeftComponents>
                </el-aside>
                <el-main style="position: relative">
                    <!-- 					<eu-edit-tool-left></eu-edit-tool-left>
					<eu-edit-tool-right></eu-edit-tool-right> -->
                    <!-- 					<template v-if="pattern==='component' || checkFile.isCanDrag === true">
						<PhoneFrame></PhoneFrame>
					</template> -->
                    <!-- 					<template v-else>
						<common-file-frame></common-file-frame>
					</template> -->
                </el-main>
                <el-aside width="25%" style="padding-top: 10px">
                    				<RightComponents></RightComponents>
                </el-aside>
            </el-container>
        </el-container>
    </view>
</template>

<script>
    //    import PhoneFrame from '@/components/PhoneFrame/PhoneFrame'
    import LeftComponents from '@/components/LeftComponents/LeftComponents'
    //    import EuEditToolRight from '@/components/frameComponents/EuEditToolRight'
    //    import EuHeader from '@/components/frameComponents/EuHeader'
    // import EuEditToolLeft from '@/components/frameComponents/EuEditToolLeft'
    import RightComponents from '@/components/RightComponents/RightComponents'
    // import commonFileFrame from '@/components/PhoneFrame/commonFileFrame'

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
        computed: {
            pattern() {
                return this.$store.state.pattern
            },
            checkFile() {
                if (this.$store.state.project.checkFile){
                    return this.$store.state.project.checkFile
                }
                return {}
            },
            name() {
                 return this.$store.state.iflexGroup
            },
        },
        components: {
            //          PhoneFrame,
                    LeftComponents,
            //          EuHeader,
            //          EuEditToolLeft,
            //          RightComponents,
            //          EuEditToolRight,
            // commonFileFrame
        }
    }
</script>

<style lang="scss">
    .headPortrait {
       position: relative;
       width: 50px;
       display: flex;
       justify-content: center;
       align-items: center;
       margin-left: 20px;
       margin-top: 12px;
    }
    
    .el-header,
    .el-footer {
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 60px;
        border-bottom: #c8c7cc solid 1px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        z-index: 100;
    }

    .el-aside {
        background-color: white;
        color: #333;
        text-align: center;
        height: calc(100vh - 60px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        z-index: 99;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        height: calc(100vh - 60px);
        width: 50%;
        background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0), linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
        background-size: 20px 20px;
        background-position: 0 0, 10px 10px;
    }

    body>.el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {}

    .el-container:nth-child(7) .el-aside {}
</style>
