<template>
  <div class="tab-container">
    <el-tabs type="border-card" model-value="tab1">
      <el-tab-pane name="tab1" label="组件库" style="margin: -18px">
        <el-collapse model-value="1" accordion>
          <el-collapse-item name="1">
            <template #title>
              <span style="margin-left: 22px; font-size: 1.1em">基础组件</span>
            </template>
            <el-row style="margin-top: -30px">
              <draggable
                :list="moduleInfo1"
                :group="{ name: 'layouts', pull: 'clone', put: false}"
                :sort="false"
                @change="log"
                :move="checkMove"
                style="
                  position: relative;
                  display: flex;
                  justify-content: center;
                  flex-wrap: wrap;
                "
              >
                <el-col :span="4" v-for="item in moduleInfo1" :key="item.id">
                  <div class="module_area">
                    <div :class="'icon iconfont ' + item.mIcon"></div>
                    <view class="module_name">{{ item.mName }}</view>
                  </div>
                </el-col>
              </draggable>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane name="tab-pane-85618" label="表单模板"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import ComponentContainer from '@/components/LeftComponents/ComponentContainer/ComponentContainer'
// import draggable from '@/common/js/vuedraggable'
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";

export default defineComponent({
  name: "LeftComponents",
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      enabled: true,
      moduleInfo1: [
        {
          mName: "按钮",
          mIcon: "icon-anniu",
          id: 1,
        },
        {
          mName: "单行输入框",
          mIcon: "icon-danhangshurukuang",
          id: 2,
        },
        {
          mName: "多行输入框",
          mIcon: "icon-duohangshurukuang",
          id: 3,
        },
        {
          mName: "开关",
          mIcon: "icon-kaiguan",
          id: 4,
        },
        {
          mName: "单行文本",
          mIcon: "icon-wenben",
          id: 5,
        },
        {
          mName: "图标",
          mIcon: "icon-tubiao",
          id: 6,
        },
        {
          mName: "选项",
          mIcon: "icon-xuanxiang",
          id: 7,
        },
        {
          mName: "图像",
          mIcon: "icon-tuxiang",
          id: 8,
        },
        {
          mName: "滑动输入",
          mIcon: "icon-huadongshuru",
          id: 9,
        },
        {
          mName: "进度条",
          mIcon: "icon-jindutiao_fuzhi",
          id: 10,
        },
      ],
      moduleInfo2: [],
      dragging: false,
    };
  },
  methods: {
    add() {
      console.log("add");
    },
    replace() {
      console.log("replace");
    },
    checkMove(event) {
      console.log("checkMove", event.draggedContext);
      console.log("Future index: " + event.draggedContext.futureIndex);
    },
    log(event) {
      const { moved, added } = event;

      if (moved) console.log("moved", moved);
      if (added) console.log("added", added, added.element);
    },
  },
});
</script>

<style>
.title {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  color: #409eff;
}

/* 组件图标 */
.module_icon {
  /* font-size: 50px; */
  text-align: center;
}

/* 组件栏 */
.module_area {
  /* margin-bottom: 20px; */
  margin-top: 20px;
  /* background-color: aqua; */
  /* margin-left: 30%; */
}

/* 组件名称 */
.module_name {
  margin: 0 auto;
  text-align: center;
  padding-top: 10rpx;
  font-size: 10px;
  color: #7f7f7f;
}

.clone-grid {
  display: flex;
}
</style>
