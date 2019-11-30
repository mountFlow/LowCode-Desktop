/* ColorUI部分 */
/* 对于自定义类。一般都是样式调整好了的。不要系统再决定样式 iClassToString，iStyleToString应该不重要*/
let Cswiper =
    `<swiper<%- iClassToString(itemListItem.iClass,'screen-swiper','square-dot') %> <%- iStyleToString(itemListItem.iStyle) %>:indicator-dots="true"
            :circular="true"
            :autoplay="true"
            interval="5000"
            duration="500">
        <swiper-item v-for="(item,index) in swiperList<%- itemListItem.id -%>" :key="index">
            <image :src="item.url" mode="aspectFill"></image>
        </swiper-item>
    </swiper>`
let CswiperByData = `swiperList<%- id -%>: [{
                    id: 0,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
                }, {
                    id: 1,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
                }, {
                    id: 2,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
                }, {
                    id: 3,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
                }, {
                    id: 4,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
                }, {
                    id: 5,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
                }, {
                    id: 6,
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
                }]`

let Cicon =
    `<view class="inline-flex"<%- iClassToString(itemListItem.iClass) %> <%- iStyleToString(itemListItem.iStyle) %>>
        <text class="lg text-gray" <%- propsValueToString(itemListItem,byDataArr) %>></text>
    </view>`

let Cbutton =
    `<view class="inline-flex"<%- iClassToString(itemListItem.iClass) %> <%- iStyleToString(itemListItem.iStyle) %>>
        <button class="cu-btn">默认</button>
    </view>`

let Ccard =
    `<view class="cu-card case" :class="isCard?'no-card':''">
            <view class="cu-item shadow">
                <view class="image">
                    <view style="width: 100%;height: 350upx;background-color: #1cbbb4"></view>
                    <view class="cu-tag bg-blue">史诗</view>
                    <view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
                </view>
                <view class="cu-list menu-avatar">
                    <view class="cu-item">
                        <view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
                        <view class="content flex-sub">
                            <view class="text-grey">正义天使 凯尔</view>
                            <view class="text-gray text-sm flex justify-between">
                                十天前
                                <view class="text-gray text-sm">
                                    <text class="cuIcon-attentionfill margin-lr-xs"></text> 10
                                    <text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
                                    <text class="cuIcon-messagefill margin-lr-xs"></text> 30
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>`

let Clist =
    `<view class="cu-list menu" :class="[menuBorder<%- itemListItem.id -%>?'sm-border':'',menuCard<%- itemListItem.id -%>?'card-menu margin-top':'']">
        <view class="cu-item" :class="menuArrow?'arrow':''">
            <view class="content">
                <text class="cuIcon-circlefill text-grey"></text>
                <text class="text-grey">图标 + 标题</text>
            </view>
        </view>
        <view class="cu-item" :class="menuArrow<%- itemListItem.id -%>?'arrow':''">
            <view class="content">
                <image src="/static/logo.png" class="png" mode="aspectFit"></image>
                <text class="text-grey">图片 + 标题</text>
            </view>
        </view>
        <view class="cu-item" :class="menuArrow<%- itemListItem.id -%>?'arrow':''">
            <button class="cu-btn content" open-type="contact">
                <text class="cuIcon-btn text-olive"></text>
                <text class="text-grey">Open-type 按钮</text>
            </button>
        </view>
        <view class="cu-item" :class="menuArrow<%- itemListItem.id -%>?'arrow':''">
            <navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
                <text class="cuIcon-discoverfill text-orange"></text>
                <text class="text-grey">Navigator 跳转</text>
            </navigator>
        </view>
        <view class="cu-item" :class="menuArrow<%- itemListItem.id -%>?'arrow':''">
            <view class="content">
                <text class="cuIcon-emojiflashfill text-pink"></text>
                <text class="text-grey">头像组</text>
            </view>
            <view class="action">
                <view class="cu-avatar-group">
                    <view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
                    <view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
                    <view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
                    <view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
                </view>
                <text class="text-grey text-sm">4 人</text>
            </view>
        </view>
        <view class="cu-item" :class="menuArrow<%- itemListItem.id -%>?'arrow':''">
            <view class="content">
                <text class="cuIcon-btn text-green"></text>
                <text class="text-grey">按钮</text>
            </view>
            <view class="action">
                <button class="cu-btn round bg-green shadow">
                    <text class="cuIcon-upload"></text> 上传</button>
            </view>
        </view>
        <view class="cu-item" :class="menuArrow<%- itemListItem.id -%>?'arrow':''">
            <view class="content">
                <text class="cuIcon-tagfill text-red  margin-right-xs"></text>
                <text class="text-grey">标签</text>
            </view>
            <view class="action">
                <view class="cu-tag round bg-orange light">音乐</view>
                <view class="cu-tag round bg-olive light">电影</view>
                <view class="cu-tag round bg-blue light">旅行</view>
            </view>
        </view>
        <view class="cu-item" :class="menuArrow?'arrow':''">
            <view class="content">
                <text class="cuIcon-warn text-green"></text>
                <text class="text-grey">文本</text>
            </view>
            <view class="action">
                <text class="text-grey text-sm">小目标还没有实现！</text>
            </view>
        </view>
        <view class="cu-item">
            <view class="content padding-tb-sm">
                <view>
                    <text class="cuIcon-clothesfill text-blue margin-right-xs"></text> 多行Item</view>
                <view class="text-gray text-sm">
                    <text class="cuIcon-infofill margin-right-xs"></text> 小目标还没有实现！</view>
            </view>
            <view class="action">
                <switch class="switch-sex" :class="skin?'checked<%- itemListItem.id -%>':''" :checked="skin?true:false"></switch>
            </view>
        </view>
    </view>`

