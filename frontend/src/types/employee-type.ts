// Define the Employee type
export interface Employee {
    id: number;  
    name: string;
    email: string;
    position: string;
  }

// Define the Pagination type
export interface Pagination {
    start: number;
    limit: number;
    total: number;
  }

// Define the Employee API response type
export interface EmployeeApiResponse {
    data: Employee[];
    meta: {
      pagination: Pagination;
    };
  }
