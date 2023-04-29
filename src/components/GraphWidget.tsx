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
  
    const _handleDropdownSelection = (item: string) => {
        setDataTagId(item)
    };

    const dropdownItems: string[] = [
        "dataTag1",
        "dataTag1"
    ]
    return (
      <div>
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
          layout={{ width: 500, height: 400, title: 'Line Chart' }}
        />
      </div>
    );
  }