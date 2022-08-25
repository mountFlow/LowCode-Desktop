<template>
  <view class="home">
    <el-container>
      <el-header style="display: flex; justify-content:space-between;">
            <view
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #409eff;
              "
            >
              <h2 >LowCode-Desktop</h2>
            </view>
            <view
              style="
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #5f5e5e;
                justify-content: flex-end;
              "
            >
            <el-button type="primary" icon="el-icon-s-finance" size="small" round @click="saveComponenet"
              >保存为组件（TODO)</el-button
            >
            <el-button type="primary" icon="el-icon-download" size="small" round @click="outPort"
              >导出代码</el-button
            >
              <el-button type="primary" icon="el-icon-search" size="small" round
                >预览</el-button
              >
              <el-avatar
                class="headPortrait"
                @click="goToGithub"
                :size="37"
                :src="'https://github.com/fluidicon.png'"
              ></el-avatar>
            </view>    
      </el-header>

      <el-container>
        <!-- 左边组件栏 -->
        <el-aside width="25%">
          <LeftComponents> </LeftComponents>
        </el-aside>
			<el-main style="position: relative">
					<template v-if="pattern==='component' || checkFile.isCanDrag === true">
						<PhoneFrame></PhoneFrame>
					</template>
					<template v-else>
						<common-file-frame></common-file-frame>
					</template>
				</el-main>
        <el-aside width="25%">
          <RightComponents></RightComponents>
        </el-aside>
      </el-container>
    </el-container>
    <el-dialog title="示例代码" :visible.sync="dialogTableVisible">
        <div>
            <pre class="code" >{{showDialogData}}</pre>
            <el-form :inline="true" :model="form" :rules="rule" ref="ruleForm" class="demo-form-inline" style="margin-top: 25px;margin-bottom: 0">
                <el-form-item label="文件名" prop="fileName">
                    <el-input v-model="form.fileName"  placeholder="输入导出文件名">
                        <span slot="suffix">.vue</span>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="copy(showDialogData)">一键复制</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">导出</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
    <el-dialog
            title="保存组件"
            :visible="saveComponentModel"
            width="30%"
            center>
           <!-- <el-form ref="addComponentsFrom" :model="addComponentsFrom" :rules="addComponentsFromRule" label-width="80px"> -->
        <el-form ref="addComponentsFrom" :model="addComponentsFrom"  label-width="80px">
            <el-form-item label="组件名称" prop="ComponentName">
                <el-input v-model="addComponentsFrom.ComponentName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="closeComponentsModel">取 消</el-button>
                <el-button type="primary" @click="yesAddComponents('addComponentsFrom')">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
  </view>
  
</template>

<script>
    import draggable from '@/common/js/vuedraggable'
    import ejs from 'ejs'
    import FileSaver     from 'file-saver'
    import JSZip from 'jszip'
    import {outExportFileByStr,outExportFileByList,outExportFolder,outExportStr,VUE_NAME} from '@/common/js/outExportFile'
   import PhoneFrame from '@/components/PhoneFrame/PhoneFrame'
    import LeftComponents from '@/components/LeftComponents/LeftComponents'
    import EuEditToolRight from '@/components/frameComponents/EuEditToolRight'
    import EuHeader from '@/components/frameComponents/EuHeader'
	import EuEditToolLeft from '@/components/frameComponents/EuEditToolLeft'
	import RightComponents from '@/components/RightComponents/RightComponents'
	import commonFileFrame from '@/components/PhoneFrame/commonFileFrame'
    import Clipboard from 'clipboard'

export default {
  data() {
    return {
        form:{
          fileName: ''
        },
        addComponentsFrom:{
            ComponentName: ''
        },
        dialogTableVisible: false,
        saveComponentModel: false,
        showDialogData: '',
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {
    goToGithub() {
      window.open("https://github.com/mountFlow/LowCode-Desktop", "_blank");
    },
    yesAddComponents(ref){
        // this.$refs[ref].validate((valid) => {
        //     if (valid) {
        //         let name = this.addComponentsFrom.ComponentName
        //         let list = this.$store.state.patternComponents.list
        //         if (list.length === 0){
        //             this.$notify.error({
        //                 title: '错误',
        //                 message: '组件内容为空！'
        //             });
        //             return false
        //         }
        //         this.$store.commit('setComponentsList',{name,list})
        //         this.$store.commit('setPatternComponentslList',{list:[]})
        //         this.closeComponentsModel()
        //     } else {
        //         return false;
        //     }
        // });
    },
    saveComponenet(){
        this.saveComponentModel = true
    },
    copy (data) {
          let input = document.createElement('input')
          input.value = data
          input.id = 'creatDom'
          document.body.appendChild(input)
          input.select()
          document.execCommand('copy')
          document.body.removeChild(input)
          this.$message({
                    message: '拷贝成功',
                    type: 'success'
                  });
        },
    
outPort(){
                let list = []
                let fileStyleAndClass = {}
                let mode = 'page'
                switch (this.$store.state.pattern) {
                    case 'page':
                        list = this.checkFile.dragList
                        this.form.fileName = this.checkFile.label.replace('.vue','')
                        fileStyleAndClass = this.checkFile.fileStyleAndClass
                        break
                    case 'component':
                        list = this.$store.state.patternComponents.list
                        mode = 'component'
                        break
                }

                let showDialogData = outExportStr(list,this.$store.state.currentCheckAttr.customClass,fileStyleAndClass,mode)
                this.showDialogData = showDialogData.replace(VUE_NAME,this.form.fileName)
                this.dialogTableVisible = true
            },
  },
  computed: {
      pattern(){
          return this.$store.state.pattern
      },
      phoneSize: {
          get(){
              return this.$store.state.phoneSize
          },
          set(val){
              let obj = {phoneSize:val}
              this.$store.commit('setPhoneSize',obj)
          }
      },
      deleteGroupName(){
          return this.$store.state.deleteGroupName
      },
      addProjectModel(){
          return this.$store.state.euEditTool.addProjectModel
      },
      addFileModel(){
          return this.$store.state.euEditTool.addFileModel
      },
      checkFile(){
          if (this.$store.state.project.checkFile){
              return this.$store.state.project.checkFile
          }
          return {}
      },
    name() {
      return this.$store.state.iflexGroup;
    },
  },
  components: {
         PhoneFrame,
            LeftComponents,
            EuHeader,
            EuEditToolLeft,
            RightComponents,
            EuEditToolRight,
			commonFileFrame
  },
};
</script>

<style lang="scss">
.home {
  width : 100%;
}
.headPortrait {
  margin-left: 20px;
}
.el-header {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.08);
  z-index: 101;
  background-color: white;
}
.el-footer {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
  border-bottom: #c8c7cc solid 1px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  height: calc(100vh - 60px);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.08);
  z-index: 99;
}
.code{
        font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
        color: #476582;
        padding: .25rem .5rem;
        margin: 0;
        font-size: 13px;
        background-color: rgba(27,31,35,.05);
        border-radius: 3px;
        user-select: text;
        text-align: left;
    }
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: calc(100vh - 60px);
  width: 50%;
  background-image: linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    ),
    linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    );
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

body > .el-container {
  margin-bottom: 40px;
}

</style>
