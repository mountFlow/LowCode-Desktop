<template>
	<el-row>
		<el-col :span="22" :offset="1" style="">
	  <el-tabs
	    v-model="activeName"
	    type="card"
	    class="demo-tabs"
	    @tab-click="handleClick"
	  >
	    <el-tab-pane label="属性" name="first">
			<el-form label-width="80px" label-position="right">
				<el-form-item label="组件名称">
				    <el-input :value="currentCompentenName" disabled size="mini"></el-input>
				</el-form-item>
				  <el-divider><span style="color: #DCDFE6">属性</span></el-divider>
				  
				  <el-form-item label="设置类" >
				      <el-select multiple style="width: 100%" v-model="iClass"  size="small" placeholder="请选择现有的类">
				          <el-option >
				          </el-option>
				      </el-select>
				  </el-form-item>
				  <style-panel></style-panel>
			</el-form>
		</el-tab-pane>
	   
		</el-tabs>
	  </el-col>
	</el-row>
</template>

<script>
	import stylePanel from './styleComponents/stylePanel.vue'
	export default {
		name:"RightComponents",
		components:{
			stylePanel
		},
		data() {
			return {
				activeName:'first'
			};
		},
		methods:{
			 handleClick(tab, event) {
			        console.log(tab, event);
			      }
		},
		
	}
</script>

<style lang="scss">
	::v-deep .el-tabs__nav {
		transform: translateX(40px) !important;
	
		
	}
	.el-form-item{
	    margin-bottom: 5px;
	}	
	
</style>