<template>
    <v-container fluid class="d-flex align-center justify-center fill-height mx-auto" width="400">
        <v-col>
          <v-row>
              <v-alert
              height="100"
              v-model="alert"
              color="error"
              variant="outlined"
              class="mb-6"
              >
              {{ alertMessage }}
              </v-alert>
          </v-row>
          <v-row>
              <v-card elevation="3" class="py-4 px-6">
              <v-card-title class="text-center">
                  ログイン
              </v-card-title>
              <v-card-actions>
                  <v-col>
                  <v-form ref="form" @submit.prevent>
                      <v-text-field
                      v-model="mailAddress"
                      label="メールアドレス"
                      type="email"
                      :rules="[rules.required]"
                      class="mb-4"
                      dense
                      ></v-text-field>
                      <v-text-field
                      v-model="password"
                      label="パスワード"
                      :type="show ? 'text' : 'password'"
                      :append-inner-icon="show ? mdiEye : mdiEyeOff"
                      @click:append-inner="show = !show"
                      :rules="[rules.required]"
                      dense
                      ></v-text-field>
                      <v-btn
                      @click="login_btn"
                      variant="outlined"
                      type="submit"
                      class="mt-4"
                      block
                      color="primary"
                      >
                      Login
                      </v-btn>
                  </v-form>
                  </v-col>
              </v-card-actions>
              </v-card>
          </v-row>
        </v-col>
  </v-container>
</template>

<script setup>
import { mdiEye, mdiEyeOff } from "@mdi/js";
const { signinWithEmailAndPassword,signinAdmin } = useLogin();
const route = useRoute();
const show = ref(false);
const rules = {
  required: (value) => !!value || "この項目は必須です",
};
const mailAddress = ref("");
const password = ref("");
const form = ref();
const alert = ref(false);
const alertMessage = ref("パスワードとメールアドレスが一致しません。");

const login_btn = async () => {
  if (await form.value.validate()) {
    console.log('call?')
    if(route.path == '/admin/login'){
      const adminUser = await signinAdmin(mailAddress.value,password.value)
      if(adminUser){
        navigateTo('/admin/home')
      }else{
        alert.value = true
      }

    }else{
      const user = await signinWithEmailAndPassword(mailAddress.value, password.value);
      if (user) {
        // ログイン成功
        await navigateTo("/Home");
      } else if (mailAddress.value != "" && password.value != "") {
        console.log("call");
        alert.value = true;
      }
    }
  }
};
</script>

<style scoped>
.v-card {
  width: 100%;
  max-width: 400px;
}

.v-alert {
  max-width: 400px;
  width: 100%;
  text-align: center;
}
</style>