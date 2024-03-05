import { useEffect, useState } from 'react';
import { ETypeForm } from 'src/App';
import { ICard } from 'src/components/Card';
import { useGetEpisodeQuery } from 'src/store/api/episode';
import { IEpisode, IEpisodeQuery } from 'src/store/api/types';
import { useDebounce } from 'use-debounce';

const INITIAL_QUERYS: IEpisodeQuery = {
  page: 1,
  name: null,
  episode: null
};

export type TEpisodeKeys = keyof typeof INITIAL_QUERYS;

export default function useLazyLoadingEpisodes(skip: boolean) {
  const [episodes, setEpisodes] = useState<IEpisode[] | null>(null);
  const [querys, setQuerys] = useState<IEpisodeQuery>(INITIAL_QUERYS);
  const [isAll, setIsAll] = useState<boolean>(false);

  const [debauncedQuerys] = useDebounce(querys, 500);

  const {
    isLoading: isLoadingEpisodes,
    data: episodesSlice,
    isSuccess,
    isError,
    isFetching
  } = useGetEpisodeQuery(debauncedQuerys, { skip: skip });

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
      setEpisodes([]);
      setQuerys(INITIAL_QUERYS);
    }
  }, [skip]);

  useEffect(() => {
    if (episodesSlice && episodesSlice.length) {
      setEpisodes((prev) => {
        if (prev) {
          return [...prev, ...episodesSlice];
        }
        return episodesSlice;
      });
    }
    if (episodesSlice && !episodesSlice.length) {
      setIsAll(true);
    }
  }, [episodesSlice]);

  const handleChangeEpisodes = (key: TEpisodeKeys, value: string | null) => {
    setEpisodes([]);
    setQuerys((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const transformEpisodesToCards = () => {
    if (episodes?.length) {
      const cards: ICard[] = episodes.map((episode) => {
        return {
          id: episode.id,
          name: episode.name,
          img: `../episodes/${episode.id}.webp`,
          type: ETypeForm.episode
        };
      });
      return cards;
    }
    return [];
  };

  const episodesCard = transformEpisodesToCards();

  return { episodes, episodesCard, isLoadingEpisodes, handleChangeEpisodes, querys };
}
