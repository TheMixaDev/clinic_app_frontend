<template>
  <div className="container-fluid animate__animated animate__fadeIn">
    <div className="row header">
      <div className="col">
        <h1 className="heading"><router-link className="btn back btn-primary second-add" to="/appointment"><i class="fa-solid fa-arrow-left"></i>
        </router-link>Роды</h1>
      </div>
    </div>
    <div class="container main-part">
      <div class="row analizes-row">
        <div class="col analizes-col">
          <h6>Роды ч/з ЕРП</h6>
          <input class="input-outline" type="text">
        </div>
        <div class="col analizes-col">
          <h6>Характер КС</h6>
          <input class="input-outline" type="text">
        </div>
        <div class="col analizes-col">
          <h6>Вес плода</h6>
          <input class="input-outline" type="text">
        </div>
        <div class="col analizes-col">
          <h6>Апгар</h6>
          <input class="input-outline" type="text">
        </div>
        <div class="col analizes-col">
          <h6>Кровопотеря</h6>
          <input class="input-outline" type="text">
        </div>
        <div class="col analizes-col">
          <h6>Роды в срок</h6>
          <input class="input-outline" type="text">
        </div>
        <div class="col analizes-col">
          <h6>Осложнения послеродового периода</h6>
          <input class="input-outline" type="text">
        </div>

        <div className="col row-buttons-analizes">
          <button className="btn btn-primary save"><i class="fa-regular fa-circle-check save-icon"></i>  Сохранить</button>
          <button className="btn btn-primary save"><i class="fa-regular fa-circle-xmark delete-icon"></i>  Удалить</button>
        </div>
        <div class="row button-add"><button className="btn btn-primary first-add add"><i class="fa-solid fa-plus"></i> Добавить роды</button></div>
      </div>
    </div>
    <div className="container buttons-container">
      <div className="col row-buttons">
        <button className="btn btn-primary first-add" to="/doctors-directory" @click="createDoctor()">Сохранить</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.button-add {
  display: flex;
  justify-content: center;
}
.save-icon {
  color: #33ff33;
}
.delete-icon {
  color: #ff0059;
}
.save {
  background: transparent;
  color: #323232;
  padding-top: 0;
  padding-bottom: 0;
  height: 2rem;
  box-shadow: none;
  border: none;
  width: 10rem;
}
.save:hover {
  background: transparent;
  color: #0e0e0e;
  padding-top: 0;
  padding-bottom: 0;
  height: 2rem;
  box-shadow: none;
  border: none;
}
.row-buttons-analizes {
  display: flex;
  align-items: center;
  height: 6rem;
  align-content: center;
  justify-content: center;
}
.analizes-row {
  gap: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.22);
}
.analizes-col {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
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

tr {
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

.date {
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
  align-items: flex-start;
}

thead {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 999;
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

edit:hover {
  border: none !important;
}

.delete {
  background: linear-gradient(92.84deg, #EF5DA8 0.31%, #FF003D 152.41%);
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
        this.edit.doctor.password = "Редактируется на главной странице";
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
            this.edit.doctor.password = "Редактируется на главной странице";
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
    methods.checkCookies(this.$cookies, constants.Role.ADMIN, this.preload)
  }
}
</script>