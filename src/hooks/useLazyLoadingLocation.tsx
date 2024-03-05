import { useEffect, useState } from 'react';
import { ETypeForm } from 'src/App';
import { ICard } from 'src/components/Card';
import { useGetLocationsQuery } from 'src/store/api/location';
import { ILocation, ILocationQuery } from 'src/store/api/types';
import { useDebounce } from 'use-debounce';

const INITIAL_QUERYS: ILocationQuery = {
  page: 1,
  name: null,
  type: null,
  dimension: null
};

export type TLocationKeys = keyof typeof INITIAL_QUERYS;

export default function useLazyLoadingLocations(skip: boolean) {
  const [locations, setLocations] = useState<ILocation[] | null>(null);
  const [querys, setQuerys] = useState<ILocationQuery>(INITIAL_QUERYS);
  const [isAll, setIsAll] = useState<boolean>(false);

  const [debauncedQuerys] = useDebounce(querys, 500);

  const {
    isLoading: isLoadingLocations,
    data: locationsSlice,
    isSuccess,
    isError,
    isFetching
  } = useGetLocationsQuery(debauncedQuerys, { skip: skip });

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
    if (skip) {
      setLocations([]);
      setQuerys(INITIAL_QUERYS);
    }
  }, [skip]);

  useEffect(() => {
    if (locationsSlice && locationsSlice.length) {
      setLocations((prev) => {
        if (prev) {
          return [...prev, ...locationsSlice];
        }
        return locationsSlice;
      });
    }
    if (locationsSlice && !locationsSlice.length) {
      setIsAll(true);
    }
  }, [locationsSlice]);

  const handleChangeLocations = (key: TLocationKeys, value: string | null) => {
    setLocations([]);
    setQuerys((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const transformLocationsToCards = () => {
    if (locations?.length) {
      const cards: ICard[] = locations.map((location) => {
        return {
          id: location.id,
          name: location.name,
          img: `../locations/${location.id}.webp`,
          type: ETypeForm.location
        };
      });
      return cards;
    }
    return [];
  };

  const locationsCard = transformLocationsToCards();

  return { locations, locationsCard, isLoadingLocations, handleChangeLocations, querys };
}
