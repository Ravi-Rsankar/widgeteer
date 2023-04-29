type TableWidgetProps = {
    data: {
      name: string;
      age: number;
    }[];
  };
  
  export function TableWidget({ data }: TableWidgetProps) {
    return (
      <div>
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