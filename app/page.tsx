import { generateObject } from "ai"
import { z } from "zod"
import { google } from "@ai-sdk/google";

export default async function Home() {

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

  const form = await generateForm("Please create form for signing up for event")

  console.log(form)

  return (<form>
    {
      form.map(({ field, type, label }) => (
        <div key={field}>
          <label htmlFor={field} >{label}</label>
          <input type={type} id={field} name={label} required />
        </div>
      ))
    }
  </form>)
  }

