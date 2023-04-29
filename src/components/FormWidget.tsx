type FormWidgetProps = {
    fields: {
      name: string;
      type: string;
    }[];
    onSubmit: () => void;
  };
  
  export function FormWidget({ fields, onSubmit }: FormWidgetProps) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      onSubmit();
    }
  
    return (
      <div>
        <h2>Form Widget</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field, i) => (
            <div key={i}>
              <label htmlFor={field.name}>{field.name}</label>
              <input type={field.type} id={field.name} />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }