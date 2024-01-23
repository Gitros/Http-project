import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';


export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('failed to fetch places');
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError(error);
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetchnig place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
