<template>
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
          <input type="text" id="name" class="form-control name-tag" placeholder="Выберите пациента из Справочника" @click="router().push({name: 'patients-directory'})" readonly v-bind:value="patient.id !== -1 ? patient.surname + ' ' + patient.name + ' ' + patient.patronymic : ''">
        </div>
        <div class="col date-wrapper">
          <h6 class="patient-name">Дата рождения</h6>
          <input class="date" type="date" v-bind:value="patient.birthdate" disabled>
        </div>
        <div class="col doc-wrapper">
          <h6 class="patient-name">Врач</h6>
          <input type="text" id="name" class="form-control" placeholder="Выберите врача из Справочника" disabled v-bind:value="doctorName">
          <router-link class="btn btn-primary" to="/doctors-directory">Справочник врачей(удалить)</router-link>
        </div>
        <div class="col date-wrapper">
          <h6 class="patient-name">Дата приёма</h6>
          <input class="date" type="date">
        </div>
      </div>
      <div class="container-fluid detailed-info">
        <div class="row row-wrapper">
          <div class="col weight-wrapper">
            <h6 class="patient-name">Вес</h6>
            <input type="text" id="name" class="form-control" placeholder="Введите вес">
          </div>
          <div class="col height-wrapper">
            <h6 class="patient-name">Рост</h6>
            <input type="text" id="name" class="form-control" placeholder="Введите рост">
          </div>
          <div class="col imt-wrapper">
            <h6 class="patient-name">ИМТ</h6>
            <input type="text" id="name" class="form-control" placeholder="Введите ИМТ (?Считается автоматом?)">
          </div>
          <div class="col date-wrapper">
            <h6 class="patient-name">Дата последних месячных</h6>
            <input class="date" type="date">
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Операции, травмы</h6>
            <MultiSelect :input="options"></MultiSelect>
          </div>
        </div>
        <div class="row row-wrapper">
          <div class="col select-wrapper">
          <h6 class="patient-name">Перенесенные заболевания</h6>
            <MultiSelect :input="options2"></MultiSelect>
        </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Туберкулез, венерические заболевания, гепатиты</h6>
            <MultiSelect :input="options3"></MultiSelect>
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Аллергические реакции</h6>
            <MultiSelect :input="options4"></MultiSelect>
          </div>

        </div>
        <div class="row row-wrapper">
          <div class="col select-wrapper">
            <h6 class="patient-name">Гемотрансфузии</h6>
            <MultiSelect :input="options5"></MultiSelect>
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Наследственность</h6>
            <MultiSelect :input="options6"></MultiSelect>
          </div>
          <div class="col select-wrapper">
            <h6 class="patient-name">Обследование на наследственную тромбофилию</h6>
            <MultiSelect :input="options7"></MultiSelect>
          </div>

        </div>
      </div>
      <div class="container-fluid anamnesis">
        <h4>Гинекологический анамнез</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4">Menses с 15 лет по 5 дней через 28 дней, регулярные, безболезненные, умеренные. Половая жизнь с 22 лет.
