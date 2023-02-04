<template>
  <div class="container-fluid delete-modal-body animate__animated animate__fadeIn">
    <div class="container modal-box animate__animated animate__backInUp">
      <img class="icon" src="../assets/delete.svg" v-if="info.icon === 'delete'">
      <img class="icon" src="../assets/question.svg" v-if="info.icon === 'question'">
      <img class="icon" src="../assets/exit.svg" v-if="info.icon === 'exit'">
      <h2 class="delete-heading">{{ info.heading }}</h2>
      <p class="delete-text">{{ info.text }} <span class="delete-name">{{ info.highlighted }}</span></p>
      <a class="btn btn-primary delete-button" @click="proceed()">{{ info.proceedButton }}</a>
      <a class="btn btn-primary back-btn" @click="this.$.appContext.app.unmount();"><i class="fa-solid fa-arrow-left"></i> Вернуться</a>
    </div>
  </div>
</template>

<script>
import {settings} from "@/utils/settings";

export default {
  name: "ActionModal",
  props: ['info', 'callback'],
  methods: {
    proceed() {
      if(settings.designMode)
        return;
      this.callback();
      this.$.appContext.app.unmount();
    }
  }
}
</script>

<style scoped>
.icon {
  width: 10rem;
}
.delete-button {
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