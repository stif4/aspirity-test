import { useState } from 'react';
import BGParticles from './components/BGParticals';
import Banner from './components/Banner';
import CardList from './components/Card/CardLinst';
import Form from './components/Form';
import useLazyLoadingCharacters from './hooks/useLazyLoadingCharacters';
import useLazyLoadingEpisodes from './hooks/useLazyLoadingEpisode';
import useLazyLoadingLocations from './hooks/useLazyLoadingLocation';
import { PacmanLoader } from 'react-spinners';
import './style/global.scss';

export type TTypeForm = 'characters' | 'location' | 'episode';

export enum ETypeForm {
  characters = 'characters',
  location = 'location',
  episode = 'episode'
}

function App() {
  const [typeForm, setTypeForm] = useState<TTypeForm>(ETypeForm.characters);

  const handleChangeTypeForm = (type: string) => {
    setTypeForm(type as TTypeForm);
  };

  const {
    charactersCard,
    handleChangeCharacters,
    isLoadingCharacters,
    querys: querysCharacters
  } = useLazyLoadingCharacters(!(typeForm === ETypeForm.characters));

  const {
    episodesCard,
    isLoadingEpisodes,
    handleChangeEpisodes,
  } = useLazyLoadingEpisodes(!(typeForm === ETypeForm.episode));

  const {
    locationsCard,
    isLoadingLocations,
    handleChangeLocations,
  } = useLazyLoadingLocations(!(typeForm === ETypeForm.location));

  const getCurrentCards = () => {
    switch (typeForm) {
      case ETypeForm.characters: {
        return charactersCard;
      }
      case ETypeForm.episode: {
        return episodesCard;
      }
      case ETypeForm.location: {
        return locationsCard;
      }
      default:
        break;
    }
  };

  const currentCards = getCurrentCards();

  return (
    <div className="p-3">
      <Banner />
      <Form
        onChangeCharacter={handleChangeCharacters}
        onChangeEpisode={handleChangeEpisodes}
        onChangeLocation={handleChangeLocations}
        querysCharacters={querysCharacters}
        onChangeTypeForm={handleChangeTypeForm}
        typeForm={typeForm}
      />
      <BGParticles />
      {isLoadingCharacters || isLoadingEpisodes || isLoadingLocations ? (
        <div className="w-[100%] h-[200px] flex justify-center items-center">
          <PacmanLoader color="#76ff03" />
        </div>
      ) : (
        <CardList cards={currentCards ?? []} />
      )}
    </div>
  );
}

export default App;
