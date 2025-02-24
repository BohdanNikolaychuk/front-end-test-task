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
import { useGetCatsQuery } from "../services/catsService";
import { useAppSelector } from "../store/store";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

interface DataState<T = number> {
  name: string;
  value?: T;
  years?: T;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const { data, error, isLoading } = useGetCatsQuery();

  const [chartData, setChartData] = useState({
    adaptabilityData: [] as DataState[],
    affectionData: [] as DataState[],
    originData: [] as DataState[],
    indoorData: [] as DataState[],
    lapData: [] as DataState[],
    lifeSpanData: [] as DataState[],
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (data) {
      const adaptabilityData = data.map((cat) => ({
        name: cat.name,
        value: cat.adaptability || 0,
      }));
      const affectionData = data.map((cat) => ({
        name: cat.name,
        value: cat.affection_level || 0,
      }));

      const originCount = data.reduce((acc: { [key: string]: number }, cat) => {
        const origin = cat.origin || "Unknown";
        acc[origin] = (acc[origin] || 0) + 1;
        return acc;
      }, {});

      const originData = Object.keys(originCount).map((origin) => ({
        name: origin,
        value: originCount[origin],
      }));

      const indoorCount = data.reduce(
        (acc, cat) => {
          if (cat.indoor === 1) {
            acc.indoor = (acc.indoor || 0) + 1;
          } else if (cat.indoor === 0) {
            acc.outdoor = (acc.outdoor || 0) + 1;
          }
          return acc;
        },
        { indoor: 0, outdoor: 0 }
      );

      const indoorData = [
        { name: "Indoor", value: indoorCount.indoor },
        { name: "Outdoor", value: indoorCount.outdoor },
      ];

      const lapData = [
        { name: "Lap Cat", value: data.filter((cat) => cat.lap === 1).length },
        {
          name: "Not Lap Cat",
          value: data.filter((cat) => cat.lap === 0).length,
        },
      ];

      const lifeSpanData = data.map((cat) => ({
        name: cat.name,
        years: parseFloat(cat.life_span) || 0,
      }));

      setChartData({
        adaptabilityData,
        affectionData,
        originData,
        indoorData,
        lapData,
        lifeSpanData,
      });
    }
  }, [data]);

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
                  {chartData.originData.map((_, index) => (
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
                  {chartData.indoorData.map((_, index) => (
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
                  {chartData.lapData.map((_, index) => (
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
      <div className="m-8">
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="name">Name</option>
          <option value="value">Adaptability</option>
          <option value="value">Affection Level</option>
          <option value="years">Life Span</option>
        </select>
      </div>
      {/* Cats Grid */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((cat) => (
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
