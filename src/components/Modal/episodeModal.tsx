import { PacmanLoader } from 'react-spinners';
import { useGetEpisodeByIdQuery } from 'src/store/api/episode';

function EpisodeModal({ id }: { id: number }) {
  const {
    isLoading: isLoadingEpisode,
    data: episode,
    isSuccess,
    isError,
    isFetching
  } = useGetEpisodeByIdQuery(id);

  if (isLoadingEpisode) {
    return (
      <div className="w-20 flex justify-center items-center h-10">
        <PacmanLoader color="#76ff03" />
      </div>
    );
  }

  return (
    <div>
      <div>name: {episode?.name}</div>
      <div>date: {episode?.air_date}</div>
      <div>episode: {episode?.episode}</div>
    </div>
  );
}
export default EpisodeModal;
