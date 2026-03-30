import { useForm } from "@tanstack/react-form";
import { exampleFormSchema } from "../model/schema";

export function ExampleForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      // eslint-disable-next-line no-alert
      alert(`Submitted:\nName: ${value.name}\nEmail: ${value.email}`);
    },
  });

  return (
    <div className="p-2">
      <h3>Example Form (TanStack Form + Zod)</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <div className="mb-2">
          <label>
            Name
            <form.Field
              name="name"
              validators={{
                onChange: exampleFormSchema.shape.name,
              }}
            >
              {(field) => (
                <>
                  <input
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="block border rounded px-2 py-1"
                    placeholder="Jane Doe"
                  />
                  {field.state.meta.errors.length ? (
                    <div className="text-red-600 text-sm">{field.state.meta.errors.join(", ")}</div>
                  ) : null}
                </>
              )}
            </form.Field>
          </label>
        </div>

        <div className="mb-2">
          <label>
            Email
            <form.Field
              name="email"
              validators={{
                onChange: exampleFormSchema.shape.email,
              }}
            >
              {(field) => (
                <>
                  <input
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="block border rounded px-2 py-1"
                    placeholder="jane@example.com"
                  />
                  {field.state.meta.errors.length ? (
                    <div className="text-red-600 text-sm">{field.state.meta.errors.join(", ")}</div>
                  ) : null}
                </>
              )}
            </form.Field>
          </label>
        </div>

        <button type="submit" className="mt-2 px-3 py-1 border rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
