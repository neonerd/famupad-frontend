<template lang="pug">
  .section
    .container
      .content
        .columns.is-centered
          .column.is-half.is-narrow
            form(action="", method="post", @submit.prevent="submit")
              .field
                label.label Název
                .control
                  input(type="text", placeholder="Název typu (napr.: Malá etuda)", required, v-model="projectExcercise.name").input
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Vytvořit typ cvičení
</template>

<script>
import {createEntity} from '@/api'

export default {
  components: {
  },
  methods: {
    submit () {
      createEntity('projectExcercises', this.projectExcercise)
        .then(result => {
          this.$router.push('/data')
        })
    }
  },
  data () {
    return {
      projectExcercise: {
        name: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
