<template>
  <div id="modal"></div>
  <div class="container-fluid appointments animate__animated animate__fadeIn">
      <div class="row header">
        <div class="col">
        <h1 class="heading">Приёмы</h1>
      </div>
        <div class="col">
        <div class="container table-container">
          <div class="input-group">
            <button type="button" class="btn btn-primary search-button" @click="applyFiltersSearch()">
              <i class="fas fa-search"></i>
            </button>
            <div class="form-outline">
              <input type="search" id="form1" class="form-control form-search" ref="searchInput" v-on:keyup.enter="applyFiltersSearch()"/>
              <label class="form-label" for="form1">Поиск</label>
            </div>
          </div>
        </div>
      </div>
        <div class="col profile">
          <p class="doctor-name">{{ doctorName }}</p>
          <button class="btn btn-primary exit-button" @click="requestLogout()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Выход</button>
        </div>
      </div>
      <div class="container main-part" ref="scrollHandler">
        <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
          <thead class="bg-light">
            <tr class="table-first-row">
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Дата рождения</th>
              <th>Врач</th>
              <th>
                <i class="fa-regular fa-calendar-days date-icon"></i>
                Дата приёма
                <button type="button" class="btn btn-primary sort-button" @click="sortDesc = !sortDesc; applyFiltersSearch()">
                  <i class="fa-solid" :class="sortDesc ? 'fa-arrow-up-wide-short' : 'fa-arrow-down-wide-short'"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointment.id" @click="selectAppointment(appointment)" :style="selectedAppointment !== -1 && selectedAppointment.id === appointment.id ? `background-color: #cceffd` : ``">
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ appointment.surname }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ appointment.name }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ appointment.patronymic }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ appointment.birthdate }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ appointment.doctor }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ appointment.date }}</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container buttons-container">
        <div class="row row-buttons">
          <div class="col col-buttons">
            <button class="btn btn-primary first-add first-download" @click="downloadDocx()" v-if="selectedAppointment !== -1"><i class="fa-solid fa-download"></i> {{downloading ? 'Скачивание...' : 'Выгрузить консультативное заключение'}}</button>
            <button class="btn btn-primary first-add" @click="router().push({name: 'patients-directory'})" v-if="selectedAppointment === -1"><i class="fa-solid fa-plus button-icon"></i>Создать первичный приём</button>
            <button class="btn btn-primary second-add" @click="repeatAppointment()" v-bind:disabled="selectedAppointment === -1"><i class="fa-solid fa-plus button-icon"></i>Создать повторный приём</button>
          </div>
          <div class="col col-buttons">
            <button class="btn btn-primary edit" @click="editAppointment()" v-bind:disabled="selectedAppointment === -1"><i class="fa-solid fa-pen button-icon"></i>Редактировать</button>
            <button class="btn btn-primary delete" @click="requestDelete()" v-bind:disabled="selectedAppointment === -1"><i class="fa-solid fa-trash button-icon"></i>Удалить</button>
          </div>
        </div>
      </div>
  </div>
