/* eslint-disable react/prop-types */
export default function GenericTable(props) {
  const headers = props.headers || [];
  const rows = props.rows || [];

  // Normalizamos headers a objetos { key, label }
  const columnDefs = headers.map((h) =>
    typeof h === "string" ? { key: h, label: h } : h,
  );

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {columnDefs.map(({ key, label }) => (
            <th key={key} style={cellStyle}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {columnDefs.map(({ key }) => (
              <td key={key} style={cellStyle}>
                {row[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};
