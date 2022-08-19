let commoMethodsByBasicsComponents = {
    props:{
        dataIIndex:{
            type: String,
            default: '0'
        }
    },
    methods:{
        initComponenSizeStyle(ref){
            let {width,height} = this.$refs[ref].$el.style
            this.$emit('handresize',{width,height})
        },
    },
    computed:{
        propsValueMap(){
            let propsValueMap = {}
            this.propsValue.forEach(e => {
                let {key,value} = e
                propsValueMap[key] = value
            })
            return propsValueMap
        },
    }
}

export default commoMethodsByBasicsComponents
