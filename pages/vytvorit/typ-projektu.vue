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
                  input(type="text", placeholder="Název typu (napr.: Hraný film)", required, v-model="projectType.name").input
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Vytvořit typ projektu
</template>

<script>
import {createEntity} from '@/api'

export default {
  components: {
  },
  methods: {
    submit () {
      createEntity('projectTypes', this.projectType)
        .then(result => {
          this.$router.push('/data')
        })
    }
  },
  data () {
    return {
      projectType: {
        name: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
