<template>
  <v-row
    justify-lg='center'
  >
    <v-col>
      <v-data-table
                    :headers="headers"
                    :items="users"
                    :items-per-page="5"
                    class="elevation-1"
      ></v-data-table>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { Context } from '@nuxt/types'
import Vue from "vue";
import { UsersList } from '../types/users-list'
import * as RestAPIService from '../services/RestAPIService';

export default Vue.extend({
  middleware: ['auth'],
  data: () => ({
    headers: [
      {
        text: 'User name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'email', value: 'email' },
    ],
  }),

  async asyncData(ctx: Context): Promise<UsersList> {
    const usersResp = await RestAPIService.getAllUsers(ctx.$axios)
    return { users: usersResp.users };
  }
})
</script>
