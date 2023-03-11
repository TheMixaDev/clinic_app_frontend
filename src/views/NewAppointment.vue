<template>
  <div id="modal"></div>
  <div class="container-fluid animate__animated animate__fadeIn">
    <div class="row header">
      <div class="col">
        <h1 class="heading">
          <button className="btn back btn-primary second-add" @click="requestCancel()"><i className="fa-solid fa-arrow-left"></i></button>
          {{state.id !== -1 ? 'Редактирование приема' : (state.isFirst ? 'Создание приёма' : 'Повторный прием')}}</h1>
      </div>
    </div>
    <div class="container-fluid main-items">
      <div class="row main-info">
        <div class="col name-wrapper">
          <h6 class="patient-name">ФИО Пациента</h6>
          <input type="text" id="name" class="form-control name-tag" placeholder="Выберите пациента из Справочника" disabled @click="saveState(()=>{router().push({name: 'patients-directory'})})" readonly v-bind:value="state.patient.id !== -1 ? state.patient.surname + ' ' + state.patient.name + ' ' + state.patient.patronymic : ''">
        </div>
        <div class="col date-wrapper">
          <h6 class="patient-name">Дата рождения</h6>
          <input class="date" type="date" v-model="state.patient.birthdate" disabled>
          Возраст: {{ state.patient.birthdate.length > 0 ? methods.getAge(state.patient.birthdate) : '-'}}
        </div>
        <div class="col doc-wrapper">
          <h6 class="patient-name">Врач</h6>
          <input type="text" id="name" class="form-control name-tag" placeholder="Выберите врача из Справочника" @click="saveState(()=>{methods.setMeta({doctorMode: true}); router().push({name: 'doctors-directory'})})" readonly v-bind:value="state.doctor.fullName">
        </div>
        <div class="col date-wrapper">
          <h6 class="patient-name">Дата приёма</h6>
          <input class="date" type="date" v-model="state.date" disabled>
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
            <input type="text" id="name" class="form-control" placeholder="Автоматический рассчет" v-bind:value="methods.getIMT(state.weight, state.height) || ``" disabled>
          </div>
          <div class="col date-wrapper">
            <h6 class="patient-name">Дата последних месячных</h6>
            <input class="date" type="date" v-model="state.mensesDate">
          </div>
        </div>
        <div class="row row-wrapper">
          <div class="col select-wrapper">
            <h6 class="patient-name">Операции, травмы</h6>
            <MultiSelect :input="state.detailed.operations" :pid="'operations'" ref="operations" :custom=true @custom-update="updateCustomOption"></MultiSelect>
          </div>
          <div class="col select-wrapper">
          <h6 class="patient-name">Перенесенные заболевания</h6>
            <MultiSelect :input="state.detailed.illnesses" :pid="'illnesses'" ref="illnesses"></MultiSelect>
        </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Туберкулез, венерические заболевания, гепатиты</h6>
            <MultiSelect :input="state.detailed.tvg" :pid="'tvg'" ref="tvg" :custom=true @custom-update="updateCustomOption"></MultiSelect>
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Аллергические реакции</h6>
            <MultiSelect :input="state.detailed.allergic" :pid="'allergic'" ref="allergic" :custom=true @custom-update="updateCustomOption"></MultiSelect>
          </div>
        </div>
        <div class="row row-wrapper">
          <div class="col select-wrapper">
            <h6 class="patient-name">Гемотрансфузии</h6>
            <MultiSelect :input="state.detailed.hemotransfusios" :pid="'hemotransfusios'" ref="hemotransfusios" :custom=true @custom-update="updateCustomOption"></MultiSelect>
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Наследственность</h6>
            <MultiSelect :input="state.detailed.inheritance" :pid="'inheritance'" ref="inheritance" :custom=true @custom-update="updateCustomOption"></MultiSelect>
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Обследование на наследственную тромбофилию</h6>
            <MultiSelect :input="state.detailed.trombofilia" :pid="'trombofilia'" ref="trombofilia"></MultiSelect>
          </div>
        </div>
      </div>
      <div class="container-fluid anamnesis">
        <h4>Гинекологический анамнез</h4>
        Гинекологические заболевания:
        <MultiSelect :input="state.detailed.anameses_desiases" :pid="'anameses_desiases'" ref="anameses_desiases"></MultiSelect>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4" v-model="state.anameses"></textarea>
          <label class="form-label" for="textAreaExample"></label>
        </div>
      </div>
      <div class="container-fluid analyzes">
        <h4>Анализы</h4>
        Гены наследственной тромбофилии:
        <MultiSelect :input="state.detailed.analyzes_genes" :pid="'analyzes_genes'" ref="analyzes_genes"></MultiSelect>
        <div v-for="(table, key) in constants().analyze_constants" :key="key">
          <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white" v-if="state[`analyzes_${key+1}`].length > 0">
            <thead class="bg-light">
              <tr class="table-first-row">
                <th></th>
                <th v-for="analyze in state[`analyzes_${key+1}`]" :key="analyze.id" @click="selectTableElement(analyze, `analyzes_${key+1}`)">
                  {{ analyze.date.length > 1 ? new Date(analyze.date).toLocaleDateString('ru-RU') : "" }} {{ methods.getTrimester(state.mensesDate, analyze.date) }}
                </th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="(type, index) in table" :key="index">
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
          <EmptyTableDisplay v-else/>
          <br>
          <div class="row col-buttons">
            <button class="btn btn-primary first-add" @click="requestAddAnalyzes(`analyzes_${key+1}`, constants().analyze_constants[key])"><i class="fa-solid fa-plus button-icon"></i>Добавить</button>
            <button class="btn btn-primary edit" v-if="state[`analyzes_${key+1}`].length > 0" v-bind:disabled="selections[`analyzes_${key+1}`] === -1" @click="requestEdit(AddAnalyzesComponent, `analyzes_${key+1}`, constants().analyze_constants[key])"><i class="fa-solid fa-pen button-icon"></i>Редактировать</button>
            <button class="btn btn-primary delete" v-if="state[`analyzes_${key+1}`].length > 0" v-bind:disabled="selections[`analyzes_${key+1}`] === -1" @click="requestDeleteElement('анализов',`analyzes_${key+1}`)"><i class="fa-solid fa-trash button-icon"></i>Удалить</button>
          </div>
        </div>
      </div>
      <div class="container-fluid medcrops">
        <h4>Посевы</h4>
        <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white" v-if="state.crops.length > 0">
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
                  <p class="fw-bold mb-1">{{ crop.date.length > 0 ? new Date(crop.date).toLocaleDateString('ru') : '' }}</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ constants().crops_constants[0][crop.localization-1] }}</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ constants().crops_constants[1][crop.flora] }}</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ constants().crops_constants[2][crop.value] }}</p>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <EmptyTableDisplay v-else/>
        <div class="row col-buttons">
          <button class="btn btn-primary first-add" @click="requestAddCrops()"><i class="fa-solid fa-plus button-icon"></i>Добавить</button>
          <button class="btn btn-primary edit" v-if="state.crops.length > 0" v-bind:disabled="selections.crops === -1" @click="requestEdit(AddMedcropsComponent, 'crops')"><i class="fa-solid fa-pen button-icon"></i>Редактировать</button>
          <button class="btn btn-primary delete" v-if="state.crops.length > 0" v-bind:disabled="selections.crops === -1" @click="requestDeleteElement('посевов', 'crops')"><i class="fa-solid fa-trash button-icon"></i>Удалить</button>
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
                    <a class="btn" v-for="file in state.uzi.files" :key="file.id" @click="downloadFile(file);"><i class="fa-solid fa-file"> {{ file.name }}</i></a>
                  </div>
                  <div class="col attachment-buttons-col">
                    <input type="file" style="display: none;" ref="fileInput" @change="uploadFile()">
                    <a class="btn btn-primary attach" @click="$refs.fileInput.click();"><i class="fa-solid fa-plus button-icon"></i>Прикрепить</a>
                    {{ ongoingFileLoading ? 'Загрузка данных...' : ''}}
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
        <input class="date" type="date" v-model="state.doppler.date">
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
      <div class="container-fluid additional-checks">
        <div class="row">
          <div class="col">
            Рубец на матке:
            <select class="form-select" v-model="state.diagnosis.dropdowns.rubec">
              <option value="0">Отсутствует</option>
              <option value="1">Рубец на матке после  кесарева сечения</option>
              <option value="2">Рубец на матке после 2-х операций кесарева сечения</option>
              <option value="3">Рубец на матке после малого кесарева сечения</option>
              <option value="4">Рубец на матке после перфорации матки</option>
              <option value="5">Рубец на матке после консервативной миомэктомии</option>
            </select>
          </div>
          <div class="col">
            Нарушения гемодинамики:
            <select class="form-select" v-model="state.diagnosis.dropdowns.hemodynamics">
              <option value="0">Отсутствуют</option>
              <option value="1">I степени</option>
              <option value="2">II степени</option>
              <option value="3">III степени</option>
            </select>
          </div>
          <div class="col">
            ГСД:
            <select class="form-select" v-model="state.diagnosis.dropdowns.gsd">
              <option value="0">Отсутствует</option>
              <option value="1">Диета</option>
              <option value="2">Инсулинотерапия</option>
            </select>
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
        <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white" v-if="state.birth.length > 0">
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
            <tr v-for="birth in state.birth" :key="birth.id" @click="selectTableElement(birth, 'birth')" :style="selections.birth !== -1 && selections.birth.id === birth.id ? `background-color: #cceffd` : ``">
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ birth.birth ? "Да" : "Нет" }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ birth.character === "1" ? "Плановое" : "Экстренное"}}</p>
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
                    <p class="fw-bold mb-1">{{ birth.timeperiod ? "Да" : "Нет" }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{{ birth.complications ? "Да" : "Нет" }}</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <EmptyTableDisplay v-else/>
        <div class="row col-buttons">
          <button class="btn btn-primary first-add" @click="requestAddBirth();"><i class="fa-solid fa-plus button-icon"></i>Добавить</button>
          <button class="btn btn-primary edit" v-if="state.birth.length > 0" v-bind:disabled="selections.birth === -1" @click="requestEdit(AddChildbirthComponent, 'birth')"><i class="fa-solid fa-pen button-icon"></i>Редактировать</button>
          <button class="btn btn-primary delete" v-if="state.birth.length > 0" v-bind:disabled="selections.birth === -1" @click="requestDeleteElement('родов', 'birth')"><i class="fa-solid fa-trash button-icon"></i>Удалить</button>
        </div>
      </div>
    </div>
    <div class="row save-buttons">
      <button class="btn btn-primary save-first" @click="save(()=>{router().push({name: 'appointments'})})"><i class="fa-solid fa-plus button-icon"></i>Сохранить</button>
      <button class="btn btn-primary save-second" @click="save(downloadDocx)" v-bind:disabled="this.downloading"><i class="fa-solid fa-download button-icon"></i> {{ this.downloading ? 'Скачивание...' : 'Сохранить и вывести консультативное заключение'}}</button>
    </div>
  </div>
</template>
<style>
@media screen and (max-width: 1800px) {
  .save-second {
    width: 40vw!important;
  }
}
.save-first {
  width: 15vw;
  min-width: 130px;
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
  margin-top: 2rem;
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
  /*height: 20rem;*/
  border-left: 1px solid rgba(0, 117, 255, 0.3)!important;
  border-radius: 9px!important;
}
.pregnacy-text {
  height: 1rem;
  width: 5rem;
  border: 1px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px 9px 9px 9px;
  background: #F5F9FF;
}
.container-fluid {
  background: #FAFAFA;
  width: 90vw;
  height: 95vh;
  border-radius: 25px;
  box-shadow: 0px 16px 47px 16px rgb(61 61 61 / 10%);
  overflow-y: scroll;
}
.patient-name {
  margin-bottom: 1rem;
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
.container-fluid.additional-checks {
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
  -webkit-box-shadow: 0px 9px 8px -8px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 9px 8px -8px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 9px 8px -8px rgba(34, 60, 80, 0.2);
  margin-top: 2rem;
  background: transparent;
  width: auto;
  height: auto;
  border-radius-bottomleft: 0.5rem;
  -moz-border-radius-bottomright: 0.5rem;
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
  gap: 1rem;
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
  min-width: 130px;
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
.second-add {
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
  border: solid 1px transparent!important;
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
import ActionModal from "@/components/ActionModal.vue";
import EmptyTableDisplay from "@/components/inpage/EmptyTableDisplay.vue";
import AddChildbirthComponent from "@/components/tables/AddChildbirthComponent.vue";
import AddMedcropsComponent from "@/components/tables/AddMedcropsComponent.vue";
import AddAnalyzesComponent from "@/components/tables/AddAnalyzesComponent.vue";

export default {
  name: "NewAppointment",
  computed: {
    AddAnalyzesComponent() {
      return AddAnalyzesComponent
    },
    AddMedcropsComponent() {
      return AddMedcropsComponent
    },
    AddChildbirthComponent() {
      return AddChildbirthComponent
    },
    methods() {
      return methods
    }
  },
  methods: {
    router() {
      return router
    },
    constants() {
      return constants
    },
    updateCustomOption(value, pid) {
      this.state.detailed[`${pid}Custom`] = value;
    },
    requestCancel() {
      const div = document.getElementById("modal");
      const app = createApp(ActionModal, {
        info: {
          heading: 'Отмена внесенных изменений',
          icon: 'question',
          text: 'Вы точно хотите выйти из режима редактирования',
          highlighted: 'без сохранения изменений?',
          proceedButton: 'Продолжить'
        },
        callback: ()=> router.push({name: 'appointments'})
      });
      app.mount(div);
    },
    loadState() {
      if(sessionStorage.getItem("appointmentLastState")) {
        this.state = JSON.parse(sessionStorage.getItem("appointmentLastState"));
        sessionStorage.removeItem("appointmentLastState");
        return true;
      }
      return false;
    },
    save(callback) {
      let stateCopy = JSON.parse(JSON.stringify(this.state));
      let patientId = this.state.patient.id;
      let doctorId = this.state.doctor.id;
      let id = this.state.id;
      let isFirst = this.state.isFirst;
      delete stateCopy.patient;
      delete stateCopy.doctor;
      delete stateCopy.id;
      delete stateCopy.isFirst;
      for(let i in stateCopy.detailed)
        if(!i.includes("Custom"))
          stateCopy.detailed[i] = methods.getSelectedIds(stateCopy.detailed[i]);
      let diagnosisCheckboxes = [];
      for(let i in stateCopy.diagnosis.checkboxes)
        diagnosisCheckboxes = diagnosisCheckboxes.concat(methods.getSelectedIds(stateCopy.diagnosis.checkboxes[i].boxes));
      stateCopy.diagnosis.checkboxes = diagnosisCheckboxes;
      stateCopy.recommended.checkboxes = methods.getSelectedIds(stateCopy.recommended.checkboxes);
      stateCopy.diagnosis.dropdowns.fatness = methods.limit(Math.ceil((methods.getIMT(stateCopy.weight, stateCopy.height) - 30) / 5), 0, 4)+'';
      console.log(stateCopy);
      if(id === -1) {
        methods.authorizedPOSTRequest(
            this.$cookies,
            `/appointment`,
            {
              is_first: isFirst,
              patient_id: patientId,
              doctor_id: doctorId,
              value: JSON.stringify(stateCopy)
            },
            response => {
              methods.runNotification("Прием сохранен");
              if(callback) callback(response);
            },
            error => {
              if(error.code === "ERR_NETWORK") {
                methods.runNotification("Не удалось подключиться к серверу");
                return;
              }
              methods.runNotification("Не удалось сохранить прием");
              console.log(error);
            }
        )
      } else {
        methods.authorizedPATCHRequest(
            this.$cookies,
            `/appointment`,
            {
              id: id,
              patient_id: patientId,
              doctor_id: doctorId,
              value: JSON.stringify(stateCopy)
            },
            response => {
              methods.runNotification("Прием сохранен");
              if(callback) callback(response);
            },
            error=>{
              if(error.code === "ERR_NETWORK") {
                methods.runNotification("Не удалось подключиться к серверу");
                return;
              }
              methods.runNotification("Не удалось сохранить прием");
              console.log(error);
            }
        )
      }
    },
    loadFromResponse(response) {
      let stateCopy = JSON.parse(response.value);
      stateCopy.id = response.id;
      stateCopy.isFirst = response.is_first;
      stateCopy.patient = {
        id: response.patient.id,
        surname: response.patient.surname,
        name: response.patient.name,
        patronymic: response.patient.lastname,
        birthdate: response.patient.birthday
      };
      stateCopy.doctor = {
        id: response.doctor.id,
        fullName: response.doctor.surname + ' ' + response.doctor.name + ' ' + response.doctor.lastname
      };
      for(let i in stateCopy.detailed)
        if(!i.includes("Custom"))
          stateCopy.detailed[i] = methods.getFromSelectedIds(this.state.detailed[i], stateCopy.detailed[i]);
      let newCheckboxes = JSON.parse(JSON.stringify(this.state.diagnosis.checkboxes));
      for(let i in newCheckboxes)
        newCheckboxes[i].boxes = methods.getFromSelectedIds(this.state.diagnosis.checkboxes[i].boxes, stateCopy.diagnosis.checkboxes);
      stateCopy.diagnosis.checkboxes = newCheckboxes;
      stateCopy.recommended.checkboxes = methods.getFromSelectedIds(this.state.recommended.checkboxes, stateCopy.recommended.checkboxes);
      this.state = stateCopy;
    },
    saveState(after) {
      sessionStorage.setItem("appointmentLastState", JSON.stringify(this.state));
      after();
    },
    preload() {
      this.loadState();
      this.updateMultiselectors();
      if(settings.designMode)
        return;
      let meta = methods.getMeta();
      if(meta) {
        console.log(meta);
        if(meta.setDoctor) {
          this.state.doctor.id = meta.doctor.id;
          this.state.doctor.fullName = meta.doctor.surname + ' ' + meta.doctor.name + ' ' + meta.doctor.patronymic;
          return;
        }
        if(meta.isNew) {
          if(meta.copyFromLast) {
            this.loadByID(meta.appointment.patientId, true,()=>{
              this.state.isFirst = false;
              this.state.id = -1;
            });
          } else {
            this.state.patient = meta.patient;
          }
        } else {
          this.loadByID(meta.appointment.id);
        }
      } else router.go(-1);
    },
    loadByID(id, isLast, callback) {
      methods.authorizedGETRequest(
          this.$cookies,
          `/appointment/${isLast ? 'last/' : ''}${id}`,
          response => {
            this.loadFromResponse(response.data.body);
            this.updateMultiselectors();
            if(callback) callback();
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
    },
    selectTableElement(data, element) {
      if(this.selections[element].id === data.id)
        return this.selections[element] = -1;
      this.selections[element] = data;
    },
    requestDeleteElement(label, table) {
      const div = document.getElementById("modal");
      const app = createApp(ActionModal, {
        info: {
          heading: 'Удаление '+label,
          icon: 'delete',
          text: 'Подтвердите удаление ',
          highlighted: label,
          proceedButton: 'Удалить',
          callbackInfo: table
        },
        callback: this.deleteElement
      });
      app.mount(div);
    },
    deleteElement(table) {
      let index = -1;
      for(let i in this.state[table])
        if(this.state[table][i].id === this.selections[table].id) {
          this.selections[table] = -1;
          index = i;
          break;
        }
      this.state[table].splice(index, 1);
      return methods.runNotification("Данные удалены");
    },
    proceedTable(data, table, label) {
      if(data.model.id === -1) {
        data.model.id = this.findNextId(this.state[table]);
        this.state[table].push(data.model);
        methods.runNotification(label+" добавлены");
      } else {
        for(let i of this.state[table])
          if(i.id === data.model.id)
            i = data.model;
        methods.runNotification("Данные обновлены");
      }
    },
    requestEdit(component, data, constants) {
      let info = {
        enabled: true,
        table: data,
        model: this.selections[data]
      };
      if(constants)
        info.labels = constants;
      this.requestModalGeneral(component, {
        info: info,
        callback: this.proceedTable
      });
    },
    requestAddBirth() {
      this.requestModalGeneral(AddChildbirthComponent,{
        info: {
          enabled: false,
          model: {
            id: -1,
            birth: false,
            character: "1",
            weight: "",
            height: "",
            apgar: "",
            bloodloss: "",
            timeperiod: false,
            complications: false
          }
        },
        callback: this.proceedTable
      });
    },
    requestAddCrops() {
      this.requestModalGeneral(AddMedcropsComponent,{
        info: {
          enabled: false,
          model: {
            id: -1,
            date: "",
            localization: "1",
            flora: "0",
            value: "0"
          }
        },
        callback: this.proceedTable
      });
    },
    requestAddAnalyzes(table, constants) {
      this.requestModalGeneral(AddAnalyzesComponent,{
        info: {
          enabled: false,
          table: table,
          labels: constants,
          model: {
            id: -1,
            date: "",
            values: this.generateEmptyArray(constants.length)
          }
        },
        callback: this.proceedTable
      });
    },
    requestModalGeneral(component, props) {
      const div = document.getElementById("modal");
      const app = createApp(component, props);
      app.mount(div);
    },
    findNextId(elements) {
      let maxId = -1;
      for(let i of elements)
        if(i.id > maxId) maxId = i.id;
      return maxId+1;
    },
    generateEmptyArray(length) {
      let result = [];
      for(let i = 0; i < length; i++)
        result.push("");
      return result;
    },
    downloadFile(file) {
      this.ongoingFileLoading = true;
      methods.authorizedGETDownload(
          this.$cookies,
          `/appointment/file/${file.id}/read`,
          response => {
            methods.downloadFile(file.name, response.data);
            this.ongoingFileLoading = false;
          },
          error => {
            if(error.code === "ERR_NETWORK") {
              methods.runNotification("Не удалось подключиться к серверу");
              return;
            }
            methods.runNotification("Не удалось скачать файл");
            console.log(error);
          }
      );
    },
    uploadFile() {
      if(this.state.patient.id < 0)
        return methods.runNotification("Для загрузки файла необходимо указать пациента!");
      if(this.$refs.fileInput.files.length > 0) {
        this.ongoingFileLoading = true;
        let formData = new FormData();
        formData.append("file", this.$refs.fileInput.files[0]);
        methods.authorizedPOSTRequest(
            this.$cookies,
            `/appointment/${this.state.patient.id}/file/upload`,
            formData,
            response => {
              this.state.uzi.files.push(response.data.body);
              methods.runNotification("Файл прикреплен");
              this.ongoingFileLoading = false;
            },
            error => {
              if(error.code === "ERR_NETWORK") {
                methods.runNotification("Не удалось подключиться к серверу");
                return;
              }
              methods.runNotification("Не удалось прикрепить файл");
              console.log(error);
            }
        )
      }
    },
    downloadDocx(appointment) {
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
          `/appointment/${appointment.data.body.id}/doc`,
          key => {
            methods.authorizedGETDownload(
                this.$cookies,
                `/appointment/doc/${key.data.key}`,
                response => {
                  methods.downloadFile(`КонсультативноеЗаключение_${appointment.data.body.id}.docx`, response.data);
                  this.downloading = false;
                  router.push({name: 'appointments'});
                },
                failure
            );
          },
          failure
      )
    },
    updateMultiselectors() {
      for(let i in this.state.detailed) {
        if(Array.isArray(this.state.detailed[i]))
          this.$refs[i].updateSelected(this.state.detailed[i], false);
        else
          this.$refs[i.replace("Custom","")].updateSelected([], this.state.detailed[i]);
      }
    }
  },
  beforeMount() {
    methods.checkCookies(this.$cookies, constants.Role.DOCTOR)
  },
  mounted() {
    this.preload();
  },
  components: {EmptyTableDisplay, MultiSelect},
  data() {
    return {
      uploadedFile: '',
      ongoingFileLoading: false,
      downloading: false,
      state: {
        id: -1,
        isFirst: true,
        detailed: {
          operationsCustom: "",
          tvgCustom: "",
          allergicCustom: "",
          hemotransfusiosCustom: "",
          inheritanceCustom: "",
          operations: [
            {id: 0, label: "Операции, травмы, сотрясение ГМ отрицает", value: false},
            {id: 1, label: "Флебэктомия в анамнезе", value: false},
            {id: 2, label: "Гемиструмэктомия в анамнезе", value: false},
            {id: 3, label: "Лазерная коррекция зрения в анамнезе", value: false},
            {id: 4, label: "Спленэктомия в анамнезе", value: false},
            {id: 5, label: "Оперативное лечение хронического геморроя", value: false},
            {id: 6, label: "Секторальная резекция молочной железы", value: false},
            {id: 7, label: "Аппендэктомия без осложнений", value: false},
            {id: 8, label: "Аппендэктомия, перитонит", value: false}
          ],
          illnesses: [
            {id: 1, label: "Хронический тонзиллит", value: false},
            {id: 2, label: "Хронический пиелонефрит", value: false},
            {id: 3, label: "Хронический цистит", value: false},
            {id: 4, label: "МКБ", value: false},
            {id: 5, label: "Единственная почка", value: false},
            {id: 6, label: "Хроническая АГ", value: false},
            {id: 7, label: "Варикозная болезнь", value: false},
            {id: 8, label: "Тромбоз в анамнезе", value: false},
            {id: 9, label: "Флебэктомия в анамнезе", value: false},
            {id: 10, label: "АИТ. Эутиреоз", value: false},
            {id: 11, label: "Субклинический гипотиреоз (ЗГТ)", value: false},
            {id: 12, label: "Узловой зоб", value: false},
            {id: 13, label: "Тиреотоксикоз", value: false},
            {id: 14, label: "ФАМ молочных желёз", value: false},
            {id: 15, label: "Секторальная резекция молочной железы", value: false},
            {id: 16, label: "Заболевания глаз", value: false},
            {id: 17, label: "Лазерная коррекция зрения в анамнезе", value: false},
            {id: 18, label: "Микропролактинома гипофиза", value: false},
            {id: 19, label: "Образование надпочечников", value: false},
            {id: 20, label: "Ожирение", value: false},
            {id: 21, label: "Сахарный диабет", value: false},
            {id: 22, label: "Хроническая никотиновая интоксикация", value: false},
            {id: 23, label: "ДЖВП", value: false},
            {id: 24, label: "ЖКБ", value: false},
            {id: 25, label: "Холецистэктомия в анамнезе", value: false},
            {id: 26, label: "Нейросенсорная тугоухость", value: false},
            {id: 27, label: "Лекарственная аллергия", value: false},
            {id: 28, label: "Бронхиальная астма", value: false},
            {id: 29, label: "ТИА в анамнезе", value: false},
            {id: 30, label: "ТЭЛА в анамнезе", value: false},
            {id: 31, label: "Мигрень", value: false},
            {id: 32, label: "Спленэктомия в анамнезе", value: false},
            {id: 33, label: "Хронический гепатит", value: false},
            {id: 34, label: "Tbc в анамнезе", value: false},
            {id: 35, label: "Lues в анамнезе", value: false},
            {id: 36, label: "Узловая эритема", value: false},
            {id: 37, label: "Атопический дерматит", value: false},
            {id: 38, label: "Болезнь Виллебранда", value: false},
            {id: 39, label: "Пролапс МК", value: false},
            {id: 40, label: "Аномалия сосудов ГМ", value: false},
            {id: 41, label: "Очаг.образ.печени", value: false},
            {id: 42, label: "Хронический гастрит", value: false},
            {id: 43, label: "НЯК", value: false},
            {id: 44, label: "Хронический геморрой", value: false},
            {id: 45, label: "Оперативное лечение хронического геморроя", value: false},
            {id: 46, label: "ДДЗП с грыжеобразованием", value: false},
            {id: 1001, label: "Миопия слабой степени", value: false},
            {id: 1002, label: "Миопия средней степени", value: false},
            {id: 1003, label: "Миопия высокой степени", value: false},
            {id: 1004, label: "Миопический астигматизм", value: false},
            {id: 1005, label: "Врожденная катаракта", value: false},
            {id: 1006, label: "ПХРД", value: false},
            {id: 2001, label: "Ожирение I степени", value: false},
            {id: 2002, label: "Ожирение II степени", value: false},
            {id: 2003, label: "Ожирение III степени", value: false},
            {id: 2004, label: "Ожирение IV степени", value: false},
            {id: 3001, label: "Сахарный диабет 1 типа", value: false},
            {id: 3002, label: "Сахарный диабет 2 типа на диете", value: false},
            {id: 3003, label: "Сахарный диабет 2 типа на инсулине", value: false}
          ],
          tvg: [
            {id: 1, label: "Отрицает", value: false}
          ],
          allergic: [
            {id: 1, label: "Отрицает", value: false}
          ],
          hemotransfusios: [
            {id: 1, label: "Отрицает", value: false},
            {id: 2, label: "Гемотрансфузии в анамнезе", value: false}
          ],
          inheritance: [
            {id: 0, label: "Не отягощена", value: false},
            {id: 1, label: "ТЭЛА у близких родственников", value: false},
            {id: 2, label: "ИМ до 45 лет у близких родственников", value: false},
            {id: 3, label: "ОНМК до 45 лет у близких родственников", value: false},
            {id: 4, label: "Тромбозы у близких родственников", value: false},
            {id: 5, label: "ГБ у близких", value: false},
            {id: 6, label: "СД у близких", value: false}
          ],
          trombofilia: [
            {id: 0, label: "Не проводилось", value: false},
            {id: 1, label: "АФС", value: false},
            {id: 2, label: "Носительство LA", value: false},
            {id: 3, label: "Наследственная тромбофилия", value: false},
            {id: 4, label: "FV", value: false},
            {id: 5, label: "FII", value: false},
            {id: 6, label: "FV, FII – мутации не выявлены", value: false},
            {id: 7, label: "Дефицит АТIII", value: false},
            {id: 8, label: "Дефицит протеина С", value: false},
            {id: 9, label: "Дефицит протеина S", value: false},
            {id: 100, label: "Наследственная тромбофилия не выявлена", value: false},
          ],

          anameses_desiases: [
            {id: 1, label: "Миома матки", value: false},
            {id: 2, label: "Хронический эндометрит", value: false},
            {id: 3, label: "Хронический аднексит", value: false},
            {id: 4, label: "Привычное невынашивание", value: false},
            {id: 5, label: "ST I", value: false},
            {id: 6, label: "ST II", value: false},
            {id: 7, label: "CIN III, эксцизия ш/м", value: false},
            {id: 8, label: "Ca in citu ш/м", value: false},
            {id: 9, label: "Рубцовая деформация ш/м", value: false},
            {id: 10, label: "Дермоидные кисты яичников", value: false},
            {id: 11, label: "НГЭ III, комбинированное лечение", value: false},
            {id: 12, label: "НГЭ II, комбинированное лечение", value: false},
            {id: 13, label: "НМЦ", value: false},
            {id: 14, label: "Цистэктомия в анамнезе", value: false},
            {id: 15, label: "Полип эндометрия, г/с, полипэктомия", value: false},
            {id: 16, label: "Полип ц/канала", value: false},
            {id: 17, label: "Рассечение синехий полости матки", value: false},
            {id: 18, label: "ИЦН", value: false},
            {id: 19, label: "Неудачи ЭКО", value: false}
          ],
          analyzes_genes: [
            {id: 0, label: "Обследование не проводилось", value: false},
            {id: 1, label: "FGB G/A", value: false},
            {id: 2, label: "FGB A/A", value: false},
            {id: 3, label: "GPIIIa T/C", value: false},
            {id: 4, label: "GPIIIa C/C", value: false},
            {id: 5, label: "PAI-1 5G/4G", value: false},
            {id: 6, label: "PAI-1 4G/4G", value: false},
            {id: 7, label: "PLAT I/D", value: false},
            {id: 8, label: "PLAT I/I", value: false},
            {id: 9, label: "GPIa T/C", value: false},
            {id: 10, label: "GPIa C/C", value: false},
            {id: 11, label: "F7 A/G", value: false},
            {id: 20, label: "F7 G/G", value: false},
            {id: 12, label: "MTHFR C/T", value: false},
            {id: 13, label: "MTHFR T/T", value: false},
            {id: 14, label: "MTHFR A/G", value: false},
            {id: 15, label: "MTHFR G/G", value: false},
            {id: 16, label: "MTRR A/G", value: false},
            {id: 17, label: "MTRR G/G", value: false},
            {id: 18, label: "MTR A/G", value: false},
            {id: 19, label: "MTR G/G", value: false},
            {id: 21, label: "FV, FII – мутации не выявлены", value: false},
          ]
        },
        patient: {
          id: -1,
          surname: "",
          name: "",
          patronymic: "",
          birthdate: ""
        },
        doctor: {
          id: methods.getDoctorID(),
          fullName: methods.getDoctorName()
        },
        date: new Date().toJSON().slice(0, 10),
        weight: "",
        height: "",
        mensesDate: "",
        anameses: "Menses с 15 лет по 5-7 дней через 28-30дней, регулярные, безболезненные, умеренные. Половая жизнь с 16 лет.\n" +
            "Беременности:\n" +
            "I.\t2003 г. – срочные роды, мальчик 3380/54, течение беременности и родов без осложнений. Ребенок Rh(+), в послеродовом периоде сохранялась желтуха в течение 8 дней, заменное переливание крови не проводилось. Анти-D-иммуноглобулин не вводился.\n" +
            "II.\t2004 г. – искусственный аборт раннего срока. Анти-D-иммуноглобулин не вводился.\n" +
            "III.\t2016 г — неразвивающаяся беременность 7 недель, abrasio c.u.\n" +
            "IV.\t2018 г.  — преждевременные роды в 30 недель, антенатальная гибель плода в 30 недель, 1400 гр, 43 см.   \n" +
            "V.\t2019 г. – экстренное кесарево сечение (непрерывные шевеления плода на фоне высоких доз инсулинотерапии ГСД) в 36/37 недель. При беременности получила 1 курс ВВИГ в 12 недель, 2 курс Октагам + иммуновенин в 23/24 недели. НМГ, метипред. По гистологии – гнойный децидуит.\n" +
            "VI.\t2020 г. – медикаментозный аборт, без осложнений.\n" +
            "VII.\t2021 (криоперенос) - с/в 5/6 недель, без abrasio c.u. (клексан, кардиомагнил с ранних сроков)\n" +
            "VIII.\tIII – 2021 (криоперенос) до криопереноса проведен курс плазмаферезе, в протоколе ЭКО – Октагам 100 №3, на 21 день после переноса – кровянистые обильные выделения, I скрининг ц/к 37 мм, поздний с/в 16 недель, abrasio c.u. Через 2 недели – г/с, плацентарный полип, остатки плацентарной ткани.\n" +
            "IX.\t2021 - срочные роды через ЕРП, антенатальная гибель плода в 36/37 недель, девочка 2600/48, гистология - ХПН с острой декомпенсацией. Серозно-гнойный хориодецидуит, интервиллузит. При беременности - ГСД, диету со слов соблюдала, за уровнем глюкозы следила. В 15/16 недель - антибактериальная терапия амоксиклавом в связи с бактериурией. После родов выписана на 2 сутки, антирезусный Ig не вводили.\n" +
            "X.\t2023 - неразвивающаяся беременность 7/8 недель (после 1 попытки ЭКО, криопротокол). Проведена вакуум-аспирация полости матки. Генетика 46 XY, гистология - децидуальная ткань с признакаами хронического воспаления, фибрин, свертки крови\n" +
            "XI.\tНастоящая\n",
        analyzes_1: [],
        analyzes_2: [],
        analyzes_3: [],
        crops: [],
        uzi: {
          text: constants.uziTexts[0],
          files: []
        },
        doppler: {
          date: "",
          value: 0
        },
        pregnancy: "На учете в ЖК с 8 недель. ОПВ +12 кг.\n" +
            "Динамика АД: 120/70 – 110/80 – 110/60 мм.рт.ст.\n" +
            "Анализ мочи – без патологических изменений.\n",
        hospital: "",
        research: "Общее состояние удовлетворительное.\n" +
            "Пульс – 70 уд/мин, АД – 105/60 мм рт. ст. на обеих руках, ЧД – 16 в мин.\n" +
            "Рост – 152 см, Вес тела – 61,5 кг (47 кг – до беременности). Телосложение правильное.\n" +
            "Кожные покровы, слизистые нормальной окраски, нормальной влажности. Тургор, эластичность кожи соответствуют возрасту.\n" +
            "Костно-мышечная система развита нормально, искривлений позвоночника нет, укорочений конечностей нет, анкилозов тазобедренных и коленных суставов не выявлено. Конституция нормостеническая.\n" +
            "Мочеиспускание нормальное 4-5 раз в день, 2 раза ночью, безболезненное, свободное. Стул в норме.\n" +
            "Живот мягкий, безболезненный при пальпации.\n" +
            "Матка в обычном тонусе, безболезненная при пальпации, не возбудима.\n" +
            "Положение плода продольное, предлежит головка плода, подвижна над входом в малый таз.\n" +
            "Сердцебиение плода ясное, ритмичное, 135 уд/мин.\n" +
            "Патологических выделений из половых путей нет.\n" +
            "Отеков нет.\n",
        docResearch: "Наружные половые органы развиты правильно\n" +
            "Область ануса и промежности не воспалены, не изменены.\n" +
            "P.S.: слизистая оболочка влагалища чистая, розовая; слизистая влагалищной части шейки матки чистая, розовая, с эктопией. Выделения: слизистые, сукровичные, кровянистые (скудные,умеренные, обильные). Menses, гноевидные, пенистые, творожистые, бели, с запахом, без запаха.\n" +
            "P.V.: шейка матки: конич, цилиндр формы, наружный зев: закрыт. Тело матки: AFV, по средней линии. Размеры: не увеличена, увеличена до    недель; Контуры ровные, бугристое. Консистенция: плотная, мягкая. Подвижность: нормальная, ограничена, безболезненная при пальпации. Придатки матки: правые - нормальных размеров, безболезненные при пальпации, левые - нормальных размеров, безболезенные при пальпации. Своды: свободные, глубокие. Параметрии не инфильтрированы. Смещение шейки матки безболезненно. Инфильтратов в малом тазу нет.\n",
        additional: "",
        diagnosis: {
          weeks: "",
          dropdowns: {
            rubec: "0",
            hemodynamics: "0",
            gsd: "0"
          },
          checkboxes: [
            {
              id: 0,
              boxes: [
                {id: 1, label: "Рвота берем", value: false},
                {id: 2, label: "Угроза прерывания беременности", value: false},
                {id: 3, label: "Угрожающие преждевременные роды", value: false},
                {id: 4, label: "Отеки беременных", value: false},
                {id: 5, label: "Гестационная АГ", value: false},
                {id: 6, label: "Умеренная преэклампсия", value: false},
                {id: 7, label: "Низкая плацентация", value: false},
                {id: 8, label: "Предлежание плаценты", value: false},
                {id: 9, label: "Децидуальный полип", value: false},
                {id: 10, label: "Гипергомоцистеинемия", value: false}, //DV / EB ?
                {id: 11, label: "Анемия беременных", value: false},
                {id: 12, label: "Крупный плод", value: false},
                {id: 13, label: "ИЦН", value: false}, // DL. DN ? start
                {id: 14, label: "Установка РАП", value: false}
              ]
            },
            {
              id: 1,
              boxes: [
                {id: 15, label: "Шов на шейке матки", value: false}, // DL. DN ? end
                {id: 16, label: "Гестационный пиелонефрит", value: false},
                {id: 17, label: "ИМВП при беременности", value: false},
                {id: 19, label: "Гипотрофия плода", value: false},
                {id: 20, label: "Ангидрамнион", value: false},
                {id: 21, label: "Маловодие", value: false},
                {id: 22, label: "Многоводие", value: false},
                {id: 23, label: "Холестаз при беременности", value: false},
                {id: 24, label: "Гепатоз беременных", value: false},
                {id: 25, label: "Тазовое предлежание", value: false},
                {id: 26, label: "Поперечное пол", value: false},
                {id: 27, label: "Симфизиопатия", value: false},
                {id: 28, label: "УЗ-маркры ХПП", value: false}
              ]
            },
            {
              id: 2,
              boxes: [
                {id: 29, label: "Б/х маркеры ХПП", value: false},
                {id: 30, label: "Узкий таз", value: false},
                {id: 31, label: "Rh(-) без АТ", value: false},
                {id: 33, label: "ДДЗП с грыжеобразованием", value: false},
                {id: 34, label: "ОГА", value: false},
                {id: 35, label: "Привычное невынашивание", value: false},
                {id: 36, label: "Кольпит", value: false},
                {id: 37, label: "Планирование беременности", value: false},
                {id: 38, label: "Планирование протокола ЭКО", value: false}
              ]
            }
          ]
        },
        recommended: {
          text: "",
          checkboxes: [
            {id: 1, label: "Компрессионный трикотаж I класса компрессии (Medi Step) — носить ежедневно!!!", value: false},
            {id: 2, label: "Водный режим (2000-2500 мл в день)!!!", value: false},
            {id: 3, label: "Осмотр эндокринолога в ближайшее время", value: false},
            {id: 4, label: "Осмотр терапевта, кардиолога, ЛОР", value: false},
            {id: 5, label: "Коленно-локтевое положение 15-20 минут 3-4 раза в день", value: false},
            {id: 6, label: "Фемибион-I + метафолин 800 + Витамин Д 5000 МЕ - ежедневно", value: false},
            {id: 7, label: "Клексан 0,4 п/к (флюксум 0,4 / фрагмин 5000 Ед / цибор 5000 Ед / фраксипарин 0,4) – продолжить", value: false},
            {id: 8, label: "Канефрон 2 т х 3 раза до родов", value: false},
            {id: 9, label: "Галакси 1 т х 3 раза + свечи с папаверином ректально 2-3 раза в день — при болях, либо при нагрузке", value: false},
            {id: 10, label: "Утрожестан 200 мг х 3 раза (утро + день - перорально, на ночь — вагинально) длительно!!!", value: false},
            {id: 11, label: "Магнелис В6 форте 1 х 2-3 раза в день – в постоянном режиме", value: false},
            {id: 12, label: "Допегит 250 мг х 3 раза в день + контроль АД х 3 раза + ведение дневника АД!!!", value: false},
            {id: 13, label: "Учитывая наличие патогенной микрофлоры в посевах мочи и ц/канала, а также наличия сахарного диабета беременных на инсулинотерапии – рекомендовано начать курс антибактериальной терапии (с учетом чувствительности микрофлоры) - Амоксиклав (875 мг + 125 мг) по 1 т х 2 раза 7 дней + Линекс 1 к х 3 раза 14 дней + Эссенциале форте 1 х 3 раза 10-14 дней Свечи Нео-пенотран форте вагинально на ночь по 1 свече 7 дней, далее – Лактожиналь вагинально на ночь 14 дней", value: false},
            {id: 14, label: "На данном этапе показано проведение 2 курса внутривенных иммуноглобулинов – Октагам 5% - 100 в/в капельно медленно №3 с интервалом 3 дня (Интратект / Привиджен / Иммуновенин), либо курса плазмафереза", value: false},
            {id: 15, label: "УЗИ плода + ранний допплер в 16 недель", value: false},
            {id: 16, label: "Расширенная коагулограмма (ПТИ, ФГ, АПТВ, ТВ, МНО, АТ III), Д-димер, гомоцистеин, волчаночный антикоагулянт (скрининг+подтверждение), клинический анализ крови, ферритин – через 2 недели", value: false},
            {id: 17, label: "Кровь на гены наследственной тромбофилии (12 генов)", value: false},
            {id: 18, label: "Кровь на АТ: к β2-гликопротеину, кардиолипину, аннексину V, ХГЧ, протромбину, фосфатидилсерину, фосфатидиловой кислоте, фосфатидилинозитолу, 2 спиральной ДНК, антинуклеарный фактор", value: false},
            {id: 19, label: "Кровь на субпопуляцию лимфоцитов", value: false},
            {id: 20, label: "Биопсия эндометрия с выполнением ИГХ (19-21 д.м.ц., забор материала в НИИ АГиР им. Д.О. Отта, запись на прием к врачам отделения оперативной гинекологии)", value: false},
            {id: 21, label: "Посев мочи + посев из ц/канала – через неделю после окончания антибактериальной терапии", value: false},
            {id: 22, label: "Посев из носа, посев из зева", value: false},
            {id: 23, label: "Консультация Цыпурдеевой Анны Алексеевны – НИИ АГиР им. Д.О. Отта (обсуждение вопроса о наложении серкляжа лапароскопическим методом)", value: false},
            {id: 24, label: "Допплер сосудов нижних конечностей — Порембская Ольга Ярославовна (+7 921 310 66 29)", value: false},
            {id: 25, label: "Омега-3 800-1000 мг ежедневно", value: false},
            {id: 26, label: "Утрожестан 200 мг с 16 по 25 день менструального цикла до момента наступления беременности, при наступлении беременности – по 200 мг х 3 раза (не отменять гормональную поддержку)", value: false},
            {id: 27, label: "Перед планированием беременности показано проведение плазмафереза", value: false},
            {id: 28, label: "В плане: с 1 дня протокола ЭКО – тромбо-Асс 100 мг + клексан 0,4 п/к ежедневно, кроме дня пункции", value: false},
            {id: 29, label: "Прогинова 1 т х 3 раза , если не будет дополнительных жалоб, то с 01.02.23 - постепенная отмена - по 1/4 1 раз в 3 дня", value: false},
            {id: 30, label: "Госпитализация во II ДО (явка с копиями паспорта, полиса СНИЛС)", value: false},
            {id: 31, label: "Осмотр с результатами", value: false},
          ]
        },
        birth: []
      },
      selections: {
        analyzes_1: -1,
        analyzes_2: -1,
        analyzes_3: -1,
        crops: -1,
        birth: -1
      }
    }
  }
}
</script>