Гинекологические заболевания: BQ-BU, полип эндометрия, 30.11.21 - г/скопия, раздельное диагностическое выскабливание. Эрозия шейки матки, лазерная вапоризация в 2020 г.
Беременности:
    I. 2003 г. – срочные роды, мальчик 3380/54, течение беременности и родов без осложнений. Ребенок Rh(+), в послеродовом периоде сохранялась желтуха в течение 8 дней, заменное переливание крови не проводилось. Анти-D-иммуноглобулин не вводился.
    II. 2004 г. – искусственный аборт раннего срока. Анти-D-иммуноглобулин не вводился.
    III. 2016 г — неразвивающаяся беременность 7 недель, abrasio c.u.
    IV. 2018 г.  — преждевременные роды в 30 недель, антенатальная гибель плода в 30 недель, 1400 гр, 43 см.
    V. 2019 г. – экстренное кесарево сечение (непрерывные шевеления плода на фоне высоких доз инсулинотерапии ГСД) в 36/37 недель. При беременности получила 1 курс ВВИГ в 12 недель, 2 курс Октагам + иммуновенин в 23/24 недели. НМГ, метипред. По гистологии – гнойный децидуит.
    VI. 2020 г. – медикаментозный аборт
    VII. Настоящая</textarea>
          <label class="form-label" for="textAreaExample"></label>
        </div>
      </div>
      <div class="container-fluid analyzes">
        <h4>Анализы</h4>
        <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
        <thead class="bg-light">
        <tr class="table-first-row">
          <th></th>
          <th>2018</th>
          <th>07.03.22(I)</th>
          <th>28.06.22(II)</th>
          <th>06.08.22(III)</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Протромбиновый индекс</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">МНО</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Фибриноген</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">АПТВ</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Тромбиновое время</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Антитромбин III</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Тест на LA</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Д-димер</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Гомоцистеин</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Протеин C</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1">Протеин S</p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <div class="ms-3">
                <p class="fw-bold mb-1"></p>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

        <div class="row col-buttons">
          <a class="btn btn-primary first-add" href="#"><i class="fa-solid fa-plus button-icon"></i>Добавить</a>
          <a class="btn btn-primary edit" href="#"><i class="fa-solid fa-pen button-icon"></i>Редактировать</a>
          <a class="btn btn-primary delete" href="#"><i class="fa-solid fa-trash button-icon"></i>Удалить</a>
        </div>
        <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
          <thead class="bg-light">
          <tr class="table-first-row">
            <th></th>
            <th>2018</th>
            <th>07.03.22(I)</th>
            <th>28.06.22(II)</th>
            <th>06.08.22(III)</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">АТ к β2-гликопротеину</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">АТ к кардиолипину</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">АТ к аннексину V</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">АТ к ХГЧ</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">АТ к протромбину</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">АТ к фосфатидилсерину</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">АТ к фосфатидил к-те</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">АТ к фосфатидилинозитолу</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">Антинуклеарный фактор</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">АТ к 2сп ДНК</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="row col-buttons">
          <a class="btn btn-primary first-add" href="#"><i class="fa-solid fa-plus button-icon"></i>Добавить</a>
          <a class="btn btn-primary edit" href="#"><i class="fa-solid fa-pen button-icon"></i>Редактировать</a>
          <a class="btn btn-primary delete" href="#"><i class="fa-solid fa-trash button-icon"></i>Удалить</a>
        </div>
        <table class="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
          <thead class="bg-light">
          <tr class="table-first-row">
            <th></th>
            <th>2018</th>
            <th>07.03.22(I)</th>
            <th>28.06.22(II)</th>
            <th>06.08.22(III)</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">Lei</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">Hb</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">Ht</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">Tr</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">Ферритин</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1">ТТГ</p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="row col-buttons">
          <a class="btn btn-primary first-add" href="#"><i class="fa-solid fa-plus button-icon"></i>Добавить</a>
          <a class="btn btn-primary edit" href="#"><i class="fa-solid fa-pen button-icon"></i>Редактировать</a>
          <a class="btn btn-primary delete" href="#"><i class="fa-solid fa-trash button-icon"></i>Удалить</a>
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
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="row col-buttons">
          <a class="btn btn-primary first-add" href="#"><i class="fa-solid fa-plus button-icon"></i>Добавить</a>
          <a class="btn btn-primary edit" href="#"><i class="fa-solid fa-pen button-icon"></i>Редактировать</a>
          <a class="btn btn-primary delete" href="#"><i class="fa-solid fa-trash button-icon"></i>Удалить</a>
        </div>
      </div>
      <div class="container-fluid uzi">
        <h4>УЗИ</h4>
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link var1 active" id="nav-var1-tab" data-bs-toggle="tab" data-bs-target="#nav-var1" type="button" role="tab" aria-controls="nav-var2" aria-selected="true">Вариант 1</button>
            <button class="nav-link var2" id="nav-var2-tab" data-bs-toggle="tab" data-bs-target="#nav-var2" type="button" role="tab" aria-controls="nav-var2" aria-selected="false">Вариант 2</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-var1" role="tabpanel" aria-labelledby="nav-var1-tab">
            <div class="row">
              <div class="col">
                <textarea class="form-control" id="textAreaExample1" rows="4">Дата В полости матки один живой плод, соответствует 13 3/7 недель. КТР 68 мм. ТВП 1,7 мм. НК +. PI DV 0,9, PI ПМА — 0,99, PI ЛМА — 1,25. Хорион по задней стенке, высоко, ц/канал 40 мм. Ретрохориальная гематома по задней стенке 15х20 мм.</textarea>
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
                    <a class="btn btn-primary attach" href="#"><i class="fa-solid fa-plus button-icon"></i>Прикрепить</a>
                    <a class="download" href="#"><i class="fa-solid fa-download"></i> Скачать</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-var2" role="tabpanel" aria-labelledby="nav-var2-tab">
            <div class="row">
              <div class="col">
                <textarea class="form-control" id="textAreaExample1" rows="4">Дата В полости матки один живой плод, соответствует 32 4/7 недель, ПМП 2050, о/воды в умеренном количестве, АИ 156 мм. Плацента по задней стенке, высоко. Ц/канал 38 мм.</textarea>
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
                    <a class="btn btn-primary attach" href="#"><i class="fa-solid fa-plus button-icon"></i>Прикрепить</a>
                    <a class="download" href="#"><i class="fa-solid fa-download"></i> Скачать</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid doppler">
        <h4>Допплер</h4>
        <input class="date" type="date">
          <select class="form-select" aria-label="Выбрать">
            <option value="0">Не выявлены</option>
            <option value="1">I степени</option>
            <option value="2">II степени</option>
            <option value="3">III степени</option>
          </select>
      </div>
      <div class="container-fluid pregnacy">
        <h4>Течение настоящей беременнности</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4">На учете в ЖК с 8 недель. ОПВ +12 кг.
