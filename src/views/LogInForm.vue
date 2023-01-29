<template>
  <div class="container-fluid">
    <img class="logo" src="../assets/logo.svg"/>
    <h1>Система управления</h1>
    <div class="container form">
      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">Адрес электронной почты</label>
        <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Пароль</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
<!--      <button type="submit" class="btn btn-primary">Войти</button>-->
      <router-link class="btn btn-primary" to="/appointments">Войти</router-link>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  background: #FAFAFA;
  width: 40vw;
  height: 30vw;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  box-shadow: 0px 16px 47px 16px rgb(61 61 61 / 10%);
  align-items: center;
  justify-content: center;
}
.form {
  width: 15vw;
}
.btn {
  background: linear-gradient(94.83deg, #00A3FF 1.33%, #00C2FF 100%);
  border: 2px solid rgba(0, 117, 255, 0.3);
  border-radius: 9px;
  padding-left: 2rem;
  padding-right: 2rem;
}
.form-label {
  text-align: left;
}
.form-control {
  text-align: center;
}
</style>

<script>
export default {
  name: 'LogInForm',
  components: {
  }
}
</script>
