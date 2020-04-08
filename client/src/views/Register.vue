<template>
    <div class="register">
        <div class="header">
            <button @click="$router.go(-1)">取消</button>
        </div>
        <div class="container">
            <div class="title">注册账户</div>
            <div class="content">
                <!-- 表单 -->
                <form>
                    <InputGroup
                        label='昵称'
                        placeholder="例如：陈晨"
                        v-model="user.name"
                    ></InputGroup>
                    <InputGroup
                        label='邮箱'
                        type='email'
                        placeholder="请填写邮箱"
                        v-model="user.email"
                    ></InputGroup>
                    <InputGroup
                        label='密码'
                        placeholder="请设置密码"
                        v-model="user.password"
                        type='password'
                    ></InputGroup>
                    <InputGroup
                        label='确认密码'
                        placeholder="请确认密码"
                        v-model="user.password2"
                        type='password'
                    ></InputGroup>
                </form>
                <div class="btn_wrap">
                  <YButton
                    :disabled='isDisabled'
                    @click="registerClick"
                  >注册</YButton>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputGroup from "../components/InputGroup";
import YButton from "../components/YButton";

export default {
  name: "register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password2: ""
      }
    };
  },
  components: {
    InputGroup,
    YButton
  },
  computed: {
    isDisabled() {
      if (
        this.user.name &&
        this.user.email &&
        this.user.password &&
        this.user.password2
      )
        return false;
      else return true;
    }
  },
  methods: {
    registerClick(event) {
      var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!reg.test(this.user.email)) {
        alert("请输入合法的邮箱地址！");
        return;
      }
      if (this.user.password !== this.user.password2) {
        alert("两次密码输入不一致！");
        return;
      }
      this.$axios.post("/api/users/register", this.user).then(res => {
        // 注册成功
        alert("注册成功");
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 50px;
}
.header button {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #20af0e;
}
.container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.title {
  margin-top: 30px;
  font-size: 22px;
  text-align: center;
}
.content,
.btn_wrap {
  margin-top: 30px;
}
</style>
