function Table({ headers, data }) {
  return (
    <table className="fl-table">
      <thead>
        <tr key={1}>
          {headers.map((head) => (
            <th key={head}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {headers.map((head) => (
              <td key={head}>{row[head]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
