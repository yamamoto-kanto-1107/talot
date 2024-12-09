<template>
  <v-container>
    <div
      class="w-100"
      v-for="(content, key) in preview.contents"
      :key="key"
    >
      <div align="center" class="my-3">
        <v-btn variant="text" @click="toggleOpen(key)">
          {{ content.title }}
          <v-icon :icon="openAll[key] ? mdiMenuDown : mdiMenuUp"></v-icon>
        </v-btn>
      </div>

      <!-- 開いている場合だけ表示 -->
      <v-row
        v-if="openAll[key]"
        class="align-center justify-center"
      >
        <v-col cols="6">
          <v-row class="mb-10 pa-3">
            <v-col
              class="bg-red-lighten-5"
              style="border: 1px solid #FFEBEE; border-radius: 3%;"
            >
              <div>正位置の意味</div>
              <div
                v-for="(normal, normalIndex) in content.normal"
                :key="normalIndex"
                class="mb-6"
              >
                <v-row align="center">
                  <v-col cols="10">
                    <v-text-field
                      v-model="content.normal[normalIndex]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" class="d-flex justify-center">
                    <v-btn
                      size="32"
                      variant="outlined"
                      :icon="mdiMinus"
                      @click="deleteText(content.normal, normalIndex)"
                    ></v-btn>
                  </v-col>
                </v-row>
              </div>
              <div align="center">
                <v-btn
                  size="32"
                  :icon="mdiPlus"
                  variant="outlined"
                  @click="addText(content.normal)"
                ></v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import {
  mdiMenuDown,
  mdiMenuUp,
  mdiMinus,
  mdiPlus,
} from "@mdi/js";

const openAll = ref({}); // 状態管理用のオブジェクト

const toggleOpen = (key) => {
  openAll.value[key] = !openAll.value[key]; // 状態をトグル
};

const addText = (array) => {
  array.push(""); // 新しい要素を追加
};

const deleteText = (array, index) => {
  array.splice(index, 1); // 指定の要素を削除
};

// サンプルデータ
const preview = ref({
  contents: [
    { title: "愛情の意味", normal: ["愛", "信頼"], reverse: ["裏切り"] },
    { title: "仕事の意味", normal: ["成功", "努力"], reverse: ["失敗"] },
    { title: "お金の意味", normal: ["貯金"], reverse: ["浪費"] },
  ],
});
</script>
