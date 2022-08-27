# 一、项目介绍

![img](https://lunxz0nhbn.feishu.cn/space/api/box/stream/download/asynccode/?code=M2U2MTI0Mzc3YTFiYzc3NWIxN2JmOTI5OGZjZDQ0ODBfNGI3UklUU2NpYkFxNDZJNTkwMjdZaU9jT3hVS1hrRDdfVG9rZW46Ym94Y242dzVyUlNEcmtpY2t6bUlEN1BFRGdiXzE2NjE1ODY5Nzk6MTY2MTU5MDU3OV9WNA)

![img](https://lunxz0nhbn.feishu.cn/space/api/box/stream/download/asynccode/?code=OTFjZDMzMGExYTRhNGEyZTY3M2ZjZDA4NmFjNjkxOTlfTjNnSzFZTkNvY21xa0Y2Zlk0Tm9sd2ZJdFRBdWQ2TERfVG9rZW46Ym94Y25TamxpSHVTV0l4d1VGZUlGamFVRVpnXzE2NjE1ODY5Nzk6MTY2MTU5MDU3OV9WNA)

- Lowcode-Desktop是一个基于element-ui的h5端低代码手机应用设计平台，为用户提供拖拉拽方式构建应用页面的服务。

- 项目服务地址：http://43.143.38.24/#/ ***如果原来的项目地址失效，请使用现在这个！***

- Github  地址：https://github.com/mountFlow/LowCode-Desktop

# 二、项目分工

| **团队成员** | **主要贡献**                                                 |
| ------------ | ------------------------------------------------------------ |
| 陈健明       | 负责分工、统筹开发、参与主要流程核心的研究与编写。           |
| 刘琪琪       | 负责组件的属性暴露、右侧属性面板的编写、以及代码导出功能的设计研究、服务器部署。 |
| 朱恩熹       | 负责自定义组件的json编写、左侧ui拖动工具栏的编写、以及最终的性能测试。 |
| 李文瀚       | 负责网站入口设计、网站的大致原型的设计。                     |

# 三、项目实现

### 3.1 技术选型与相关开发文档

#### 3.1.1核心技术选型

一开始我们技术构想建立手机端的低代码平台，类似手机端的视频剪辑软件剪映，考虑到兼容问题，我们整体的技术栈均是采用vue2的技术栈。

同时，使用vue能让我们使用`vue.draggable`这个很方便的拖拽组件，这是我们选择vue作为开发语言的另一大原因。

- vue2，vue-cli

- Uni-app

- vue.draggable

- element-ui

#### 3.1.2导出代码技术选型

低代码平台要想产出成果，可以通过在线部署、代码导出、文件导出等方式，这里我们选择了**代码导出**

- ejs

- ant

- jszip、file-saver

### 3.2 架构设计

> 

#### 3.2.1 定义我们的组件

- 采用`json`形式记录自定义组件的各项`props`信息

- 通过`vuex`的state令自定义组件信息全局暴露

- 不拘泥于原始的css参数，增加了许多自定义参数，形成类似**组件库**的形式

#### 3.2.2 组件拖拽的实现

- 采用`vuegraggable`的实现自定义组件拖拽

- 通过`clone`方法在拖拽的过程中实现组件复制

- 在组件复制过程中，全局为组件递增地赋予唯一id和画布`index`

#### 3.2.3 画布的实现

- 画布的底层数据结构是一个**数组****`componentList`**，通过将组件放置在数组中，实现画布的渲染

- 组件的**嵌套**通过数组的嵌套和画布的循环渲染来实现

#### 3.2.4 组件属性编辑的实现

- 单击画布上的自定义组件，自动调用`selectContent`方法，获取组件的`index`

- 从`json`中读到对应`index`的自定义组件的`propsValueMap`,获取可编辑属性

- 用户编辑暴露的属性，通过props的形式 实时反馈到画布的组件上

#### 3.2.5 页面代码的导出

- 使用`ejs`的模板引擎渲染html内容和data部分，生成元素中需要用到的类`style`

- 提供list导出组件的渲染后的递归模板，以此生成自定义代码

### 3.3 项目代码介绍

#### 3.3.1 底层自定义组件（根据element填写props，以el-button为例）

```HTML
<!-- components/basics/Ibutton.vue -->
<template>
    <div style="width: 100%;display: flex;justify-content: center;margin-top: 15px;">
      <!--  绑定store中的propsmap，得到其中传过来的参数，转为若该propvalue同步在组件处显示 -->
    <el-button v-bind="propsValueMap"
            :ref="'Ibutton-' + dataIIndex"
            @mouseup="initComponenSizeStyle('Ibutton-' + dataIIndex)"
    >{{propsValueMap.text}}</el-button>
    </div>
</template>

<script>
     //导入每个组件都必备的方法，增加代码复用
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'
    export default {
       //设置自定义组件的名称
        name: 'Ibutton',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                //设置默认的propmap值
                default: () => ([{key:'text',value:'按钮'}])
            }
        }
    }
</script>

<style >
    button{
        /*resize: both;*/
    }
</style>
```

#### 3.3.2 自定义组件的props参数数组一览（根据element填写props，以el-button为例）

```JavaScript
//store/index.js
      
            list: [
                {name: '按钮', id: 0, componentName: 'Ibutton', iStyle: {}, iClass: [],Icon:"icon iconfont icon-anniu",
                                    //propvalue的值均用来控制所有的elementui组件对应属性，对应填写即可，如果不会填可以参考别的组件
                                    propsValue: [{
                                        label: '按钮文字', key: 'text', value: '这是提交按钮', toDataOrHtml: 'html', type: 'String'
                                    },
                                    {
                                        label: '按钮尺寸', key: 'size', value: 'default', toDataOrHtml: 'html', type: 'select', select: [{ label: '默认大小', value: 'default' }, { label: '小尺寸', value: 'small' }, { label: '大尺寸', value: 'large' }]
                                    },
                                    {
                                        label: '按钮颜色', key: 'type', value: 'primary', toDataOrHtml: 'html', type: 'select', select: [{ label: '红色', value: 'danger' }, { label: '蓝色', value: 'primary' }, { label: '白色', value: 'default' }, { label: '橙色', value: 'warning' }, { label: '绿色', value: 'success' }],
                
                                    },
                                    {
                                                            label: '绑定事件', key: 'v-bind', value: 'submit', toDataOrHtml: 'html', type: 'String'
                                                        },
                                                        ]},
```

#### 3.3.3 左侧工具栏以及画板的拖拽面板

```HTML
<!-- leftcomponents.vue -->
<view>
     <!-- cloneComponent是关键的克隆组件到画布上的方法 -->
    <draggable :list="list" :clone="cloneComponent" :options="{
               sort:false
               }" 
               :group="{ name: 'components', pull: 'clone', put: false}" @choose="choosComponents"
               class="components-class"
               style="position: relative;display: flex;justify-content: center;flex-wrap: wrap;">
        <!-- 循环store的list来渲染组件面板 -->
        <ComponentContainer v-for="item in list" :key="item.id" :name="item.name" :Icon="item.Icon"
                   :componentName="item.componentName">
        </ComponentContainer>
    </draggable>
</view>
```

#### 3.3.4 组件属性的暴露与修改

```HTML
<el-tab-pane name="tab1" label="组件属性" >
                <el-card class="box-card">
                    <el-form ref="form" label-width="80px" label-position="right">
                        <el-form-item label="当前选中:">
                            <!-- 直接从store中读到当前单击选中的元素currentCompentenName -->
                            <el-tag size="large">{{currentCompentenName}}</el-tag>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card class="box-card" style="margin-top: 30px;">
                    <el-form ref="form" label-width="80px" label-position="right">
                        <!-- 对单击选中的元素进行属性的修改(修改propsValue） -->
                        <props-panel v-model="propsValue"></props-panel>
                    </el-form>
                </el-card>
</el-tab-pane>
```

#### 3.3.5 代码和文件的导出

遍历标签的自定义数据，改变其展现形式，使用ejs的模板引擎渲染html内容和data部分，生成元素中需要用到的类`style`，  提供list 导出组件的渲染后的递归模板和从list 导出组件的渲染后的模板，导出用户生成的自定义布局文件，使用`FileSaver`让用户使用单文件下载功能，`jszip`可从list中提供下载，包含文件夹下的文件。

```JavaScript
//outExportFile.js 示例
/**
 * 用于生成 在vue中components 需要的数据。自定义组件的引入数据
 * @param myComponentsMap 用户自定义生成组件的名字
 * @returns {{importCompentsStr: string, componentsObjStr: string}}
 */
let beforDisposeListToMyCompentsString = (myComponentsMap) => {
    let importCompentsStr = ""
    let componentsObjStr = "components:{\n"
    Object.keys(myComponentsMap).forEach(e=>{
        importCompentsStr += `import ${e} from '@/components/${e}'\n`
        componentsObjStr += `            ${e},\n`
    })
    componentsObjStr += '        }\n'
    return {importCompentsStr,componentsObjStr}
}
```

# 四、测试结果

- ### 4.1 功能测试

- - 链接测试
    1.   本网站的链接都能成功跳转到正确页面，如下图所示：

    2. ![img](https://lunxz0nhbn.feishu.cn/space/api/box/stream/download/asynccode/?code=YTBmNTc0MjNmNDQ3OTEwNWI1M2UwYTUzMWZlMTZhMjhfUXpVcUxQbDVheFVxanZQbFNGeEJWaUl6bmVxVTJLSTRfVG9rZW46Ym94Y252dENURFVjTXl3QVZBdnAySjJsRjBiXzE2NjE1ODY5Nzk6MTY2MTU5MDU3OV9WNA)

    3.   此“简单表单”按钮可成功跳转至创建表单页面。
  - 增删改功能测试
  -  组件进行增删改操作后，页面能及时更新、系统也会有相应提示。以按钮为例：

  -  下图测试了本网站可通过拖拽成功**添加**按钮组件

  - ![img](https://lunxz0nhbn.feishu.cn/space/api/box/stream/download/asynccode/?code=MWFjNWNiMTA5OGJkZTU3ODM3ZGQzYzBiZGNhZmFkNzRfUzVFMGhNbkNUcWg0RDhPVUd3dDJhQ2o3QzhwWU1OdjZfVG9rZW46Ym94Y25HbjhwbGlRRzZoaWdVbjVwZnFUbFRnXzE2NjE1ODY5Nzk6MTY2MTU5MDU3OV9WNA)

  -  下图测试了本网站可通过右键成功**删除**按钮组件

  - ![img](https://lunxz0nhbn.feishu.cn/space/api/box/stream/download/asynccode/?code=ODI4ZmFhOTRlZGE4MDEyMDQwZGI5NGQ4MTg4ZGY4NjJfUXVSSktxRFJWZjRkRVVsZ1hqdjBKcnM4bVpyOFVsYU9fVG9rZW46Ym94Y25ESGdENkg4QzR4YnJRZm9BMUkycXVjXzE2NjE1ODY5Nzk6MTY2MTU5MDU3OV9WNA)

  -  下图测试了本网站可通过**修改**属性表单内容修改按钮组件

  - ![img](https://lunxz0nhbn.feishu.cn/space/api/box/stream/download/asynccode/?code=Yjk5MjQ0YTAzZjJiZDliNDlmYzc3ODM0Yjg2ZWQzZGRfMHpnUVg1akwzSlFBV29nbDYzNUFSRlF2WnlocnZYNG9fVG9rZW46Ym94Y25wYkt5Y05QMnlQaVpyUXpOS2t1NzljXzE2NjE1ODY5Nzk6MTY2MTU5MDU3OV9WNA)

  - 输入测试
  -  输入各字符时，本网站不会出现乱码、信息重复等错误。

  - 表单测试
  -  若表单内输入信息不合理时，会有相应提示。如，当输入进度条组件默认百分比时，输入数值超过100，下方会有相应的红字提示。

- ### 4.2 性能测试

- - 网络负载评估
  -  后台尚未编写，暂时没有网络负载

  - 页面性能
  -  如下图所示：

  - ![img](https://lunxz0nhbn.feishu.cn/space/api/box/stream/download/asynccode/?code=MGQwNWIyNzM4NWNjNzAzNGI0ZDczNWRiOThlMzk1ZjZfMDg0MlRZcU5XYlRHQUd3OXFYVkx2S0hzOEpJVHdiYWxfVG9rZW46Ym94Y245Yk10SUZGRFlvbWF0a2ZHaGV2UjJnXzE2NjE1ODY5Nzk6MTY2MTU5MDU3OV9WNA)

  -  本网站页面性能良好，负载不高，基本都是js

# 五、项目总结与反思

### 1.目前仍存在的问题

- 导出为.vue文件功能尚在制作中

- 很有很多组件没有完成props的配置

- 局限性较强，布局组件较少且很不灵活

- 多层嵌套的时候出bug的记录较大

- 导出代码的模板有格式bug

- store数据太多，载入会导致进入编辑界面的时候出现卡顿

- 不能为用户提供处理事件的解决方案

### 2.识别出的优化项

- 正在跨马加鞭继续各个适应性组件的编写！

- 继续优化代码生成模板，减少错误的出现

- 继续开发更多的布局组件

#### 3.架构演进的可能性

- 为本站增加对事件的处理（重难点！！）

#### 4.项目过程中的反思与总结

- 本项目，我们在众多大牛的基础上，开始了低代码世界的探索，翻阅了许多低代码系统相关的代码与资料，了解了许多关于低代码底层相关的知识，知道了如何自定义组件、如何利用props暴露组件属性、如何去修改属性。总的来说，这次项目实训我们收获了很多

- 同时，这次团队协作让我们对git的了解又更进一步，同时也让我们更好的掌握了和他人分工协作的本领。

- 当然有优点也有不足，在这次代码编写的过程中，由于在编写底层逻辑时，没有事先有一个比较详尽的数据流规划，导致部分代码复用性极差，效率很低，这也提醒了我们项目设计规划的重要性。