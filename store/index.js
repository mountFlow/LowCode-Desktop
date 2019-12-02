import Vue from 'vue'
import Vuex from 'vuex'
import currentCheckAttr from './modules/currentCheckAttr'
import euEditTool from './modules/euEditTool'
import project from './modules/project'
import patternComponents from './modules/patternComponents'
import {getCachesComponentsInfo,cachesComponentsInfo} from 'common/js/localStore'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        showComponentPreview: false, // 组件预览
        componentPreviewName: '', // 组件预览的名字
        myComponentPreviewData: {}, // 自定义组件的数据
        pattern: 'page', // 编辑的模式，页面模式和组件模式 [page,component]
        list: [], //好像没用
        deleteGroupName: 'layouts', // 拖拽到删除图标时的分组变量。
        iflexGroup: 'components', // 判断拖拽分组，用于限制元素只能在layouts里
        showFlexDraggalbeHandle: true, // 控制布局锁定
        preview: true, // 预览开关
        phoneSize: 100, // 页面大小缩放
        rightAideTabActiveName: 'four', // 右侧 tab 项变量
        componentsInfo : { // 组件的基本信息
            // id 0- 999  （约定）会根据id来判断是哪个list
            list: [
                {name:'按钮',id: 0, componentName: 'Ibutton',iStyle:{},iClass: [],
                    propsValue: [{label:'值',key:'text',value:'按钮',toDataOrHtml: 'html',type: 'String'},
                        {label:'类型',key:'type',value:'default',toDataOrHtml: 'html',type:'select',select: [{label: '红色',value: 'warn'},{label: '蓝色',value: 'primary'},{label: '白色',value: 'default'}]},
                        {label:'大小',key:'size',value:'default',toDataOrHtml: 'html',type: 'select',select: [{label:'默认大小',value:'default'},{label:'小尺寸',value:'mini'}]},
                    ]},
                {name:'输入框',id: 1, componentName: 'Iinput',iStyle:{},iClass: [],
                    propsValue: [{label:'值',key:'value',value:'hello',toDataOrHtml: 'html',type: 'String',defaultValue: ''},
                        {label:'类型',key:'type',value:'text',toDataOrHtml: 'html',type:'select',select:[{label:'文本',value:'text'},{label:'数字',value:'number'},{label:'密码(拖动有bug)',value:'password'},{label:'身份证输入',value:'idcard'},{label:'带小数点的数字键盘',value:'digit'}],defaultValue: 'text'},
                        {label:'占位符',key:'placeholder',value:'placeholder',toDataOrHtml: 'html',type: 'String',defaultValue: 'placeholder'},
                        {label:'是否禁用',key:'disabled',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'false'},
                        {label:'最大长度',key:'maxlength',value:'-1',toDataOrHtml: 'html',type: 'String',defaultValue: '-1'},
                    ]},
                {name:'选项',id: 2, componentName: 'Iradio',iStyle:{},iClass: [],
                    propsValue: [{label:'值',key:'value',value:'??',toDataOrHtml: 'html',type: 'String',defaultValue: ''},
                        {label:'是否选中',key:'checked',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'false'},
                        {label:'是否禁用',key:'disabled',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'false'},
                        {label:'颜色',key:'color',value:'blue',toDataOrHtml: 'html',type: 'String',defaultValue: 'blue'},
                    ]},
                {name:'图标',id: 3, componentName: 'Iicon',iStyle:{},iClass: [],
                    propsValue: [{label:'类型',key:'type',value:'success',toDataOrHtml: 'html',type: 'select',select: [
                        {label:'success',value:'success'},
                            {label:'success_no_circle',value:'success_no_circle'},
                            {label:'info',value:'info'},
                            {label:'warn',value:'warn'},
                            {label:'waiting',value:'waiting'},
                            {label:'cancel',value:'cancel'},
                            {label:'download',value:'download'},
                            {label:'search',value:'search'},
                            {label:'clear',value:'clear'},
                        ]},
                        {label:'大小',key:'size',value:'23',toDataOrHtml: 'html',type: 'String',defaultValue: '23'},
                        {label:'颜色',key:'color',value:'',toDataOrHtml: 'html',type: 'String',defaultValue: ''},
                    ]},
                {name:'文本',id: 4, componentName: 'Itext',iStyle:{},iClass: [],propsValue: [{label:'值',key:'text',value:'文本',toDataOrHtml: 'html',type: 'String',defaultValue: ''},{label:'是否可选',key:'selectable',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue:'false'},{label:'是否解码',key:'decode',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'false'}]},
                {name:'进度条',id: 5, componentName: 'Iprogress',iStyle:{},iClass: [],propsValue: [
                        {label:'百分比',key:'percent',value:'23',toDataOrHtml: 'html',type: 'String',defaultValue: '23'},
                        {label:'右侧百分比',key:'show-info',value:'true',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'true'},
                        {label:'宽度',key:'stroke-width',value:'6',toDataOrHtml: 'html',type: 'String',defaultValue: '6'},
                        {label:'已选颜色',key:'activeColor',value:'#09BB07',toDataOrHtml: 'html',type: 'String',defaultValue: '#09BB07'},
                        {label:'未选颜色',key:'backgroundColor',value:'#EBEBEB',toDataOrHtml: 'html',type: 'String',defaultValue: '#EBEBEB'},
                        {label:'动画',key:'active',value:'#EBEBEB',toDataOrHtml: 'html',type: 'String',defaultValue: '#EBEBEB'},
                        {label:'动画类型',key:'active-mode',value:'backwards',toDataOrHtml: 'html',type: 'select',defaultValue: 'backwards',select: [
                                {label:'动画从头播',value:'backwards'},
                                {label:'上次结束播',value:'forwards'},
                            ]},
                    ]},
                {name:'滑动选择',id: 6, componentName: 'Islider',iStyle:{},iClass: [],
                    propsValue: [{label:'最小值',key:'min',value:'0',toDataOrHtml: 'html',type: 'String',defaultValue: '0'},
                        {label:'最大值',key:'max',value:'100',toDataOrHtml: 'html',type: 'String',defaultValue: '100'},
                        {label:'步长',key:'step',value:'1',toDataOrHtml: 'html',type: 'String',defaultValue: '1'},
                        {label:'禁用',key:'disabled',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'false'},
                        {label:'显示值',key:'show-value',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'false'},
                    ]},
                {name:'开关选择',id: 7, componentName: 'Iswitch',iStyle:{},iClass: [],
                    propsValue: [
                        {label:'选中',key:'checked',value:'true',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'true'},
                        {label:'禁用',key:'disabled',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'false'},
                        {label:'样式',key:'type',value:'switch',toDataOrHtml: 'html',type: 'select',defaultValue: 'switch',select: [
                                {label:'switch',value:'switch'},
                                {label:'checkbox',value:'checkbox'},
                            ]},
                    ]},
                {name:'多行输入',id: 8, componentName: 'Itextarea',iStyle:{},iClass: [],
                    propsValue: [{label:'值',key: 'value',value:'长文本这玩意有bug，无法对文字拖动，只能拖空白处',toDataOrHtml: 'html',type: 'String',defaultValue: ''},
                        {label:'占位符',key:'placeholder',value:'placeholder',toDataOrHtml: 'html',type: 'String',defaultValue: 'placeholder'},
                        {label:'禁用',key:'disabled',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'false'},
                        {label:'最大长度',key:'maxlength',value:'-1',toDataOrHtml: 'html',type: 'String',defaultValue: '-1'},
                        {label:'自动增高',key:'auto-height',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'false'},
                    ]},
                {name:'图像',id: 9, componentName: 'Iimage',iStyle:{},iClass: [],
                    propsValue: [{label:'源',key:'src',value:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',toDataOrHtml: 'data',type: 'String'},
                        {label:'类型',key:'mode',value:'scaleToFill',toDataOrHtml:'html',type:'select',select:[{label:'不保持纵横比',value:'scaleToFill'},{label:'保持纵横比',value:'aspectFit'},{label:'aspectFill',value:'aspectFill'},{label:'顶部区域',value:'top'},{label:'底部区域',value:'bottom'},{label:'中间区域',value:'center'},{label:'左边区域',value:'left'},{label:'右边区域',value:'right'}]}]},
                // {name:'webView',id: 3, componentName: 'IwebView'},
            ],
            // id 1000 -1999
            colorUiList: [
                {name:'轮播图',id: 1000, componentName: 'Cswiper',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'图标',id: 1001, componentName: 'Cicon',iStyle:{},iClass: [],propsValue: [{label:'类型',key:'class',value:'cuIcon-appreciate',toDataOrHtml: 'data',type:'select',select: [{label: '点赞',value: 'cuIcon-appreciate'},{label: '点击',value: 'cuIcon-check'},{label: '关闭',value: 'cuIcon-close'}]}],upxSwitch: false},
                {name:'按钮',id: 1002, componentName: 'Cbutton',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'标签',id: 1003, componentName: 'Ctag',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'头像',id: 1004, componentName: 'Cavatar',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'宫格列表',id: 1007, componentName: 'ClistGrid',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'菜单列表',id: 1008, componentName: 'Clist',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'卡片',id: 1009, componentName: 'Ccard',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'时间线',id: 1010, componentName: 'Ctimeline',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'步骤条',id: 1011, componentName: 'Csteps',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'进度条',id: 1012, componentName: 'Cprogress',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'导航栏',id: 1013, componentName: 'Cnav',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
            ],
            // id 2000 - 2999
            formList: [
                {name:'输入框',id: 2001, componentName: 'FormInput',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'输入框2',id: 2002, componentName: 'FormInput2',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'选择框',id: 2003, componentName: 'FromSelect',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'时间选择',id: 2004, componentName: 'FromSelectByTime',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'日期选择',id: 2005, componentName: 'FromSelectByDate',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'开关',id: 2006, componentName: 'FromSwitch',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'单选操作',id: 2007, componentName: 'FormRadio',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'图片上传',id: 2008, componentName: 'FormUpdataImage',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
            ]
        }
    },
    mutations: {
        updataComponentsInfo(state,{key,name,propsValue}){
            let list = state.componentsInfo[key]
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                if (item.name === name){
                    item.propsValue = propsValue
                    return
                }
            }
        },
        initComponentsInfo(state,data){
            state.componentsInfo = data
        },
        setRightAideTabActiveName(state,data){
            state.rightAideTabActiveName = data.rightAideTabActiveName
        },
        setPattern(state,data){
            state.pattern = data.pattern
        },
        setPhoneSize(state,data){
            state.phoneSize = data.phoneSize
        },
        setPreview(state,data){
            state.preview = data.preview
        },
        setGlobalList(state,data){
            state.list = data.list
        },
        setShowFlexDraggalbeHandle(state,data){
            state.showFlexDraggalbeHandle = data.showFlexDraggalbeHandle
        },
        setIflexGroup(state,data){
            state.iflexGroup = data.iflexGroup
        },
        setDeleteGroupName(state,data){
            state.deleteGroupName = data.deleteGroupName
        },
        setShowComponentPreview(state,{showComponentPreview}){
            state.showComponentPreview = showComponentPreview
        },
        setComponentPreviewName(state,{componentPreviewName}){
            state.componentPreviewName = componentPreviewName
        },
        setMyComponentPreviewData(state,{myComponentPreviewData}){
            state.myComponentPreviewData = myComponentPreviewData
        }
    },

    getters: {
    },

    actions: {
        // 更新組件基本信息
        updataComponentsInfo({commit,rootState,state}){
            let item = rootState.currentCheckAttr.item
            let {id,name,propsValue} = item
            let key = 'list'
            if (id > 999){
                key = 'colorUiList'
            }
            if (id > 1999){
                key = 'formList'
            }
            commit('updataComponentsInfo',{
                key,
                name:name,
                propsValue:propsValue})
            cachesComponentsInfo(state.componentsInfo)
        },
        // 初始化組件基本信息，從本地提取
        initComponentsInfo({commit}){
            let data = getCachesComponentsInfo()
            if (data){
                commit('initComponentsInfo',data)
            }
        },
        /**
         * 初始化缓存数据
         * @param dispatch
         */
        initData({dispatch}){
            dispatch('initProject')
            dispatch('initCustomClass')
            dispatch('initFromStyleList')
            dispatch('initComponentsList')
            dispatch('initComponentsInfo')
        }
    },

    modules:{
        currentCheckAttr,
        euEditTool,
        project,
        patternComponents
    }
})

export default store
