<template>
  <div id="modal"></div>
  <div class="container-fluid animate__animated animate__fadeIn">
    <div class="row header">
      <div class="col">
        <h1 class="heading">
          <router-link className="btn back btn-primary second-add" to="/appointments"><i
              className="fa-solid fa-arrow-left"></i>
          </router-link>
          Создание приёма</h1>
      </div>
    </div>
    <div class="container-fluid main-items">
      <div class="row main-info">
        <div class="col name-wrapper">
          <h6 class="patient-name">ФИО Пациента</h6>
          <input type="text" id="name" class="form-control name-tag" placeholder="Выберите пациента из Справочника" @click="saveState(()=>{router().push({name: 'patients-directory'})})" readonly v-bind:value="state.patient.id !== -1 ? state.patient.surname + ' ' + state.patient.name + ' ' + state.patient.patronymic : ''">
        </div>
        <div class="col date-wrapper">
          <h6 class="patient-name">Дата рождения</h6>
          <input class="date" type="date" v-model="state.patient.birthdate" disabled>
          Возраст: 0
        </div>
        <div class="col doc-wrapper">
          <h6 class="patient-name">Врач</h6>
          <input type="text" id="name" class="form-control" placeholder="Выберите врача из Справочника" disabled v-bind:value="doctorName"> TODO make editable
        </div>
        <div class="col date-wrapper">
          <h6 class="patient-name">Дата приёма</h6>
          <input class="date" type="date" v-model="state.date">
        </div>
      </div>
      <div class="container-fluid detailed-info">
        <div class="row row-wrapper">
          <div class="col weight-wrapper">
            <h6 class="patient-name">Вес (кг)</h6>
            <input type="text" id="name" class="form-control" placeholder="Введите вес" v-model="state.weight">
          </div>
          <div class="col height-wrapper">
            <h6 class="patient-name">Рост (см)</h6>
            <input type="text" id="name" class="form-control" placeholder="Введите рост" v-model="state.height">
          </div>
          <div class="col imt-wrapper">
            <h6 class="patient-name">ИМТ</h6>
            <input type="text" id="name" class="form-control" placeholder="Автоматический рассчет" v-bind:value="Math.floor(state.weight / Math.pow(state.height/100,2) * 10) / 10 || ``" disabled>
          </div>
          <div class="col date-wrapper">
            <h6 class="patient-name">Дата последних месячных</h6>
            <input class="date" type="date" v-model="state.mensesDate">
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Операции, травмы</h6>
            <MultiSelect :input="state.detailed.options1" :pid=1 ref="options1"></MultiSelect>
          </div>
        </div>
        <div class="row row-wrapper">
          <div class="col select-wrapper">
          <h6 class="patient-name">Перенесенные заболевания</h6>
            <MultiSelect :input="state.detailed.options2" :pid=2 ref="options2"></MultiSelect>
        </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Туберкулез, венерические заболевания, гепатиты</h6>
            <MultiSelect :input="state.detailed.options3" :pid=3 ref="options3"></MultiSelect>
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Аллергические реакции</h6>
            <MultiSelect :input="state.detailed.options4" :pid=4 ref="options4"></MultiSelect>
          </div>
        </div>
        <div class="row row-wrapper">
          <div class="col select-wrapper">
            <h6 class="patient-name">Гемотрансфузии</h6>
            <MultiSelect :input="state.detailed.options5" :pid=5 ref="options5"></MultiSelect>
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Наследственность</h6>
            <MultiSelect :input="state.detailed.options6" :pid=6 ref="options6"></MultiSelect>
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Обследование на наследственную тромбофилию</h6>
            <MultiSelect :input="state.detailed.options7" :pid=7 ref="options7"></MultiSelect>
          </div>
        </div>
      </div>
      <div class="container-fluid anamnesis">
        <h4>Гинекологический анамнез</h4>
        <select class="form-select" aria-label="Default select example">
          <option hidden >Выберите</option>
          <option value="1">Значение</option>
          <option value="2">Значение</option>
        </select>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4" v-model="state.anameses"></textarea>
          <label class="form-label" for="textAreaExample"></label>
        </div>
      </div>
      <div class="container-fluid analyzes">
        <h4>Анализы</h4>
        <div v-for="(constants, key) in analyze_constants" :key="key">
          <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white" v-if="state[`analyzes_${key+1}`].length > 0">
            <thead class="bg-light">
              <tr class="table-first-row">
                <th></th>
                <th v-for="analyze in state[`analyzes_${key+1}`]" :key="analyze.id" @click="selectTableElement(analyze, `analyzes_${key+1}`)">
                  {{ analyze.date }}
                </th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="(type, index) in constants" :key="index">
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ type }}</p>
                  </div>
                </div>
              </td>
              <td v-for="analyze in state[`analyzes_${key+1}`]" :key="analyze.id" @click="selectTableElement(analyze, `analyzes_${key+1}`)" :style="selections[`analyzes_${key+1}`] !== -1 && selections[`analyzes_${key+1}`].id === analyze.id ? `background-color: #cceffd` : ``">
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ analyze.values[index] }}</p>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="alert alert-primary d-flex align-items-center" role="alert" v-else>
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
            <div>
              <i class="fa-solid fa-circle-info"></i> В данной таблице на данный момент нет данных!
            </div>
          </div>
          <br>
          <div class="row col-buttons">
            <button class="btn btn-primary first-add" @click="saveState(()=>router().push({'name':`table-analyzes-${key+1}`}))"><i class="fa-solid fa-plus button-icon"></i>Добавить</button>
            <button class="btn btn-primary edit" v-if="state[`analyzes_${key+1}`].length > 0" v-bind:disabled="selections[`analyzes_${key+1}`] === -1" @click="editTableElement(`analyzes_${key+1}`, `table-analyzes-${key+1}`)"><i class="fa-solid fa-pen button-icon"></i>Редактировать</button>
            <button class="btn btn-primary delete" v-if="state[`analyzes_${key+1}`].length > 0" v-bind:disabled="selections[`analyzes_${key+1}`] === -1" @click="requestDeleteElement(`analyzes_${key+1}`, 'анализов')"><i class="fa-solid fa-trash button-icon"></i>Удалить</button>
          </div>
        </div>
      </div>
      <div class="container-fluid medcrops">
        <h4>Посевы</h4>
        <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
          <thead class="bg-light">
          <tr class="table-first-row">
            <th>Дата анализа</th>
            <th>Локализация посева</th>
            <th>Микрофлора</th>
            <th>Значение</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="crop in state.crops" :key="crop.id" @click="selectTableElement(crop, 'crops')" :style="selections.crops !== -1 && selections.crops.id === crop.id ? `background-color: #cceffd` : ``">
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ crop.date }}</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ crop.localization }}</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ crop.flora }}</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ crop.value }}</p>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="row col-buttons">
          <button class="btn btn-primary first-add" @click="saveState(()=>router().push({'name':'table-crops'}))"><i class="fa-solid fa-plus button-icon"></i>Добавить</button>
          <button class="btn btn-primary edit" v-bind:disabled="selections.crops === -1" @click="editTableElement('crops', 'table-crops')"><i class="fa-solid fa-pen button-icon"></i>Редактировать</button>
          <button class="btn btn-primary delete" v-bind:disabled="selections.crops === -1" @click="requestDeleteElement('crops', 'посевов')"><i class="fa-solid fa-trash button-icon"></i>Удалить</button>
        </div>
      </div>
      <div class="container-fluid uzi">
        <h4>УЗИ</h4>
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link var1 active" id="nav-var1-tab" data-bs-toggle="tab" type="button" role="tab" aria-controls="nav-var2" aria-selected="true" @click="state.uzi.text = constants().uziTexts[0]">Вариант 1</button>
            <button class="nav-link var2" id="nav-var2-tab" data-bs-toggle="tab" type="button" role="tab" aria-controls="nav-var2" aria-selected="false" @click="state.uzi.text = constants().uziTexts[1]">Вариант 2</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" role="tabpanel">
            <div class="row">
              <div class="col">
                <textarea class="form-control" id="textAreaExample1" rows="4" v-model="state.uzi.text"></textarea>
              </div>
              <div class="col">
                <div class="row attachment-row">
                  <div class="col files-col">
                    <a class="btn"><i class="fa-solid fa-file"> File.doc</i></a>
                    <a class="btn"><i class="fa-solid fa-file"> File.doc</i></a>
                    <a class="btn"><i class="fa-solid fa-file"> File.doc</i></a>
                    <a class="btn"><i class="fa-solid fa-file"> File.doc</i></a>
                    <a class="btn"><i class="fa-solid fa-file"> File.doc</i></a>
                  </div>
                  <div class="col attachment-buttons-col">
                    <a class="btn btn-primary attach"><i class="fa-solid fa-plus button-icon"></i>Прикрепить</a>
                    <!--a class="download"><i class="fa-solid fa-download"></i> Скачать</a-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid doppler">
        <h4>Допплер</h4>
        <select class="form-select" aria-label="Выбрать" v-model="state.doppler.value">
          <option value="0">Не выявлены</option>
          <option value="1">I степени</option>
          <option value="2">II степени</option>
          <option value="3">III степени</option>
        </select>
        <input class="date" type="date" v-model="state.doppler.date" v-bind:style="state.doppler.value > 0 ? '' : 'display: none'">
      </div>
      <div class="container-fluid pregnacy">
        <h4>Течение настоящей беременнности</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4" v-model="state.pregnancy"></textarea>
        </div>
      </div>
      <div class="container-fluid hospital">
        <h4>Госпитализации</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4" v-model="state.hospital"></textarea>
        </div>
      </div>
      <div class="container-fluid research">
        <h4>Объективное исследование</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4" v-model="state.research"></textarea>
        </div>
      </div>
      <div class="container-fluid docresearch">
        <h4>Гинекологический осмотр</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4" v-model="state.docResearch"></textarea>
        </div>
      </div>
      <div class="container-fluid additional">
        <h4>Дополнительная информация</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4" v-model="state.additional"></textarea>
        </div>
      </div>
      <div class="container-fluid diagnosis">
        <h5>Диагноз</h5>
        <div class="container-fluid pregnacy-checks">
          <h6>Беременность</h6>
          <textarea class="form-outline form-control pregnacy-text" id="textAreaExample1" rows="4" v-model="state.diagnosis.weeks"></textarea>
          <h6>недель</h6>
        </div>
        <div class="container-fluid diagnosis-checks">
          <div class="row">
            <div class="col checkbox-col" v-for="column in state.diagnosis.checkboxes" :key="column.id">
              <div class="form-check form-check-inline" v-for="box in column.boxes" :key="box.label">
                <input class="form-check-input" type="checkbox" v-model="box.value" />
                <label class="form-check-label" @click="box.value = !box.value">{{ box.label }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid recomendations">
        <h4>Рекомендации</h4>
        <div class="form-outline">
          <textarea class="form-control recomendations-text" id="textAreaExample1" rows="4" v-model="state.recommended.text"></textarea>
          <div class="container-fluid recomendations-list">
            <div class="form-check form-check-inline" v-for="box in state.recommended.checkboxes" :key="box.label">
              <input class="form-check-input" type="checkbox" v-model="box.value" />
              <label class="form-check-label" @click="box.value = !box.value"> {{box.label}} </label>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid childbirth">
        <h4>Роды</h4>
        <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
          <thead class="bg-light">
          <tr class="table-first-row">
            <th>Роды ч/з ЕРП</th>
            <th>Характер КС</th>
            <th>Вес плода</th>
            <th>Апгар</th>
            <th>Кровопотеря</th>
            <th>Роды в срок</th>
            <th>Осложнения послеродового периода</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="birth in state.birth" :key="birth.id" @click="selectTableElement(birth, 'births')" :style="selections.births !== -1 && selections.births.id === birth.id ? `background-color: #cceffd` : ``">
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ birth.birth }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ birth.character }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ birth.weight }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ birth.apgar }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ birth.bloodloss }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ birth.timeperiod }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ birth.complications }}</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row col-buttons">
          <button class="btn btn-primary first-add" @click="saveState(()=>router().push({'name':'table-birth'}))"><i class="fa-solid fa-plus button-icon"></i>Добавить</button>
          <button class="btn btn-primary edit" v-bind:disabled="selections.births === -1" @click="editTableElement('births', 'table-birth')"><i class="fa-solid fa-pen button-icon"></i>Редактировать</button>
          <button class="btn btn-primary delete" v-bind:disabled="selections.births === -1" @click="requestDeleteElement('births', 'родов')"><i class="fa-solid fa-trash button-icon"></i>Удалить</button>
        </div>
      </div>
    </div>
    <div class="row save-buttons">
      <button class="btn btn-primary save-first"><i class="fa-solid fa-plus button-icon"></i>Сохранить</button>
      <button class="btn btn-primary save-second"><i class="fa-solid fa-download button-icon"></i>Сохранить и вывести консультативное заключение</button>

    </div>
  </div>
