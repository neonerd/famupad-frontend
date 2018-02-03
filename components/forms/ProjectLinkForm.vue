<template lang="pug">
.box
  h2 Přidat odkaz k projektu
  form(action="", method="post", @submit.prevent="submit")
    .field
      label.label URL
      .control
        input(type="text", placeholder="URL adresa (např. http://www.youtube.com?w=asd)", required, v-model="payload.url").input
    .field
      label.label Název
      .control
        input(type="text", placeholder="Název odkazu (např. Celý film, Trailer)", required, v-model="payload.name").input
    .field
      label.label Poznámka
      .control
        input(type="text", placeholder="Poznámka k odkazu (např. heslo na Vimeo)", required, v-model="payload.note").input
    .field
      button(type="submit").button.is-primary Přidat
</template>

<script>
import {createEntity} from '@/api'

export default {
  props: ['project_id'],
  methods: {
    submit () {
      createEntity('projectLinks',
        Object.assign(
          {},
          this.payload,
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
        url: '',
        name: '',
        note: ''
      }
    }
  }
}
</script>