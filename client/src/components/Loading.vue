<template>
    <div class="loading" v-show="loading">
        <div class="load_wrap">
            <img src="../assets/scroll_load.gif">
            <span>加载中...</span>
        </div>
    </div>
</template>
<script>
export default {
  name: "loading",
  props: {
    loading: {
      type: Boolean,
      defalt: false
    }
  }
};
</script>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.8);
}
.load_wrap {
  position: absolute;
  width: 50%;
  height: 40px;
  left: 25%;
  top: 30%;
  text-align: center;
}
.load_wrap img {
  width: 1.6rem;
  margin-right: 8px;
  vertical-align: middle;
}
</style>
