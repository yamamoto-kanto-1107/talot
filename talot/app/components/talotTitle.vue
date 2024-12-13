<template>
    <div class="position-relative">
        <v-btn
          :icon="drawer ? `${mdiClose}` : `${mdiMenu}`"
          variant="outlined"
          @click="drawer = !drawer"
          class="position-absolute"
        ></v-btn>

        <div class="title mx-auto text-center">〜{{ title }}〜</div>

      <!-- ナビゲーションドロワー -->
      <v-navigation-drawer v-model="drawer">
        <v-list-item title="タロット一覧"></v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item to="../home">Home</v-list-item>
        </v-list-item>
        <v-list-item v-for="item in items" :key="item.id">
          <v-list-item :to="`${item.id}`" :title="`${item.name}`"></v-list-item>
        </v-list-item>
      </v-navigation-drawer>
    </div>
  </template>

<script setup>
import '@/assets/font.css'
import {
    mdiMenu,
    mdiClose
} from "@mdi/js";

const props = defineProps(
    {
        title: {
            type: String,
             default: "",
            required: true,
        },
    },
);
const { getTalots } =useTalot()

const items =ref()
items.value = await getTalots()

const drawer = ref(false)
</script>
<style>

.title{
    font-size: 60px;
    color: #9d5b8b;
}

</style>