'use client'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { ContactUsPageData } from '@xc/shared/src/data/store/getContactUsPage'
import { submitForm } from '@xc/ui/ContactUs/submitForm'
import { toast, TypeOptions, Theme } from 'react-toastify'

export default function ContactUsForm({ data }: { data: ContactUsPageData }) {
  const notify = (content: string, autoClose: number | false, type: TypeOptions, theme: Theme = 'dark') => {
    toast.success(content, {
      autoClose,
      hideProgressBar: false,
      position: 'top-right',
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme,
      type,
      toastId: 'inquiry-submitted',
    })
  }

  async function submit(formData: FormData) {
    const isSent = await submitForm(formData)
    if (isSent) {
      notify(
        data.success_notification.content,
        data.success_notification.timeout,
        'success',
        data.success_notification.theme,
      )
      const form = document.getElementById('contactUsForm') as HTMLFormElement | null
      form?.reset()
    } else {
      notify(data.error_notification.content, data.error_notification.timeout, 'error', data.error_notification.theme)
    }
  }

  return (
    <form id="contactUsForm" action={submit} method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="space-y-4 sm:col-span-2">
          {data.mb_form.map(({ item }) => (
            <div key={item.label}>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                {item.label}
              </label>
              <div className="mt-2.5">
                {item.type === 'textarea' ? (
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                ) : (
                  <input
                    type={item.type}
                    name={item.name}
                    id={item.name}
                    autoComplete={item.name}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required={item.is_required}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {data.submit_button_label}
          </button>
        </div>
      </div>
    </form>
  )
}