let ClistByData =
    `menuArrow<%- id -%>: false,
		skin<%- id -%>: false,
		menuCard<%- id -%>: false,
		menuBorder<%- id -%>: false`

let ClistGrid =
    `<view class="cu-list grid" :class="['col-' + gridCol<%- itemListItem.id -%>,gridBorder<%- itemListItem.id -%>?'':'no-border']">
        <view class="cu-item" v-for="(item,index) in cuIconList<%- itemListItem.id -%>" :key="index" v-if="index小于gridCol<%- itemListItem.id -%>*2">
            <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
                <view class="cu-tag badge" v-if="item.badge!=0">
                    <block v-if="item.badge!=1">{{item.badge大于99?'99+':item.badge}}</block>
                </view>
            </view>
            <text>{{item.name}}</text>
        </view>
    </view>`
let ClistGridByData = `cuIconList<%- id -%>: [{
                    cuIcon: 'cardboardfill',
                    color: 'red',
                    badge: 120,
                    name: 'VR'
                }, {
                    cuIcon: 'recordfill',
                    color: 'orange',
                    badge: 1,
                    name: '录像'
                }, {
                    cuIcon: 'picfill',
                    color: 'yellow',
                    badge: 0,
                    name: '图像'
                }, {
                    cuIcon: 'noticefill',
                    color: 'olive',
                    badge: 22,
                    name: '通知'
                }, {
                    cuIcon: 'upstagefill',
                    color: 'cyan',
                    badge: 0,
                    name: '排行榜'
                }, {
                    cuIcon: 'clothesfill',
                    color: 'blue',
                    badge: 0,
                    name: '皮肤'
                }, {
                    cuIcon: 'discoverfill',
                    color: 'purple',
                    badge: 0,
                    name: '发现'
                }, {
                    cuIcon: 'questionfill',
                    color: 'mauve',
                    badge: 0,
                    name: '帮助'
                }, {
                    cuIcon: 'commandfill',
                    color: 'purple',
                    badge: 0,
                    name: '问答'
                }, {
                    cuIcon: 'brandfill',
                    color: 'mauve',
                    badge: 0,
                    name: '版权'
                }],
                gridCol<%- id -%>: 3,
                gridBorder<%- id -%>: false`

let Cnav =
    `<view class="phone-width">
        <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft<%- itemListItem.id -%>" style="width: 100%;">
            <view class="cu-item" :class="index==TabCur<%- itemListItem.id -%>?'text-green cur':''" v-for="(item,index) in 10" :key="index" @tap="tabSelect" :data-id="index">
                Tab{{index}}
            </view>
        </scroll-view>
    </view>`
let CnavByData =
    `TabCur<%- id -%>: 0,
                scrollLeft<%- id -%>: 0`

let Cprogress =
    `<view>
       <view class="cu-progress">
           <view class="bg-red" :style="[{ width:loading<%- itemListItem.id -%>?'61.8%':''}]">61.8%</view>
       </view>
   </view>`
let CprogressByData =
    `loading<%- id -%>: true`

let Csteps =
    `<view class="steps bg-white padding">
            <view class="cu-steps">
                <view class="cu-item" :class="index大于basics<%- itemListItem.id -%>?'':'text-red'" v-for="(item,index) in basicsList<%- itemListItem.id -%>" :key="index">
                    <text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
                </view>
            </view>
        </view>`
let CstepsByData =
    `basicsList<%- id -%>: [{
                    cuIcon: 'usefullfill',
                    name: '开始'
                }, {
                    cuIcon: 'radioboxfill',
                    name: '等待'
                }, {
                    cuIcon: 'roundclosefill',
                    name: '错误'
                }, {
                    cuIcon: 'roundcheckfill',
                    name: '完成'
                }, ],
                basics<%- id -%>: 0,`

