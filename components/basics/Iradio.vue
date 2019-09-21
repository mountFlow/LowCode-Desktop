<template>
    <radio :value="'USA'" :checked="true"/>
</template>

<script>
    export default {
        name: 'Iradio',
        data() {
            return {
                items: [{
                    value: 'USA',
                    name: '美国'
                },
                    {
                        value: 'CHN',
                        name: '中国',
                        checked: 'true'
                    },
                    {
                        value: 'BRA',
                        name: '巴西'
                    },
                    {
                        value: 'JPN',
                        name: '日本'
                    },
                    {
                        value: 'ENG',
                        name: '英国'
                    },
                    {
                        value: 'FRA',
                        name: '法国'
                    },
                ],
                current: 0
            }
        },
        methods: {
            radioChange: function(evt) {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].value === evt.target.value) {
                        this.current = i;
                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    uni-radio::before, uni-checkbox::before{
        font-size: 16px;
    }
</style>
