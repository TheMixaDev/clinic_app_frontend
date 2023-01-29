<template>
  <router-view/>
</template>

<style>
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body, html {
  background-image: url("../src/assets/bg.png");
  background-size: cover;
  background-attachment: fixed;
  width: 100vw;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>