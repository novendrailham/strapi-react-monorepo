import { useEffect, useReducer, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEmployeeData } from '../../services/employeeService';
import 'react-loading-skeleton/dist/skeleton.css';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import PaginationControls from './PaginationControls';
import PageSizeSelector from './PageSizeSelector';
import RefreshButton from './RefreshButton';
import { Employee } from '../../types/employee-type';

// Define the default columns for the table
const defaultColumns: ColumnDef<Employee>[] = [
  {
    id: 'employeeInfo',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'email',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'position',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
  },
];

export default function TableEmployee() {
  // Define the state for the table
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  // Fetch the data from the API
  const { data } = useEmployeeData({ start, limit });

  // Update the state when the page index or page size changes
  useEffect(() => {
    setLoading(true);
    setStart(pageIndex * pageSize);
    setLimit(pageSize);
  }, [pageIndex, pageSize]);

  // Update the loading state when the data is fetched
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  }, [data]);

  // Define the columns for the table
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);

  // Define the rerender function
  const rerender = useReducer(() => ({}), {})[1];

  // Define the page count
  const pageCount = data?.pagination?.total && data?.pagination?.limit ? Math.ceil(data.pagination.total / data.pagination.limit) : 0;

  // Define the safe page index
  const safePageIndex = pageCount > 0 ? (pageIndex >= pageCount ? pageCount - 1 : pageIndex) : 0;

  // Define the table
  const table = useReactTable({
    data: data?.data || [],
    columns,
    pageCount: pageCount,
    state: {
      pagination: {
        pageIndex: safePageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex: safePageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  // Render the table
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headerGroups={table.getHeaderGroups()} />
          <TableBody 
            rows={table.getRowModel().rows} 
            loading={loading} 
            pageSize={pageSize} 
            columnsLength={columns.length} 
          />
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <PaginationControls 
          pageIndex={safePageIndex} 
          pageCount={pageCount} 
          setPageIndex={setPageIndex} 
        />

        {/* Page Info */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Page <span className="font-medium text-indigo-700">{safePageIndex + 1}</span> of{' '}
            <span className="font-medium text-indigo-700">{pageCount}</span>
          </span>

          {/* Go to Page Input */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Go to:</span>
            <input
              type="number"
              min={1}
              max={pageCount}
              defaultValue={safePageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                setPageIndex(page);
              }}
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Page Size Selector */}
          <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-4 flex justify-end">
        <RefreshButton rerender={rerender} />
      </div>
    </div>
  );
}