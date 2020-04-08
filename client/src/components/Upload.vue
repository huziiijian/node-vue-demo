<template>
    <div class="img_wrap">
      <div class="isImg" 
            v-if="showfileData.length > 0"
            v-for="(file_img, index) in showfileData" 
            :key="index">
            <img :src="file_img" alt="">
            <button
                v-show="!loading" 
                class="remove" 
                @click='removeImg(file_img)'>x</button>
        </div>
        <div class="isImg img_upload" v-if="showfileData.length < 9">
            <button class="btn_upload">
                <input 
                    type="file" ref="myFile" 
                    multiple="multiple" accept="img/*"
                    @change='addFile' />
            </button>
        </div>
    </div>
</template>

<script>
export default {
  name: "upload",
  props: {
    loading: {
      type: Boolean,
      defalt: false
    }
  },
  data() {
    return {
      showfileData: [], // 存放图片的Url的数组
      allUploadFiles: [] // 文件上传file数组
    };
  },
  methods: {
    addFile() {
      let files = [...this.$refs.myFile.files];
      if (this.showfileData.length + files.length > 9) {
        alert("最多发表9张照片！");
        return;
      }
      files.forEach(file => {
        this.allUploadFiles.push(file);

        let objUrl = this.getObjectUrl(file);
        this.showfileData.push(objUrl);
      });

      this.$emit("getImgs", this.allUploadFiles);
    },
    getObjectUrl(file) {
      // 获取文件url
      let url = null;
      if (window.createObjectURL != undefined)
        url = window.createObjectURL(file);
      else if (window.URL != undefined) url = window.URL.createObjectURL(file);
      else if (window.webkitURL != undefined)
        url = window.webkitURL.createObjectURL(url);
      return url;
    },
    removeImg(file_img) {
      // 删除
      this.showfileData.forEach((file, index) => {
        if (file == file_img) this.showfileData.splice(index, 1);
      });
    }
  }
};
</script>

<style scoped>
.isImg {
  box-sizing: border-box;
  width: 30%;
  height: 6rem;
  float: left;
  margin-right: 8px;
  margin-bottom: 8px;
  position: relative;
}
.btn_upload {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background: url(../assets/upload.png) no-repeat;
  background-size: 100% 100%;
}
.btn_upload input {
  display: inline-block;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.isImg img {
  width: 100%;
  height: 100%;
}
.isImg .remove {
  position: absolute;
  top: -8px;
  right: -5px;
  border: none;
  outline: none;
  width: 20px;
  height: 20px;
  padding: 0;
  text-align: center;
  color: white;
  background-color: #3baffd;
  line-height: 10px;
  border-radius: 50%;
}
</style>

