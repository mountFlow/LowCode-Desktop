# dragUI
### 用于UNI可拖拽可视化编程
### 效果图

### 基于
- [sortablejs](https://github.com/SortableJS/Vue.Draggable)
- [jszip](https://github.com/Stuk/jszip)
- [file-saver](https://github.com/eligrey/FileSaver.js)
- [element-ui](https://github.com/ElemeFE/element)
- [ejs](https://github.com/mde/ejs)
- [uniApp](https://github.com/dcloudio/uni-app)
- [vue-context-menu](https://github.com/xunleif2e/vue-context-menu)
### 安装
 参考uni官网安装普通uni项目([运行uni-app](https://uniapp.dcloud.io/quickstart?id=%e8%bf%90%e8%a1%8cuni-app))运行到浏览器，另需要手动下载包`npm install`
### 项目目录
- colorui
- common -----------------------_公共方法_
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
###主要数据结构
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
                                iClass: [] //组件样式类,
                                iStyle: {} //组件样式,
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
                                                    key: 'value', //props 中变量名
                                                    label: '值', //props 中变量中文名
                                                    toDataOrHtml: 'html' or 'data', //props 中变量名放置的位置，直接内联还是变量放在data里
                                                    type: 'select', //props 中变量类型
                                                    value: 'value', //props 中变量具体值
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

