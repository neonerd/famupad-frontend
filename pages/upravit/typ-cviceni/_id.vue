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
                  input(type="text", placeholder="Název typu cvičení (napr.: Malá etuda)", required, v-model="projectExcercise.name").input
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Upravit typ cvičení
</template>

<script>
import {omit} from 'ramda'
import {updateEntity, fetchEntity} from '@/api'

export default {
  components: {
  },
  methods: {
    submit () {
      updateEntity('projectExcercises', this.projectExcercise.id, omit(['id'], this.projectExcercise))
        .then(result => {
          this.$router.push('/data')
        })
    }
  },
  async asyncData ({params}) {
    const projectExcercise = await fetchEntity('projectExcercises', params.id)

    return {
      projectExcercise
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
