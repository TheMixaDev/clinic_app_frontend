<template>
  <div className="container-fluid animate__animated animate__fadeIn">
    <div className="row header">
      <div className="col">
        <h1 className="heading"><router-link className="btn back btn-primary second-add" to="/doctors"><i class="fa-solid fa-arrow-left"></i>
        </router-link>{{edit.enabled ? `Редактирование врача` : `Новый врач`}}</h1>
      </div>
    </div>
    <div class="container main-part">
      <h6>Фамилия</h6>
      <input class="input-outline" type="text" ref="surname" v-model="edit.doctor.surname">
      <h6>Имя</h6>
      <input class="input-outline" type="text" ref="name" v-model="edit.doctor.name">
      <h6>Отчество</h6>
      <input class="input-outline" type="text" ref="patronymic" v-model="edit.doctor.lastname">
      <h6>Должность</h6>
      <input class="input-outline" type="text" ref="position" v-model="edit.doctor.position">
      <h6>Логин</h6>
      <input class="input-outline" type="text" ref="login" v-model="edit.doctor.login">
      <h6 v-if="!edit.enabled">Пароль</h6>
      <input class="input-outline" type="text" ref="password" v-if="!edit.enabled" v-model="edit.doctor.password">
    </div>
    <div className="container buttons-container">
      <div className="col row-buttons">
        <button className="btn btn-primary first-add" @click="createDoctor()">Сохранить</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media screen and (max-width: 1800px) {
  .main-part {
    width: 87vw !important;
    margin-left: 0 !important;
    max-height: 45vh !important;
  }
  .container-fluid {
    height: 44vw!important;
  }
  .container.main-part {
    overflow-y: scroll!important;
    height: 100%!important;
    max-height: 55vh!important;
    margin-right: 0!important;
    margin-left: 0!important;
  }
}
.input-outline {
  padding: 0.3rem!important;
  background: #F5F9FF!important;
  border: 1px solid rgba(0, 163, 255, 0.3)!important;
  border-radius: 9px!important;
  color: #7e7e7e;
  width: 30vw;
}
.container-fluid {
  background: #FAFAFA;
  overflow: hidden;
  width: 90vw;
  height: 50vw;
  border-radius: 25px;
  box-shadow: 0px 16px 47px 16px rgb(61 61 61 / 10%);
}

.header {
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 2rem;
  display: flex;
  align-items: center;
}

.heading {
  text-align: left;
}

thead {
  color: white;
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border-radius: 10px 10px 0px 0px;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 999;
}
.btn:disabled {
  opacity: 0.3!important;
}

th {
  text-align: left;
  font-weight: 600 !important;
  font-size: 1rem;
}

td {
  text-align: left;
  color: #323232;
  font-weight: 400 !important;
}

.fw-bold {
  font-weight: 400 !important;
  color: #565656;
  font-size: 1rem;
}

.ms-3 {
  margin-left: 0 !important;
}

.table-container {
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  height: 100%;
}
.back {
  background: transparent!important;
  color: black;
  border: none!important;
  font-size: 1rem;
  box-shadow: none;
}
.back:hover {
  background: transparent!important;
  color: black!important;
  border: none!important;
  font-size: 1rem!important;
  box-shadow: none!important;
}
.search-button {
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border-radius: 9px;
  padding-left: 1rem;
  padding-right: 1rem;
}

.form-outline .form-control {
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-left: none;
  border-radius: 0px 9px 9px 0px;
}

.sort-button {
  background: transparent;
  box-shadow: none;
  padding-left: 0.5rem;
  padding-top: 0;
  padding-bottom: 0;
}

.date-icon {
  padding-right: 0.5rem;
}

th:first-child {
  border-radius: 14px 0px 0px 0px;
}

th:last-child {
  border-radius: 0px 14px 0px 0px !important;
}

.container.main-part {
  margin-top: 2rem;
  height: auto;
  flex-direction: column;
  display: flex;
  max-height: 70vh;
  gap: 1.5rem;
  width: 100vw;
  align-items: center;
  overflow: hidden;
}

.table-hover {
  background: rgba(0, 163, 255, 0.03) !important;
}

.buttons-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-top: 3rem;
}

.row-buttons {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}

.col-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.first-add {
  width: 15vw;
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
}

.second-add {
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
}

.edit {
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
}

.edit:hover {
  border: none !important;
}

.delete {
  background: linear-gradient(92.84deg, #EF5DA8 0.31%, #FF003D 152.41%);
  box-shadow: 0 4px 9px -4px #FF003D;
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
}

.button-icon {
  margin-right: 0.5rem;
}

.doctor-name {
  margin-bottom: 0 !important;
  padding: 0;
}
</style>
<script>
import {methods} from "@/utils/methods";
import {constants} from "@/utils/constants";
import router from "@/router";
import {settings} from "@/utils/settings";


export default {
  data() {
    return {
      edit: {
        enabled: false,
        doctor: {
          role: constants.Role.DOCTOR,
          surname: '',
          name: '',
          lastname: '',
          position: '',
          rank: "Доктор",
          login: '',
          password: ''
        }
      }
    }
  },
  name: 'NewDoctor',
  methods: {
    preload() {
      let meta = methods.getMeta();
      if(meta) {
        this.edit.enabled = true;
        this.edit.doctor = meta;
        this.edit.doctor.role = constants.Role.DOCTOR;
        this.edit.doctor.lastname = this.edit.doctor.patronymic;
      }
    },
    createDoctor() {
      if(settings.designMode)
        return router.go(-1);
      if(this.edit.enabled)
        return this.editDoctor();
      methods.authorizedPOSTRequest(
          this.$cookies,
          `/user`,
          this.edit.doctor,
          () => {
            router.go(-1);
            methods.runNotification("Пользователь создан");
          },
          error => {
            if(error.code === "ERR_NETWORK") {
              methods.runNotification("Не удалось подключиться к серверу");
              return;
            }
            methods.runNotification("Не все поля корректно заполнены");
          }
      );
    },
    editDoctor() {
      delete this.edit.doctor.password;
      methods.authorizedPATCHRequest(
          this.$cookies,
          `/user`,
          this.edit.doctor,
          () => {
            methods.runNotification("Данные сохранены");
            router.go(-1);
          },
          error => {
            this.edit.doctor.password = "";
            if(error.code === "ERR_NETWORK") {
              methods.runNotification("Не удалось подключиться к серверу");
              return;
            }
            methods.runNotification("Не все поля корректно заполнены");
          }
      )
    }
  },
  beforeMount() {
    this.preload();
    methods.checkCookies(this.$cookies, constants.Role.ADMIN)
  }
}
</script>