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
        <q-card class="q-ma-lg">
          <q-card-section class="q-ma-sm">
            <q-list class="q-list--padding">
              <q-item
                v-for="col in sensor.cols"
                :key="col.id"
              >
                <q-item-section>
                  <q-item-label> {{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-btn class="q-mb-lg q-ml-xl" @click="medium = true"> Developer Mesures</q-btn>
          <q-dialog
            v-model="medium"
            full-width
          >
            <q-card>
              <q-card-section>
                <div class="text-h6">Mesures Capteurs </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-card>
                  <q-card-section>
                    <q-list
                      v-for="mesure in sensor.row.mesures"
                      :key="mesure.id"
                    >
                      <q-card>
                        <q-card-section class="q-mb-lg" >
                          <q-item> Température : {{ mesure.temperature }}</q-item>
                          <q-item> Humidité : {{ mesure.humidite }}</q-item>
                          <q-item> Séquence : {{ mesure.sequence }}</q-item>
                        </q-card-section>
                      </q-card>
                    </q-list>
                  </q-card-section>
                </q-card>
              </q-card-section>

              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" v-close-popup/>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-card>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { ref } from 'vue'

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
  setup () {
    return {
      filter: ref(''),
      columns,
      medium: ref(false)
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
