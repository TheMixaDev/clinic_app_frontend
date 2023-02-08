<template>
  <div class="container-fluid delete-modal-body animate__animated animate__fadeIn">
    <div class="container modal-box animate__animated animate__backInUp">
      <h2 class="delete-heading">Выгрузка в Stattech</h2>
      <template v-if="!started">
        <h6 class="heading-pass">Выгрузка может занять долгое время. Вы не сможете закрыть окно выгрузки до её завершения. Начать выгрузку?</h6>
        <a class="btn btn-primary edit" @click="startExport()"><i class="fa-solid fa-save button-icon"></i>Продолжить</a>
        <a class="btn btn-primary back-btn" @click="this.$.appContext.app.unmount();"><i class="fa-solid fa-arrow-left"></i> Вернуться</a>
      </template>
      <template v-if="started && !finished">
        <progress :value="process.starterData.current" max="2"></progress>
        <h6 class="heading-pass">Загрузка основных данных</h6>
        <progress :value="process.appointmentTable.current" :max="process.appointmentTable.max"></progress>
        <h6 class="heading-pass">Загрузка приемов</h6>
      </template>
      <template v-if="finished">
        <h6 class="heading-pass">Создание файлов завершено</h6>
        <a class="btn btn-primary edit" @click="exportFile(process.userTable.data, 'Users.xlsx')"><i class="fa-solid fa-save button-icon"></i>Скачать пользователей</a>
        <a class="btn btn-primary edit" @click="exportFile(process.appointmentTable.data, 'Appointments.xlsx')"><i class="fa-solid fa-save button-icon"></i>Скачать приемы</a>
        <a class="btn btn-primary edit" @click="exportFile(process.subTables.analyzes_1.data, 'Analyzes1.xlsx')"><i class="fa-solid fa-save button-icon"></i>Скачать анализы (1)</a>
        <a class="btn btn-primary edit" @click="exportFile(process.subTables.analyzes_2.data, 'Analyzes2.xlsx')"><i class="fa-solid fa-save button-icon"></i>Скачать анализы (2)</a>
        <a class="btn btn-primary edit" @click="exportFile(process.subTables.analyzes_3.data, 'Analyzes3.xlsx')"><i class="fa-solid fa-save button-icon"></i>Скачать анализы (3)</a>
        <a class="btn btn-primary edit" @click="exportFile(process.subTables.crops.data, 'MedCrops.xlsx')"><i class="fa-solid fa-save button-icon"></i>Скачать посевы</a>
        <a class="btn btn-primary edit" @click="exportFile(process.subTables.births.data, 'Births.xlsx')"><i class="fa-solid fa-save button-icon"></i>Скачать роды</a>
        <a class="btn btn-primary back-btn" @click="this.$.appContext.app.unmount();"><i class="fa-solid fa-arrow-left"></i> Выйти</a>
      </template>
    </div>
  </div>
</template>

