export async function fetchAvailablePlaces() {
  const res = await fetch("http://localhost:3000/places");
  if (!res.ok) throw new Error("Bad request");
  const data = await res.json();

  return data.places;
}


export async function fetchUserPlaces() {
  const res = await fetch("http://localhost:3000/user-places");
  if (!res.ok) throw new Error("Bad request");
  const data = await res.json();

  return data.places;
}

export async function postSelectedPlaces(places) {
  const res = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Bad request");
  const data = await res.json();

  return data.message;
}
