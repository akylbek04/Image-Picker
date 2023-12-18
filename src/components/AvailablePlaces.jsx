import { Suspense, useEffect, useState } from "react";
import { lazy } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

const Places = lazy(() => import("./Places.jsx"));

export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const AvailablePlaces = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const sortedPlaces = sortPlacesByDistance(
            AvailablePlaces,
            coords.latitude,
            coords.longitude
          );
          setPlaces(sortedPlaces);
        });
      } catch (err) {
        setError({
          message: err.message || "can't fetch places, try again later",
        });
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Error
        title="An error occured."
        message={error.message}
        onConfirm={() => {}}
      />
    );
  }

  return (
    <Suspense fallback={<p>Loading</p>}>
      <Places
        title="Available Places"
        places={places}
        fallbackText="No places available."
        onSelectPlace={onSelectPlace}
      />
    </Suspense>
  );
}
