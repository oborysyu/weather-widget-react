import moment from "moment";
import { useEffect, useState } from "react";

export default function useFetch(city: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // method to update weather data
  const updateData = (data: any) => {
    const full = [];
    const advanced = [];
    for (let i = 0; i < data.list.length; i++) {
      if (moment(data.list[i].dt_txt).isSame(new Date(), "day")) {
        full.push({
          city,
          time: moment(data.list[i].dt_txt).format("D MMMM, HH:mm"),
          temperature: data.list[i].main.temp,
          humidity: data.list[i].main.humidity,
          wind: data.list[i].wind.speed,
          icon: data.list[i].weather[0].icon,
        });
      }
      if(i <=10) {
        advanced.push({
          city,
          time: moment(data.list[i].dt_txt).format("D MMMM, HH:mm"),
          temperature: data.list[i].main.temp,
          feels_like: data.list[i].main.feels_like,
          humidity: data.list[i].main.humidity,
          wind: data.list[i].wind.speed,
          icon: data.list[i].weather[0].icon,
        });
      }
    }
    const short = full.slice(0, 2);
    const current = {
      city,
      time: data.list[0].dt_txt,
      humidity: data.list[0].main.humidity,
      temperature: data.list[0].main.temp,
      wind: data.list[0].wind.speed,
      icon: data.list[0].weather[0].icon,
    };
    return { current, full, short, advanced };
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      const response = await fetch(
        import.meta.env.VITE_PUBLIC_API_URL +
          `?q=${city}&units=metric&APPID=${import.meta.env.VITE_PUBLIC_KEY}`
      );
      const result = await response.json();
      setLoading(false);
      if (result.cod === "200") {
        setError(null);
        setData(updateData(result));
      } else {
        setError(result.message);
      }
    };

    fetchData();
  }, [city]);

  return { data, error, loading };
}
