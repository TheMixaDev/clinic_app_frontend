<template>
  <div id="modal"></div>
  <div class="container-fluid login-box animate__animated animate__fadeIn">
    <img class="logo" src="../assets/logo.svg"/>
    <h1>{{ setupMode ? 'Создание администратора' : 'Система управления'}}</h1>
    <div class="container form">
      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">{{setupMode ? 'Пароль' : 'Логин'}}</label>
        <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" v-model="login">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">{{setupMode ? 'Повторите пароль' : 'Пароль'}}</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" v-on:keyup.enter="auth()">
      </div>
      <button type="submit" class="btn btn-primary" @click="auth">Войти</button>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 1500px) {
  .container-fluid {
    height: 70vh!important;
    width: 50vw!important;
  }
}
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
import {createApp} from "vue";
import ActionModal from "@/components/ActionModal.vue";
import PasswordChange from "@/components/PasswordChange.vue";
export default {
  data() {
    return {
      login: "",
      password: "",
      setupMode: false,
    };
  },
  name: 'LogInForm',
  components: {},
  methods: {
    checkSetup() {
      (async () => {
        await axios.get(`${settings.serverUrl}/user/setup`).catch(error => {
          if(error.response.data.status === 404)
            this.setupMode = true;
        })
      })();
    },
    auth() {
      if(settings.designMode && this.login === "admin")
        return router.push({ name: "doctors-directory" });
      if(settings.designMode)
        return router.push({ name: "appointments" });
      if(this.setupMode)
        return this.setupClick();
      let data = {
        "login": this.login,
        "password": this.password
      };
      if(this.login.length === 0 && this.password.length !== 0) {
        return (async () => {
          let response = await axios.get(`${settings.serverUrl}/user/setup/${this.password}`).catch(error => {
            if(error.code === "ERR_NETWORK") {
              methods.runNotification("Не удалось подключиться к серверу");
              return;
            }
            methods.runNotification("Неверный логин или пароль");
          });
          if(response && response.status === 200) {
            let result = response.data.body;
            if(!result)
              return methods.runNotification("Неверный логин или пароль");
            methods.runNotification("Введен верный ключ");
            const div = document.getElementById("modal");
            const app = createApp(PasswordChange, {
              callback: password => {
                (async ()=>{
                  let response = await axios.post(`${settings.serverUrl}/user/setup`, {key: this.password, password: password}).catch(error => {
                    if(error.code === "ERR_NETWORK") {
                      methods.runNotification("Не удалось подключиться к серверу");
                      return;
                    }
                    methods.runNotification("Не удалось обновить администратора");
                  });
                  if(response && response.status === 200) {
                    methods.runNotification("Пароль администратора обновлен");
                    router.go(0);
                    methods.checkCookies(this.$cookies, constants.Role.UNAUTHORIZED)
                  }
                })();
              }
            });
            app.mount(div);
          }
        })();
      }
      (async () => {
        let response = await axios.post(`${settings.serverUrl}/user/login`, data).catch(error => {
          if(error.code === "ERR_NETWORK") {
            methods.runNotification("Не удалось подключиться к серверу");
            return;
          }
          methods.runNotification("Неверный логин или пароль");
        });
        if(response && response.status === 200) {
          this.$cookies.set("token",response.data.body.token,"1y");
          methods.checkCookies(this.$cookies, constants.Role.UNAUTHORIZED)
        }
      })();
    },
    setupClick() {
      if(this.password.length < 3)
        return methods.runNotification("Пароль слишком короткий");
      if(this.login !== this.password)
        return methods.runNotification("Пароли не совпадают");
      const div = document.getElementById("modal");
      const app = createApp(ActionModal, {
        info: {
          heading: 'Запишите пароль',
          icon: 'exit',
          text: 'Для того, что бы не потерять доступ к системе "Учет пациентов"',
          highlighted: 'обязательно запишите себе пароль',
          proceedButton: 'Продолжить'
        },
        callback: ()=>{
          (async ()=>{
            let response = await axios.post(`${settings.serverUrl}/user/setup`, {password: this.password}).catch(error => {
              if(error.code === "ERR_NETWORK") {
                methods.runNotification("Не удалось подключиться к серверу");
                return;
              }
              methods.runNotification("Не удалось создать администратора");
            });
            if(response && response.status === 200) {
              methods.runNotification("Администратор создан");
              router.go(0);
              methods.checkCookies(this.$cookies, constants.Role.UNAUTHORIZED)
            }
          })();
        }
      });
      app.mount(div);
    }
  },
  beforeMount() {
    methods.checkCookies(this.$cookies, constants.Role.UNAUTHORIZED, ()=>{}, this.checkSetup);
  }
}
</script>
