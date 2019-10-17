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
        pattern: 'page',
        list: [],
        deleteGroupName: 'layouts',
        iflexGroup: 'components',
        showFlexDraggalbeHandle: true,
        preview: true,
        phoneSize: 100,
        rightAideTabActiveName: 'four',
        componentsInfo : {
            // id 0- 999  （约定）会根据id来判断是哪个list
            list: [
                {name:'按钮',id: 0, componentName: 'Ibutton',iStyle:{},iClass: [],propsValue: [{label:'值',key:'text',value:'按钮',toDataOrHtml: 'html',type: 'String'},{label:'类型',key:'type',value:'default',toDataOrHtml: 'html',type:'select',select: [{label: '红色',value: 'warn'},{label: '蓝色',value: 'primary'},{label: '白色',value: 'default'}]}]},
                {name:'输入框',id: 1, componentName: 'Iinput',iStyle:{},iClass: [],propsValue: [{label:'值',key:'value',value:'hello',toDataOrHtml: 'html',type: 'String',defaultValue: ''},{label:'密码',key:'password',value:'false',toDataOrHtml: 'html',type:'boolean',defaultValue: 'false'}]},
                {name:'选项',id: 2, componentName: 'Iradio',iStyle:{},iClass: [],propsValue: []},
                {name:'图标',id: 3, componentName: 'Iicon',iStyle:{},iClass: [],propsValue: [{label:'类型',key:'type',value:'success',toDataOrHtml: 'html',type: 'String'}]},
                {name:'文本',id: 4, componentName: 'Itext',iStyle:{},iClass: [],propsValue: [{label:'值',key:'text',value:'文本',toDataOrHtml: 'html',type: 'String',defaultValue: ''},{label:'是否可选',key:'selectable',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue:'false'},{label:'是否解码',key:'decode',value:'false',toDataOrHtml: 'html',type: 'boolean',defaultValue: 'false'}]},
                {name:'进度条',id: 5, componentName: 'Iprogress',iStyle:{},iClass: [],propsValue: []},
                {name:'滑动选择',id: 6, componentName: 'Islider',iStyle:{},iClass: [],propsValue: []},
                {name:'开关选择',id: 7, componentName: 'Iswitch',iStyle:{},iClass: [],propsValue: []},
                {name:'多行输入',id: 8, componentName: 'Itextarea',iStyle:{},iClass: [],propsValue: [{label:'值',key: 'value',value:'这是一段长文本',toDataOrHtml: 'html',type: 'String',defaultValue: ''}]},
                {name:'图像',id: 9, componentName: 'Iimage',iStyle:{},iClass: [],propsValue: [{label:'源',key:'src',value:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',toDataOrHtml: 'data',type: 'String'}]},
                // {name:'webView',id: 3, componentName: 'IwebView'},
            ],
            // id 1000 -1999
            colorUiList: [
                {name:'轮播图',id: 1000, componentName: 'Cswiper',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
                {name:'图标',id: 1001, componentName: 'Cicon',iStyle:{},iClass: [],propsValue: [],upxSwitch: false},
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
        }
    },

    getters: {
    },

    actions: {
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
