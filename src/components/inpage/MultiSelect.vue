<template>
  <button @click="showSelect = !showSelect" class="placeholder" :style="selected.length > 0 && !showSelect ? `color: black; opacity: 1` : ``">
    {{ !showSelect ? (selected.length > 0 ? selected.map(el => el.name).join(", ") : 'Выбрать') : 'Выберите' }}
  </button>
  <template v-if="showSelect">
    <input class="search animate__animated animate__fadeInDownBig" type="text" placeholder="Поиск" v-model="search">
    <div class="select">
      <div class="option" :class="{'selected': option.selected}" @click="select(option)" v-for="option in options" :key="pid*1000+option.value">
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
    pid: Number
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
      option.selected = !option.selected;
      if(option.selected)
        this.selected.push(option);
      this.selected = this.selected.filter(el => el.selected && el.name !== option.selected.name);
      for(let el of this.input)
        if(el.name === option.name)
          el.selected = option.selected;
    },
    updateSelected(data) {
      for(let i of data) {
        if(i.selected) {
          this.selected.push(i);
        }
      }
    }
  },
  computed: {
    options() {
      return this.input.filter(el => el.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
    }
  },
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