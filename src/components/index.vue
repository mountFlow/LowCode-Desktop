<template>
  <view class="home">
    <el-container>
      <el-header>
        
        <el-row>
          <el-col :span="12">
            <view
              style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                color: #409eff;
              "
            >
              <h2>LowCode-Desktop</h2>
            </view>
          </el-col>
          <el-col :span="6"> </el-col>
          <el-col :span="6">
            <view
              style="
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #5f5e5e;
                justify-content: flex-end;
              "
            >
              <div style="width: 20px"></div>
              <el-button type="primary" style="margin-top: 12px" round
                >预览</el-button
              >
              <span></span>
              <el-avatar
                class="headPortrait"
                @click="goToGithub"
                :size="37"
                :src="'https://github.com/fluidicon.png'"
              />
            </view>
          </el-col>
        </el-row>
        
      </el-header>

      <el-container>
        <!-- 左边组件栏 -->
        <el-aside width="25%">
          <LeftComponents> </LeftComponents>
        </el-aside>
        <el-main>
          
						<PhoneFrame style="display:block;"></PhoneFrame>

          <!-- 		</template> -->
          <!-- 					<template v-else>
						<common-file-frame></common-file-frame>
					</template> -->
        </el-main>
        <el-aside width="25%">
          <RightComponents></RightComponents>
        </el-aside>
      </el-container>
    </el-container>
  </view>
</template>

<script>
   import PhoneFrame from './PhoneFrame/PhoneFrame.vue'
import LeftComponents from "./LeftComponents/LeftComponents.vue";
//    import EuEditToolRight from '@/components/frameComponents/EuEditToolRight'
// import EuEditToolLeft from '@/components/frameComponents/EuEditToolLeft'
import RightComponents from "./RightComponents/RightComponents.vue";
// import commonFileFrame from '@/components/PhoneFrame/commonFileFrame'

export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {
    goToGithub() {
      window.open("https://github.com/mountFlow/LowCode-Desktop", "_blank");
    },
  },
  computed: {
    pattern() {
      return this.$store.state.pattern;
    },
    checkFile() {
      if (this.$store.state.project.checkFile) {
        return this.$store.state.project.checkFile;
      }
      return {};
    },
    name() {
      return this.$store.state.iflexGroup;
    },
  },
  components: {
             PhoneFrame,
    LeftComponents,
    //          EuEditToolLeft,
             RightComponents,
    //          EuEditToolRight,
    // commonFileFrame
  },
};
</script>

<style lang="scss">
.home {
  width : 100%;
}
.headPortrait {
  margin-left: 20px;
  margin-top: 12px;
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
