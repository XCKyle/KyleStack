'use server'
import postUserInquiry, { UserInquiry } from '@xc/shared/src/data/store/postUserInquiry'

export async function submitForm(formData: FormData): Promise<boolean> {
  const userInquiry: UserInquiry = {
    first_name: formData.get('first-name') as string,
    last_name: formData.get('last-name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone-number') as string,
    message: formData.get('message') as string,
  }
  const result = await postUserInquiry(userInquiry)
  return result.ok
}
