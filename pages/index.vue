<template lang="pug">
  .section
    .container
      .content
        .columns.is-centered
          .column.is-half.is-narrow
            form(action="", method="post")
              .field
                label.label Email
                .control
                  input(type="email", placeholder="Váš e-mail", required).input
              .field
                label.label Heslo
                .control
                  input(type="password", placeholder="Vaše heslo", required).input
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Přihlásit se
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
</style>
