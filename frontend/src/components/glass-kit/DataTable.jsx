import React from 'react';

/**
 * DataTable - Tableau simple aéré avec style glass
 */
export function DataTable({ columns, data }) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            {columns.map((c, i) => (
              <th key={i} className="p-4 text-white/80 font-medium line-clamp-1">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors duration-200">
              {columns.map((c, j) => (
                <td key={j} className="p-4 text-white/90">
                  {c.cell ? c.cell(row) : row[c.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
