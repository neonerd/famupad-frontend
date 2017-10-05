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
                  input(type="text", placeholder="Název pozice (napr.: Režisér)", required, v-model="projectPosition.name").input
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Upravit pozici
</template>

<script>
import {omit} from 'ramda'
import {updateEntity, fetchEntity} from '@/api'

export default {
  components: {
  },
  methods: {
    submit () {
      updateEntity('projectPositions', this.projectPosition.id, omit(['id'], this.projectPosition))
        .then(result => {
          this.$router.push('/data')
        })
    }
  },
  async asyncData ({params}) {
    const projectPosition = await fetchEntity('projectPositions', params.id)

    return {
      projectPosition
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
