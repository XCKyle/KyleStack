import Result from '@xc/lib/Result'
import { store } from '@xc/shared/clients/contentstack'

export type UserInquiry = {
  first_name: string
  last_name: string
  email: string
  phone: string
  message: string
}
export default async function postUserInquiry(inquiry: UserInquiry): Promise<Result<UserInquiry>> {
  const uid = crypto.randomUUID()
  const result = await store.api.post('user_inquiry', {
    title: uid,
    ...inquiry,
  })
  if (result.error) {
    return Result.fail(result.error)
  }
  return Result.success(inquiry)
}
