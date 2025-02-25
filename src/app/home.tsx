import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import FilterBar from "../components/FilterBar";
import useChartData from "../hooks/useChartData";
import useFilteredData, { SortOrder } from "../hooks/useFilteredData";
import { CatModel, useGetCatsQuery } from "../services/catsService";
import { useAppSelector } from "../store/store";

export type SortOption = {
  value: string;
  label: string;
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const SORT_OPTIONS: SortOption[] = [
  { value: "name", label: "Name" },
  { value: "origin", label: "Origin" },
  { value: "affection_level", label: "Affection Level" },
  { value: "adaptability", label: "Adaptability" },
];
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const { data, error, isLoading } = useGetCatsQuery();

  const [sortField, setSortField] = useState<keyof CatModel>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const chartData = useChartData(data);
  const sortedCats = useFilteredData<CatModel>({
    data,
    sortField,
    sortOrder,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error loading cats data</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cat Breeds Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Adaptability Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Adaptability Distribution
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={chartData.adaptabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Affection Levels */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Affection Levels</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={chartData.affectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Origins */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Top Origins</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData.originData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.originData?.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Indoor vs Outdoor Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Indoor vs Outdoor Preference
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData.indoorData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.indoorData?.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lap Cat Distribution */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Lap Cat Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData.lapData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.lapData?.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Life Span Distribution */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Life Span Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <LineChart data={chartData.lifeSpanData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="years" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 p-6 rounded-lg">
        <FilterBar
          sortField={sortField}
          setSortField={setSortField}
          sortOptions={SORT_OPTIONS}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
        />
      </div>

      {/* Cats Grid */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCats?.map((cat) => (
          <div
            key={cat.name}
            className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            <div className="p-4 md:p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {cat.name}
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-blue-600">
                Origin: {cat.origin || "Unknown"}
              </span>
              <p className="mt-3 text-gray-500 line-clamp-3">
                {cat.description || "No description available"}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Adaptability:</span>
                  <span>{cat.adaptability}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Affection Level:</span>
                  <span>{cat.affection_level}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Life Span:</span>
                  <span>{cat.life_span} years</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
