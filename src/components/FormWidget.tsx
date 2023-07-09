import { useState } from "react";

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

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const handleDragStart = (event: any) => {
        event.dataTransfer.setData('text/plain', 'graph-widget');
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
                cursor: 'move',
                border: isDragging ? '2px dashed #999' : '2px solid transparent',
                padding: '8px 10px 10px 10px',
                margin: '34px',
                backgroundColor: '#f0f0f0',
                width: '430px',
                height: '380px',
                display: 'flex',
                flexDirection: 'column',
                left: position.x,
                top: position.y,
            }}
        >
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