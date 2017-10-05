<template lang="pug">
.navbar.is-dark
  .container
    .navbar-brand
      h2 FamuPAD
    .navbar-menu
      .navbar-start
        nuxt-link(to="/projekty").navbar-item Projekty
        nuxt-link(to="/lide").navbar-item Lidé
        nuxt-link(to="/data").navbar-item Data
</template>

<script>
export default {

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
