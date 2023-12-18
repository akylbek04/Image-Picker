import { Suspense} from "react";
import { lazy } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import useFecth from "../hooks/useFecth.js";

const Places = lazy(() => import("./Places.jsx"));

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const sortedPlaces = sortPlacesByDistance(places, latitude, longitude);
        resolve(sortedPlaces);
      }
    );
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const { error, data: places } = useFecth(fetchSortedPlaces, []);

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
    <Suspense fallback={<p>...Loading</p>}>
      <Places
        title="Available Places"
        places={places}
        fallbackText="No places available."
        onSelectPlace={onSelectPlace}
      />
    </Suspense>
  );
}
