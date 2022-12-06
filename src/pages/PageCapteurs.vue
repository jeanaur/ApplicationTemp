<template>
  <div class="q-pa-md">
    <q-table
      grid
      title="Capteurs"
      :rows="capteurs"
      :columns="columns"
      :filter="filter"
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
      <template v-slot:item="sensor">
        <CapteurMesureForm :sensor="sensor"/>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { ref } from 'vue'
import CapteurMesureForm from 'components/CapteursMesures/CapteurMesureForm.vue'

const columns = [
  {
    name: 'capteurs',
    required: true,
    label: 'Nom Capteur',
    align: 'left',
    field: row => row.nom
  },
  {
    name: 'temperature',
    label: 'Temperature',
    field: row => row.mesures[0].temperature + ' °C'
  },
  {
    name: 'humidite',
    label: 'Humidite ',
    field: row => row.mesures[0].humidite
  },
  {
    name: 'sequence',
    label: 'Sequence ',
    field: row => row.mesures[0].sequence
  },
  {
    name: 'salle',
    label: 'Salle ',
    field: row => row.salle.nom
  }
]

export default {
  components: { CapteurMesureForm },
  setup () {
    return {
      filter: ref(''),
      columns
    }
  },
  name: 'PageCapteurs',
  computed: {
    // Mappage des getters ('nomNamespace', ['nomGetter'])
    ...mapGetters('capteur', ['capteurs']),
    ...mapState('capteur', ['capteursCharges'])
  },
  methods: {
    ...mapActions('capteur', ['getCapteursAPI'])
  },
  mounted () {
    this.getCapteursAPI()
  }
}
</script>

<style>

</style>