<script>
import { utils, writeFileXLSX } from "xlsx";
import {methods} from "@/utils/methods";
import {constants} from "@/utils/constants";
export default {
  data() {
    return {
      started: false,
      finished: false,
      process: {
        starterData: {
          current: 0,
          max: 2
        },
        userTable: {
          data: []
        },
        appointmentTable: {
          current: 0,
          max: 1,
          baseData: [],
          data: []
        },
        subTables: {
          analyzes_1: {
            index: 1,
            data: []
          },
          analyzes_2: {
            index: 1,
            data: []
          },
          analyzes_3: {
            index: 1,
            data: []
          },
          crops: {
            index: 1,
            data: []
          },
          births: {
            index: 1,
            data: []
          },
        }
      }
    }
  },
  props: ['cookies'],
  name: "ExcelExport",
  methods: {
    startExport() {
      this.started = true;
      this.loadUsers();
    },
    loadUsers(error) {
      if(error && error.code === "ERR_NETWORK")
        return this.abort();
      methods.authorizedPOSTRequest(
        this.cookies,
        `/user/all`,
        {filters:{page: 1, export: true}},
        response=>{
          this.process.userTable.data = response.data.body.map(el => {return {id: el.id, Surname: el.surname, Name: el.name, Patronymic: el.lastname, Birthday: el.birthday, Role: el.role, Login: el.login, Rank: el.rank, Position: el.position}});
          this.process.starterData.current++;
          this.loadAppointmentList();
        },
        this.loadUsers
      )
    },
    loadAppointmentList(error) {
      if(error && error.code === "ERR_NETWORK")
        return this.abort();
      methods.authorizedPOSTRequest(
          this.cookies,
          `/appointment/all`,
          {filters:{sortDate: "ASC", page: 1, export: true}},
          response=>{
            this.process.appointmentTable.baseData = response.data.body.map(el => {return {id: el.id, Patient: el.patient.id, Doctor: el.doctor.id}});
            this.process.appointmentTable.max = this.process.appointmentTable.baseData.length;
            this.process.starterData.current++;
            console.log(this.process);
            this.loadAppointment(0);
          },
          this.loadAppointmentList
      )
    },
    loadAppointment(index, error) {
      if(error && error.code === "ERR_NETWORK")
        return this.abort();
      if(error && error.data.status === 404) {
        this.process.appointmentTable.current++;
        return this.loadAppointment(index+1);
      }
      if(this.process.appointmentTable.current >= this.process.appointmentTable.max)
        return this.finished = true;
      methods.authorizedGETRequest(
          this.cookies,
          `/appointment/${this.process.appointmentTable.baseData[index].id}`,
          response => {
            let state = JSON.parse(response.data.body.value);
            let diagnosis = state.diagnosis.checkboxes.map(i => constants.diagnosisCheckboxes[i])
                .concat(state.detailed.illnesses.map(i => constants.illnesses[i]))
                .concat(state.detailed.trombofilia.map(i => constants.trombofilia[i]))
                .concat(Object.keys(state.diagnosis.dropdowns).filter(key => state.diagnosis.dropdowns[key] != 0).map(key => {
                  const val = state.diagnosis.dropdowns[key];
                  return constants.dropdowns.keyNames[key] + ": " +constants.dropdowns[key][parseInt(val)];
                }))
                .join(", ");
            let recommendations = state.recommended.checkboxes.map(i => constants.recommendedCheckboxes[i]).concat([state.recommended.text]).join(", ");
            let element = {
              id: response.data.body.id,
              PatientId: response.data.body.patient.id,
              DoctorId: response.data.body.doctor.id,
              IsFirst: response.data.body.is_first,
              Anamesis: state.anameses,
              Uzi: state.uzi.text,
              Doppler: state.doppler.value,
              CurrentPregnancy: state.pregnancy,
              Hospitalizations: state.hospital,
              ObjectiveResearch: state.research,
              GynecologicalExamination: state.docResearch,
              Additional: state.additional,
              PregnancyWeek: state.diagnosis.weeks,
              Diagnosis: diagnosis,
              Recommendations: recommendations
            };
            for(let analyzeIndex = 0; analyzeIndex < 3; analyzeIndex++) {
              state[`analyzes_${analyzeIndex+1}`].forEach(el => {
                let analyze = {
                  id: this.process.subTables[`analyzes_${analyzeIndex+1}`].index + 0,
                  AppointmentId: element.id,
                  Date: el.date,
                };
                for (let i in constants.analyze_constants[analyzeIndex])
                  analyze[constants.analyze_constants[analyzeIndex][i]] = el.values[i];
                this.process.subTables[`analyzes_${analyzeIndex+1}`].data.push(analyze);
                this.process.subTables[`analyzes_${analyzeIndex+1}`].index++;
              });
            }
            state.crops.forEach(el => {
              this.process.subTables.crops.data.push({
                id: this.process.subTables.crops.index + 0,
                AppointmentId: element.id,
                Date: el.date,
                Localization: constants.crops_constants[0][el.localization-1],
                Flora: constants.crops_constants[1][el.flora],
                Value: constants.crops_constants[2][el.value]
              });
              this.process.subTables.crops.index++;
            });
            state.birth.forEach(el => {
              this.process.subTables.births.data.push({
                id: this.process.subTables.births.index + 0,
                AppointmentId: element.id,
                ERP: el.birth,
                Characteristic: el.character === "1" ? "Плановое" : "Экстренное",
                Weight: el.weight,
                Height: el.height,
                Apgar: el.apgar,
                Bloodloss: el.bloodloss,
                OnDueDate: el.timeperiod,
                Complications: el.complications
              });
              this.process.subTables.births.index++;
            })
            this.process.appointmentTable.data.push(element);
            this.process.appointmentTable.current++;
            this.loadAppointment(index+1);
          },
          error => {this.loadAppointment(index, error);}
      )
    },
    exportFile(data, filename) {
      const ws = utils.json_to_sheet(data);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, filename);
    },
    abort() {
      methods.runNotification("Network error");
    }
  }
}
</script>

<style scoped>
.heading-pass {
  margin-bottom: 1rem;
}
.btn {
  margin: 5px;
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