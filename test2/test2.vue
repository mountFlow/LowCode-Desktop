<template>
	<view>
		<view style="width: 100vw;height: 90vh;background-color: #c8c7cc;display: flex;justify-content: space-between;align-items: flex-end">
			<!--<view v-for="(item,index) in list" :key=index style="width: .5vw;background-color: #007aff;font-size: 10px;" :style="'background-color: #'+(0x105ff0 + parseInt(item.id) * 99999).toString(16)+';height:'+ item.value +'px'">-->
			<!--</view>-->
			<view v-for="(item,index) in list" :key=index style="width: .5vw;background-color: #007aff;font-size: 10px;" :style="'background-color: '+com(item.id)+';height:'+ item.value +'px'">
			</view>
		</view>
		<view style="display: flex">
			<button @click="start">{{j}}</button>
			<button @click="end">暂停</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			    list: [],
				j: 0,
				x: undefined
			}
		},
		created(){
            for (let i = 0; i < 100; i++) {
				this.list.push({
					value: 100,
					id:i
				})
				if (i>=90){
                    this.list[i].value = 300
                }
            }
		},
		methods: {
		    com(id){
		        if (id>=90){
		            return 'red'
				} else {
		            return '#3c3c3c'
				}
			},
            start(){
                let list = this.list
				if (this.x){
				    return
				}
				let x = setInterval(()=>{
				    if (this.j >= 34000){
				        clearInterval(x)
					}

                    for (let i = 0;i<list.length;i++){
                        let rand = Math.floor(Math.random()*100);
                        while (rand === i){
                            rand = Math.floor(Math.random()*100);
                        }
                        if (this.list[i].value > 0){
                            this.list[i].value -= 1
                            this.list[rand].value += 1
                        }
                    }
                    this.list.sort((a, b)=>{return a.value - b.value})
                    this.j ++
				},2)
				this.x = x
			},
            end(){
                if (this.x){
                    clearInterval(this.x)
                    this.x = undefined
				}
			}
		}
	}
</script>

<style>

</style>
