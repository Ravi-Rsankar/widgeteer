import React, { useState } from 'react';
import { GraphWidget } from '../components/GraphWidget';
import { TableWidget } from '../components/TableWidget';
import { FormWidget } from '../components/FormWidget';
import { ReactComponent as AddWidget } from '../assets/images/add-widget.svg';

type Widget = {
    key: number;
    data: any;
    type: any;
};

export default function WidgetContainer() {
    const [widgets, setWidgets] = React.useState<Widget[]>([]);
    const [showWidgetOptions, setShowWidgetOptions] = useState(false);

    function handleAddWidget(type: string) {
        setShowWidgetOptions(!showWidgetOptions)
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

    const handleConfigure = () => {
        setShowWidgetOptions(!showWidgetOptions);
    };

    return (
        <div className='App'>
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
            
            <div className='addwidget' onClick={handleConfigure}>
                <AddWidget />
            </div>
            <>{showWidgetOptions}</>
            {showWidgetOptions && (
                <div className="icon-list">
                    {/* Additional icons */}
                    <i className="fas fa-chart-bar" onClick={() => handleAddWidget("graph")}></i>
                    <i className="fas fa-table" onClick={() => handleAddWidget("table")}></i>
                    <i className="fas fa-file-alt" onClick={() => handleAddWidget("form")}></i>
                </div>
            )}
        </div>
    );
}
