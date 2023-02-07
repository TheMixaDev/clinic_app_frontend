<template>
  <div id="modal"></div>
  <div className="container-fluid patients-container animate__animated animate__fadeIn">
    <div className="row header">
      <div className="col">
        <h1 className="heading"><button className="btn back btn-primary second-add" @click="router().go(-1);"><i class="fa-solid fa-arrow-left"></i>
        </button>Справочник пациентов</h1>
      </div>
      <div className="col search-col">
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
      <div class="col">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="onlyNew" @change="applyFiltersSearch();"/>
          <label class="form-check-label searchCheckBox" @click="onlyNew = !onlyNew; applyFiltersSearch();">Без первого приёма</label>
        </div>
      </div>
    </div>
    <div className="container patients-directory-main-part" ref="scrollHandler">
      <table className="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
        <thead className="bg-light">
        <tr class="table-first-row">
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Дата рождения</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id" @click="selectPatient(patient)" :style="selectedPatient !== -1 && selectedPatient.id === patient.id ? `background-color: #cceffd` : ``">
            <td>
              <div className="d-flex align-items-center">
                <div className="ms-3">
                  <p className="fw-bold mb-1">{{ patient.surname }}</p>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <div className="ms-3">
                  <p className="fw-bold mb-1">{{ patient.name }}</p>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <div className="ms-3">
                  <p className="fw-bold mb-1">{{ patient.patronymic }}</p>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <div className="ms-3">
                  <p className="fw-bold mb-1">{{ new Date(patient.birthdate).toLocaleDateString('ru-RU') }}</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="container buttons-container">
      <div className="col row-buttons">
        <button className="btn btn-primary second-add select" v-bind:disabled="this.selectedPatient === -1" @click="proceed()">Выбрать</button>
          <router-link className="btn btn-primary first-add" to="/patient" v-bind:disabled="this.selectedPatient !== -1"><i
              className="fa-solid fa-plus button-icon"></i>Новый
          </router-link></div>
      <div className="col row-button">
        <button class="btn btn-primary edit" style="width: 30vw;" v-bind:disabled="this.selectedPatient === -1" @click="editPatient()"><i class="fa-solid fa-pen button-icon"></i>Редактировать</button>
        <button class="btn btn-primary delete" v-bind:disabled="this.selectedPatient === -1" @click="requestDelete()"><i class="fa-solid fa-trash button-icon"></i>Удалить</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media screen and (max-width: 1800px) {
  .main-part {
    width: 87vw!important;
    margin-left: 0!important;
    max-height: 45vh!important;
  }
  .container-fluid {
    max-height: 80vh!important;
    max-width: 100vw!important;
  }
  .patients-directory-main-part {
    width: 88vw!important;
    max-height: 45vh!important;
  }
  .first-add {
    width: 25vw!important;
  }
  .second-add {
    width: 25vw!important;
  }
  .first-download {
    padding-left: 0!important;
    padding-right: 0!important;
    font-size: 10px!important;
  }
  .heading {
    font-size: 1.5rem!important;
  }
  .back {
    background: transparent!important;
    color: black;
    border: none!important;
    font-size: 1rem;
    padding-left: 0!important;
    padding-right: 0rem!important;
    padding-top: 10px!important;
    padding-bottom: 0px!important;
    box-shadow: none;
    width: 1rem!important;
  }
  .searchCheckBox {
    font-size: 0.9rem!important;
    text-align: left!important;
  }
  .buttons-container {
    margin-top: 2rem!important;
  }
}
.col.search-col {
  display: flex;
  width: 100%;
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
.form-check-label.searchCheckBox {
  display: flex;
  width: 20vw;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
.container-fluid.patients-container {
  overflow-y: hidden;
}
.container-fluid {
  background: #FAFAFA;
  width: 90vw;
  max-width: 70vw;
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
.select {
  max-width: 51vw!important;
  width: 15vw!important;
}
.table-first-row {
  border-top: none;
  border-left: none;
  border-right: none;
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

.patients-directory-main-part {
  margin-top: 2rem;
  height: auto;
  max-height: 50vh;
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
.row-button {
  display: flex;
  justify-content: flex-end;
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
  border: 1px solid rgba(0, 117, 255, 0.99);
  border-radius: 9px;
  padding-left: 2rem!important;
  padding-right: 2rem!important;
  width: auto!important;
}
.edit:disabled {
  opacity: 0.3;
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 1px solid rgba(255, 0, 213, 0.3);
  border-radius: 9px;
  padding-left: 2rem!important;
  padding-right: 2rem!important;
  width: auto!important;
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
import router from "@/router";
import {constants} from "@/utils/constants";
import {methods} from "@/utils/methods";
import {settings} from "@/utils/settings";
import {createApp} from "vue";
import ActionModal from "@/components/ActionModal.vue";
export default {
  data() {
    return {
      patients: [],
      selectedPatient: -1,
      onlyNew: true,
      loadInfo: {
        dataFinished: false,
        loadedPage: 0,
        currentPage: 1,
        savedFilters: {}
      },
    }
  },
  name: 'PatientsDirectory',
  methods: {
    router() {
      return router
    },
    applyFiltersSearch() {
      if(settings.designMode)
        return;
      let filters = {
        filters: {
          role: constants.Role.PATIENT,
          page: this.loadInfo.currentPage,
          fullName: this.$refs.searchInput.value
        }
      };
      if(this.onlyNew)
        filters.filters.hasAppointment = false;
      if(this.loadInfo.savedFilters.fullName !== filters.filters.fullName ||
          this.loadInfo.savedFilters.hasAppointment !== filters.filters.hasAppointment) {
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
                this.patients = [];
              for(let patient of response.data.body) {
                this.patients.push({
                  id: patient.id,
                  surname: patient.surname,
                  name: patient.name,
                  patronymic: patient.lastname,
                  rank: 'Пациент',
                  birthdate: patient.birthday
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
    loadData() {
      if(settings.designMode) {
        for(let i = 0; i < 13; i++)
          this.patients.push({
            id: i,
            surname: "Иванова",
            name: "Ивана",
            patronymic: "Ивановна",
            rank: 'Пациент',
            birthdate: "24.04.2004"
          });
        return;
      }
      this.applyFiltersSearch();
    },
    selectPatient(data) {
      if(this.selectedPatient.id === data.id)
        return this.selectedPatient = -1;
      this.selectedPatient = data;
    },
    deletePatient() {
      methods.authorizedDELRequest(
          this.$cookies,
          `/user/${this.selectedPatient.id}`,
          () => {
            methods.runNotification("Пользователь удален");
            this.selectedPatient = -1;
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
          heading: 'Удаление пациента',
          icon: 'delete',
          text: 'Подтвердите удаление пациента',
          highlighted: this.selectedPatient.surname + ' ' + this.selectedPatient.name + ' ' + this.selectedPatient.patronymic,
          proceedButton: 'Удалить'
        },
        callback: this.deletePatient
      });
      app.mount(div);
    },
    editPatient() {
      methods.setMeta(this.selectedPatient);
      router.push({name: 'new-patient'});
    },
    proceed() {
      methods.setMeta({
        isNew: true,
        copyFromLast: false,
        patient: this.selectedPatient
      });
      router.push({name: 'new-appointment'});
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
    methods.checkCookies(this.$cookies, constants.Role.DOCTOR, this.loadData);
  },
  mounted() {
    this.$refs.scrollHandler.addEventListener("scroll", this.scrollCheck)
  },
  beforeUnmount() {
    this.$refs.scrollHandler.removeEventListener("scroll", this.scrollCheck)
  }
}
</script>