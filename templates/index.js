let fileTemplates =
`<template>
    <view>
        <% list.forEach(item => { %>
            <view class="flex">
                <% item.num.forEach(num => { %>
                    <view class="margin-0  i-flex">
                    <% num.itemList.forEach(itemListItem => { %>
                       <<% itemListItem.componentName %>><% itemListItem.name %></<% itemListItem.componentName %>>
                    <%}) %>
                    </view>
                <%}) %>
            </view>    
        <%}) %>
    </view>
</template>
<script>
    export default {
        name: "test"
    }
</script>
<style scoped>
</style>`

export {fileTemplates}
