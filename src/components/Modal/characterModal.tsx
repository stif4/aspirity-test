import { PacmanLoader } from 'react-spinners';
import { useGetCharacterByIdQuery } from 'src/store/api/character';

function CharacterModal({ id }: { id: number }) {
  const {
    isLoading: isLoadingCharacter,
    data: character,
    isSuccess,
    isError,
    isFetching
  } = useGetCharacterByIdQuery(id);

  if (isLoadingCharacter) {
    return (
      <div className="w-20 flex justify-center items-center h-10">
        <PacmanLoader color="#76ff03" />
      </div>
    );
  }

  return (
    <div>
      <div>name: {character?.name}</div>
      <div>status: {character?.status}</div>
      <div>type: {character?.type}</div>
      <div>location: {character?.location}</div>
      <div>gender: {character?.gender}</div>
    </div>
  );
}
export default CharacterModal;
