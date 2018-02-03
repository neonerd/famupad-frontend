<template lang="pug">
.box
  h2 Přidat soubor k projektu
  form(action="", method="post", @submit.prevent="submit")
    .field
      label.label Název
      .control
        input(type="text", placeholder="Název souboru (například: Finální scenář, Námět, Ilustrační fotka, atd.)", required, v-model="payload.name").input
    .field
      label.label Typ souboru
      .control
        select(required, v-model="payload.type").input
          option(v-for="type in projectFileTypes", :value="type.value") {{ type.label }}
    .field
      label.label Soubor
      .control
        file-upload-field(v-model="fileData")
    .field
      button(type="submit").button.is-primary Přidat
</template>

<script>
import {createEntity} from '@/api'

import projectFileTypes from '@/assets/data/projectFileTypes'

import FileUploadField from '@/components/forms/FileUploadField'

export default {
  props: ['project_id'],
  components: {
    FileUploadField
  },
  methods: {
    submit () {
      createEntity('projectFiles',
        Object.assign(
          {},
          // User set properties
          this.payload,
          // File upload properties
          {hash: this.fileData.fileHash, filename: this.fileData.fileName},
          // Parent project
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
        name: '',
        type: 'photo'
      },
      fileData: {},
      projectFileTypes
    }
  }
}
</script>