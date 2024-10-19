<template>
  <div class="movie-grid" ref="gridContainer">
    <div :class="['grid-container', currentView]">
      <div v-for="(movieGroup, index) in visibleMovieGroups" :key="index"
           :class="['movie-row', { 'full': movieGroup.length === rowSize }]">
        <div v-for="movie in movieGroup" :key="movie.id" class="movie-card">
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title">
          <div class="movie-title">{{ movie.title }}</div>
        </div>
      </div>
    </div>
    <div ref="loadingTrigger" class="loading-trigger">
      <div v-if="isLoading" class="loading-indicator">Loading...</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import axios from 'axios';

export default {
  name: 'MovieGrid',
  props: {
    fetchUrl: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const movies = ref([]);
    const currentPage = ref(1);
    const gridContainer = ref(null);
    const loadingTrigger = ref(null);
    const rowSize = ref(4);
    const isLoading = ref(false);
    const isMobile = ref(window.innerWidth <= 768);
    const currentView = ref('grid');
    const hasMore = ref(true);

    const fetchMovies = async () => {
      if (isLoading.value || !hasMore.value) return;

      isLoading.value = true;
      try {
        const response = await axios.get(props.fetchUrl, {
          params: {
            page: currentPage.value,
            per_page: 20
          }
        });
        const newMovies = response.data.results;
        if (newMovies.length > 0) {
          movies.value = [...movies.value, ...newMovies];
          currentPage.value++;
        } else {
          hasMore.value = false;
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const getImageUrl = (path) => {
      return path ? `https://image.tmdb.org/t/p/w300${path}` : '/placeholder-image.jpg';
    };

    const calculateLayout = () => {
      if (gridContainer.value) {
        const containerWidth = gridContainer.value.offsetWidth;
        const movieCardWidth = isMobile.value ? 100 : 300;
        const horizontalGap = isMobile.value ? 10 : 15;

        rowSize.value = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
      }
    };

    const visibleMovieGroups = computed(() => {
      return movies.value.reduce((resultArray, item, index) => {
        const groupIndex = Math.floor(index / rowSize.value);
        if (!resultArray[groupIndex]) {
          resultArray[groupIndex] = [];
        }
        resultArray[groupIndex].push(item);
        return resultArray;
      }, []);
    });

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768;
      calculateLayout();
    };

    const checkAndLoadMore = () => {
      const lastRow = gridContainer.value.lastElementChild;
      const containerBottom = gridContainer.value.getBoundingClientRect().bottom;
      const lastRowBottom = lastRow.getBoundingClientRect().bottom;

      if (containerBottom >= lastRowBottom - 100 && !isLoading.value && hasMore.value) {
        fetchMovies();
      }
    };

    onMounted(() => {
      fetchMovies().then(() => {
        checkAndLoadMore();
      });
      calculateLayout();
      window.addEventListener('resize', handleResize);

      const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !isLoading.value && hasMore.value) {
              fetchMovies();
            }
          },
          { rootMargin: '100px', threshold: 0.1 }
      );

      if (loadingTrigger.value) {
        observer.observe(loadingTrigger.value);
      }

      window.addEventListener('scroll', checkAndLoadMore);

      onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', checkAndLoadMore);
        if (loadingTrigger.value) {
          observer.unobserve(loadingTrigger.value);
        }
      });
    });

    return {
      visibleMovieGroups,
      getImageUrl,
      gridContainer,
      loadingTrigger,
      rowSize,
      isLoading,
      currentView,
      hasMore
    };
  }
};
</script>

<style scoped>
html, body {
  overflow-y: scroll !important;
}

.movie-grid {
  width: 100%;
  margin-bottom: 40px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-row {
  display: flex;
  justify-content: center;
  margin: 0 auto 20px;
  width: 100%;
}

.grid-container.list .movie-row {
  flex-direction: column;
}

.movie-card {
  width: 300px;
  margin: 0 10px;
  transition: transform 0.3s;
  position: relative;
}

.grid-container.list .movie-card {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
}

.grid-container.list .movie-card img {
  width: 100px;
  margin-right: 20px;
}

.movie-title {
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.grid-container.list .movie-title {
  text-align: left;
  white-space: normal;
}

.loading-trigger {
  height: 20px;
  margin-top: 20px;
}

.loading-indicator {
  text-align: center;
  font-size: 16px;
  color: #333;
}

@media (max-width: 768px) {
  .movie-card {
    width: 120px;
    margin: 0 5px;
  }

  .movie-title {
    font-size: 12px;
  }

  .grid-container.list .movie-card img {
    width: 60px;
  }
}
</style>
