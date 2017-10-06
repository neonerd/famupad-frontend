<template lang="pug">
  .section

    .container(v-if="project").famupad-project
      
      h1.title {{ project.name }}

      .columns
        // Project info
        .column
          h2 Informace
          table.table
            tr
              td Typ projektu:
              td {{ project.projectTypeName }}
            tr
              td Typ cvičení:
              td {{ project.projectExcerciseName }}
            tr
              td Rok vzniku:
              td {{ project.year }}
            tr
              td Stav:
              td {{ project.state }}

        .column
          h2 Popis
          p Něco o tomto úžasném projektu.

      .columns
        // People
        .column
          .level
            .level-left
              .level-item
                h2 Lidé v projektu
            .level-right
              .level-item
                button.button.is-primary Přidat osobu
          table.table
            thead
              tr
                th Příjmení a jméno
                th Pozice
      .columns
        .column
          .level
            .level-left
              .level-item
                h2 Soubory
            .level-right
              .level-item
                button.button.is-primary Přidat soubor
          table.table
            thead
              tr
                th Název souboru
                th Typ souboru
                th Možnosti

        .column
          .level
            .level-left
              .level-item
                h2 Odkazy
            .level-right
              .level-item
                button.button.is-primary Přidat odkaz
          table.table
            thead
              tr
                th Název
                th Poznámka
                th Možnosti

    // Modals

    // Attach a person
    .modal.is-active
      .modal-background
      .modal-content
        .box
          h2 Přiřadit osobu k projektu
          form(action="", method="post")
            .field
              label.label Osoba
              .control
                vue-select(:options="peopleOptions")
            .field
              label.label Pozice
              .control
                vue-select(:options="projectPositionOptions")
            .field
              button(type="submit").button.is-primary Přiřadit
      button.modal-close

</template>

<script>
import {fetchEntity, getEntities} from '@/api'
import {extractOptionsFromObjects} from '@/lib/util'

export default {

  created () {
  },

  computed: {
    peopleOptions () {
      return extractOptionsFromObjects(['lastName', 'firstName'], this.people)
    },
    projectPositionOptions () {
      return extractOptionsFromObjects('name', this.projectPositions)
    }
  },

  mounted () {
    fetchEntity('projects', this.slug)
      .then(project => {
        this.project = project
      })
  },

  methods: {
  },

  async asyncData ({params}) {
    const people = await getEntities('people')
    const projectPositions = await getEntities('projectPositions')

    return {
      people,
      projectPositions,

      slug: params.slug,
      project: null
    }
  }

}
</script>