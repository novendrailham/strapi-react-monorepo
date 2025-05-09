import { flexRender, Row } from '@tanstack/react-table';
import Skeleton from 'react-loading-skeleton';

// Define the props for the Table Body component
interface TableBodyProps<T> {
  rows: Row<T>[];
  loading: boolean;
  pageSize: number;
  columnsLength: number;
}
// Table Body component
const TableBody = <T,>({ rows, loading, pageSize, columnsLength }: TableBodyProps<T>) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {loading ? (
        // Render the skeleton for the table body
        Array.from({ length: pageSize }).map((_, index) => (
          <tr key={index} className="hover:bg-indigo-50 transition-colors duration-150">
            {Array.from({ length: columnsLength }).map((_, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <Skeleton height={10} />
              </td>
            ))}
          </tr>
        ))
      ) : (
        // Render the table body
        rows.length === 0 ? (
          <tr>
            <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-700">
              Data not available
            </td>
          </tr>
        ) : (
          rows.map((row, index) => (
            <tr 
              key={row.id} 
              className={`hover:bg-indigo-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        )
      )}
    </tbody>
  );
};

export default TableBody; 