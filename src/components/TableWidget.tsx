import { useState } from "react";

type TableWidgetProps = {
    data: {
        name: string;
        age: number;
    }[];
};

export function TableWidget({ data }: TableWidgetProps) {
    const [isDragging, setIsDragging] = useState(false);
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
            }}
        >
            <h2>Table Widget</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            <td>{row.name}</td>
                            <td>{row.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}