let Ctag =
    `<view class="inline-flex">
        <view class='cu-tag round'>椭圆</view>
    </view>`

let Ctimeline =
    `<view class="cu-timeline">
            <view class="cu-time">昨天</view>
            <view class="cu-item cur cuIcon-noticefill">
                <view class="content bg-green shadow-blur">
                    <text>22:22</text> 【广州市】快件已到达地球
                </view>
            </view>
            <view class="cu-item text-red cuIcon-attentionforbidfill">
                <view class="content bg-red shadow-blur">
                    这是第一次，我家的铲屎官走了这么久。久到足足有三天！！
                </view>
            </view>
            <view class="cu-item text-grey cuIcon-evaluate_fill">
                <view class="content bg-grey shadow-blur">
                    这是第一次，我家的铲屎官走了这么久。
                </view>
            </view>
            <view class="cu-item text-blue">
                <view class="bg-blue content">
                    <text>20:00</text> 【月球】快件已到达月球，准备发往地球
                </view>
                <view class="bg-cyan content">
                    <text>10:00</text> 【银河系】快件已到达银河系，准备发往月球
                </view>
            </view>
        </view>`

let FormInput =
    `<view class="cu-form-group">
            <view class="title">标题</view>
            <input placeholder="统一标题的宽度" name="input"></input>
        </view>`

let FormInput2 =
    `<view class="cu-form-group">
           <view class="title">验证码</view>
           <input placeholder="输入框带个按钮" name="input"></input>
           <button class='cu-btn bg-green shadow'>验证码</button>
       </view>`

let FormRadio =
    `<radio-group class="block">
        <view class="cu-form-group ">
            <view class="title">单选操作(radio)</view>
            <radio :class="radio<%- itemListItem.id -%>=='A'?'checked':''" :checked="radio<%- itemListItem.id -%>=='A'?true:false" value="A"></radio>
        </view>
        <view class="cu-form-group ">
            <view class="title">单选操作2(radio)</view>
            <radio :class="radio<%- itemListItem.id -%>=='B'?'checked':''" :checked="radio<%- itemListItem.id -%>=='B'?true:false" value="B"></radio>
        </view>
    </radio-group>`
let FormRadioByData =
    `radio<%- id -%>: 'A',`

let FormText =
    `<view class="cu-form-group ">
            <textarea maxlength="-1" placeholder="多行文本输入框"></textarea>
        </view>`

let FormUpdataImage =
    `<view class="updata-image">
            <view class="cu-bar bg-white ">
                <view class="action">
                    图片上传
                </view>
                <view class="action">
                    {{imgList<%- itemListItem.id -%>.length}}/4
                </view>
            </view>
            <view class="cu-form-group">
                <view class="grid col-4 grid-square flex-sub">
                    <view class="bg-img" v-for="(item,index) in imgList<%- itemListItem.id -%>" :key="index"  :data-url="imgList<%- itemListItem.id -%>[index]">
                        <image :src="imgList<%- itemListItem.id -%>[index]" mode="aspectFill"></image>
                        <view class="cu-tag bg-red" :data-index="index">
                            <text class='cuIcon-close'></text>
                        </view>
                    </view>
                    <view class="solids" @tap="ChooseImage" v-if="imgList<%- itemListItem.id -%>.length小于4">
                        <text class='cuIcon-cameraadd'></text>
                    </view>
                </view>
            </view>
        </view>`
let FormUpdataImageByData =
    `imgList<%- id -%>: []`


/* ***************************** */






let Iinput =
    `<input type="text"<%- iClassToString(itemListItem.iClass,'i-input') %> <%- iStyleToString(itemListItem.iStyle) %>placeholder="input" v-bind="propsValue"/>`

let defaultTemplate =
`<<%- componentName.replace(/^I/,'') -%><%- iClassToString(itemListItem.iClass) %><%- iStyleToString(itemListItem.iStyle) %><%- propsValueToString(itemListItem,byDataArr) %>><%- text  -%></<%- componentName.replace(/^I/,'') -%>>`
let defaultTemplate2 =
    `<<%- componentName.replace(/^I/,'') -%><%- iClassToString(itemListItem.iClass) %><%- iStyleToString(itemListItem.iStyle) %><%- propsValueToString(itemListItem,byDataArr) %>/>`



let data = {Cswiper,Iinput,defaultTemplate,CswiperByData,defaultTemplate2,
    Cicon,
    Cbutton,
    Ccard,
    Clist,ClistByData,
    ClistGrid,ClistGridByData,
    Cnav,CnavByData,
    Cprogress,CprogressByData,
    Csteps,CstepsByData,
    Ctag,
    Ctimeline,
    FormInput,
    FormInput2,
    FormRadio,FormRadioByData,
    FormText,
    FormUpdataImage,FormUpdataImageByData
}

export default data
