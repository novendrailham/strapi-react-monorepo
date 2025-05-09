// Define the props for the Page Size Selector component
interface PageSizeSelectorProps {
  pageSize: number;
  setPageSize: (size: number) => void;
}
// Page Size Selector component
const PageSizeSelector = ({ pageSize, setPageSize }: PageSizeSelectorProps) => {
  return (
    <select
      value={pageSize}
      onChange={(e) => {
        setPageSize(Number(e.target.value));
      }}
      className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
      {[5, 10, 20].map((size) => (
        <option key={size} value={size}>
          Show {size}
        </option>
      ))}
    </select>
  );
};

export default PageSizeSelector; 