// 默认项目结构

let data = [{
	id: 32,
	label: 'colorui',
	path: '/colorui',
	type: 'folder',
	children: [{
		id: 33,
		type: 'folder',
		label: 'components',
		path: '/colorui/components',
		children: []
	},{
		id: 36,
		type: 'css',
		params: {},
		path: '/colorui/animation.css',
		label: 'animation.css',
		isCanDrag: false
	},{
		id: 37,
		type: 'css',
		params: {},
		path: '/colorui/icon.css',
		label: 'icon.css',
		isCanDrag: false
	},{
		id: 38,
		type: 'css',
		params: {},
		path: '/colorui/main.css',
		label: 'main.css',
		isCanDrag: false
	}]
},{
	id: 39,
	label: 'common',
	path: '/common',
	type: 'folder',
	children: [{
		id: 40,
		label: 'style',
		path: '/common/style',
		type: 'folder',
		children: [{
			id: 41,
			type: 'css',
			params: {},
			path: '/common/style/myStyle.scss',
			label: 'myStyle.scss',
			isCanDrag: false
		}]
	}]
},{
    id: 31,
    label: 'components',
    type: 'folder',
    path: '/components', // 路径
    children: []
},{
    id: 1,
    label: 'pages',
    type: 'folder',
    path: '/pages',
    children: [{
        id: 4,
        label: 'index',
        type: 'folder',
        path: '/pages/index',
        children: [{
            id: 9,
            type: 'vue-file',
            label: 'index.vue',
            path: '/pages/index/index.vue',
            isCanDrag: true,  // 是不是可以拖拽编辑不是则就是只提供展示
            dragList: [], // 可编辑list
            fileStyleAndClass: {
                iStyle: {},
                iClass: []
            }, // 文件背景样式，本不应该写在外层，应与dragList合为一个对象，但这个后面才想到，改起来有点麻烦
        }]
    }]
}, {
    id: 2,
    label: 'static',
    path: '/static',
    type: 'folder'
}, {
    id: 3,
    type: 'vue-file',
    label: 'App.vue',
    path: '/App.vue',
    isCanDrag: false,
    params: {}, // 要往文件傳遞的參數
    fileText: '' // 里面的文本数据
},{
    id: 11,
    type: 'js',
    path: '/main.js',
    label: 'main.js',
    isCanDrag: false,
    params: {},
    fileText: '' // 里面的文本数据
},{
    id: 12,
    type: 'json',
    path: '/manifest.json',
    label: 'manifest.json',
    params: {},
    isCanDrag: false,
    fileText: ''
},{
    id: 13,
    type: 'json',
    params: {},
    path: '/pages.json',
    label: 'pages.json',
    isCanDrag: false
},{
    id: 14,
    type: 'css',
    params: {},
    path: '/uni.scss',
    label: 'uni.scss',
    isCanDrag: false
}]

export default data
