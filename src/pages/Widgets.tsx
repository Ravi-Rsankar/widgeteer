import React, { useState } from 'react';
import { GraphWidget } from '../components/GraphWidget';
import { TableWidget } from '../components/TableWidget';
import { FormWidget } from '../components/FormWidget';

export default function WidgetContainer() {
    const [widgets, setWidgets] = useState<any>([]);

    function handleFormSubmit(key: number) {
        // Get the form data from the DOM
        const formData = new FormData(document.querySelector(`#form-${key}`) as HTMLFormElement);
      
        // Convert the form data to an object
        const formObject: any = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
      
        // Log the form data to the console
        console.log(formObject);
      
        // Reset the form
        (document.querySelector(`#form-${key}`) as HTMLFormElement).reset();
      }
      
    function addWidget(type: string) {
        setWidgets([...widgets, { type }]);
    }

    function removeWidget(index: number) {
        const newWidgets = [...widgets];
        newWidgets.splice(index, 1);
        setWidgets(newWidgets);
    }

    function updateWidgetConfig(index: any, config: any) {
        const newWidgets = [...widgets];
        newWidgets[index].config = config;
        setWidgets(newWidgets);
    }

    function renderWidget(widget: any, index: number) {
        console.log(widget)
        switch (widget.type) {
            case 'graph':
                return <GraphWidget key={index} data={widget.config.data} type={widget.config.type} />;
            case 'table':
                return <TableWidget key={index} data={widget.config.data} headings={widget.config.headings} />;
            case 'form':
                return <FormWidget key={widget.key} fields={widget.fields} onSubmit={() => handleFormSubmit(widget.key)} />;
            default:
                return null;
        }
    }

    return (
        <div>
            <div>
                <button onClick={() => addWidget('graph')}>Add Graph</button>
                <button onClick={() => addWidget('table')}>Add Table</button>
                <button onClick={() => addWidget('form')}>Add Form</button>
            </div>
            {widgets.map((widget: any, index: any) => (
                <div key={index}>
                    <button onClick={() => removeWidget(index)}>Remove</button>
                    {renderWidget(widget, index)}
                    <div>
                        Widget {index} Configuration:
                        <pre>{JSON.stringify(widget.config, null, 2)}</pre>
                        <button onClick={() => updateWidgetConfig(index, {})}>Clear Config</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
