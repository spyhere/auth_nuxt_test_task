<template>
  <v-row
    justify-lg='center'
  >
    <v-col cols='4' class="text-center">
      <v-alert v-if="errorMessage" color="red">
        {{ errorMessage }}
      </v-alert>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent='login'
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          type='submit'
        >
          Login
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang='ts'>

import {get as _get} from 'lodash';
import Vue from "vue";
import {VForm} from '../types/vuetify';


export default Vue.extend({
  middleware: ['auth'],
  data: () => ({
    valid: true,
    showPassword: false,
    email: '',
    emailRules: [
      (v:string) => !!v || 'E-mail is required',
      (v:string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      (v:string) => !!v || 'Password is required',
      (v:string) => (v && v.length >= 1) || 'Password must be more than 1 characters',
    ],
    error: {}
  }),

  computed: {
    form(): VForm {
      return this.$refs.form as VForm
    },
    errorMessage(this: any): String {
      const { error } = this;
      if (!error || typeof error === 'string') {
        return error
      }
      let msg = ''
      if (error.message) {
        msg += error.message
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, '')
          .replace(/:/g, ': ')
          .replace(/,/g, ' ')})`
      }
      return msg
    },
  },

  methods: {
    validate (): void {
      this.form.validate()
    },

    async login (): Promise<void> {
      this.form.validate();
      if(this.valid) {
        const authData = await this.$auth.loginWith('local', {
          data: {email: this.email, password: this.password}
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
          this.error = err.response?.data
        });

        if (_get(authData, 'status') == 200) {
          window.location.replace(_get(this, '$route.query.redirect', '/'));
        }
      }
    },

    reset () {
      this.form.reset()
    },
  },
})
</script>
