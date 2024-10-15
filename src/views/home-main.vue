
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
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    setInterval(() => {
      console.log(this.activeDropdown);
    }, 1000);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<template>
    <BannerComponent :movie="featuredMovie" />

    <movie-row title="인기 영화" :fetchUrl="popularMoviesUrl" />
    <movie-row title="최신 영화" :fetchUrl="newReleasesUrl" />
    <movie-row title="액션 영화" :fetchUrl="actionMoviesUrl" />
</template>

<style scoped>
body {
  background-color: #141414 !important;
}
</style>
