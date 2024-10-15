<script setup lang="ts">

import {onMounted, ref} from "vue";

const dropdowns = {
  originalLanguage: ['원어', '영어'],
  translationLanguage: ['영어', '한국어'],
  sorting: ['추천 컨텐츠', '출시일순', '오름차순(ㄱ~Z)', '내림차순(Z~ㄱ)']
};

const selectedOptions = {
  originalLanguage: '원어',
  translationLanguage: '영어',
  sorting: '추천 컨텐츠'
};

const activeDropdown = ref(null);

const toggleDropdown = (key) => {
  this.activeDropdown = activeDropdown === key ? null : key;
};

const selectOption = (key, option) => {
  console.log(key, option);
  selectedOptions[key] = option;
  activeDropdown.value = null;
};

const closeAllSelect = () => {
  this.activeDropdown = null;
};

onMounted(() => {
  window.addEventListener('click', closeAllSelect);
});

</script>

<template>
  <div class="dropdown-container">
    <label>선호하는 설정을 선택하세요</label>
    <div v-for="(options, key) in dropdowns" :key="key" class="custom-select">
      <div class="select-selected" @click="toggleDropdown(key)">
        {{ selectedOptions[key] }}
      </div>
      <div
          v-show="activeDropdown === key"
          class="select-items"
      >
        <div v-for="option in options" :key="option" @click="selectOption(key, option)">
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.dropdown-container {
  margin-top: 50px;
  display: flex;
  align-items: center;
  gap: 15px;
}
.custom-select {
  min-width: 120px;
  position: relative;
  display: inline-block;
}
.select-selected {
  background-color: black;
  color: white;
  padding: 10px;
  border: 1px solid #fff;
  font-size: 16px;
  cursor: pointer;
}
.select-items {
  display: block;
  position: absolute;
  background-color: #333;
  border: 1px solid #fff;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}
.select-items div {
  color: white;
  padding: 10px;
  cursor: pointer;
}
.select-items div:hover {
  background-color: #575757;
}
.select-arrow-active:after {
  content: "\25B2";
  position: absolute;
  right: 10px;
  top: 14px;
}
.select-selected:after {
  content: "\25BC";
  position: absolute;
  right: 10px;
  top: 14px;
}
.select-selected.select-arrow-active:after {
  content: "\25B2";
}
</style>
