<template>
    <div style="width: 100%;display: flex;justify-content: center;margin-top: 15px;margin-left: -10px;margin-bottom: 15px;">
     <div style="width: 38%;margin-top: 10px ;">
     {{propsValueMap.test}}
     </div>
     <el-upload
       class="avatar-uploader"
       action="https://jsonplaceholder.typicode.com/posts/"
       :show-file-list="false"
       :on-success="handleAvatarSuccess"
       :before-upload="beforeAvatarUpload">
       <img v-if="imageUrl" :src="imageUrl" class="avatar">
       <i v-else class="el-icon-plus avatar-uploader-icon"></i>
     </el-upload>
      <!--  绑定store中的propsmap，得到其中传过来的参数，同步在组件处显示 -->
    </div>
</template>

<script>
         //导入每个组件都必备的方法，增加代码复用
    import commoMethodsByBasicsComponents from 'common/js/commoMethodsByBasicsComponents'

    export default {
        //设置自定义组件的名称
        name: 'Ibutton',
        mixins: [commoMethodsByBasicsComponents],
        props:{
            propsValue: {
                type: Array,
                //设置默认的propmap值
                default: () => ([{key:'text',value:'按钮'}])
            }
        },
        methods:{
             handleAvatarSuccess(res, file) {
                    this.imageUrl = URL.createObjectURL(file.raw);
                  },
                  beforeAvatarUpload(file) {
                    const isJPG = file.type === 'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 2;
            
                    if (!isJPG) {
                      this.$message.error('上传头像图片只能是 JPG 格式!');
                    }
                    if (!isLt2M) {
                      this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                    return isJPG && isLt2M;
                  }
                
        }
    }
</script>

<style >
    .avatar-uploader{
        border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            margin-left:-20px
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
        
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
</style>
