<template>
  <div id="app">
    <header class="app-header">
      <div class="header-left">
        <nav class="nav-links">
          <ul>
            <li><a href="#">홈</a></li>
            <li><a href="#">TV 프로그램</a></li>
            <li><a href="#">영화</a></li>
            <li><a href="#">최신 콘텐츠</a></li>
          </ul>
        </nav>
      </div>
      <div class="header-right">
        <button class="icon-button">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
        <button class="icon-button">
          <font-awesome-icon :icon="['fas', 'user']" />
        </button>
      </div>
    </header>

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
    };
  },
  created() {
    this.popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=ko-KR`;
    this.newReleasesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=ko-KR`;
    this.actionMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&with_genres=28&language=ko-KR`;
    this.fetchFeaturedMovie();
  },
  methods: {
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
      if (window.scrollY > 5) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
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
  overflow-x: hidden;
}

#app {
  width: 100%;
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
  font-size: 14px;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #b3b3b3;
}

.icon-button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  margin-left: 20px;
  cursor: pointer;
}

.icon-button:hover {
  opacity: 0.8;
}
</style>
