import { useQuery } from "@tanstack/react-query";
import { Employee, EmployeeApiResponse, Pagination } from "../types/employee-type";


export const useEmployeeData = ({ start, limit }: { start: number; limit: number }) => {

  const fetchEmployee = async (): Promise<{ data: Employee[]; pagination: Pagination }> => {
    try {
      const response = await fetch(`http://localhost:1337/api/employees?pagination[start]=${start}&pagination[limit]=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },  
      });

      const data: EmployeeApiResponse = await response.json();
      const pagination = data.meta.pagination;
      
      return { data: data.data, pagination };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["employees", start, limit],
    queryFn: fetchEmployee,
  });
};