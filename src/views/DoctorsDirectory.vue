<template>
  <div id="modal"></div>
  <div className="container-fluid doctors-container animate__animated animate__fadeIn">
    <div className="row header">
      <div className="col">
        <h1 className="heading"><button className="btn back btn-primary second-add" @click="router().go(-1);" v-if="doctorMode"><i class="fa-solid fa-arrow-left"></i></button>
          {{ doctorMode ? "Выбор врача" : "Панель администратора"}}
        </h1>
      </div>
      <div className="col">
        <div className="container table-container">
          <div className="input-group">
            <button type="button" className="btn btn-primary search-button" @click="applyFiltersSearch()">
              <i className="fas fa-search"></i>
            </button>
            <div className="form-outline">
              <input type="search" id="form1" className="form-control" ref="searchInput" v-on:keyup.enter="applyFiltersSearch()"/>
              <label className="form-label" htmlFor="form1">Поиск</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col profile" v-if="!doctorMode">
        <button class="btn btn-primary exit-button" @click="requestLogout()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Выход</button>
      </div>
    </div>
    <div className="container main-part" ref="scrollHandler">
      <table className="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
        <thead className="bg-light">
        <tr class="table-first-row">
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Должность</th>
          <th v-if="!doctorMode">Звание</th>
          <th v-if="!doctorMode">Логин</th>
          <th v-if="!doctorMode">Пароль</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="doctor in doctors" :key="doctor.id" @click="selectDoctor(doctor)" :style="selectedDoctor !== -1 && selectedDoctor.id === doctor.id ? `background-color: #cceffd` : ``">
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{{ doctor.surname }}</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{{ doctor.name }}</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{{ doctor.patronymic }}</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{{ doctor.position }}</p>
              </div>
            </div>
          </td>
          <td v-if="!doctorMode">
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{{ doctor.rank }}</p>
              </div>
            </div>
          </td>
          <td v-if="!doctorMode">
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{{ doctor.login }}</p>
              </div>
            </div>
          </td>
          <td v-if="!doctorMode">
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <button class="btn btn-primary password" @click="requestChangepassword(doctor)"><i class="fa-solid fa-key"></i> Изменить</button>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div className="container buttons-container">
      <div className="col row-buttons">
        <button className="btn btn-primary first-add" @click="listAction()" v-bind:disabled="doctorMode && this.selectedDoctor === -1">
          <i className="fa-solid fa-plus button-icon" v-if="!doctorMode"></i>{{ doctorMode ? "Выбрать" : "Новый"}}
        </button>
      </div>
      <div className="col row-button" v-if="!doctorMode">
        <button class="btn btn-primary edit" v-bind:disabled="this.selectedDoctor === -1" @click="editDoctor()"><i class="fa-solid fa-pen button-icon"></i>Редактировать</button>
        <button class="btn btn-primary delete" v-bind:disabled="this.selectedDoctor === -1" @click="requestDelete()"><i class="fa-solid fa-trash button-icon"></i>Удалить</button>
        <button class="btn btn-primary download"><i class="fa-solid fa-cloud-arrow-down"></i> Выгрузить в StatTech
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media screen and (max-width: 1500px) {
  .main-part {
    width: 87vw !important;
    margin-left: 0 !important;
    max-height: 45vh !important;
  }

  .container-fluid {
    max-height: 80vh !important;
    max-width: 100vw !important;
  }
  .buttons-container {
    margin-top: 2rem!important;
  }
  .heading {
    font-size: 1.5rem!important;
  }
}
.profile {
  display: flex;
  gap: 2rem;

  justify-content: flex-end;
}
.exit-button {
  background: transparent;
  border: none;
  box-shadow: none;
  color: #323232;
  padding: 0;
}
.exit-button:hover {
  background: transparent;
  border: none;
  box-shadow: none!important;
  padding: 0;
  color: rgba(50, 50, 50, 0.46);
}
.row-button {
  display: flex;
  justify-content: flex-end;
}
.download {
  background: transparent;
  border: none;
  box-shadow: none;
}
.download:hover{
  background: transparent;
  color: #525252;
  border: none;
  box-shadow: none;
}
.password {
  background: transparent;
  box-shadow: none;
  border: none;
  color: #323232;
  padding: 0;
}
.password:hover {
  background: transparent;
  box-shadow: none!important;
  border: none;
  color: #4d4d4d;
  padding: 0;
}
.container-fluid.doctors-container {
  overflow-y: hidden;
}
.container-fluid {
  background: #FAFAFA;
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

.table-first-row {
  border-top: none;
  border-left: none;
  border-right: none;
}
.btn:disabled {
  opacity: 0.3!important;
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
  background: transparent !important;
  color: black;
  border: none !important;
  font-size: 1rem;
  box-shadow: none;
  width: 2vw;
}

.back:hover {
  background: transparent !important;
  color: black !important;
  border: none !important;
  font-size: 1rem !important;
  box-shadow: none !important;
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

.main-part {
  margin-top: 2rem;
  height: auto;
  max-height: 60vh;
  width: 100vw;
  overflow-y: scroll;
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
import {settings} from "@/utils/settings";
import {createApp} from "vue";
import ActionModal from "@/components/ActionModal.vue";
import router from "@/router";
import PasswordChange from "@/components/PasswordChange.vue";

export default {
  name: 'DoctorsDirectory',
  data() {
    return {
      doctors: [],
      selectedDoctor: -1,
      doctorMode: false,
      loadInfo: {
        dataFinished: false,
        loadedPage: 0,
        currentPage: 1,
        savedFilters: {}
      },
    }
  },
  methods: {
    router() {
      return router
    },
    requestLogout() {
      const div = document.getElementById("modal");
      const app = createApp(ActionModal, {
        info: {
          heading: 'Выход из аккаунта',
          icon: 'exit',
          text: 'Вы точно хотите',
          highlighted: 'выйти?',
          proceedButton: 'Выйти'
        },
        callback: ()=>{
          this.$cookies.remove("token");
          methods.checkCookies(this.$cookies, constants.Role.ANY);
        }
      });
      app.mount(div);
    },
    requestChangepassword(doctor) {
      const div = document.getElementById("modal");
      const app = createApp(PasswordChange, {
        callback: password=>{
          methods.authorizedPATCHRequest(
              this.$cookies,
              `/user`,
              {
                id: doctor.id,
                password: password
              },
              ()=>methods.runNotification("Пароль изменен"),
              error=>{
                if(error.code === "ERR_NETWORK") {
                  methods.runNotification("Не удалось подключиться к серверу");
                  return;
                }
                methods.runNotification("Не удалось изменить пароль");
              }
          )
        }
      });
      app.mount(div);
    },
    listAction() {
      if(this.doctorMode) {
        methods.setMeta({
          setDoctor: true,
          doctor: this.selectedDoctor
        });
        return router.push({name: 'new-appointment'});
      }
      router.push({name: 'new-doctor'});
    },
    applyFiltersSearch() {
      if(settings.designMode)
        return;
      let filters = {
        filters: {
          role: constants.Role.DOCTOR,
          page: this.loadInfo.currentPage,
          fullName: this.$refs.searchInput.value
        }
      };
      if(this.loadInfo.savedFilters.fullName !== filters.filters.fullName) {
        filters.filters.page = 1;
        this.loadInfo = {
          dataFinished: false,
          loadedPage: 0,
          currentPage: 1,
          savedFilters: filters.filters
        };
        this.$refs.scrollHandler.scrollTop = 0;
      }
      methods.authorizedPOSTRequest(
          this.$cookies,
          `/user/all`,
          filters,
          response => {
            if(response.status === 200) {
              if(settings.alertMode)
                methods.runNotification("Загружено "+response.data.body.length+" элементов");
              if(filters.filters.page === 1)
                this.doctors = [];
              for(let doctor of response.data.body) {
                this.doctors.push({
                  id: doctor.id,
                  surname: doctor.surname,
                  name: doctor.name,
                  patronymic: doctor.lastname,
                  rank: doctor.rank,
                  position: doctor.position,
                  login: doctor.login
                });
              }
              this.loadInfo.loadedPage = filters.filters.page;
              if(response.data.body.length !== 50)
                this.loadInfo.dataFinished = true;
            }
          },
          error => {
            if(error.code === "ERR_NETWORK") {
              methods.runNotification("Не удалось подключиться к серверу");
              return;
            }
            methods.runNotification("Не удалось получить данные");
            console.log(error);
          }
      );
    },
    loadData(role) {
      if(role === constants.Role.DOCTOR)
        this.doctorMode = true;
      if(settings.designMode) {
        for(let i = 0; i < 13; i++)
          this.doctors.push({
            id: i,
            surname: "Иванова",
            name: "Ивана",
            patronymic: "Ивановна",
            rank: "Врач",
            position: "Генерал-майор",
            login: "login"
          });
        return;
      }
      this.applyFiltersSearch();
    },
    selectDoctor(data) {
      if(this.selectedDoctor.id === data.id)
        return this.selectedDoctor = -1;
      this.selectedDoctor = data;
    },
    deleteDoctor() {
      methods.authorizedDELRequest(
          this.$cookies,
          `/user/${this.selectedDoctor.id}`,
          () => {
            methods.runNotification("Пользователь удален");
            this.selectedDoctor = -1;
            this.applyFiltersSearch();
          },
          error => {
            if(error.code === "ERR_NETWORK") {
              methods.runNotification("Не удалось подключиться к серверу");
              return;
            }
            methods.runNotification("Нельзя удалить пользователя, к которому привязаны приемы");
            console.log(error);
          }
      )
    },
    requestDelete() {
      const div = document.getElementById("modal");
      const app = createApp(ActionModal, {
        info: {
          heading: 'Удаление врача',
          icon: 'delete',
          text: 'Подтвердите удаление врача',
          highlighted: this.selectedDoctor.surname + ' ' + this.selectedDoctor.name + ' ' + this.selectedDoctor.patronymic,
          proceedButton: 'Удалить'
        },
        callback: this.deleteDoctor
      });
      app.mount(div);
    },
    editDoctor() {
      methods.setMeta(this.selectedDoctor);
      router.push({name: 'new-doctor'});
    },
    scrollCheck(e) {
      if(this.loadInfo.dataFinished) return;
      if(this.loadInfo.loadedPage !== this.loadInfo.currentPage)  return;
      if(e.target.scrollHeight - e.target.scrollTop > e.target.clientHeight*3) return;
      console.log("Requested further load");
      this.loadInfo.currentPage++;
      this.applyFiltersSearch();
    }
  },
  beforeMount() {
    let meta = methods.getMeta();
    if(meta && meta.doctorMode)
      this.doctorMode = true;
    methods.checkCookies(this.$cookies, constants.Role.ANY, this.loadData)
  },
  mounted() {
    this.$refs.scrollHandler.addEventListener("scroll", this.scrollCheck)
  },
  beforeUnmount() {
    this.$refs.scrollHandler.removeEventListener("scroll", this.scrollCheck)
  }
}
</script>