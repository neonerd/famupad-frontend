<template lang="pug">
  .section

    .container(v-if="project.id").famupad-project
      
      nuxt-link(:to="`/upravit/projekt/${project.id}`").is-pulled-right
        button.button.is-primary(v-show="isAdmin") Upravit projekt

      h1.title 
        | {{ project.name }}&nbsp;
        span.like(:class="{active: project.like, inactive: !project.like}", @click="toggleLike") ❤

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
              td {{ projectStateLabel }}

        .column
          h2 Popis
          p {{ project.description }}

      .columns
        // People
        .column
          .level
            .level-left
              .level-item
                h2 Lidé v projektu
            .level-right
              .level-item
                button.button.is-primary(@click="isAddingPerson=true", v-show="isAdmin") Přidat osobu
          table.table
            thead
              tr
                th Příjmení a jméno
                th Pozice
                th(v-show="isAdmin") Možnosti
            tbody
              tr(v-for="person in project.people", @click="goToPerson(person.slug)").is-clickable
                td {{ person.lastName }}, {{ person.firstName }}
                td {{ person.positionName }}
                td(v-show="isAdmin")
                  a(href="javascript: void(0);", @click="removePersonFromProject(person.positionId)") Odebrat

      .columns
        .column
          .level
            .level-left
              .level-item
                h2 Soubory
            .level-right
              .level-item
                button.button.is-primary(v-show="isAdmin", @click="isAddingFile=true") Přidat soubor
          table.table
            thead
              tr
                th Název souboru
                th Typ souboru
                th Možnosti
            tbody
              tr(v-for="file in project.files")
                td {{ file.name }}
                td {{ projectFileTypes.filter(t => t.value==file.type)[0].label }}
                td
                  span
                    a(:href="`${API_URL}/files/${file.id}`", target="_blank") Stáhnout
                  span(v-show="isAdmin") &nbsp;| 
                  span(v-show="isAdmin")
                    a(href="javascript: void(0);", @click="removeFileFromProject(file.id)") Smazat

        .column
          .level
            .level-left
              .level-item
                h2 Odkazy
            .level-right
              .level-item
                button.button.is-primary(@click="isAddingLink=true", v-show="isAdmin") Přidat odkaz
          table.table
            thead
              tr
                th Název
                th Poznámka
                th Možnosti
            tbody
              tr(v-for="link in project.links")
                td {{ link.name }}
                td {{ link.note }}
                td
                  a(:href="link.url", target="_blank") Otevřít
                  span(v-show="isAdmin") &nbsp;|  
                  a(href="javascript: void(0)", @click="removeLinkFromProject(link.id)", v-show="isAdmin") Smazat

    // Modals

    // Attach a person
    modal(:isActive="isAddingPerson", @close="isAddingPerson=false", v-if="project.id")
      project-person-form(
        :people="peopleOptions",
        :positions="projectPositionOptions",
        :project_id="project.id"
        @added="load"
      )

    modal(:isActive="isAddingFile", @close="isAddingFile=false", v-if="project.id")
      project-file-form(
        :project_id="project.id"
        @added="load"
      )

    modal(:isActive="isAddingLink", @close="isAddingLink=false", v-if="project.id")
      project-link-form(
        :project_id="project.id"
        @added="load"
      )   

</template>

<script>
import {fetchEntity, getEntities, deleteEntities, createEntity, API_URL} from '@/api'
import {extractOptionsFromObjects} from '@/lib/util'

import Modal from '@/components/Modal'

import ProjectPersonForm from '@/components/forms/ProjectPersonForm'
import ProjectLinkForm from '@/components/forms/ProjectLinkForm'
import ProjectFileForm from '@/components/forms/ProjectFileForm'

import ConfirmButton from '@/components/buttons/ConfirmButton'

import projectStateOptions from '@/assets/data/projectStateOptions'
import projectFileTypes from '@/assets/data/projectFileTypes'

export default {

  created () {
  },

  components: {
    Modal,
    ProjectPersonForm,
    ProjectLinkForm,
    ProjectFileForm,
    ConfirmButton
  },

  computed: {
    peopleOptions () {
      const existingIds = this.project.people.map(p => p.id)
      return extractOptionsFromObjects(['lastName', 'firstName'], this.people.filter(p => existingIds.indexOf(p.id) < 0))
    },
    projectPositionOptions () {
      return extractOptionsFromObjects('name', this.projectPositions)
    },
    projectStateLabel () {
      return projectStateOptions.filter(o => o.value === this.project.state)[0].label
    },
    isAdmin () {
      return this.$store.getters['auth/isAdmin']
    }
  },

  mounted () {
    this.load()
  },

  methods: {
    load () {
      this.isAddingPerson = false
      this.isAddingLink = false
      this.isAddingFile = false
      fetchEntity('projects', this.slug)
        .then(project => {
          this.project = project
        })
    },
    removePersonFromProject (id) {
      deleteEntities('projectPersons', [id])
        .then(r => {
          this.load()
        })
    },
    removeLinkFromProject (id) {
      deleteEntities('projectLinks', [id])
        .then(r => {
          this.load()
        })
    },
    removeFileFromProject (id) {
      deleteEntities('projectFiles', [id])
        .then(r => {
          this.load()
        })
    },
    toggleLike () {
      if (!this.project.like) {
        this.likeProject()
      } else {
        this.unlikeProject(this.project.like.id)
      }
    },
    likeProject () {
      createEntity('projectLikes', {
        project_id: this.project.id
      })
      this.project = Object.assign({}, this.project, {like: true})
    },
    unlikeProject (id) {
      deleteEntities('projectLikes', [id])
      this.project.like = null
    },
    goToPerson (slug) {
      this.$router.push('/lide/' + slug)
    }
  },

  async asyncData ({params}) {
    const people = await getEntities('people')
    const projectPositions = await getEntities('projectPositions')

    return {
      people,
      projectPositions,
      projectFileTypes,

      slug: params.slug,
      project: {},

      API_URL,

      isAddingPerson: false,
      isAddingFile: false,
      isAddingLink: false
    }
  }

}
</script>