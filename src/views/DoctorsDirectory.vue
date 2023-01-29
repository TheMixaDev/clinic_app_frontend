<template>
  <div className="container-fluid">
    <div className="row header">
      <div className="col">
        <h1 className="heading">
          <router-link className="btn back btn-primary second-add" to="/new-appointment"><i
              className="fa-solid fa-arrow-left"></i>
          </router-link>
          Справочник врачей
        </h1>
      </div>
      <div className="col">
        <div className="container table-container">
          <div className="input-group">
            <button type="button" className="btn btn-primary search-button">
              <i className="fas fa-search"></i>
            </button>
            <div className="form-outline">
              <input type="search" id="form1" className="form-control"/>
              <label className="form-label" htmlFor="form1">Поиск</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container main-part">
      <table className="table align-middle mb-0 table-hover table-striped table-bordered bg-white">
        <thead className="bg-light">
        <tr>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Дата рождения</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">Иванова</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">Ивана</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">Ивановна</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">13.02.2023</p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">Иванова</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">Ивана</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">Ивановна</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">13.02.2023</p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">Иванова</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">Ивана</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">Ивановна</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">13.02.2023</p>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div className="container buttons-container">
      <div className="col row-buttons">
        <router-link className="btn btn-primary first-add" to="/new-doctor"><i
            className="fa-solid fa-plus button-icon"></i>Новый
        </router-link>
        <router-link className="btn btn-primary second-add" to="/new-appointment">Выбрать
        </router-link>
      </div>
    </div>
  </div>
</template>
<style>
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
  background: transparent !important;
  color: black;
  border: none !important;
  font-size: 1rem;
  box-shadow: none;
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

.date {
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