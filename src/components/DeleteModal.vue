<template>
  <div class="container-fluid delete-modal-body animate__animated animate__fadeIn">
    <div class="container modal-box animate__animated animate__backInUp">
      <img src="../assets/delete.svg">
      <h2 class="delete-heading">Удаление записи</h2>
      <p class="delete-text">Подтвердите удаление записи <span class="delete-name">{{ appointment.surname + " " + appointment.name + " " + appointment.patronymic }}</span> на <span class="delete-date">{{ appointment.date }}</span></p>
      <a class="btn btn-primary delete" @click="proceed()"><i class="fa-solid fa-trash button-icon"></i>Удалить</a>
      <a class="btn btn-primary back-btn" @click="this.$.appContext.app.unmount();"><i class="fa-solid fa-arrow-left"></i> Вернуться к списку</a>
    </div>
  </div>
</template>

<script>
import {settings} from "@/utils/settings";

export default {
  name: "DeleteModal",
  props: ['appointment'],
  methods: {
    proceed() {
      if(settings.designMode)
        return;
      // TODO delition
    }
  }
}
</script>

<style scoped>
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