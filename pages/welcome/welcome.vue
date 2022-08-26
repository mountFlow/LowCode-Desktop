<template>
    <div>
        <el-header class="header">
            <view style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #409eff;
        ">
                <view style="display: flex;align-items: center;">
                    <h2 style="margin-top: 5px;">LowCode-Desktop</h2>

                </view>

                <span class="link">
                    <el-button type="primary" icon="el-icon-s-order" size="small" round @click="goToGithub()"
                        style="margin-top: 10px;">教程</el-button>
                    <el-button type="primary" icon="el-icon-s-management" size="small" round @click="goToGithub()"
                        style="margin-top: 10px;">开发文档</el-button>

                    <el-avatar class="headPortrait" @click="goToGithub()" :size="37"
                        :src="'https://github.com/fluidicon.png'"></el-avatar>
                </span>
            </view>



        </el-header>

        <div class="home">
            <div class="content">
                <div style="display: flex;justify-content: center;">
                    <img src="@/static/index/logo.png" alt="">
                </div>
                <div class="introduce">
                    <div class="feature">
                        <view>
                            <h2>🖥️ 可视化界面设计</h2>
                            <p>已编写好的功能无需再次编写，可以直接拿来使用</p>
                        </view>
                    </div>
                    <div class="feature">
                        <view>
                            <h2>🖱️ 轻量级的排版方式</h2>
                            <p>原先需要复杂的CSS代码，可以简化排版，轻松实现多列布局</p>
                        </view>
                    </div>
                    <div class="feature">
                        <view>
                            <h2>🎲 快速配置组件参数</h2>
                            <p>内置20多种表单组件和丰富的容器组件，支持添加自定义组件。</p>
                        </view>
                    </div>
                    <div class="feature">
                        <view>
                            <h2>📋 一键生成VUE代码</h2>
                            <p>配置完成后直接生成代码，方便编译修改</p>
                        </view>
                    </div>
                </div>
                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible"
                  width="30%"
                  :before-close="handleClose">
                  <h1 style="color: black;">您想设计哪一种类型？</h1>
                  <div class="select">
                      <div>
                          <img src="@/static/index/表单.webp" alt="" class="img" >
                          <el-button type="primary" round @click="goNextone" style="margin-left: 50px;">简单表单</el-button>
                      </div>
                      <div>
                          <img src="@/static/index/程序.webp" alt="" class="img" >
                          <el-button type="primary" @click="goNextone" style="margin-left: 50px;" round>简单程序</el-button>
                      </div>
                  </div>
                  <span slot="footer" class="dialog-footer">
                  </span>
                </el-dialog>
            </div>
        </div>
        <div class="btn">
            <el-button type="primary" size="large" @click="dialogVisible=true" style="height: 60px;width: 150px;;">快速开始 <i
                    class="el-icon-right" style="color: #fff;"></i><i class="el-icon-edit-outline"
                    style="color: grey;"></i></el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                dialogVisible: false
            }
        },
        methods: {
            goNextone() {
                this.dialogVisible=false
                uni.navigateTo({

                    // url: 'test?id=1&name=uniapp'  c传递参数

                    url: "../index/index"

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
        display: flex;
        align-items: center;
        margin-left: 10px;
        font-weight: bolder;
    }

    .home {
        display: flex;
        align-items: center;
        height: 100%;
        background-color: #fff;
    }

    .content {
        display: block;
        padding-top: 100px;
        width: 100%;
    }

    .introduce {
        margin: 0 auto;
        width: 1000px;
        height: 200px;
        margin: 0 auto;
    }

    .feature {
        color: #3f3f3f;
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
        height: calc(100% - 200px);
        z-index: 2
    }

    .select {
        display: flex;
        height: 300px;
        width: 300px;
        margin-left: 0px;
        margin-top: 50px;
    }

    .btn {
        display: flex;
        justify-content: center;
        padding-top: 50px;
    }

    .img {
        display: block;
        margin: auto;
        width: 180px;
        height: 180px;
        padding: 10px;
        border-radius: 30px;
    }

    .headPortrait {
        margin-top: 10px;
        margin-left: 20px;
    }
</style>
