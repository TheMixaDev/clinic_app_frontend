<template>
  <router-view/>
</template>

<style>
*::-webkit-scrollbar-track {
  width:7px;
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
    max-height: 70vh;
}
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