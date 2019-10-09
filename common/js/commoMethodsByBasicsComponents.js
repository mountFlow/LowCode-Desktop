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
    }
}

export default commoMethodsByBasicsComponents
