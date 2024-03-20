import { Users } from 'src/modules/users/entities/users.entity'

export const renderFullName = (user: Users) => {
  const firstName = user.firstName || ''
  const lastName = user.lastName || ''

  return `${firstName} ${lastName}`.trim()
}
