<template>
  <v-container fluid class="fill-height d-flex flex-column align-center justify-center">
    <v-card width="320" elevation="0">
      <v-card-text class="d-flex flex-column align-center justify-center">
        <v-row v-for="talot in talotData" :key="`talot${talot.id}`">
          <v-col>
            <v-btn
              variant="text"
              :text="`${talot.no}. ${talot.name}`"
              color="primary"
              :to="`/tarot/${talot.id}`"
              size="auto"
              class="fontSize"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const { talots,getTalots } = useTalot();
const talotData = ref([])
talotData.value =await getTalots()
</script>
<style>

.fontSize{
  font-size: 30px;
}
</style>