Динамика АД: 120/70 – 110/80 – 110/60 мм.рт.ст.
Анализ мочи – без патологических изменений.</textarea>
        </div>
      </div>
      <div class="container-fluid hospital">
        <h4>Госпитализации</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4"></textarea>
        </div>
      </div>
      <div class="container-fluid research">
        <h4>Объективное исследование</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4">Общее состояние удовлетворительное.
Пульс – 70 уд/мин, АД – 105/60 мм рт. ст. на обеих руках, ЧД – 16 в мин.
Рост – 152 см, Вес тела – 61,5 кг (47 кг – до беременности). Телосложение правильное.
Кожные покровы, слизистые нормальной окраски, нормальной влажности. Тургор, эластичность кожи соответствуют возрасту.
Костно-мышечная система развита нормально, искривлений позвоночника нет, укорочений конечностей нет, анкилозов тазобедренных и коленных суставов не выявлено. Конституция нормостеническая.
Мочеиспускание нормальное 4-5 раз в день, 2 раза ночью, безболезненное, свободное. Стул в норме.
Живот мягкий, безболезненный при пальпации.
Матка в обычном тонусе, безболезненная при пальпации, не возбудима.
Положение плода продольное, предлежит головка плода, подвижна над входом в малый таз.
Сердцебиение плода ясное, ритмичное, 135 уд/мин.
Патологических выделений из половых путей нет.
Отеков нет.</textarea>
        </div>
      </div>
      <div class="container-fluid docresearch">
        <h4>Гинекологический осмотр</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4">Наружные половые органы развиты правильно
Область ануса и промежности не воспалены, не изменены.
P.S.: слизистая оболочка влагалища чистая, розовая; слизистая влагалищной части шейки матки чистая, розовая, с эктопией. Выделения: слизистые, сукровичные, кровянистые (скудные,умеренные, обильные). Menses, гноевидные, пенистые, творожистые, бели, с запахом, без запаха.
P.V.: шейка матки: конич, цилиндр формы, наружный зев: закрыт. Тело матки: AFV, по средней линии. Размеры: не увеличена, увеличена до недель; Контуры ровные, бугристое. Консистенция: плотная, мягкая. Подвижность: нормальная, ограничена, безболезненная при пальпации. Придатки матки: правые - нормальных размеров, безболезненные при пальпации, левые - нормальных размеров, безболезенные при пальпации. Своды: свободные, глубокие. Параметрии не инфильтрированы. Смещение шейки матки безболезненно. Инфильтратов в малом тазу нет.
</textarea>
        </div>
      </div>
      <div class="container-fluid additional">
        <h4>Дополнительная информация</h4>
        <div class="form-outline">
          <textarea class="form-control anamnesis-text" id="textAreaExample1" rows="4">
