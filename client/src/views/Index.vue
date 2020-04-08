<template>
    <div class="index">
        <router-view></router-view>
        <TabBar :data='tabberData'></TabBar>
    </div>
</template>

<script>
import TabBar from "../components/TabBar";

export default {
  name: "index",
  data() {
    return {
      tabberData: [
        { title: "微信", icon: "comment", path: "/wchart" },
        { title: "通讯录", icon: "address-book", path: "/abook" },
        { title: "发现", icon: "compass", path: "/find" },
        { title: "我", icon: "user", path: "/mine" }
      ]
    };
  },
  components: {
    TabBar
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
}
</style>


