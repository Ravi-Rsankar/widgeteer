
interface GraphWidgetProps {
    data: number[];
    type: string;
}

export function GraphWidget({ data }: GraphWidgetProps) {
    return (
        <div>
            <h2>Graph Widget</h2>
            <p>Data: {JSON.stringify(data)}</p>
            {/* Graph implementation goes here */}
        </div>
    );
}
