<template>
  <div class="container-fluid notification-body animate__animated animate__slideInDown">
    <div class="container notification-box animation__animate animate__slideInDown">
      <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="`width: ${value}%`"></div>
      </div>
      <h5 class="notification-heading">{{ text }}</h5>
    </div>
  </div>
</template>

<script>
import {methods} from "@/utils/methods";

export default {
  data() {
    return {
      value: 100,
      timeout: null,
    }
  },
  name: "NotificationProgress",
  props: ['text'],
  methods: {
    run() {
      this.value -= 5;
      if(this.value <= 0) {
        this.timeout = setTimeout(()=>{
          this.$.appContext.app.unmount();
          methods.clearNotification();
        },400);
      } else {
        this.timeout = setTimeout(this.run, 100);
      }
    },
    forceQuit() {
      clearTimeout(this.timeout);
      this.$.appContext.app.unmount();
      methods.clearNotification();
    }
  },
  mounted() {
    this.run()
  }
}
</script>

<style scoped>
.notification-heading {
  margin-top: 2rem;
}
.progress {
  width: 90%;
  border-radius: 10px;
}
.progress-bar {
  width: 0;
  border-radius: 10px;
}
.container.notification-box {
  background: white;
  box-shadow: 0px 6px 20px 6px rgb(61 61 61 / 10%);
  min-height: 6rem;
  max-height: 6rem;
  max-width: 30vw;
  margin-bottom: 2rem;
  border-radius: 15px;
  padding-left: 0;
  padding-right: 0;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 0.04rem;
  border: 1px solid rgba(0, 163, 255, 0.16);
}
.container-fluid.notification-body {
  display: flex;
  width: 30vw;
  padding: 0;
  margin: 0;
  height: auto;
  top: 0;
  left: calc(50% - 15vw);
  border-radius: 0;
  border: 0;
  box-shadow: none;
  max-height: 100%;
  overflow-y: hidden;
  position: absolute;
  background: transparent;
  z-index: 999999;
}

</style>