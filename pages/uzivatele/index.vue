<template lang="pug">
  .section
    .container

      h1.title Uživatelé

      .content-top-buttons.no-padding
          nuxt-link(to="/vytvorit/uzivatel", v-show="isAdmin").button.is-primary Vytvořit nového uživatele

      .content
        table.table.with-clickable-rows
          thead
            tr
              th Email
              th Role
              th Možnosti
          tbody
            tr(v-for="user in users")
              td {{ user.email }}
              td {{ userRoleLabels[user.role] }}
              td
                nuxt-link(:to="`/upravit/uzivatel/${user.id}`").button Upravit
                confirm-button(buttonText="Smazat", :proceedMethod="deleteUser", :proceedParameter="user.id") Určitě chcete úplně smazat uživatelský účet {{ user.email }}?


</template>

<script>
import userRoleLabels from '@/assets/data/userRoleLabels'

import {getEntities, deleteEntities} from '@/api'

import ConfirmButton from '@/components/buttons/ConfirmButton'

export default {
  components: {
    ConfirmButton
  },
  computed: {
    isAdmin () {
      return this.$store.getters['auth/isAdmin']
    }
  },
  methods: {
    reloadUsers () {
      const parameters = {}
      getEntities('users', parameters).then(users => {
        this.users = users
      })
    },
    goToUser (slug) {
      this.$router.push(`/uzivatele/${slug}`)
    },
    deleteUser (id) {
      deleteEntities('users', [id]).then(r => {
        this.reloadUsers()
      })
    }
  },
  mounted () {
    this.reloadUsers()
  },
  async asyncData () {
    return {
      users: [],
      userRoleLabels
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
