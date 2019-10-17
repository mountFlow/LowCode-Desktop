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

let Iinput =
    `<input type="text"<%- iClassToString(itemListItem.iClass,'i-input') %> <%- iStyleToString(itemListItem.iStyle) %>placeholder="input" v-bind="propsValue"/>`

let defaultTemplate =
`<<%- componentName.replace(/^I/,'') -%><%- iClassToString(itemListItem.iClass) %><%- iStyleToString(itemListItem.iStyle) %><%- propsValueToString(itemListItem,byDataArr) %>><%- text  -%></<%- componentName.replace(/^I/,'') -%>>`
let defaultTemplate2 =
    `<<%- componentName.replace(/^I/,'') -%><%- iClassToString(itemListItem.iClass) %><%- iStyleToString(itemListItem.iStyle) %><%- propsValueToString(itemListItem,byDataArr) %>/>`


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

let data = {Cswiper,Iinput,defaultTemplate,CswiperByData,defaultTemplate2}

export default data
