import Form from "next/form";

export default async function Page() {
  return (
    <Form action="/form">
      <input name="query" />
      <button type="submit">Generate form</button>
    </Form>
  )
}




