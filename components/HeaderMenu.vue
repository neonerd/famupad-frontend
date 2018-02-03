<template lang="pug">
.navbar.is-primary
  .container
    .navbar-brand
      h2 FamuPAD
    .navbar-menu
      .navbar-start
        nuxt-link(to="/projekty", v-show="isLoggedIn").navbar-item Projekty
        nuxt-link(to="/lide", v-show="isLoggedIn").navbar-item Lidé
        nuxt-link(to="/muj-famupad", v-show="isLoggedIn").navbar-item Můj FamuPAD
        nuxt-link(to="/data", v-show="isLoggedIn && user.role=='admin'").navbar-item Data
        nuxt-link(to="/uzivatele", v-show="isLoggedIn && user.role=='admin'").navbar-item Uživatelé
        nuxt-link(to="/", v-show="!isLoggedIn").navbar-item Přihlášení
        nuxt-link(to="/pomoc").navbar-item Pomoc
        a(href="#", @click="logout", v-show="isLoggedIn").navbar-item Odhlásit se
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.isLoggedIn
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-brand h2 {
  display: flex;
 line-height: 1.5;
 padding: .5rem 1rem;
 align-items: center;
 font-weight: 700;

 border-right: 3px solid #fff;
}
</style>
