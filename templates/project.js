// manifest.json
let manifestjson =
`{
	"name" : "<%= projectName -%>",
	"appid" : "",
	"description": "",
	"versionName": "1.0.0",
	"versionCode": "100",
	"transformPx": false,
    /* 5+App特有相关 */
	"app-plus": {
		"usingComponents": true,
    "nvueCompiler": "uni-app",
		"splashscreen": {
			"alwaysShowBeforeRender": true,
			"waiting": true,
			"autoclose": true,
			"delay": 0
		},
        /* 模块配置 */
		"modules": {

		},
        /* 应用发布信息 */
		"distribute": {
            /* android打包配置 */
			"android": {
				"permissions": ["<uses-permission android:name=\\"android.permission.CHANGE_NETWORK_STATE\\"/>",
					"<uses-permission android:name=\\"android.permission.MOUNT_UNMOUNT_FILESYSTEMS\\"/>",
					"<uses-permission android:name=\\"android.permission.READ_CONTACTS\\"/>",
					"<uses-permission android:name=\\"android.permission.VIBRATE\\"/>",
					"<uses-permission android:name=\\"android.permission.READ_LOGS\\"/>",
					"<uses-permission android:name=\\"android.permission.ACCESS_WIFI_STATE\\"/>",
					"<uses-feature android:name=\\"android.hardware.camera.autofocus\\"/>",
					"<uses-permission android:name=\\"android.permission.WRITE_CONTACTS\\"/>",
					"<uses-permission android:name=\\"android.permission.ACCESS_NETWORK_STATE\\"/>",
					"<uses-permission android:name=\\"android.permission.CAMERA\\"/>",
					"<uses-permission android:name=\\"android.permission.RECORD_AUDIO\\"/>",
					"<uses-permission android:name=\\"android.permission.GET_ACCOUNTS\\"/>",
					"<uses-permission android:name=\\"android.permission.MODIFY_AUDIO_SETTINGS\\"/>",
					"<uses-permission android:name=\\"android.permission.READ_PHONE_STATE\\"/>",
					"<uses-permission android:name=\\"android.permission.CHANGE_WIFI_STATE\\"/>",
					"<uses-permission android:name=\\"android.permission.WAKE_LOCK\\"/>",
					"<uses-permission android:name=\\"android.permission.CALL_PHONE\\"/>",
					"<uses-permission android:name=\\"android.permission.FLASHLIGHT\\"/>",
					"<uses-permission android:name=\\"android.permission.ACCESS_COARSE_LOCATION\\"/>",
					"<uses-feature android:name=\\"android.hardware.camera\\"/>",
					"<uses-permission android:name=\\"android.permission.ACCESS_FINE_LOCATION\\"/>",
					"<uses-permission android:name=\\"android.permission.WRITE_SETTINGS\\"/>"
				]
			},
            /* ios打包配置 */
			"ios": {

			},
            /* SDK配置 */
			"sdkConfigs": {

			}
		}
	},
    /* 快应用特有相关 */
	"quickapp": {

	},
    /* 小程序特有相关 */
	"mp-weixin": {
		"appid": "",
		"setting": {
			"urlCheck": false
		},
		"usingComponents": true
	},
    "mp-alipay" : {
        "usingComponents" : true
    },
    "mp-baidu" : {
        "usingComponents" : true
    },
    "mp-toutiao" : {
        "usingComponents" : true
    }
}
`

// pages.json

let pagesjson =
`{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"titleNView": false
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	}
}
`

let uniscss =
`/**
 * 这里是uni-app内置的常用样式变量
 *
 * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量
 * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App
 *
 */

/**
 * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能
 *
 * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件
 */

/* 颜色变量 */

/* 行为相关颜色 */
$uni-color-primary: #007aff;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;

/* 文字基本颜色 */
$uni-text-color:#333;//基本色
$uni-text-color-inverse:#fff;//反色
$uni-text-color-grey:#999;//辅助灰色，如加载更多的提示信息
$uni-text-color-placeholder: #808080;
$uni-text-color-disable:#c0c0c0;

/* 背景颜色 */
$uni-bg-color:#ffffff;
$uni-bg-color-grey:#f8f8f8;
$uni-bg-color-hover:#f1f1f1;//点击状态颜色
$uni-bg-color-mask:rgba(0, 0, 0, 0.4);//遮罩颜色

/* 边框颜色 */
$uni-border-color:#c8c7cc;

/* 尺寸变量 */

/* 文字尺寸 */
$uni-font-size-sm:24upx;
$uni-font-size-base:28upx;
$uni-font-size-lg:32upx;

/* 图片尺寸 */
$uni-img-size-sm:40upx;
$uni-img-size-base:52upx;
$uni-img-size-lg:80upx;

/* Border Radius */
$uni-border-radius-sm: 4upx;
$uni-border-radius-base: 6upx;
$uni-border-radius-lg: 12upx;
$uni-border-radius-circle: 50%;

/* 水平间距 */
$uni-spacing-row-sm: 10px;
$uni-spacing-row-base: 20upx;
$uni-spacing-row-lg: 30upx;

/* 垂直间距 */
$uni-spacing-col-sm: 8upx;
$uni-spacing-col-base: 16upx;
$uni-spacing-col-lg: 24upx;

/* 透明度 */
$uni-opacity-disabled: 0.3; // 组件禁用态的透明度

/* 文章场景相关 */
$uni-color-title: #2C405A; // 文章标题颜色
$uni-font-size-title:40upx;
$uni-color-subtitle: #555555; // 二级标题颜色
$uni-font-size-subtitle:36upx;
$uni-color-paragraph: #3F536E; // 文章段落颜色
$uni-font-size-paragraph:30upx;`

// main.js
let mainjs =
`import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
`

// App.vue
let appvue =
`<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
`

let data = {manifestjson,pagesjson,uniscss,mainjs,appvue}

export default data