</template>
<style>
.save-first {
  width: 15vw;
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
}
.save-second {
  width: 25vw;
  background: transparent;
  color: #323232;
  border: none;
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
  box-shadow: none;
}
.save-second:hover {
  width: 25vw;
  background: transparent!important;
  color: #000000;
  border: none;
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
  box-shadow: none!important;
}
.save-buttons {
  justify-content: center;
  margin-bottom: 2rem;
}
.btn.back {
  background: transparent!important;
  color: black;
  border: none!important;
  font-size: 1rem;
  padding-left: 0;
  padding-right: 0;
  box-shadow: none;
  width: 2vw;
}
.back:hover {
  background: transparent!important;
  color: black!important;
  border: none!important;
  font-size: 1rem!important;
  box-shadow: none!important;
}
input.name-tag {
  cursor: pointer;
}
.table-first-row {
  border-top: none;
  border-left: none;
  border-right: none;
}
.checkbox-col {
  display: flex;
  flex-direction: column;
}
.recomendations-text {
  height: 40vh;
}
.pregnacy-text {
  height: 1rem;
  width: 4.4rem;
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px 9px 9px 9px;
  background: #F5F9FF;
}
.container-fluid {
  background: #FAFAFA;
  width: 90vw;
  height: 50vw;
  border-radius: 25px;
  box-shadow: 0px 16px 47px 16px rgb(61 61 61 / 10%);
  overflow-y: scroll;
}
.pregnacy-checks {
  display: flex;
  flex-direction: row!important;
  align-items: center;
}
h6 {
  margin: 0;
}
.container-fluid.diagnosis {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.childbirth {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.recomendations-list {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.recomendations {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.separator {
  color: #cdcdcd;
}
.container-fluid.diagnosis-checks {
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.additional {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.docresearch {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.research {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.hospital {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.pregnacy {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.pregnacy-checks {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.btn:disabled {
  opacity: 0.3!important;
}
.container-fluid.main-items {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  padding-left: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: auto;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.anamnesis {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.analyzes {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.medcrops {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.uzi {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.container-fluid.doppler {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  text-align: left;
  margin-top: 2rem;
  background: transparent;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.main-info {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 2rem;
}
.container-fluid.detailed-info {
  display: flex;
  flex-direction: column;
  width: 100%!important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 2rem;
  background: transparent;
  overflow-y: auto;
  gap: 1rem;
  margin-left: 0;
  padding-left: 0;
  margin-right: 0;
  padding-right: 0;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}
.row-wrapper {
  width: 100%;
}
.attachment-row {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.attachment-buttons-col {
  display: flex;
  justify-content: space-between;
}
.header {
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.heading {
  text-align: left;
  font-size: 2rem;
}
thead {
  color: white;
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border-radius: 10px 10px 0px 0px;
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
tr {}
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
  border-radius: 9px 9px 9px 9px;
}
.form-check {
  margin-left: 1rem;
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
input.date {
  padding: 0.3rem!important;
  background: #F5F9FF!important;
  border: 1px solid rgba(0, 163, 255, 0.3)!important;
  border-radius: 9px!important;
  color: #7e7e7e;
}
th:first-child {
  border-radius: 14px 0px 0px 0px;
}
th:last-child {
  border-radius: 0px 14px 0px 0px!important;
}
.main-part {
  margin-top: 2rem;
  height: 100%;
  max-height: 60vh;
  width: 100vw;
  overflow-y: scroll;
}
thead {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 999;
}
.download {
  color: #323232;
  cursor: pointer;
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
  flex-direction: row!important;
  padding-left: 1rem;
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
.anamnesis-text {
  height: 20rem;
  border-left: 1px solid rgba(0, 117, 255, 0.3)!important;
  border-radius: 9px!important;
}
.recomendations-text {
  height: 20rem;
  border-left: 1px solid rgba(0, 117, 255, 0.3)!important;
  border-radius: 9px!important;
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
  width: auto;
}
.attach {
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
  width: auto;
}
.attach:hover {
  border: none!important;
}
edit:hover {
  border: none!important;
}
.delete {
  background: linear-gradient(92.84deg, #EF5DA8 0.31%, #FF003D 152.41%);
  box-shadow: 0 4px 9px -4px #FF003D;
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
  width: auto;
}
.button-icon {
  margin-right: 0.5rem;
}
.doctor-name {
  margin-bottom: 0!important;
  padding: 0;
}
input.form-control {
  background: #F5F9FF!important;
  border: 1px solid rgba(0, 163, 255, 0.3)!important;
  border-radius: 9px;
}
select {
  background: #F5F9FF!important;
  border: 1px solid rgba(0, 163, 255, 0.3)!important;
  border-radius: 9px!important;
}
h4 {
  font-size: 1.4rem;
}
</style>

<script>

import MultiSelect from "@/components/inpage/MultiSelect.vue";
import router from "@/router";
import {settings} from "@/utils/settings";
import {methods} from "@/utils/methods";
import {constants} from "@/utils/constants";
import {createApp} from "vue";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  name: "NewAppointment",
  methods: {
    router() {
      return router
    },
    constants() {
      return constants
    },
    loadState() {
      if(sessionStorage.getItem("appointmentLastState")) {
        this.state = JSON.parse(sessionStorage.getItem("appointmentLastState"));
        sessionStorage.removeItem("appointmentLastState");
        return true;
      }
      return false;
    },
    saveState(after) {
      sessionStorage.setItem("appointmentLastState", JSON.stringify(this.state));
      after();
    },
    copyData(last) {
      this.state.patient = {
        id: last.patient.id,
        surname: last.patient.surname,
        name: last.patient.name,
        patronymic: last.patient.lastname,
        birthdate: last.patient.birthday
      };
      // TODO copy data from last appointment
    },
    preload() {
      this.loadState();
      for(let pid = 1; pid < 8; pid++) {
        this.$refs[`options${pid}`].updateSelected(this.state.detailed[`options${pid}`]);
      }
      if(settings.designMode)
        return;
      let meta = methods.getMeta();
      if(meta) {
        console.log(meta);
        if(meta.isNew) {
          if(meta.copyFromLast) {
            methods.authorizedGETRequest(
                this.$cookies,
                `/appointment/${meta.appointment.id}`,
                response => {
                  this.copyData(response.data.body);
                },
                error => {
                  if(error.code === "ERR_NETWORK") {
                    methods.runNotification("Не удалось подключиться к серверу");
                    return;
                  }
                  methods.runNotification("Не удалось получить данные");
                  console.log(error);
                }
            )
          } else {
            this.state.patient = meta.patient;
          }
        } else {
          // TODO we've got some other data to analyze ? or are we need to
        }
      }
      //else router.go(-1);
    },
    selectTableElement(data, element) {
      if(this.selections[element].id === data.id)
        return this.selections[element] = -1;
      this.selections[element] = data;
    },
    deleteElement() { // (element, label)
      // TODO
    },
    requestDeleteElement(element, label) {
      const div = document.getElementById("modal");
      const app = createApp(DeleteModal, {
        info: {
          name: label,
          type: element,
          object: this.selections[element]
        },
        callback: this.deleteElement
      });
      app.mount(div);
    },
    editTableElement(element, route) {
      //methods.setMeta(this.selections[element]);
      this.saveState(()=>router.push({name: route}));
    },
  },
  components: {MultiSelect},
  data() {
    return {
      analyze_constants: [
          ["Протромбиновый индекс", "МНО", "Фибриноген", "АПТВ", "Тромбиновое время", "Антитромбин III", "Тест на LA", "Д-димер", "Гомоцистеин", "Протеин C", "Протеин S"],
          ["АТ к β2-гликопротеину", "АТ к кардиолипину", "АТ к аннексину V", "АТ к ХГЧ", "АТ к протромбину", "АТ к фосфатидилсерину", "АТ к фосфатидил к-те", "АТ к фосфатидилинозитолу", "Антинуклеарный фактор", "АТ к 2сп ДНК"],
          ["Lei", "Hb", "Ht", "Tr", "Ферритин", "ТТГ"]
      ],
      state: {
        detailed: {
          options1: [
            {name: "Флебэктомия в анамнезе", value: 1, selected: false},
            {name: "Гемиструмэктомия в анамнезе", value: 1, selected: false},
            {name: "Лазерная коррекция зрения в анамнезе", value: 1, selected: false},
            {name: "Спленэктомия в анамнезе", value: 1, selected: false},
            {name: "Оперативное лечение хронического геморроя", value: 1, selected: false},
            {name: "Секторальная резекция молочной железы", value: 1, selected: false},
          ],
          options2: [
            {name: "Хронический тонзиллит", value: 1, selected: false},
            {name: "Хронический пиелонефрит", value: 1, selected: false},
            {name: "Хронический цистит", value: 1, selected: false},
            {name: "МКБ", value: 1, selected: false},
            {name: "Единственная почка", value: 1, selected: false},
            {name: "Хроническая АГ", value: 1, selected: false},
            {name: "Варикозная болезнь", value: 1, selected: false},
            {name: "Тромбоз в анамнезе", value: 1, selected: false},
            {name: "Флебэктомия в анамнезе", value: 1, selected: false},
            {name: "АИТ. Эутиреоз", value: 1, selected: false},
            {name: "Субклинический гипотиреоз (ЗГТ)", value: 1, selected: false},
            {name: "Узловой зоб", value: 1, selected: false},
            {name: "Тиреотоксикоз", value: 1, selected: false},
            {name: "ФАМ молочных желёз", value: 1, selected: false},
            {name: "Секторальная резекция молочной железы", value: 1, selected: false},
            {name: "Заболевания глаз", value: 1, selected: false},
            {name: "Лазерная коррекция зрения в анамнезе", value: 1, selected: false},
            {name: "Микропролактинома гипофиза", value: 1, selected: false},
            {name: "Образование надпочечников", value: 1, selected: false},
            {name: "Ожирение", value: 1, selected: false},
            {name: "Сахарный диабет", value: 1, selected: false},
            {name: "Хроническая никотиновая интоксикация", value: 1, selected: false},
            {name: "АИТ. Эутиреоз", value: 1, selected: false},
            {name: "Субклинический гипотиреоз (ЗГТ)", value: 1, selected: false},
            {name: "Узловой зоб", value: 1, selected: false},
            {name: "Тиреотоксикоз", value: 1, selected: false},
            {name: "ФАМ молочных желёз", value: 1, selected: false},
            {name: "Секторальная резекция молочной железы", value: 1, selected: false},
            {name: "Заболевания глаз", value: 1, selected: false},
            {name: "Лазерная коррекция зрения в анамнезе", value: 1, selected: false},
            {name: "Микропролактинома гипофиза", value: 1, selected: false},
            {name: "Образование надпочечников", value: 1, selected: false},
            {name: "Ожирение", value: 1, selected: false},
            {name: "Сахарный диабет", value: 1, selected: false},
            {name: "Хроническая никотиновая интоксикация", value: 1, selected: false},

            {name: "ДЖВП", value: 1, selected: false},
            {name: "ЖКБ", value: 1, selected: false},
            {name: "Холецистэктомия в анамнезе", value: 1, selected: false},
            {name: "Нейросенсорная тугоухость", value: 1, selected: false},
            {name: "Лекарственная аллергия", value: 1, selected: false},
            {name: "Бронхиальная астма", value: 1, selected: false},
            {name: "ТИА в анамнезе", value: 1, selected: false},
            {name: "ТЭЛА в анамнезе", value: 1, selected: false},
            {name: "Мигрень", value: 1, selected: false},
            {name: "Спленэктомия в анамнезе", value: 1, selected: false},
            {name: "Хронический гепатит", value: 1, selected: false},
            {name: "Tbc в анамнезе", value: 1, selected: false},
            {name: "Lues в анамнезе", value: 1, selected: false},

            {name: "Узловая эритема", value: 1, selected: false},
            {name: "Атопический дерматит", value: 1, selected: false},
            {name: "Болезнь Виллебранда", value: 1, selected: false},
            {name: "Пролапс МК", value: 1, selected: false},
            {name: "Аномалия сосудов ГМ", value: 1, selected: false},
            {name: "Очаг.образ.печени", value: 1, selected: false},
            {name: "Хронический гастрит", value: 1, selected: false},
            {name: "НЯК", value: 1, selected: false},
            {name: "Хронический геморрой", value: 1, selected: false},
            {name: "Оперативное лечение хронического геморроя", value: 1, selected: false},

          ],
          options3: [
            {name: "Отрицает", value: 1, selected: false},
          ],
          options4: [
            {name: "Отрицает", value: 1, selected: false},
          ],
          options5: [
            {name: "Отрицает", value: 1, selected: false},
            {name: "Гемотрансфузии в анамнезе", value: 1, selected: false},
          ],
          options6: [
            {name: "ТЭЛА у близких род", value: 1, selected: false},
            {name: "ИМ до 45 лет у близких родственников", value: 1, selected: false},
            {name: "ОНМК до 45 лет у близких родственников", value: 1, selected: false},
            {name: "Тромбозы у близких родственников", value: 1, selected: false},
            {name: "ГБ у близких", value: 1, selected: false},
            {name: "СД у близких", value: 1, selected: false},
          ],
          options7: [
            {name: "АФС", value: 1, selected: false},
            {name: "Носительство LA", value: 1, selected: false},
            {name: "Наследственная тромбофилия", value: 1, selected: false},
            {name: "FV", value: 1, selected: false},
            {name: "FII", value: 1, selected: false},
          ]
        },
        patient: {
          id: -1,
          surname: "",
          name: "",
          patronymic: "",
          birthdate: ""
        },
        date: "",
        weight: "",
        height: "",
        mensesDate: "",
        anameses: "",
        analyzes_1: [ // TODO
          /*{
            id: 0,
            date: "",
            values: ["","","","","","","","","","",""]
          }*/
        ],
        analyzes_2: [ // TODO
          /*{
            id: 0,
            date: "",
            values: ["","","","","","","","","",""]
          }*/
        ],
        analyzes_3:  [ // TODO
          {
            id: 0,
            date: "2022",
            values: ["234","54","34","65","32","65"]
          },
          {
            id: 1,
            date: "2023",
            values: ["234","54","34","65","32","65"]
          },
          {
            id: 2,
            date: "2023",
            values: ["234","54","34","65","32","65"]
          },
          {
            id: 3,
            date: "2023",
            values: ["234","54","34","65","32","65"]
          },
        ],
        crops: [ //TODO
          {
            id: 0,
            date: "",
            localization: "",
            flora: "",
            value: ""
          }
        ],
        uzi: {
          text: constants.uziTexts[0],
          files: [] // TODO
        },
        doppler: {
          date: "",
          value: 0
        },
        pregnancy: "",
        hospital: "",
        research: "",
        docResearch: "",
        additional: "",
        diagnosis: {
          weeks: "",
          checkboxes: [
            {
              id: 0,
              boxes: [
                {label: "Рвота берем", value: false},
                {label: "Угроза прерывания беременности", value: false},
                {label: "Угрожающие преждевременные роды", value: false},
                {label: "Отеки беременных", value: false},
                {label: "Гестационная АГ", value: false},
                {label: "Умеренная преэклампсия", value: false},
                {label: "Низкая плацентация", value: false},
                {label: "Предлежание плаценты", value: false},
                {label: "Децидуальный полип", value: false},
                {label: "Рубец на матке", value: false},
                {label: "Гипергомоцистеинемия / Анемия беременных", value: false},
                {label: "Крупный плод", value: false},
                {label: "ИЦН", value: false},
                {label: "Установка РАП", value: false},
                {label: "Шов на шейке матки", value: false},
                {label: "Гестационный пиелонефрит", value: false},
                {label: "ИМВП при беременности", value: false},
                {label: "ХПН", value: false},
                {label: "Нарушения гемодинамики", value: false},
                {label: "Гипотрофия плода", value: false},
                {label: "Ангидрамнион", value: false},
                {label: "Маловодие", value: false},
                {label: "Многоводие", value: false},
                {label: "ГСД", value: false},
                {label: "Холестаз при беременности", value: false},
                {label: "Гепатоз беременных", value: false},
                {label: "Тазовое предлежание", value: false},
                {label: "Поперечное пол", value: false},
                {label: "Симфизиопатия", value: false},
                {label: "УЗ-маркры ХПП", value: false},
                {label: "Б/х маркеры ХПП", value: false},
                {label: "Узкий таз", value: false},
                {label: "Rh(-) без АТ", value: false},
                {label: "Наследственная тромбофилия", value: false}
              ]
            },
            {
              id: 1,
              boxes: [
                {label: "FV", value: false},
                {label: "FII", value: false},
                {label: "АФС", value: false},
                {label: "Носительство LA", value: false},
                {label: "Гипергомоцистеинемия", value: false},
                {label: "Хронический тонзиллит", value: false},
                {label: "Хронический пиелонефрит", value: false},
                {label: "Хронический цистит", value: false},
                {label: "МКБ", value: false},
                {label: "Единственная почка", value: false},
                {label: "Удвоение почки", value: false},
                {label: "Хроническая АГ", value: false},
                {label: "Варикозная болезнь", value: false},
                {label: "Тромбоз в анамнезе", value: false},
                {label: "Флебэктомия в анамнезе", value: false},
                {label: "АИТ. Эутиреоз", value: false},
                {label: "Субклинический гипотиреоз (ЗГТ)", value: false},
                {label: "Узловой зоб", value: false},
                {label: "Тиреотоксикоз", value: false},
                {label: "Гемиструмэктомия в анамнезе", value: false},
                {label: "ФАМ молочных желёз", value: false},
                {label: "Секторальная резекция молочной железы", value: false},
                {label: "Заболевания глаз", value: false},
                {label: "Лазерная коррекция зрения в анамнезее", value: false},
                {label: "Ожирение", value: false},
                {label: "Сахарный диабет", value: false},
                {label: "Хроническая никотиновая интоксикация", value: false},
                {label: "ДЖВП", value: false},
                {label: "ЖКБ", value: false},
                {label: "Холецистэктомия в анамнезе", value: false},
                {label: "Нейросенсорная тугоухость", value: false},
                {label: "Лекарственная аллергия", value: false},
                {label: "Бронхиальная астма", value: false},
                {label: "ТИА в анамнезе", value: false}
              ]
            },
            {
              id: 2,
              boxes: [
                {label: "ТЭЛА в анамнезе", value: false},
                {label: "Мигрень", value: false},
                {label: "Спленэктомия в анамнезе", value: false},
                {label: "Хронический гепатит", value: false},
                {label: "Tbc в анамнезе", value: false},
                {label: "Lues в анамнезе", value: false},
                {label: "Узловая эритема", value: false},
                {label: "Атопический дерматит", value: false},
                {label: "Болезнь Виллебранда", value: false},
                {label: "Пролапс МК", value: false},
                {label: "Аномалия сосудов ГМ", value: false},
                {label: "Очаг.образ.печени", value: false},
                {label: "Хронический гастрит", value: false},
                {label: "НЯК", value: false},
                {label: "Хронический геморрой", value: false},
                {label: "Оперативное лечение хронического геморроя", value: false},
                {label: "ДДЗП с грыжеобразованием", value: false},
                {label: "ОГА", value: false},
                {label: "Привычное невынашивание", value: false},
                {label: "Кольпит", value: false},
                {label: "ОАГА ST I", value: false},
                {label: "ОАГА ST II", value: false},
                {label: "ОАГА ST III", value: false},
                {label: "ОАГА IV — Ca incitu", value: false},
                {label: "ОАГА V — рубцовая деформация ш/м", value: false},
                {label: "ОАГА VI — дермоидные кисты яичников", value: false},
                {label: "ОАГА VII — НГЭ III, комбинированное лечение", value: false},
                {label: "ОАГА VIII — НГЭ II", value: false},
                {label: "Антенатальная гибель плода при сроке 30 недель", value: false},
                {label: "Неразвивающаяся беременность 7 недель", value: false},
                {label: "Преждевременные роды – эстренное кесарево сечение", value: false},
                {label: "ХПН", value: false},
                {label: "ГСД на инсулинотерапии", value: false}
              ]
            }
          ]
        },
        recommended: {
          text: "",
          checkboxes: [
            {label: "Компрессионный трикотаж I класса компрессии (Medi Step) — носить ежедневно!!!", value: false},
            {label: "Водный режим (2000-2500 мл в день)!!!", value: false},
            {label: "Осмотр эндокринолога в ближайшее время", value: false},
            {label: "Осмотр терапевта, кардиолога, ЛОР", value: false},
            {label: "Коленно-локтевое положение 15-20 минут 3-4 раза в день", value: false},
            {label: "Фемибион-I + метафолин 800 + Витамин Д 5000 МЕ - ежедневно", value: false},
            {label: "Клексан 0,4 п/к (флюксум 0,4 / фрагмин 5000 Ед / цибор 5000 Ед / фраксипарин 0,4) – продолжить", value: false},
            {label: "Канефрон 2 т х 3 раза до родов", value: false},
            {label: "Галакси 1 т х 3 раза + свечи с папаверином ректально 2-3 раза в день — при болях, либо при нагрузке", value: false},
            {label: "Утрожестан 200 мг х 3 раза (утро + день - перорально, на ночь — вагинально) длительно!!!", value: false},
            {label: "Магнелис В6 форте 1 х 2-3 раза в день – в постоянном режиме", value: false},
            {label: "Допегит 250 мг х 3 раза в день + контроль АД х 3 раза + ведение дневника АД!!!", value: false},
            {label: "Учитывая наличие патогенной микрофлоры в посевах мочи и ц/канала, а также наличия сахарного диабета беременных на инсулинотерапии – рекомендовано начать курс антибактериальной терапии (с учетом чувствительности микрофлоры) - Амоксиклав (875 мг + 125 мг) по 1 т х 2 раза 7 дней + Линекс 1 к х 3 раза 14 дней + Эссенциале форте 1 х 3 раза 10-14 дней Свечи Нео-пенотран форте вагинально на ночь по 1 свече 7 дней, далее – Лактожиналь вагинально на ночь 14 дней", value: false},
            {label: "На данном этапе показано проведение 2 курса внутривенных иммуноглобулинов – Октагам 5% - 100 в/в капельно медленно №3 с интервалом 3 дня (Интратект / Привиджен / Иммуновенин), либо курса плазмафереза", value: false},
            {label: "УЗИ плода + ранний допплер в 16 недель", value: false},
            {label: "Расширенная коагулограмма (ПТИ, ФГ, АПТВ, ТВ, МНО, АТ III), Д-димер, гомоцистеин, волчаночный антикоагулянт (скрининг+подтверждение), клинический анализ крови, ферритин – через 2 недели", value: false},
            {label: "Кровь на гены наследственной тромбофилии (12 генов)", value: false},
            {label: "Кровь на АТ: к β2-гликопротеину, кардиолипину, аннексину V, ХГЧ, протромбину, фосфатидилсерину, фосфатидиловой кислоте, фосфатидилинозитолу, 2 спиральной ДНК, антинуклеарный фактор", value: false},
            {label: "Кровь на субпопуляцию лимфоцитов", value: false},
            {label: "Биопсия эндометрия с выполнением ИГХ (19-21 д.м.ц., забор материала в НИИ АГиР им. Д.О. Отта, запись на прием к врачам отделения оперативной гинекологии)", value: false},
            {label: "Посев мочи + посев из ц/канала – через неделю после окончания антибактериальной терапии", value: false},
            {label: "Посев из носа, посев из зева", value: false}
          ]
        },
        birth: [
          {
            id: 0,
            birth: 0,
            character: 1,
            weight: 0,
            height: 0,
            apgar: 0,
            bloodloss: 0,
            timeperiod: true,
            complications: true
          },
          {
            id: 1,
            birth: 1,
            character: 2,
            weight: 0,
            height: 0,
            apgar: 0,
            bloodloss: 0,
            timeperiod: false,
            complications: false
          }
        ], // TODO
      },
      selections: {
        analyzes_1: -1,
        analyzes_2: -1,
        analyzes_3: -1,
        crops: -1,
        births: -1
      },
      doctorName: methods.getDoctorName()
    }
  },
  beforeMount() {
    methods.checkCookies(this.$cookies, constants.Role.DOCTOR)
  },
  mounted() {
    this.preload();
  }
}
</script>