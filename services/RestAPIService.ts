import { UsersList } from '~/types/users-list'

export const getAllUsers = async ($axios: any):Promise<UsersList> => await $axios.$get("/api/users");
