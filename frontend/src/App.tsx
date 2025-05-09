import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import TableEmployee from './components/TableEmployee/Table';
// Create a query client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the query client to the app
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full">
        <h1 className="text-2xl font-bold text-center mt-10">Employee List</h1>
          {/* Render the table */}
          <TableEmployee />
      </div>
    </QueryClientProvider>
  );
}

export default App;
