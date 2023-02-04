<template>
  <div class="container-fluid delete-modal-body animate__animated animate__fadeIn">
    <div class="container modal-box animate__animated animate__backInUp">
      <h2 class="delete-heading">Добавление анализов</h2>
      <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
        <thead class="bg-light">
        <tr class="table-first-row">
          <th>Дата анализа</th>
          <th><input type="date" class="date" v-model="edit.model.date"></th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(label, index) in edit.labels" :key="label">
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ label }}</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <input class="input-outline" type="text" v-model="edit.model.values[index]">
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <a class="btn btn-primary edit" @click="proceed();"><i class="fa-solid fa-save button-icon"></i>Сохранить</a>
      <a class="btn btn-primary back-btn" @click="this.$.appContext.app.unmount();"><i class="fa-solid fa-arrow-left"></i> Вернуться</a>
    </div>
  </div>
</template>

<script>

import {settings} from "@/utils/settings";

export default {
  name: "AddAnalyzesComponent",
  props: ['info', 'callback'],
  methods: {
    proceed() {
      if(settings.designMode)
        return;
      this.callback(this.edit, this.edit.table, "Анализы");
      this.$.appContext.app.unmount();
    }
  },
  beforeMount() {
    this.edit = this.info;
  },
  data() {
    return {
      edit: {
        enabled: false,
        table: "analyzes_1",
        labels: ["1","2","3","4","5","6","7","8","9","10","11"],
        model: {
          id: -1,
          date: "",
          values: ["","","","","","","","","","",""]
        }
      }
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
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  padding-left: 2rem;
  padding-right: 2rem;
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
.edit {
  margin-top: 1rem;
}
.input-outline {
  background: #F5F9FF!important;
  border: 1px solid rgba(0, 163, 255, 0.3)!important;
  border-radius: 9px!important;
  color: #7e7e7e;
  width: 10vw;
}
</style>