<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Nuxt test task
        </v-card-title>
        <v-card-text>
          <p>Please navigate with side bar to login page. Use next credential mail john@doe.com Password should be 123. There no some backend logic for registration and password hashing. Login and then you will be redirected to users page</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
