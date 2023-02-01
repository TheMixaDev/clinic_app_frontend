<template>
  <div id="notification"></div>
  <div class="container-fluid login-box animate__animated animate__fadeIn">
    <img class="logo" src="../assets/logo.svg"/>
    <h1>Система управления</h1>
    <div class="container form">
      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">Адрес электронной почты</label>
        <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" v-model="login">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Пароль</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary" @click="auth">Войти</button>
    </div>
  </div>
</template>

<style scoped>
.container-fluid.login-box {
  overflow-y: hidden;
}
.container-fluid {
  background: #FAFAFA;
  width: 40vw;
  height: 30vw;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  box-shadow: 0px 16px 47px 16px rgb(61 61 61 / 10%);
  align-items: center;
  justify-content: center;
}
.form {
  width: 15vw;
}
.btn {
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 2px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
}
.form-label {
  text-align: left;
}
.form-control {
  text-align: center;
}
</style>

<script>
import axios from "axios";
import {settings} from "@/utils/settings";
import {methods} from "@/utils/methods";
import router from "@/router/index";
import {constants} from "@/utils/constants";
export default {
  data() {
    return {
      login: "",
      password: ""
    };
  },
  name: 'LogInForm',
  components: {},
  methods: {
    auth() {
      if(settings.designMode)
        return router.push({ name: "appointments" });
      let data = {
        "login": this.login,
        "password": this.password
      }
      axios.post(`${settings.serverUrl}/user/login`, data).then(response => {
        if(response.status === 200) {
          this.$cookies.set("token",response.data.body.token,"1y");
          router.push({ name: "appointments" }); // TODO: OR ADMIN PANEL DEPENDING ON ROLE
        }
      }).catch(error => {
        if(error.code === "ERR_NETWORK") {
          methods.runNotification("Не удалось подключиться к серверу");
          return;
        }
        methods.runNotification("Неверный логин или пароль");
      });
    }
  },
  beforeMount() {
    methods.checkCookies(this.$cookies, constants.Role.UNAUTHORIZED)
  }
}
</script>
