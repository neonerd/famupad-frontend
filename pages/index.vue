<template lang="pug">
  .section
    .container
      .content
        .columns.is-centered
          .column.is-half.is-narrow
            form(action="", method="post", @submit.prevent.stop="login")
              .field
                label.label Email
                .control
                  input(type="email", placeholder="Váš e-mail", v-model="loginData.email", required).input
              .field
                label.label Heslo
                .control
                  input(type="password", placeholder="Vaše heslo", v-model="loginData.password", required).input
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Přihlásit se
</template>

<script>
export default {
  components: {
  },
  methods: {
    login () {
      this.$store.dispatch('auth/login', this.loginData)
        .then(() => {
          this.$router.push('/projekty')
        })
        .catch(() => {
          alert('Nesprávné jméno nebo heslo!')
        })
    }
  },
  mounted () {
    if (this.$store.state.auth.isLoggedIn) {
      this.$router.push('/projekty')
    }
  },
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
