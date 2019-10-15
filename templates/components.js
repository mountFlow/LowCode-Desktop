let itemTemplates = `
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
`

let fileTemplates =
`<template>
    <view<%- iClassToString(fileStyleAndClass.iClass,'phone-content') -%><%- iStyleToString(fileStyleAndClass.iStyle) %>>
        <% list.forEach(item => { -%>
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
        <%}) -%>
    </view>
</template>
<%- renderComponentsTemplateByScript(byDataArr) %>
<%- classData %>`

let fileTemplatesByStyle = `
<style scoped>
    .phone-content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
<%= classStr %>
</style>`

let fileTemplatesByScript = `<script>
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
        components:{
        }
    }
</script>
`

export {fileTemplates,itemTemplates,fileTemplatesByScript,fileTemplatesByStyle}
