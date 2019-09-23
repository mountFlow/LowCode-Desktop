<template>
    <view>
        <view class="flex-draggalbe-handle" v-show="showFlexDraggalbeHandle && preview"> </view>
        <view class="flex i-flex-r" style="position: relative"
              :style="iStyle"
              @mouseover="flexDraggalbeHandle(true)"
              @mouseout="flexDraggalbeHandle(false)"
        >
            <view class="flex-sub margin-0  i-flex"
                  :class="{'i-flex-border': preview}"
                  v-for="(item,index0) in num"
                  :dataIIndex="dataIIndex + '-' +index0"
                  :data-i-index="dataIIndex + '-' +index0"
            >
                <draggable :group="iflexGroup" :list="item.itemList"
                           :options="{
                            }"
                           @choose="choosComponents"
                           style="height: 100%;width: 100%"
                >
                    <template v-for="(item2,index) in item.itemList">
                        <component :key="index" :is="item2.componentName"
                                   :dataIIndex="dataIIndex + '-' + index0 + '-' +index"
                                   :data-i-index="dataIIndex + '-' + index0 + '-' +index"
                                   v-bind="item2"
                                   :style="item2.iStyle"
                        >
                        </component>
                    </template>
                </draggable>
            </view>
        </view>
    </view>
</template>

<script>
    import draggable from '@/common/js/vuedraggable'
    import basicsMixin from '@/common/js/importBasics'

    export default {
        mixins: [basicsMixin],
        name: 'Iflex',
        props: {
            dataIIndex:{
                type: String,
                default: '0'
            },
            num: {
                type: Array,
                default: ()=>[]
            },
            iStyle: {
                type: Object,
                default: ()=>{}
            }
        },
        data(){
            return {
                fallbackClass:{
                    zoom: 0.4
                },
                isDraggalbe: false
            }
        },
        methods:{
            choosComponents(evt){
                console.log( evt)
                console.log(evt.item.dataset['iIndex'])
                let index = evt.item.dataset['iIndex']
                this.$store.dispatch('setCurrentCheckAttrNameComputed',{index})

                if (evt.item.firstChild.className === 'flex-draggalbe-handle'){
                    this.$store.commit('setDeleteGroupName',{deleteGroupName:'layouts'})
                    this.$store.commit('setIflexGroup',{iflexGroup:'layouts'})
                } else {
                    this.$store.commit('setDeleteGroupName',{deleteGroupName:'components'})
                    this.$store.commit('setIflexGroup',{iflexGroup:'components'})
                }

            },
            flexDraggalbeHandle(flag){
                this.isDraggalbe = flag
            },
            dddd(){
                console.log('ddd')
            }
        },
        computed:{
            preview(){
                return this.$store.state.preview
            },
            showFlexDraggalbeHandle(){
                return this.$store.state.showFlexDraggalbeHandle
            },
            iflexGroup(){
                return this.$store.state.iflexGroup
            }
        },
        components:{
            draggable
        }
    }
</script>

<style lang="scss">

    .sortable-fallback{
    }
    .i-flex{
        min-height: 25upx;

        &-border {
            border-left: #675e6f solid 1px;
            border-right: #675e6f solid 1px;
            border-bottom: #675e6f solid 1px;
        }
    }

    .flex-draggalbe-handle {
        cursor: move;
        background-color: #675e6f;
        width: 100%;
        height: 20upx;
    }

    .sortable-fallback{
        display: none;
    }
</style>
