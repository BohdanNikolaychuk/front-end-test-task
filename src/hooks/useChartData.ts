import { useMemo } from "react";
import { CatModel } from "../services/catsService";

interface ChartData {
  adaptabilityData: { name: string; value: number }[];
  affectionData: { name: string; value: number }[];
  originData: { name: string; value: number }[];
  indoorData: { name: string; value: number }[];
  lapData: { name: string; value: number }[];
  lifeSpanData: { name: string; years: number }[];
}

const useChartData = (data: CatModel[] | undefined): ChartData => {
  return useMemo(() => {
    if (!data) return {} as ChartData;

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

    return {
      adaptabilityData,
      affectionData,
      originData,
      indoorData,
      lapData,
      lifeSpanData,
    };
  }, [data]);
};

export default useChartData;
