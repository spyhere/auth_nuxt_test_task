export type UserOfList = {
  email: string,
  picture: string,
  name: string,
  scope: Array<string>
}

export type UsersList = {
  users: Array<UserOfList>
}
