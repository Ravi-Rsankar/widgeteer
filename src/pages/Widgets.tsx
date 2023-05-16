import React, { useState } from 'react';
import { GraphWidget } from '../components/GraphWidget';
import { TableWidget } from '../components/TableWidget';
import { FormWidget } from '../components/FormWidget';

type Widget = {
    key: number;
    data: any;
    type: any;
  };
  
export default function WidgetContainer() {
    const [widgets, setWidgets] = React.useState<Widget[]>([]);

  function handleAddWidget(type: string) {
    const newWidget: Widget = {
      key: widgets.length,
      type: type,
      data: null
    };

    if (type === "graph") {
      newWidget.data = [
        {
          x: [1, 2, 3, 4, 5],
          y: [1, 3, 2, 4, 5],
          type: 'scatter',
          mode: 'lines',
          name: 'Line 1',
        },
        {
          x: [1, 2, 3, 4, 5],
          y: [2, 1, 4, 3, 2],
          type: 'scatter',
          mode: 'lines',
          name: 'Line 2',
        },
      ];
    } else if (type === "table") {
      newWidget.data = [
        { name: "John", age: 25 },
        { name: "Jane", age: 30 },
        { name: "Bob", age: 35 }
      ];
    } else if (type === "form") {
      newWidget.data = {
        fields: [
          { name: "Name", type: "text" },
          { name: "Email", type: "email" },
          { name: "Password", type: "password" }
        ]
      };
    }

    setWidgets([...widgets, newWidget]);
  }

  function handleFormSubmit(key: number) {
    console.log(`Form submitted for widget with key: ${key}`);
  }

  return (
    <div>
      <div className='ml-5 mt-5 pt-1'>
        <button onClick={() => handleAddWidget("graph")}>Add Graph Widget</button>
        <button onClick={() => handleAddWidget("table")}>Add Table Widget</button>
        <button onClick={() => handleAddWidget("form")}>Add Form Widget</button>
      </div>
      {widgets.map((widget) => (
        <div key={widget.key}>
          {widget.type === "graph" && (
            <GraphWidget data={widget.data} />
          )}
          {widget.type === "table" && (
            <TableWidget data={widget.data} />
          )}
          {widget.type === "form" && (
            <FormWidget fields={widget.data.fields} onSubmit={() => handleFormSubmit(widget.key)} />
          )}
        </div>
      ))}
    </div>
  );
}
