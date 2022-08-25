<template>

  <el-header class="header">
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
          <div class="link">
            <a href="">技术文档</a> |
            <a href="">使用文档</a>
          </div>
        </view>
      </el-col>
      <el-col :span="6"></el-col>
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
          <div style="width: 100px"></div>
          <span style="font-weight: bolder;">源码地址</span>
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
  <div class="home">
    <div class="content">
      <img src="/src/assets/logo.png" alt="">
      <div class="title">欢迎来到LowCode-Desktop</div>
      <div class="introduce">
        <div class="feature">
          <a href="">
            <h2>🖥️ 可视化界面设计</h2>
            <p>已编写好的功能无需再次编写，可以直接拿来使用</p>
          </a>
        </div>
        <div class="feature">
          <a href="">
            <h2>🖱️ 轻量级的排版方式</h2>
            <p>原先需要复杂的CSS代码，可以简化排版，轻松实现多列布局</p>
          </a>
        </div>
        <div class="feature">
          <a href="">
            <h2>🎲 快速配置组件参数</h2>
            <p>内置20多种表单组件和丰富的容器组件，支持添加自定义组件。</p>
          </a>
        </div>
        <div class="feature">
          <a href="">
            <h2>📋 一键生成VUE代码</h2>
            <p>配置完成后直接生成代码，方便编译修改</p>
          </a>
        </div>
      </div>
      <div class="mask" v-if="showModal" @click="showModal=false"></div>
      <div class="pop" v-if="showModal">
        <!-- <button @click="showModal=false" class="btn">点击出现弹框</button> -->
        <h1 style="color: black;">您想设计哪一中类型？</h1>
        <div class="select">
          <div>
            <img src="/src/assets/表单.webp" alt="" class="img">
            <el-button type="primary" round @click="goNextone">简单表单</el-button>
          </div>
          <div>
            <img src="/src/assets/程序.webp" alt="" class="img">
            <el-button type="primary" round>简单程序</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" plain @click="showModal=true">快速开始</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return {
        showModal: false
      }
    },
    methods: {
      goNextone(){
        this.$router.push({
          path: "/design"
        })
      },
      goToGithub() {
        window.open("https://github.com/mountFlow/LowCode-Desktop", "_blank");
      }
    }
  }
</script>

<style scoped>
  .header {
    border-bottom: 1px solid rgb(228, 226, 226);
  }
  .link {
    margin-left: 10px;
    font-weight: bolder;
  }
  .home {
    height: 100%;
    background-color: #fff;
  }
  .content {
    padding-top: 100px;
  }
  .title {
    color: black;
    font-weight: bolder;
    padding-top: 50px;
  }
  .introduce{
    margin: 0 auto;
    width: 1000px;
    height: 200px;
  }
  .feature{
    width: 200px;
    height: 200px;
    float: left;
    margin-left: 50px;
    margin-top: 20px;
  }
  a:hover {
    color: skyblue;
  }
  .mask {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1
  }
  .pop {
    display: inline-block;
    background-color: #fff;
    position: fixed;
    top: 100px;
    left: 300px;
    width: calc(100% - 600px);
    height:calc(100% - 200px);
    z-index: 2
  }
  .select {
    display: flex;
    height: 800px;
    width: 300px;
    margin-left: 350px;
    margin-top: 100px;
  }
  .btn {
    padding-top: 50px;
  }
  .img {
    display: block;
    margin: auto;
    width: 200px;
    height: 200px;
    padding: 10px;
  }
</style>