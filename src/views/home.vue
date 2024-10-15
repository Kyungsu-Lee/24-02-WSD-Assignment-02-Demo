<template>
  <div id="container">
    <header class="app-header">
      <div class="header-left">
        <nav class="nav-links">
          <ul>
            <li><a href="#">홈</a></li>
            <li><a href="#">대세 콘텐츠</a></li>
            <li><a href="#">내가 찜한 리스트</a></li>
            <li><a href="#">찾아보기</a></li>
          </ul>
        </nav>
      </div>
      <div class="header-right">
        <button class="icon-button">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
        <button class="icon-button" @click="removeKey">
          <font-awesome-icon :icon="['fas', 'user']" />
        </button>
      </div>
    </header>

    <nav>

    </nav>

<!--    <div class="dropdown-container">-->
<!--      <label>선호하는 설정을 선택하세요</label>-->
<!--      <div v-for="(options, key) in dropdowns" :key="key" class="custom-select">-->
<!--        <div class="select-selected" @click="toggleDropdown(key)">-->
<!--          {{ selectedOptions[key] }}-->
<!--        </div>-->
<!--        <div-->
<!--            v-show="activeDropdown === key"-->
<!--            class="select-items"-->
<!--        >-->
<!--          <div v-for="option in options" :key="option" @click="selectOption(key, option)">-->
<!--            {{ option }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <BannerComponent :movie="featuredMovie" />

    <movie-row title="인기 영화" :fetchUrl="popularMoviesUrl" />
    <movie-row title="최신 영화" :fetchUrl="newReleasesUrl" />
    <movie-row title="액션 영화" :fetchUrl="actionMoviesUrl" />
  </div>
</template>

<script>
import axios from 'axios';
import BannerComponent from "@/components/BannerComponent.vue";
import MovieRow from "@/components/MovieRow.vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSearch, faUser);

export default {
  name: 'Home',
  components: {
    BannerComponent,
    MovieRow,
    FontAwesomeIcon
  },
  data() {
    return {
      apiKey: localStorage.getItem('TMDb-Key') || '',
      featuredMovie: null,
      popularMoviesUrl: '',
      newReleasesUrl: '',
      actionMoviesUrl: '',
      dropdowns: {
        originalLanguage: ['원어', '영어'],
        translationLanguage: ['영어', '한국어'],
        sorting: ['추천 컨텐츠', '출시일순', '오름차순(ㄱ~Z)', '내림차순(Z~ㄱ)']
      },
      selectedOptions: {
        originalLanguage: '원어',
        translationLanguage: '영어',
        sorting: '추천 컨텐츠'
      },
      activeDropdown: null,
    };
  },
  created() {
    this.popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=ko-KR`;
    this.newReleasesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=ko-KR`;
    this.actionMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&with_genres=28&language=ko-KR`;
    this.fetchFeaturedMovie();
  },
  methods: {
    removeKey() {
      localStorage.removeItem('TMDb-Key');
      this.$router.push('/signin');
    },
    async fetchFeaturedMovie() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=ko-KR`);
        this.featuredMovie = response.data.results[0];
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      }
    },
    handleScroll() {
      const header = document.querySelector('.app-header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    },
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    selectOption(key, option) {
      console.log(key, option);
      this.selectedOptions[key] = option;
      this.activeDropdown = null;
    },
    closeAllSelect() {
      this.activeDropdown = null;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-select')) {
        this.closeAllSelect();
      }
    });

    setInterval(() => {
      console.log(this.activeDropdown);
    }, 1000);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #141414;
  color: white;
  overflow: auto !important;
  overflow-x: hidden;
}
#app {
  width: 95svw;
  overflow-x: hidden;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 4%;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.app-header:hover,
.app-header.scrolled {
  background-color: #141414;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.logo {
  height: 30px;
  margin-right: 25px;
}

.nav-links ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #b3b3b3;
}

.icon-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  margin-left: 20px;
  cursor: pointer;
}

.icon-button:hover {
  opacity: 0.8;
}






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








@media (max-width: 768px) {
  body, #app {
    font-size: 10px !important;
  }


  .nav-links a {
    color: #e5e5e5;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color: #b3b3b3;
  }

  .icon-button {
    background: none;
    border: none;
    color: white;
    font-size: 0.75rem;
    margin-left: 0;
    cursor: pointer;
  }


}

</style>
