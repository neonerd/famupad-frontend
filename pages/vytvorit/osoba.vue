<template lang="pug">
  .section
    .container

      h1.title Nová osoba

      .content
        .columns.is-centered
          .column.is-half.is-narrow
            form(action="", method="post", @submit.prevent="submit")
              .field
                label.label Jméno
                .control
                  input(type="text", placeholder="Křestní jméno osoby", required, v-model="person.firstName").input
              .field
                label.label Příjmení
                .control
                  input(type="text", placeholder="Příjmení osoby", required, v-model="person.lastName").input
              .field
                label.label Katedra
                .control
                  vue-select(:options="departmentOptions", v-model="person.department_id")
              .field
                label.label Rok nástupu
                .control
                  input(type="number", placeholder="Rok nástupu na FAMU", required, v-model="person.enrolledAt").input
              .field
                label.label.label-with-checkbox Studuje?
                  input(type="checkbox", required, v-model="person.isActiveStudent")
              .field
                label.label Email
                .control
                  input(type="email", placeholder="Emailový kontakt", required, v-model="person.email").input
              .field
                label.label Telefon
                .control
                  input(type="text", placeholder="Telefonický kontakt", v-model="person.phone").input
              .field
                label.label Web (URL)
                .control
                  input(type="text", placeholder="URL osobních stránek (napr.: http://andrejsykora.com)", v-model="person.urlWeb").input
              .field
                label.label Facebook (URL)
                .control
                  input(type="text", placeholder="URL Facebook profilu (napr.: http//facebook.com/andrejhahacrew)", v-model="person.urlFacebook").input
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Vytvořit osobu
</template>

<script>
import {createEntity, getEntities} from '@/api'

export default {
  components: {
  },
  methods: {
    submit () {
      createEntity('people', Object.assign({}, this.person, {department_id: this.person.department_id.value, isActiveStudent: +this.person.isActiveStudent}))
        .then(result => {
          this.$router.push('/lide')
        })
    }
  },
  computed: {
    departmentOptions () {
      return this.departments.map(d => ({label: `${d.acronym} - ${d.name}`, value: d.id}))
    }
  },
  async asyncData () {
    const departments = await getEntities('departments')

    return {
      departments,
      person: {
        firstName: '',
        lastName: '',
        department_id: null,
        enrolledAt: '',
        phone: '',
        email: '',
        urlWeb: '',
        urlFacebook: '',
        isActiveStudent: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
