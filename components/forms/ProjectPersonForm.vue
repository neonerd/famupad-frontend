<template lang="pug">
.box
  h2 Přiřadit osobu k projektu
  form(action="", method="post", @submit.prevent="submit")
    .field
      label.label Osoba
      .control
        vue-select(:options="people", v-model="payload.person_id")
    .field
      label.label Pozice
      .control
        vue-select(:options="positions", v-model="payload.project_position_id")
    .field
      button(type="submit").button.is-primary Přiřadit
</template>

<script>
import {createEntity} from '@/api'
import {extractValuesFromOptions} from '@/lib/util'

export default {
  props: ['people', 'positions', 'project_id'],
  methods: {
    submit () {
      createEntity('projectPersons',
        Object.assign(
          {},
          extractValuesFromOptions(['person_id', 'project_position_id'], this.payload),
          {project_id: this.project_id}
        )
      )
        .then(r => {
          this.$emit('added')
        })
    }
  },
  data () {
    return {
      payload: {
        person_id: null,
        project_position_id: null
      }
    }
  }
}
</script>