let itemTemplates = `
<view class="flex">
    <% list.num.forEach(num => { -%>
    <view class="margin-0<%= iClassToString(num.iClass) %> <%= num.layoutClass %>" style="<%= iStyleToString(num.iStyle) %>">
    <% num.itemList.forEach(itemListItem => { -%>
        <% if(itemListItem.componentName === 'Iflex'){ -%>
            <%- fun(itemListItem,fun) -%>
        <% } else { -%>
            <<%= itemListItem.componentName.replace(/^I/,'')  -%> class="<%= iClassToString(itemListItem.iClass) %>" style="<%= iStyleToString(itemListItem.iStyle) %>"><%= itemListItem.name -%></<%= itemListItem.componentName.replace(/^I/,'') -%>>
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
        <view class="flex<%= iClassToString(item.iClass) %>" style="<%= iStyleToString(item.iStyle) %>">
            <% item.num.forEach(num => { -%>
                 <view class="margin-0<%= iClassToString(num.iClass) %> <%= num.layoutClass %> " style="<%= iStyleToString(num.iStyle) %>">
                     <% num.itemList.forEach(itemListItem => { -%>
                         <% if(itemListItem.componentName === 'Iflex'){ -%>
                         <%- fun(itemListItem,fun) -%>
                         <% } else { -%>
                             <<%= itemListItem.componentName.replace(/^I/,'') -%> class="<%= iClassToString(itemListItem.iClass) %>" style="<%= iStyleToString(itemListItem.iStyle) %>"><%= itemListItem.name  -%></<%= itemListItem.componentName.replace(/^I/,'') -%>>
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
        name: "test"
    }
</script>
<style scoped>
</style>`

export {fileTemplates,itemTemplates}
