<template lang="pug">
  .section
    .container

      h1.title Upravit uživatele

      .content
        .columns.is-centered
          .column.is-half.is-narrow
            form(action="", method="post", @submit.prevent="submit")
              .field
                label.label Email
                .control
                  input(type="text", placeholder="Email, pod kterým se bude uživatel přihlašovat", required, v-model="user.email").input
              .field
                label.label Nové heslo
                .control
                  input(type="text", placeholder="Heslo, kterým se bude uživatel přihlašovat", required, v-model="user.password").input
              .field
                label.label Role
                .control
                  select(v-model="user.role").input
                    option(v-for="userRole in userRoles", :value="userRole.value") {{ userRole.label }}
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Upravit uživatele
</template>

<script>
import userRoles from '@/assets/data/userRoles'

import {createEntity} from '@/api'

export default {
  methods: {
    submit () {
      createEntity('users', Object.assign({}, this.user))
        .then(result => {
          this.$router.push('/uzivatele')
        })
    }
  },
  data () {
    return {
      user: {
        email: '',
        password: '',
        role: 'user'
      },
      userRoles
    }
  }
}
</script>