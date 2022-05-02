<template>
<div class="content">
  <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
  <div class="form">
    <nut-navbar
      :leftShow="false"
      :rightShow="false"
      class="my-navbar"
    >登录</nut-navbar>
    <nut-textinput
      v-model="username"
      label="用户名："
      placeholder="请输入用户名"
      :clearBtn="true"
      :disabled="false"
      class="my-input my-user"
    />
    <nut-textinput
      placeholder="请输入密码"
      v-model="password"
      label="密码："
      type="password"
      class="my-input"
    />
      <nut-button
        type="light"
        class="my-button"
        @click="signIn"
      >
        登录
      </nut-button>
  </div>
</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {login} from "../../network/home";
export default {
  name: "Login",
  components: {
    NavBar,
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async signIn() {
      let res = await login({
        username: this.username,
        password: this.password
      });
      if(res.code == 200) sessionStorage.setItem('user_id', res?.data?.user_id);
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>
.content {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(19, 185, 207, 0.5);
}
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.my-input {
  margin: 10px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动 使用bs后就不需要了*/
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  height: 40px;
}
.my-navbar {
  background-color: rgba(19, 185, 207, 0);
}
.my-button {
  width: 180px;
  margin-top: 10px;
  background-color: rgba(19, 185, 207, 0.5);
}
.my-user {
  margin-left: -6px;
}
</style>
