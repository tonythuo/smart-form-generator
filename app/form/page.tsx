import { generateObject } from "ai"
import { z } from "zod"
import { google } from "@ai-sdk/google";
import Form from "next/form";

const model = google("gemini-2.5-flash")

const generateForm = async (
  prompt: string,
) => {
  const { object } = await generateObject({
    model,
    schema: z.array(z.object({
      field: z.string(),
      type: z.string(),
      label: z.string(),
    })),
    prompt,
  });

  return object
};

async function processForm(formData: FormData) {
  'use server'

  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  }
}

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {

  let query = (await searchParams).query

  const form = await generateForm(query)

  return (
    <Form action={processForm}>
      {
        form.map(({ field, type, label }) => (
          <div key={field}>
            <label htmlFor={field} >{label}</label>
            <input type={type} id={field} name={label} required />
          </div>
        ))
      }
    </Form>)
}

