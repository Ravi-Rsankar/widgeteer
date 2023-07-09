import React, { useState } from 'react';
import { GraphWidget } from '../components/GraphWidget';
import { TableWidget } from '../components/TableWidget';
import { FormWidget } from '../components/FormWidget';
import { ReactComponent as AddWidget } from '../assets/images/add-widget.svg';

type Widget = {
    key: number;
    data: any;
    type: any;
    position: any;
};

export default function WidgetContainer() {
    const [widgets, setWidgets] = React.useState<Widget[]>([]);
    const [showWidgetOptions, setShowWidgetOptions] = useState(false);
    const [draggedWidget, setDraggedWidget] = useState(null);
    const spacing = 500;

    function handleAddWidget(type: string) {
        setShowWidgetOptions(!showWidgetOptions)
        const newWidget: Widget = {
            key: widgets.length,
            type: type,
            data: null,
            position: { x: 0, y: 0 },
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

    const handleDrop = (event: any) => {
        event.preventDefault();
        const droppedWidgetId = event.dataTransfer.getData('text/plain');
        const droppedWidget = widgets.find((widget) => widget.key === parseInt(droppedWidgetId));
        if (droppedWidget) {
            const updatedWidgets = widgets.map((widget) => {
                if (widget.key === droppedWidget.key) {
                    return {
                        ...widget,
                        position: {
                            x: event.clientX,
                            y: event.clientY,
                        },
                    };
                }
                return widget;
            });
            setWidgets(updatedWidgets);
        }
        setDraggedWidget(null);
    };

    const handleDragStart = (event: any, widget: any) => {
        event.dataTransfer.setData('text/plain', widget.key.toString());
        setDraggedWidget(widget);
    };

    const handleDragEnd = () => {
        setDraggedWidget(null);
    };

    return (
        <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            style={{ width: '100%', height: '100%', position: 'relative' }}
        >
            {widgets.map((widget, index) => (
                <div key={widget.key}
                    draggable
                    onDragStart={(event) => handleDragStart(event, widget)}
                    onDragEnd={handleDragEnd}
                    style={{
                        position: 'absolute',
                        left: index * spacing,
                        top: 0,
                    }}
                >
                    {widget.type === "graph" && (
                        <GraphWidget
                            data={widget.data}
                            // draggableProps={{
                            //     onDragStart: (event: any) => handleDragStart(event, widget),
                            //     onDragEnd: handleDragEnd,
                            // }}
                        />
                    )}
                    {widget.type === "table" && (
                        <TableWidget data={widget.data}
                            // draggableProps={{
                            //     onDragStart: (event: any) => handleDragStart(event, widget),
                            //     onDragEnd: handleDragEnd,
                            // }}
                        />
                    )}
                    {widget.type === "form" && (
                        <FormWidget fields={widget.data.fields} onSubmit={() => handleFormSubmit(widget.key)}
                            // draggableProps={{
                            //     onDragStart: (event) => handleDragStart(event, widget),
                            //     onDragEnd: handleDragEnd,
                            // }} 
                        />
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
