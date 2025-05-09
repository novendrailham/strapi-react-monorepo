import { flexRender, HeaderGroup } from '@tanstack/react-table';

// Define the props for the Table Header component
interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
}
// Table Header component
const TableHeader = <T,>({ headerGroups }: TableHeaderProps<T>) => {
  return (
    <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              className="px-6 py-3 text-left text-xs font-semibol text-white uppercase tracking-wider"
            >
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader; 