// Define the props for the Pagination Controls component
interface PaginationControlsProps {
  pageIndex: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
}
// Pagination Controls component
const PaginationControls = ({ pageIndex, pageCount, setPageIndex }: PaginationControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="p-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPageIndex(0)}
        disabled={pageIndex === 0}
      >
        {'<<'}
      </button>
      <button
        className="p-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}
        disabled={pageIndex === 0}
      >
        {'<'}
      </button>
      <button
        className="p-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPageIndex(pageIndex + 1)}
        disabled={pageIndex >= pageCount - 1}
      >
        {'>'}
      </button>
      <button
        className="p-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPageIndex(pageCount - 1)}
        disabled={pageIndex >= pageCount - 1}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default PaginationControls; 