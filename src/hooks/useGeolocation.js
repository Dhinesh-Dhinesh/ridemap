import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.log(error);
        return null;
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return position;
};

export default useGeolocation;