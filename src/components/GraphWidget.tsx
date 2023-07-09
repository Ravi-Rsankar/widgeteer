import Plot from 'react-plotly.js';
import DropDownProvider from './DropDownProvider';
import { useState } from 'react';

type GraphWidgetProps = {
    data: [{
        x: number[];
        y: number[];
    }];
};

export function GraphWidget({ data }: GraphWidgetProps) {
    console.log("data: ", data)
    const [param, setParam] = useState<string>("")
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const PLOT_COLORS = ["red", "blue"]
    const plotData: Plotly.Data[] = [];
    data.map((item, index) => {
        plotData.push({
            x: item.x,
            y: item.y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: PLOT_COLORS[index] },
        })
    })

    const layout = {
        title: 'Line Chart',
        xaxis: {
            title: 'X-axis',
        },
        yaxis: {
            title: 'Y-axis',
        },
        width: 400, // Set the desired width
        height: 300,
    };

    const _handleDropdownSelection = (item: string) => {
        setParam(item)
    };

    const dropdownItems: string[] = [
        "param1",
        "param2"
    ]
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
            id='graph-widget'
        >
            <div>Graph Widget</div>
            <DropDownProvider
                title={"Status"}
                bgColor={"white"}
                textColor={"black"}
                selectedValue={""}
                dropdownItems={dropdownItems}
                dropdownSelectionHandler={_handleDropdownSelection}
                noIcon
            />
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <Plot
                    data={plotData}
                    layout={layout}
                    config={{ responsive: true }}
                />
            </div>
        </div>
    );
}