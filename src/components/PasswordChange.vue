<template>
  <div class="container-fluid delete-modal-body animate__animated animate__fadeIn">
    <div class="container modal-box animate__animated animate__backInUp">
      <h2 class="delete-heading">Изменение пароля</h2>
      <h6 class="heading-pass">Введите новый пароль</h6>
      <input class="form-control pass" type="text" v-model="password">
      <h6 class="heading-pass">Подтвердите новый пароль</h6>
      <input class="form-control pass" type="text" v-model="passwordRepeat">
      <a class="btn btn-primary edit" @click="proceed()"><i class="fa-solid fa-save button-icon"></i>Сохранить</a>
      <a class="btn btn-primary back-btn" @click="this.$.appContext.app.unmount();"><i class="fa-solid fa-arrow-left"></i> Вернуться</a>
    </div>
  </div>
</template>

<script>

import {methods} from "@/utils/methods";

export default {
  name: "PasswordChange",
  props: ['callback'],
  data() {
    return {
      password: '',
      passwordRepeat: ''
    }
  },
  methods: {
    proceed() {
      if(this.password.length < 3)
        return methods.runNotification("Пароль слишком короткий");
      if(this.password !== this.passwordRepeat)
        return methods.runNotification("Пароли не совпадают");
      this.callback(this.password);
      this.$.appContext.app.unmount();
    }
  }
}
</script>

<style scoped>
.heading-pass {
  margin-bottom: 1rem;
}
.pass {
  width: 15vw;
  min-width: 130px;
  margin-bottom: 1rem;
}
.delete {
  background: linear-gradient(92.84deg, #EF5DA8 0.31%, #FF003D 152.41%);
  box-shadow: 0 4px 9px -4px #FF003D;
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
  width: auto;
}
.back-btn {
  margin-top: 1rem;
  color: #323232;
  background: transparent;
  border: none;
  box-shadow: none;
}
.back-btn:hover {
  margin-top: 1rem;
  color: #424242!important;
  background: transparent!important;
  border: none!important;
  box-shadow: none!important;
}
.delete-name {
  font-weight: 700;
}
.delete-date {
  font-weight: 700;
}
.delete-text {
  font-size: 1.1rem;
}
.delete-heading {
  font-size: 1.5rem;
  margin-top: 1rem;
  font-weight: 600;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.container.modal-box {
  padding-top: 7rem;
  padding-bottom: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 25px;
  max-width: 40vw;
}
.container-fluid.delete-modal-body {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  overflow-y: hidden;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
  background-color: rgba(38, 38, 38, 0.46);
}
</style>