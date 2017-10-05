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
                  input(type="text", placeholder="Název typu projektu (napr.: Hraný film)", required, v-model="projectType.name").input
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Upravit typ projektu
</template>

<script>
import {omit} from 'ramda'
import {updateEntity, fetchEntity} from '@/api'

export default {
  components: {
  },
  methods: {
    submit () {
      updateEntity('projectTypes', this.projectType.id, omit(['id'], this.projectType))
        .then(result => {
          this.$router.push('/data')
        })
    }
  },
  async asyncData ({params}) {
    const projectType = await fetchEntity('projectTypes', params.id)

    return {
      projectType
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
