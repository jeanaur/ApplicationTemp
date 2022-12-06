<template>
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
          <div class="text-h6">Mesures Capteurs</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card>
            <q-card-section>
              <q-list
                v-for="mesure in sensor.row.mesures"
                :key="mesure.id"
              >
                <q-card>
                  <q-card-section class="q-mb-lg">
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

<script>
import { ref } from 'vue'

export default {
  name: 'CapteurMesureForm',
  data () {
    return {
      medium: ref(false)
    }
  },
  props: {
    sensor: {
      required: true
    }
  }
}
</script>

<style scoped>

</style>
