# dragUI
## 文档目录
- [在线演示](#在线演示)
- [效果图](#效果图)
- [快速开始](#快速开始)
- [致开发者](#致开发者)
    - [项目目录](#项目目录)
    - [主要数据结构](#主要数据结构)
- [基于](#基于)
- [say](#say)
- [后续](#后续)
- [hope](#hope)
## 用于UNI可拖拽可视化编程
## 在线演示
[demo地址](https://wozhishilaonanhai.github.io/dragUI/unpackage/dist/build/h5/index.html#/)
<br>一个简单创建hello world 界面的视频,github不会放视频，放在bilibli了<br>
[dragUI 演示视频](https://www.bilibili.com/video/av77837279/)
## 效果图
![](https://github.com/wozhishilaonanhai/dragUI/blob/master/static/demo/demo1.png)
## 快速开始
 参考uni官网安装普通uni项目([运行uni-app](https://uniapp.dcloud.io/quickstart?id=%e8%bf%90%e8%a1%8cuni-app))运行到浏览器<br/>
 另需要手动下载包`npm install`

## 致开发者 
#### 项目目录
- colorui
- common -----------------------_公共方法_
    - js
        - localStore.js --------_本地存储方法_
        - outExportFile.js -----_项目导出成代码的方法_
        - vue-context-menu.js --_提供右键点击，添加了项目需要的事件反馈数据_
        - vuedraggable.js ------_vue拖拽js_
    - style
- components 
    - basics -------------------_基础拖拽组件_
    - colorUi ------------------_第三方colorUI组件_
    - form ---------------------_第三方表单组件_
    - frameComponents --------- _编辑面板组件_
    - LeftComponents -----------_左侧组件_
    - PhoneFrame ---------------_拖拽主要区域_
    - RightComponents ----------_右侧样式编辑面包_
- pages ------------------------_页面_
- static  ----------------------_静态文件_
- templates --------------------_渲染模板文件_
- store ------------------------_vuex_

#### 主要数据结构
`stroe.project.list`存放整个项目数据：<br>
```
list:[
    {
        listData: [
            {
                children: [...],
                id: 1,
                label: '项目名',
                path: '项目相对路径',
                type: 'folder' or 'vue-file' or 'js' or 'json' 
            },
            {
                isCanDrag: false, // 是否是拖拽文件
                params: {}, // 普通文件渲染时需要的参数
                children: [...], // 下级目录
                id: 1, // 文件标识
                label: '项目名',
                path: '项目相对路径',
                type: 'folder' or 'vue-file' or 'js' or 'json' 
            },
            {
                children: [
                    {
                        dragList: [
                            {
                                componentName: 'Iflex', //组件名
                                iClass: ['my-class-name'...] //组件样式类,
                                iStyle: {
                                    width: '1px',
                                    ...
                                } //组件样式,
                                id: '组件标识',
                                name: '组件名称',
                                num: [
                                    iClass: [],
                                    iStyle: {},
                                    itemList: [
                                        {
                                            componentName: '',
                                            iClass: [],
                                            iStyle: {},
                                            id: '',
                                            name: '',
                                            propsValue: [
                                                {
                                                    key: 'value', //props 中变量名
                                                    label: '值', //props 中变量中文名
                                                    toDataOrHtml: 'html' or 'data', //props 中变量名放置的位置，直接内联还是变量放在data里
                                                    type: 'String', or 'boolean' or 'select', //props 中变量类型
                                                    value: 'value', //props 中变量具体值
                                                },
                                                {
                                                   ...
                                                   select: [
                                                        {label: '名称',value: '值'},
                                                        ...
                                                    ], //选项
                                                },
                                                ...
                                            ],
                                        }，
                                        ...
                                    ], //存放非布局组件
                                    layoutClass: 'flex-sub' or 'flex-five' or 'flex-four' // Ifelx样式，比例布局用
                                ], // 布局组件 Iflex的子组件,
                            }
                        ],
                        fileStyleAndClass:{ 
                            iClass: [], // 背景样式类
                            iStyle: {}, // 背景样式
                        },
                        ...
                    },
                    ...
                ],
                ...
            },
            ...
        ],
        projectName: '项目名',
        projectType: 'uni-app'
    }
]
```

store.index 中 ·componentsInfo· 组件的基本信息 对应上方的数据
```
componentsInfo: { // 组件的基本信息
    // id 0- 999  （约定）会根据id来判断是哪个list
    list: [
        {
            name:'按钮',
            id: 0,
            componentName: 'Ibutton',
            iStyle:{},
            iClass: [],
            propsValue: [
                {   
                    label:'值',
                    key:'text',
                    value:'按钮',
                    toDataOrHtml: 'html',
                    type: 'String'
                },
                {
                    label:'类型',
                    key:'type',
                    value:'default',
                    toDataOrHtml: 'html',
                    type:'select',
                    select: [
                        {label: '红色',value: 'warn'},
                        {label: '蓝色',value: 'primary'},
                        {label: '白色',value: 'default'}
                    ]
                },
            ...
            ]
        },
        ...
    ]
}
```
## 基于
- [sortablejs](https://github.com/SortableJS/Vue.Draggable)
- [jszip](https://github.com/Stuk/jszip)
- [file-saver](https://github.com/eligrey/FileSaver.js)
- [element-ui](https://github.com/ElemeFE/element)
- [ejs](https://github.com/mde/ejs)
- [uniApp](https://github.com/dcloudio/uni-app)
- [vue-context-menu](https://github.com/xunleif2e/vue-context-menu)
## say
一开始有这个想法，是因为在编写前端的时候对于我来讲，挺痛苦的，特别是制作小程序或uni时，由于我的电脑很烂，而手又贱，习惯调整一下高度啊啥的就保存一下看效果，结果很多时间都浪费在等上面，于是就想这说希望可以马上看到效果，最好是拖拽，又可以自动生成代码的工具，但看了下基本都是有这个没那个，与自己想法不符。后来找到了了Vue.Draggable 看了下。觉得符合我的效果。
##
是的，于是就开始了。
期间最头疼的就是upx转换问题。upx根据手机屏幕计算，而电脑计算出来的upx太大，就需要手动缩小。会带来很多局限性。但不管怎样，还算马马虎虎。
## 后续
后续有时间会陆续添加新组件，加强更高的自由度，更便捷的操作。当然，在座的大哥能赏脸帮个忙也行。
## hope
如果感兴趣，很高兴一起来让本项目变得更好。<br/>
因为我觉得还有很多地方蛮狗屎的。但有点累，有点改不动了...