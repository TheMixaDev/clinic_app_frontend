<template>
  <div class="container-fluid notification-body">
    <div class="container notification-box animation__animate animate__slideInDown">
      <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <h5 class="notification-heading">{{ text }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 100
    }
  },
  name: "NotificationProgress",
  props: ['text'],
  methods: {
    run() {
      this.value--;
      if(this.value == 0) {
        this.$.appContext.app.unmount();
      } else {
        setTimeout(this.run, 99999);
      }
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
  width: auto;
  border-radius: 10px;
}
.progress-bar {
  width: 100%;
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
  width: 100%;
  padding: 0;
  margin: 0;
  height: auto;
  top: 0;
  left: 0;
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