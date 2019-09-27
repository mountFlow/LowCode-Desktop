let itemTemplates = `
<view<%- iClassToString(list.iClass,'flex') -%><%- iStyleToString(list.iStyle) %>>
    <% list.num.forEach(num => { -%>
    <view<%- iClassToString(num.iClass,'margin-0',num.layoutClass) -%><%- iStyleToString(num.iStyle) %>>
    <% num.itemList.forEach(itemListItem => { -%>
        <% if(itemListItem.componentName === 'Iflex'){ -%>
            <%- fun(itemListItem,fun) -%>
        <% } else { -%>
            <<%- itemListItem.componentName.replace(/^I/,'')  -%><%- iClassToString(itemListItem.iClass) %><%- iStyleToString(itemListItem.iStyle) %> ><%- itemListItem.name -%></<%- itemListItem.componentName.replace(/^I/,'') -%>>
        <% } -%>
    <%}) -%>
    </view>
    <%}) -%>
</view>
`

let fileTemplates =
`<template>
    <view>
        <% list.forEach(item => { -%>
        <view<%- iClassToString(item.iClass,'flex') -%><%- iStyleToString(item.iStyle) %>>
            <% item.num.forEach(num => { -%>
                 <view<%- iClassToString(num.iClass,'margin-0',num.layoutClass) -%><%- iStyleToString(num.iStyle) %>>
                     <% num.itemList.forEach(itemListItem => { -%>
                         <% if(itemListItem.componentName === 'Iflex'){ -%>
                         <%- fun(itemListItem,fun) -%>
                         <% } else { -%>
                             <<%- itemListItem.componentName.replace(/^I/,'') -%><%- iClassToString(itemListItem.iClass) %><%- iStyleToString(itemListItem.iStyle) %>><%- itemListItem.name  -%></<%- itemListItem.componentName.replace(/^I/,'') -%>>
                         <% } -%>
                     <%}) -%>
                 </view>
             <%}) -%>
        </view>    
        <%}) -%>
    </view>
</template>
<script>
    export default {
        name: "This#is#fileName",
        data() {
            return {}
        },
        methods() {
            
        },
        computed() {
            
        },
        components:{
        }
    }
</script>
<style scoped>
    <%= classData %>
</style>`

export {fileTemplates,itemTemplates}
