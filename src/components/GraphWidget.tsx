import Plot from 'react-plotly.js';
import DropDownProvider from './DropDownProvider';
import { useState } from 'react';

type GraphWidgetProps = {
    data: {
        x: number[];
        y: number[];
    };
};

export function GraphWidget({ data }: GraphWidgetProps) {
    const [dataTagId, setDataTagId] = useState<string>("")
    const plotData: Plotly.Data[] = [
        {
            x: data.x,
            y: data.y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
        },
    ];

    const layout = {
        title: 'Line Chart',
        xaxis: {
            title: 'X-axis',
        },
        yaxis: {
            title: 'Y-axis',
        },
    };

    const _handleDropdownSelection = (item: string) => {
        setDataTagId(item)
    };

    const dropdownItems: string[] = [
        "dataTag1",
        "dataTag1"
    ]
    const handleDragStart = (event: any) => {
        event.dataTransfer.setData('text/plain', 'graph-widget');
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            style={{ cursor: 'move' }}
            id='graph-widget'
        >
            <h2>Graph Widget</h2>
            <DropDownProvider
                title={"Status"}
                bgColor={"white"}
                textColor={"black"}
                selectedValue={""}
                dropdownItems={dropdownItems}
                dropdownSelectionHandler={_handleDropdownSelection}
                noIcon
            />
            <Plot
                data={plotData}
                layout={layout}
            />
        </div>
    );
}