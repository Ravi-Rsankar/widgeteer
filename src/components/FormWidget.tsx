import React from 'react';
interface FormWidgetProps {
    fields: { label: string; name: string; type: string }[];
    onSubmit: (data: { [key: string]: string }) => void;
}

export function FormWidget({ fields, onSubmit }: FormWidgetProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: string } = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        onSubmit(data);
    };

    return (
        <div>
            <h2>Form Widget</h2>
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.name}>
                        <label>{field.label}:</label>
                        <input type={field.type} name={field.name} />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
