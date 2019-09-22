<template>
    <view class="phone" :style="phoneStyle">
        <draggable group="layouts" :list="list"
                   :options="{
                   }"
                   @choose="choosLayouts"
                   style="height: 100%;width: 100%"
                   handle=".flex-draggalbe-handle"
        >
            <template v-for="(item,index) in list">
                <component :key="index" :is="item.componentName"
                           :dataIIndex="index + ''"
                           :data-i-index="index"
                           v-bind="item"
                ></component>
            </template>
        </draggable>
    </view>
</template>

<script>
    import draggable from '@/common/js/vuedraggable'
    import basicsMixin from '@/common/js/importBasics'
    import Iflex from '@/components/basics/Iflex'

    export default {
        mixins: [basicsMixin],
        name: 'PhoneFrame',
        data(){
          return {
              dragging: false,
              phoneStyle:{
                  fontSize: '32px'
              }
          }
        },
        methods:{
            choosLayouts(evt){
                console.log( evt)
                console.log(evt.item.dataset['iIndex'])
                let index = evt.item.dataset['iIndex']
                this.$store.dispatch('setCurrentCheckAttrNameComputed',{index})
                this.$store.commit('setDeleteGroupName',{deleteGroupName:'layouts'})
                this.$store.commit('setIflexGroup',{iflexGroup:'layouts'})
            }
        },
        computed:{
          list:{
            get() {
                return this.$store.state.list
            },
            set(value){
                this.$store.commit('setGlobalList',{list:value})
            }
          }
        },
        components:{
            draggable,
            Iflex
        }
    }
</script>

<style lang="scss">

    $phoneWidth: 375upx;
    $phoneHeight: 667upx;

    .phone{
        width: $phoneWidth;
        height: $phoneHeight;
        background-color: silver;
        position: relative;
        transform: scale(.4,.4);
        margin-top: -55%;
    }

    .sortable-fallback{
        display: none;
    }
</style>
