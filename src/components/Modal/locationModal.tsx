import { PacmanLoader } from 'react-spinners';
import { useGetLocationByIdQuery } from 'src/store/api/location';

function LocationModal({ id }: { id: number }) {
  const {
    isLoading: isLoadingLocation,
    data: location,
    isSuccess,
    isError,
    isFetching
  } = useGetLocationByIdQuery(id);

  if (isLoadingLocation) {
    return (
      <div className="w-20 flex justify-center items-center h-10">
        <PacmanLoader color="#76ff03" />
      </div>
    );
  }

  return (
    <div>
      <div>name: {location?.name}</div>
      <div>type: {location?.type}</div>
      <div>dimension: {location?.dimension}</div>
    </div>
  );
}
export default LocationModal;
