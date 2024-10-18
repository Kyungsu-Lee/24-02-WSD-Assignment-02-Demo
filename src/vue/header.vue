<template>
  <div id="container">
    <header class="app-header">
      <div class="header-left">
        <div class="logo">
          <font-awesome-icon :icon="['fas', 'ticket']" />
        </div>
        <nav class="nav-links">
          <ul>
            <li><a href="/#/">홈</a></li>
            <li><a href="/#/popular">대세 콘텐츠</a></li>
            <li><a href="/#/wishlist">내가 찜한 리스트</a></li>
            <li><a href="/#/search">찾아보기</a></li>
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
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faUser, faTicket } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faSearch, faUser, faTicket);


export default {
  name: 'MainHeader',
  components: {
    FontAwesomeIcon
  },
  methods: {
    removeKey() {
      localStorage.removeItem('TMDb-Key');
      this.$router.push('/signin');
    },
  },
};
</script>

<style>
.app-header {
  height: 40px;
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
  opacity: 0.5;
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
