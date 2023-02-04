<template>
  <div class="container-fluid delete-modal-body animate__animated animate__fadeIn">
    <div class="container modal-box animate__animated animate__backInUp">
      <h2 class="delete-heading">{{ edit.enabled ? "Изменение" : "Добавление"}} родов</h2>
      <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
        <tbody>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Роды через ЕРП</p>
              </div>
            </div>
          </td>
          <td @click="edit.model.birth = !edit.model.birth">
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="edit.model.birth"/>
                  <label class="form-check-label"></label>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Характер КС</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <select class="form-select" aria-label="Default select example" v-model="edit.model.character">
                  <option value="1">Плановое</option>
                  <option value="2">Экстренное</option>
                </select>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Вес плода</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <input class="input-outline" type="text" v-model="edit.model.weight">
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Рост</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <input class="input-outline" type="text" v-model="edit.model.height">
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Апгар</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <input class="input-outline" type="text" v-model="edit.model.apgar">
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Кровопотеря</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <input class="input-outline" type="text" v-model="edit.model.bloodloss">
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Роды в срок</p>
              </div>
            </div>
          </td>
          <td @click="edit.model.timeperiod = !edit.model.timeperiod">
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="edit.model.timeperiod"/>
                  <label class="form-check-label"></label>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Осложнения послеродового периода</p>
              </div>
            </div>
          </td>
          <td @click="edit.model.complications = !edit.model.complications">
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="edit.model.complications"/>
                  <label class="form-check-label"></label>
                </div>
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
  name: "AddChildbirthComponent",
  props: ['info', 'callback'],
  methods: {
    proceed() {
      if(settings.designMode)
        return;
      this.callback(this.edit, "birth", "Роды");
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
        model: {
          id: -1,
          birth: false,
          character: 1,
          weight: 0,
          height: 0,
          apgar: 0,
          bloodloss: 0,
          timeperiod: true,
          complications: true
        }
      }
    }
  }
}
</script>

<style scoped>
.form-select {
  width: 10vw;
}
.form-check {
  margin-left: 0;
  width: 10vw;
  display: flex;
  justify-content: center;
}
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