</template>
<style scoped>
@media screen and (max-width: 1800px) {
  .first-add {
    width: 23vw!important;
  }
  .second-add {
    width: 23vw!important;
  }
  .first-download {
    padding-left: 0!important;
    padding-right: 0!important;
    font-size: 10px!important;
  }
  .main-part {
    width: 87vw!important;
    margin-left: 0!important;
    max-height: 45vh!important;
  }
  .container-fluid {
    max-height: 80vh!important;
    max-width: 100vw!important;
  }
}
.download-btn {
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 1rem;
  width: 20vw;
}
.download-btn:hover {
  border: none!important;
  background: transparent!important;
  color: #000000;
  box-shadow: none!important;
  margin-top: 2rem;
  text-align: left;
}
.container.download-btn-row {
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem;
}
.profile {
  display: flex;
  gap: 2rem;
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
.form-search {
  border-radius: 0px 9px 9px 0px!important;
}
.container-fluid {
  background: #FAFAFA;
  width: 90vw;
  max-width: 80vw;
  max-height: 90vh;
  height: 95vh;
  border-radius: 25px;
  box-shadow: 0px 16px 47px 16px rgb(61 61 61 / 10%);
}
.container-fluid.appointments {
  overflow-y: hidden;
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
  border-radius: 10px 10px 0px 0px!important;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 999;
}
th {
  text-align: left;
  font-weight: 600!important;
  font-size: 1rem;
}
td {
  text-align: left;
  color: #323232;
  font-weight: 400!important;
}
.fw-bold {
  font-weight: 400!important;
  color: #565656;
  font-size: 1rem;
}
.ms-3 {
  margin-left: 0!important;
}
.table-container {
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  height: 100%;
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
  padding-left: 0;
  width: 1rem;
  margin-left: 0.5rem;
}
.sort-button:hover {
  background: transparent;
  box-shadow: none!important;
  padding-left: 0;
  color: #323232;
  width: 1rem;
  margin-left: 0.5rem;
}
.date-icon {
  padding-right: 0.5rem;
}
.date {
  display: flex;
  align-items: center;
  background: transparent!important;
  border-radius: 0px 14px 0px 0px!important;

}
th:first-child {
  border-radius: 14px 0px 0px 0px;
}
th:last-child {
  border-radius: 0px 14px 0px 0px!important;
  background: transparent!important;
}
.main-part {
  margin-top: 2rem;
  height: 100%;
  max-height: 60vh;
  width: 100vw;
  overflow-y: scroll!important;
}
.table-hover {
  background: rgba(0, 163, 255, 0.03)!important;
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
.btn:disabled {
  opacity: 0.3!important;
}
.first-add {
  width: 20vw;
  /*height: 2.4rem;*/
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
}
.second-add {
  width: 20vw;
  /*height: 2.4rem;*/
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
  min-width: 120px;
}
.edit {
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
}
.edit:hover {
  border: solid 1px transparent!important;
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
  margin-bottom: 0!important;
  padding: 0;
}
</style>
<script>
import {methods} from "@/utils/methods";
import {constants} from "@/utils/constants";
import {settings} from "@/utils/settings";
import router from "@/router";
import {createApp} from "vue";
import ActionModal from "@/components/ActionModal.vue";


export default {
  data() {
    return {
      appointments: [],
      selectedAppointment: -1,
      sortDesc: true,
      doctorName: methods.getDoctorName(),
      loadInfo: {
        dataFinished: false,
        loadedPage: 0,
        currentPage: 1,
        savedFilters: {}
      },
      downloading: false
    }
  },
  name: 'AppointmentsList',
  components: {},
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
    applyFiltersSearch() {
      if(settings.designMode)
        return;
      let filters = {
        filters: {
          sortDate: this.sortDesc ? "DESC" : "ASC",
          page: this.loadInfo.currentPage,
          patientFullname: this.$refs.searchInput.value
        }
      };
      if(this.loadInfo.savedFilters.patientFullname !== filters.filters.patientFullname ||
          this.loadInfo.savedFilters.sortDate !== filters.filters.sortDate) {
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
          `/appointment/all`,
          filters,
          response => {
            if(response.status === 200) {
              if(settings.alertMode)
                methods.runNotification("Загружено "+response.data.body.length+" элементов");
              if(filters.filters.page === 1)
                this.appointments = [];
              for(let appointment of response.data.body) {
                this.appointments.push({
                  id: appointment.id,
                  patientId: appointment.patient.id,
                  surname: appointment.patient.surname,
                  name: appointment.patient.name,
                  patronymic: appointment.patient.lastname,
                  birthdate: new Date(appointment.patient.birthday).toLocaleDateString('ru-RU'),
                  doctor: appointment.doctor.surname + " " + appointment.doctor.name.substring(0,1) + "." + appointment.doctor.lastname.substring(0,1)+".",
                  date: new Date(appointment.createdAt).toLocaleDateString('ru-RU')
                });
                this.loadInfo.loadedPage = filters.filters.page;
                if(response.data.body.length !== 50)
                  this.loadInfo.dataFinished = true;
              }
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
          this.appointments.push({
            id: i,
            surname: "Иванова",
            name: "Ивана",
            patronymic: "Ивановна",
            birthdate: "13.02.2023",
            doctor: "Павлович В.И.",
            date: "29.03.2023"
          });
        return;
      }
      this.applyFiltersSearch();
    },
    selectAppointment(data) {
      if(this.downloading)
        return methods.runNotification("Нельзя выбрать другой прием во время скачивания заключения");
      if(this.selectedAppointment.id === data.id)
        return this.selectedAppointment = -1;
      this.selectedAppointment = data;
    },
    deleteAppointment() {
      methods.authorizedDELRequest(
          this.$cookies,
          `/appointment/${this.selectedAppointment.id}`,
          () => {
            methods.runNotification("Прием удален");
            this.selectedAppointment = -1;
            this.applyFiltersSearch();
          },
          error => {
            if(error.code === "ERR_NETWORK") {
              methods.runNotification("Не удалось подключиться к серверу");
              return;
            }
            methods.runNotification("Не удалось удалить прием");
            console.log(error);
          }
      )
    },
    requestDelete() {
      const div = document.getElementById("modal");
      const app = createApp(ActionModal, {
        info: {
          heading: 'Удаление приема',
          icon: 'delete',
          text: 'Подтвердите удаление приема',
          highlighted: this.selectedAppointment.surname + ' ' + this.selectedAppointment.name + ' ' + this.selectedAppointment.patronymic + ' на ' + this.selectedAppointment.date,
          proceedButton: 'Удалить'
        },
        callback: this.deleteAppointment
      });
      app.mount(div);
    },
    repeatAppointment() {
      methods.setMeta({
        isNew: true,
        copyFromLast: true,
        appointment: this.selectedAppointment
      });
      router.push({name: 'new-appointment'});
    },
    editAppointment() {
      methods.setMeta({
        isNew: false,
        appointment: this.selectedAppointment
      });
      router.push({name: 'new-appointment'});
    },
    downloadDocx() {
      this.downloading = true;
      let failure = error => {
        if(error.code === "ERR_NETWORK") {
          methods.runNotification("Не удалось подключиться к серверу");
          return;
        }
        methods.runNotification("Не удалось скачать файл");
        console.log(error);
        this.downloading = false;
      };
      methods.authorizedGETRequest(
          this.$cookies,
          `/appointment/${this.selectedAppointment.id}/doc`,
          key => {
            methods.authorizedGETDownload(
                this.$cookies,
                `/appointment/doc/${key.data.key}`,
                response => {
                  methods.downloadFile(`КонсультативноеЗаключение_${this.selectedAppointment.id}.docx`, response.data);
                  this.downloading = false;
                  router.push({name: 'appointments'});
                },
                failure
            );
          },
          failure
      )
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
    methods.checkCookies(this.$cookies, constants.Role.DOCTOR);
  },
  mounted() {
    this.loadData()
    this.$refs.scrollHandler.addEventListener("scroll", this.scrollCheck)
  },
  beforeUnmount() {
    this.$refs.scrollHandler.removeEventListener("scroll", this.scrollCheck)
  }
}
</script>