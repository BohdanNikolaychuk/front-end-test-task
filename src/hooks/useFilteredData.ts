import { useMemo } from "react";

export type SortOrder = "asc" | "desc";

interface UseFilteredDataProps<T> {
  data: T[] | undefined;
  sortField: keyof T;
  sortOrder: SortOrder;
}

const useFilteredData = <T extends object>({
  data,
  sortField,
  sortOrder,
}: UseFilteredDataProps<T>) => {
  return useMemo(() => {
    if (!data) return [];

    const filteredData = [...data].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });

    return filteredData;
  }, [data, sortField, sortOrder]);
};

export default useFilteredData;
