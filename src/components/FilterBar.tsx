import { Dispatch, SetStateAction } from "react";
import { SortOption } from "../app/home";
import { SortOrder } from "../hooks/useFilteredData";
import { CatModel } from "../services/catsService";

interface FilterBarProps {
  sortField: keyof CatModel;
  setSortField: Dispatch<SetStateAction<keyof CatModel>>;
  sortOptions: SortOption[];
  setSortOrder: (order: SortOrder) => void;
  sortOrder: SortOrder;
}

const FilterBar: React.FC<FilterBarProps> = ({
  sortField,
  setSortField,
  sortOptions,
  setSortOrder,
  sortOrder,
}) => {
  return (
    <>
      <select
        value={sortField}
        onChange={(e) => setSortField(e.target.value as keyof CatModel)}
        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center gap-2"
      >
        {sortOrder === "asc" ? "🔼 Sort Ascending" : "🔽 Sort Descending"}
      </button>
    </>
  );
};

export default FilterBar;
