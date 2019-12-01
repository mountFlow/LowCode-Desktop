/**
 * 存放组件需要的模板数据，采用嵌套方式渲染模板
 */


let itemTemplates = `
<% if(list.num.length === 1){ -%>
                <% list.num.forEach(num => { -%>
                     <view<%- iClassToString(num.iClass,'margin-0') -%><%- iStyleToString(num.iStyle) %>>
                         <% num.itemList.forEach(itemListItem => { -%>
                             <% if(itemListItem.componentName === 'Iflex'){ -%>
                             <%- fun(itemListItem,fun) -%>
                             <% } else { -%>
                                 <%- renderComponentsTemplate(itemListItem,byDataArr) -%>
                             <% } -%>
                         <%}) -%>
                     </view>
                 <%}) -%>
            <% } -%>
            <% if(list.num.length > 1){ -%>
                <view<%- iClassToString(list.iClass,'flex') -%><%- iStyleToString(list.iStyle) %>>
                    <% list.num.forEach(num => { -%>
                         <view<%- iClassToString(num.iClass,'margin-0',num.layoutClass) -%><%- iStyleToString(num.iStyle) %>>
                             <% num.itemList.forEach(itemListItem => { -%>
                                 <% if(itemListItem.componentName === 'Iflex'){ -%>
                                 <%- fun(itemListItem,fun) -%>
                                 <% } else { -%>
                                     <%- renderComponentsTemplate(itemListItem,byDataArr) -%>
                                 <% } -%>
                             <%}) -%>
                         </view>
                     <%}) -%>
                </view>    
            <% } -%>
`

let fileTemplates =
`<template>
    <view<%- iClassToString(fileStyleAndClass.iClass,mode === 'page' ? 'phone-content': '') -%><%- iStyleToString(fileStyleAndClass.iStyle) %>>
        <% list.forEach(item => { -%>
            <% if(item.num.length === 1){ -%>
                <% item.num.forEach(num => { -%>
                     <view<%- iClassToString(num.iClass,'margin-0') -%><%- iStyleToString(num.iStyle) %>>
                         <% num.itemList.forEach(itemListItem => { -%>
                             <% if(itemListItem.componentName === 'Iflex'){ -%>
                             <%- fun(itemListItem,fun) -%>
                             <% } else { -%>
                                 <%- renderComponentsTemplate(itemListItem,byDataArr) -%>
                             <% } -%>
                         <%}) -%>
                     </view>
                 <%}) -%>
            <% } -%>
            <% if(item.num.length > 1){ -%>
                <view<%- iClassToString(item.iClass,'flex') -%><%- iStyleToString(item.iStyle) %>>
                    <% item.num.forEach(num => { -%>
                         <view<%- iClassToString(num.iClass,'margin-0',num.layoutClass) -%><%- iStyleToString(num.iStyle) %>>
                             <% num.itemList.forEach(itemListItem => { -%>
                                 <% if(itemListItem.componentName === 'Iflex'){ -%>
                                 <%- fun(itemListItem,fun) -%>
                                 <% } else { -%>
                                     <%- renderComponentsTemplate(itemListItem,byDataArr) -%>
                                 <% } -%>
                             <%}) -%>
                         </view>
                     <%}) -%>
                </view>    
            <% } -%>
        <%}) -%>
    </view>
</template>
<%- renderComponentsTemplateByScript(byDataArr,importCompentsStr,componentsObjStr) %>
<%- classData %>`

let fileTemplatesByStyle = `
<style scoped>
    <% if(mode === 'page'){-%>
.phone-content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
<% }-%>
<%- classStr %>
</style>`

let fileTemplatesByScript = `<script>
    <%- importCompentsStr %>
    export default {
        name: "This#is#fileName",
        data() {
            return {
                <%- renderComponentsTemplateByData(byDataArr) %>
            }
        },
        methods: {
            
        },
        computed: {
            
        },
        <%- componentsObjStr %>
    }
</script>
`

export {fileTemplates,itemTemplates,fileTemplatesByScript,fileTemplatesByStyle}
