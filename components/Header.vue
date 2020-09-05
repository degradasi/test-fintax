<template>
  <header class="nav_header">
    <div class="nav_title">
      <nuxt-link to="/">
        Fintax Test
      </nuxt-link>
    </div>
    <div class="nav_item">
      <div v-for="(data, index) in navItem" :key="index">
        <!-- for logout -->
        <nuxt-link
          :to="data.url"
          :class="{ active: $route.name == data.name }"
        >
          {{ data.label }}
        </nuxt-link>
      </div>
      <div v-if="!dataToken">
        <nuxt-link to="/login" :class="{ active: $route.name == 'login' }">
          Login
        </nuxt-link>
      </div>
      <div v-else>
        <button to="" @click="clickLogout">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      navItem: [
        { name: 'calculator', label: 'Calculator', url: '/calculator' },
        { name: 'table', label: 'Table', url: '/table' }
      ]
    }
  },
  computed: {
    dataToken() {
      return this.$store.state.login.dataToken
    }
  },
  mounted() {
    // handle token on reload page
    if (Cookies.get('userToken')) {
      this.$store.dispatch('login/setToken', Cookies.get('userToken'))
    }
  },
  methods: {
    clickLogout() {
      this.$store.dispatch('login/removeToken')
    }
  },
}
</script>

<style lang="css">
  .nav_header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: #333;
    box-shadow: 0 -4px 13px 15px rgba(61, 61, 61, .3);
  }

  .nav_item {
    display: flex;
  }

  .nav_item div {
    display: flex;
    flex-flow: column;
  }

  @media (max-width: 600px) {
    .nav_item {
      width: 100%;
      justify-content: flex-end;
    }
  }

  .nav_header a, .nav_header button {
    color: #ffffff;
    text-decoration: none;
    transition: all ease .2s;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    height: 100%;
    background: #333;
    border: 0px;
    font-size: 16px;
  }

  .nav_header .nav_item a:hover, .nav_header .nav_item button:hover, .nav_header .nav_item .active {
    background: #dddddd;
    color: #000000;
  }

  .nav_header .nav_title {
    font-size: 24px;
    display: contents;
  }
</style>