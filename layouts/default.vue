<template lang="pug">
  .famupad
    header-menu
    nuxt
    famupad-footer
</template>

<script>
import HeaderMenu from '~/components/HeaderMenu.vue'
import FamupadFooter from '~/components/Footer.vue'

export default {
  components: {
    FamupadFooter,
    HeaderMenu
  }
}
</script>
