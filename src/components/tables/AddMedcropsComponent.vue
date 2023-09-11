<template>
  <div class="container-fluid delete-modal-body animate__animated animate__fadeIn">
    <div class="container modal-box animate__animated animate__backInUp">
      <h2 class="delete-heading">Новый посев</h2>
      <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
        <thead class="bg-light">
        <tr class="table-first-row">
          <th>Дата анализа</th>
          <th><input type="date" class="date" v-model="edit.model.date"></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Локализация посева</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <select class="form-select" aria-label="Default select example" v-model="edit.model.localization">
                  <option hidden >Выберите</option>
                  <option value="1">Посев мочи</option>
                  <option value="2">Посев из ц/канала</option>
                  <option value="3">Посев из носа</option>
                  <option value="4">Посев из зева</option>
                </select>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Микрофлора</p>
              </div>
            </div>
          </td>
          <td>
            <MultiSelect :input="multiflora" :pid="'multiflora'" ref="multiflora" v-if="!edit.enabled"/>
            <div class="d-flex align-items-center" v-else>
              <div class="ms-3">
                <select class="form-select" aria-label="Default select example" v-model="edit.model.flora">
                  <option value="0">Не выделена</option>
                  <option value="1">E. coli</option>
                  <option value="2">Enterococcus sp.</option>
                  <option value="3">Enterococcus faecalis</option>
                  <option value="4">Klebsiella sp.</option>
                  <option value="23">Klebsiella pn.</option>
                  <option value="5">Staphyloc. ep.</option>
                  <option value="22">Staphylococcus aureus</option>
                  <option value="6">Streptococcus anginosus</option>
                  <option value="7">Streptococcus agalact.</option>
                  <option value="8">Streptococcus or.</option>
                  <option value="9">Streptococcus spp</option>
                  <option value="10">Streptococcus pneumoniae</option>
                  <option value="11">Candida albicans</option>
                  <option value="12">Lactobacillus sp.</option>
                  <option value="13">Proteus mirabilis</option>
                  <option value="14">Citrobacter</option>
                  <option value="15">Enterobacteriaceae</option>
                  <option value="16">Pseudomonas aeruginosa</option>
                  <option value="17">Haemophilus influenzae</option>
                  <option value="18">Moraxella catarrhalis</option>
                  <option value="19">Neisseria sicca</option>
                  <option value="20">Neisseria spp.</option>
                  <option value="21">Corynebacterium spp</option>
                </select>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Значение</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <select class="form-select" aria-label="Default select example" v-model="edit.model.value">
                  <option value="0">Не выделена</option>
                  <option value="1">10³ КОЕ/мл</option>
                  <option value="2">10⁴ КОЕ/мл</option>
                  <option value="3">10⁵ КОЕ/мл</option>
                  <option value="4">10⁶ КОЕ/мл</option>
                  <option value="5">10⁷ КОЕ/мл</option>
                  <option value="6">10⁸ КОЕ/мл</option>
                </select>
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
import MultiSelect from "@/components/inpage/MultiSelect.vue";
import {methods} from "@/utils/methods";

export default {
  name: "AddMedcropsComponent",
  components: {MultiSelect},
  props: ['info', 'callback'],
  methods: {
    proceed() {
      if(settings.designMode)
        return;
      this.edit.model.date = methods.dateFromDDMMGG(this.edit.model.date);
      this.edit.multiflora = this.multiflora;
      this.callback(this.edit, "crops", "Посевы");
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
          date: "",
          localization: "1",
          flora: "0",
          value: "0"
        }
      },
      multiflora: [
        {id: 0, label: "Не выделена", value: false},
        {id: 1, label: "E. coli", value: false},
        {id: 2, label: "Enterococcus sp.", value: false},
        {id: 3, label: "Enterococcus faecalis", value: false},
        {id: 4, label: "Klebsiella sp.", value: false},
        {id: 23, label: "Klebsiella pn.", value: false},
        {id: 5, label: "Staphyloc. ep.", value: false},
        {id: 22, label: "Staphylococcus aureus", value: false},
        {id: 6, label: "Streptococcus anginosus", value: false},
        {id: 7, label: "Streptococcus agalact.", value: false},
        {id: 8, label: "Streptococcus or.", value: false},
        {id: 9, label: "Streptococcus spp", value: false},
        {id: 10, label: "Streptococcus pneumoniae", value: false},
        {id: 11, label: "Candida albicans", value: false},
        {id: 12, label: "Lactobacillus sp.", value: false},
        {id: 13, label: "Proteus mirabilis", value: false},
        {id: 14, label: "Citrobacter", value: false},
        {id: 15, label: "Enterobacteriaceae", value: false},
        {id: 16, label: "Pseudomonas aeruginosa", value: false},
        {id: 17, label: "Haemophilus influenzae", value: false},
        {id: 18, label: "Moraxella catarrhalis", value: false},
        {id: 19, label: "Neisseria sicca", value: false},
        {id: 20, label: "Neisseria spp.", value: false},
        {id: 21, label: "Corynebacterium spp", value: false}
      ]
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .container.modal-box {
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
    display: flex!important;
    padding-left: 2rem!important;
    padding-right: 2rem!important;
    flex-direction: column!important;
    align-items: center!important;
    justify-content: flex-start!important;
    background-color: white!important;
    border-radius: 25px!important;
    max-width: 60vw!important;
    max-height: 93vh!important;
    overflow-y: hidden!important;
    overflow-x: hidden!important;
  }
  *::-webkit-scrollbar-track {
    width:7px;
    margin-top: 2rem!important;
    margin-bottom: 2rem!important;
    background: #f2f2f2;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #42c6ff;
    border-radius: 10px;
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: #42c6ff;}

  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #B8C0C2 #42c6ff!important;
  }

  /* Chrome, Edge and Safari */
  *::-webkit-scrollbar {
    width: 7px;
    max-height: 60vh!important;
  }
}

.form-select {
  width: 246px;
}
.dropdown-icon {
  color: #323232;
}
.heading-pass {
  margin-bottom: 1rem;
}
.pass {
  width: 15vw;
  min-width: 130px;
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