</textarea>
        </div>
      </div>
      <div class="container-fluid diagnosis">
        <h5>Диагноз</h5>
        <div class="container-fluid pregnacy-checks">
          <h6>Беременность</h6>
          <textarea class="form-outline form-control pregnacy-text" id="textAreaExample1" rows="4"></textarea>
          <h6>недель</h6>
        </div>
        <div class="container-fluid diagnosis-checks">
          <div class="row">
            <div class="col checkbox-col">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Рвота берем</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Угроза прерывания беременности</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Угрожающие преждевременные роды</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Отеки беременных</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Гестационная АГ</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Умеренная преэклампсия</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Низкая плацентация</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Предлежание плаценты</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Децидуальный полип</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Рубец на матке</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Гипергомоцистеинемия / Анемия беременных</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Крупный плод</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ИЦН</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Установка РАП</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Шов на шейке матки</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Гестационный пиелонефрит</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ИМВП при беременности</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ХПН</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Нарушения гемодинамики</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Гипотрофия плода</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Ангидрамнион</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Маловодие</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Многоводие</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ГСД</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Холестаз при беременности</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Гепатоз беременных</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Тазовое предлежание</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Поперечное пол</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Симфизиопатия</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">УЗ-маркры ХПП</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Б/х маркеры ХПП</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Узкий таз</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Rh(-) без АТ</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Наследственная тромбофилия</label>
              </div>
            </div>
            <div class="col checkbox-col">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">FV</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">FII</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">АФС </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Носительство LA</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Гипергомоцистеинемия</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Хронический тонзиллит</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Хронический пиелонефрит</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Хронический цистит</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">МКБ</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Единственная почка</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Удвоение почки</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Хроническая АГ</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Варикозная болезнь</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Тромбоз в анамнезе</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Флебэктомия в анамнезе</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">АИТ. Эутиреоз</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Субклинический гипотиреоз (ЗГТ)</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Узловой зоб</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Тиреотоксикоз</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Гемиструмэктомия в анамнезе</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ФАМ молочных желёз</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Секторальная резекция молочной железы</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Заболевания глаз</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Лазерная коррекция зрения в анамнезее</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Ожирение</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Сахарный диабет</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Хроническая никотиновая интоксикация</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ДЖВП</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ЖКБ</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Холецистэктомия в анамнезе</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Нейросенсорная тугоухость</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Лекарственная аллергия</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Бронхиальная астма</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ТИА в анамнезе</label>
              </div>
            </div>
            <div class="col checkbox-col">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ТЭЛА в анамнезе</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Мигрень</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Спленэктомия в анамнезе</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Хронический гепатит</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Tbc в анамнезе</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Lues в анамнезе</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Узловая эритема</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Атопический дерматит</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Болезнь Виллебранда</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Пролапс МК</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Аномалия сосудов ГМ</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Очаг.образ.печени</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Хронический гастрит</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">НЯК</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Хронический геморрой</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Оперативное лечение хронического геморроя</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ДДЗП с грыжеобразованием</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ОГА</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Привычное невынашивание</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Кольпит</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ОАГА ST I</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ОАГА ST II</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ОАГА ST III</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ОАГА IV — Ca incitu</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ОАГА V — рубцовая деформация ш/м</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ОАГА VI — дермоидные кисты яичников</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ОАГА VII — НГЭ III, комбинированное лечение</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ОАГА VIII — НГЭ II</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Антенатальная гибель плода при сроке 30 недель</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Неразвивающаяся беременность 7 недель</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">Преждевременные роды – эстренное кесарево сечение</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ХПН</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label class="form-check-label" for="inlineCheckbox2">ГСД на инсулинотерапии</label>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="container-fluid recomendations">
        <h4>Рекомендации</h4>
        <div class="form-outline">
          <textarea class="form-control recomendations-text" id="textAreaExample1" rows="4">
