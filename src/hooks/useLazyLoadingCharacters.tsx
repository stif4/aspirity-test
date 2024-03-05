import { useEffect, useState } from 'react';
import { ETypeForm } from 'src/App';
import { ICard } from 'src/components/Card';
import { getFilters, setFilters } from 'src/services/localStorage.service';
import { useGetCharactersQuery } from 'src/store/api/character';
import { ICharacter, ICharacterFilter, ICharacterQuery } from 'src/store/api/types';
import { useDebounce } from 'use-debounce';

const INITIAL_QUERYS: ICharacterQuery = {
  page: 1,
  name: null,
  status: null,
  species: null,
  type: null,
  gender: null
};

export type TCharacterKeys = keyof typeof INITIAL_QUERYS;

export default function useLazyLoadingCharacters(skip: boolean) {
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);
  const [querys, setQuerys] = useState<ICharacterQuery>(INITIAL_QUERYS);
  const [isAll, setIsAll] = useState<boolean>(false);
  const [isInitial, setIsInital] = useState<boolean>(true);
  const [debauncedQuerys] = useDebounce(querys, 500);

  const {
    isLoading: isLoadingCharacters,
    data: characterSlice,
    isSuccess,
    isError,
    isFetching
  } = useGetCharactersQuery(debauncedQuerys, { skip });

  useEffect(() => {
    if (!skip) {
      const onScroll = () => {
        const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (scrolledToBottom && !isFetching && !isAll) {
          setQuerys((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      };
      document.addEventListener('scroll', onScroll);
      return () => {
        document.removeEventListener('scroll', onScroll);
      };
    }
  }, [skip, querys, isFetching]);

  useEffect(() => {
    if (characterSlice && characterSlice.length) {
      setCharacters((prev) => {
        if (prev) {
          return [...prev, ...characterSlice];
        }
        return characterSlice;
      });
    }
    if (characterSlice && !characterSlice.length) {
      setIsAll(true);
    }
  }, [characterSlice]);

  const handleChangeCharacters = (key: TCharacterKeys, value: string | null) => {
    setCharacters([]);
    setQuerys((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const transformCharactersToCard = () => {
    if (characters) {
      const cardsCharacters: ICard[] = characters.map((character) => {
        return {
          id: character.id,
          name: character.name,
          img: character.image,
          type: ETypeForm.characters
        };
      });
      return cardsCharacters;
    }
    return [];
  };

  useEffect(() => {
    const storageFilters: ICharacterFilter = getFilters();
    setQuerys({ ...storageFilters, page: 1 });
    setIsInital(false);
  }, []);

  useEffect(() => {
    if (!isInitial) {
      const filters: ICharacterFilter = {
        name: null,
        status: querys.status,
        species: querys.species,
        type: querys.type,
        gender: querys.gender
      };
      setFilters(filters);
    }
  }, [querys]);

  const charactersCard = transformCharactersToCard();

  return { characters, charactersCard, isLoadingCharacters, handleChangeCharacters, querys };
}
