<template lang="pug">
  .section
    .container

      h1.title Moje ❤

      .tabs
        ul
          li(v-for="projectType in mainFilters", :class="{'is-active': projectType.id == selectedMainFilter}")
            a(href="", @click.prevent="selectMainFilter(projectType.id)") {{ projectType.name }}

      .columns
          .column.selects
            .select
              select(name="projectSorting", v-model="projectSorting").select
                option(value="-year") Seřadit dle data vzniku
                option(value="-createdAt") Seřadit dle data přidání
                option(value="name") Seřadit dle názvu
            .select
              select(name="projectDepartmentId", v-model="projectDepartmentId").select
                option(value="") Všechny katedry
                option(v-for="department in departments", :value="department.id", :key="department.id") {{ department.name }}

      template(v-if="viewType == 'tiles'")
        .columns.is-multiline
          .column.is-one-quarter(v-for="project in projects")
            .card.is-clickable(@click="goToProject(project.slug)")
              .card-image
                figure.image.is-16by9(:style="`background-position: center center; background-image: url(${projectMainIllustrations[project.id]});`")
              .card-content
                .media
                  .media-content
                    span.like.active(v-show="project.like") ❤
                    p.title {{ project.name }}
                .content
                  p(v-if="project.people[0]").meta
                    small {{ project.people[0].positionName | positionToAcronym }} {{ project.people[0].lastName }} {{ project.people[0].firstName }}
                  p(v-else).meta &nbsp;
                  p {{ project.synopsis }}
                  
</template>

<script>
import * as R from 'ramda'

import {getEntities, API_URL} from '@/api'

export default {
  components: {
  },
  mounted () {
    this.loadProjects()
  },
  watch: {
    projectDepartmentId () {
      this.loadProjects()
    },
    projectSorting () {
      this.loadProjects()
    }
  },
  computed: {
    mainFilters () {
      return [{id: 0, name: 'Všechno'}].concat(this.projectTypes)
    },
    selectedMainFilter () {
      if (this.$store.state.viewSettings.settings['projects.selectedMainFilter']) {
        return this.$store.state.viewSettings.settings['projects.selectedMainFilter']
      } else {
        return 0
      }
    },
    projectMainIllustrations () {
      const illustrations = {}
      this.projects.map(p => {
        const customIllustration = R.find(f => f.type === 'photo', p.files)
        if (customIllustration) {
          illustrations[p.id] = `${API_URL}/files/${customIllustration.id}`
        } else {
          illustrations[p.id] = '/illustration_movie_na.jpg'
        }
      })

      return illustrations
    },
    isAdmin () {
      return this.$store.getters['auth/isAdmin']
    }
  },
  methods: {
    loadProjects () {
      const parameters = {}
      if (this.$store.state.viewSettings.settings['projects.selectedMainFilter'] !== 0) {
        parameters.projectTypeId = this.$store.state.viewSettings.settings['projects.selectedMainFilter']
      }

      parameters.isLiked = true
      parameters.departmentId = this.projectDepartmentId
      parameters.sort = this.projectSorting

      getEntities('projects', parameters).then(projects => {
        this.projects = projects
      })
    },
    goToProject (slug) {
      this.$router.push('/projekty/' + slug)
    },
    selectMainFilter (id) {
      this.$store.commit('viewSettings/set', {value: id, name: 'projects.selectedMainFilter'})
      this.loadProjects()
    }
  },
  async asyncData () {
    const projectTypes = await getEntities('projectTypes')
    const departments = await getEntities('departments')

    return {
      // Options
      projectTypes,
      departments,

      // View options
      viewType: 'tiles',
      projects: [],

      // Parameters
      projectSorting: '-year',
      projectDepartmentId: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  select {
    height: 40px;
  }
  .selects > .select {
    margin-right: 1rem;
  }
  p.meta {
    margin-top: -10px;
  }
  .card {
    height: 100%;
  }
</style>