</textarea>
          <div class="container-fluid recomendations-list">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Компрессионный трикотаж I класса компрессии (Medi Step) — носить ежедневно!!!</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Водный режим (2000-2500 мл в день)!!!</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Осмотр эндокринолога в ближайшее время</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Осмотр терапевта, кардиолога, ЛОР</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Коленно-локтевое положение 15-20 минут 3-4 раза в день</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Фемибион-I + метафолин 800 + Витамин Д 5000 МЕ - ежедневно</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Клексан 0,4 п/к (флюксум 0,4 / фрагмин 5000 Ед / цибор 5000 Ед / фраксипарин 0,4) – продолжить</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Канефрон 2 т х 3 раза до родов</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Галакси 1 т х 3 раза + свечи с папаверином ректально 2-3 раза в день — при болях, либо при нагрузке</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Утрожестан 200 мг х 3 раза (утро + день - перорально, на ночь — вагинально) длительно!!!</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Магнелис В6 форте 1 х 2-3 раза в день – в постоянном режиме</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Допегит 250 мг х 3 раза в день + контроль АД х 3 раза + ведение дневника АД!!!</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Учитывая наличие патогенной микрофлоры в посевах мочи и ц/канала, а также наличия сахарного диабета беременных на инсулинотерапии – рекомендовано начать курс антибактериальной терапии (с учетом чувствительности микрофлоры) - Амоксиклав (875 мг + 125 мг) по 1 т х 2 раза 7 дней   + Линекс 1 к х 3 раза 14 дней + Эссенциале форте 1 х 3 раза 10-14 дней
                Свечи Нео-пенотран форте вагинально на ночь по 1 свече 7 дней, далее – Лактожиналь вагинально на ночь 14 дней</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">На данном этапе показано проведение 2 курса внутривенных иммуноглобулинов – Октагам 5% - 100 в/в капельно медленно №3 с интервалом 3 дня (Интратект / Привиджен / Иммуновенин), либо курса плазмафереза</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">УЗИ плода + ранний допплер в 16 недель</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Расширенная коагулограмма (ПТИ, ФГ, АПТВ, ТВ, МНО, АТ III), Д-димер, гомоцистеин, волчаночный антикоагулянт (скрининг+подтверждение), клинический анализ крови, ферритин – через 2 недели</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Кровь на гены наследственной тромбофилии (12 генов)</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">ровь на АТ: к β2-гликопротеину, кардиолипину, аннексину V, ХГЧ, протромбину, фосфатидилсерину, фосфатидиловой кислоте, фосфатидилинозитолу, 2 спиральной ДНК, антинуклеарный фактор</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Кровь на субпопуляцию лимфоцитов</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Биопсия эндометрия с выполнением ИГХ (19-21 д.м.ц., забор материала в НИИ АГиР им. Д.О. Отта, запись на прием к врачам отделения оперативной гинекологии)</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Посев мочи + посев из ц/канала – через неделю после окончания антибактериальной терапии</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Посев из носа, посев из зева</label>
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
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <p class="fw-bold mb-1"></p>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="row col-buttons">
          <a class="btn btn-primary first-add" href="#"><i class="fa-solid fa-plus button-icon"></i>Добавить</a>
          <a class="btn btn-primary edit" href="#"><i class="fa-solid fa-pen button-icon"></i>Редактировать</a>
          <a class="btn btn-primary delete" href="#"><i class="fa-solid fa-trash button-icon"></i>Удалить</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
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

import MultiSelect from "@/components/MultiSelect.vue";
import router from "@/router";
import {settings} from "@/utils/settings";
import {methods} from "@/utils/methods";

export default {
  name: "NewAppointment",
  methods: {
    router() {
      return router
    },
    preload() {
      if(settings.designMode)
        return;
      let meta = methods.getMeta();
      if(meta !== null) {
        if(meta.type === 0) {
          // TODO load appointment
        } else {
          this.patient = meta.data;
        }
      }
    }
  },
  components: {MultiSelect},
  data() {
    return {
      options: [
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
      ],
      patient: {
        id: -1,
        surname: "",
        name: "",
        patronymic: "",
        birthdate: ""
      },
      doctorName: methods.getDoctorName()
    }
  },
  beforeMount() {
    this.preload()
  }
}


</script>