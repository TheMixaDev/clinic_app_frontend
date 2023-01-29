<template>
  <button @click="showSelect = !showSelect" class="placeholder">
    {{ !showSelect ? 'Выбрать' : 'Выберите' }}
  </button>
  <template v-if="showSelect">
    <input class="search animate__animated animate__fadeInDownBig" type="text" placeholder="Поиск" v-model="search">
    <div class="select">
      <div class="option" :class="{'selected': option.selected}" @click="select(option)" v-for="option in options" :key="Date.now()+option.value">
        {{ option.name }}
      </div>
    </div>
  </template>
</template>

<script>
export default {
  name: "MultiSelect",
  props: {
    input: Array,
  },
  data() {
    return {
      search: "",
      selected: [],
      showSelect: false,
    }
  },
  methods: {
    select(option) {
      if (option.selected) {
        option.selected = false;
        let i = 0;
        let index = null;
        this.selected.forEach(el => {
          if (el.value == option.value) {
            index = i;
          }
          i++;
        })
        if (index)
          this.selected.splice(index, 1);
      } else {
        option.selected = true;
        this.selected.push(option);
      }
    }
  },
  computed: {
    options() {
      return this.input.filter(el => el.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
    }
  }
}
</script>

<style scoped>
.select {
  position: fixed;
  background: white;
  border-radius: 9px;
  overflow-y: scroll;
  max-height: 30vh;
  opacity: 100%;
  z-index: 9999;
  padding: 1rem;
  border: 1px solid rgba(0, 163, 255, 0.3)!important;
}
.option {
  cursor: pointer;
}
.selected {
  color: #2e90ff;
}
.placeholder {
  padding: 0.3rem!important;
  background: #F5F9FF!important;
  border: 1px solid rgba(0, 163, 255, 0.3)!important;
  border-radius: 9px!important;
  color: #7e7e7e;
  width: 21rem;
}
.search {
  padding: 0.3rem;
  max-width: 21rem;
  border: none;
  background: transparent;
}
.search:focus-visible {
  padding: 0.3rem;
  max-width: 21rem;
  background: transparent;
  border: 1px solid rgba(0, 117, 255, 0.3)!important;
}


</style>