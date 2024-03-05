import { FormEvent } from 'react';
import Search from '../Search';
import Select from '../Select';
import style from './index.module.scss';
import { TCharacterKeys } from 'src/hooks/useLazyLoadingCharacters';
import { ICharacterQuery } from 'src/store/api/types';
import { ETypeForm, TTypeForm } from 'src/App';
import { TEpisodeKeys } from 'src/hooks/useLazyLoadingEpisode';
import { TLocationKeys } from 'src/hooks/useLazyLoadingLocation';

interface IForm {
  onChangeCharacter: (key: TCharacterKeys, value: string | null) => void;
  onChangeEpisode: (key: TEpisodeKeys, value: string | null) => void;
  onChangeLocation: (key: TLocationKeys, value: string | null) => void;
  querysCharacters: ICharacterQuery;
  typeForm: TTypeForm;
  onChangeTypeForm: (type: string) => void;
}

const SELECT_STATUS = ['ALIVE', 'dead', 'unknown', 'default'];
const SELECT_SPECIES = ['human', 'humanoid', 'alien', 'unknown', 'default'];
const SELECT_GENDER = ['female', 'male', 'genderless', 'unknown', 'default'];

const SELECT_TABEL = ['characters', 'location', 'episode'];

function Form({
  onChangeCharacter,
  querysCharacters,
  typeForm,
  onChangeTypeForm,
  onChangeEpisode,
  onChangeLocation
}: IForm) {
  const handleChangeSearch = (event: FormEvent<HTMLInputElement>) => {
    switch (typeForm) {
      case ETypeForm.characters: {
        return onChangeCharacter('name', event.currentTarget.value);
      }
      case ETypeForm.episode: {
        return onChangeEpisode('name', event.currentTarget.value);
      }
      case ETypeForm.location: {
        return onChangeLocation('name', event.currentTarget.value);
      }
      default:
        break;
    }
  };

  const handleChangeCharacterFilter = (
    type: 'status' | 'gender' | 'species',
    value: string | null
  ) => {
    onChangeCharacter(type, value);
  };

  const getPlaceholder = () => {
    switch (typeForm) {
      case ETypeForm.characters: {
        return 'search character';
      }
      case ETypeForm.episode: {
        return 'search episode';
      }
      case ETypeForm.location: {
        return 'search location';
      }
      default:
        break;
    }
  };

  const searchPlaceholder = getPlaceholder();

  return (
    <form className={style.form__container}>
      <div className={style.form__searchContainer}>
        <Search onChange={handleChangeSearch} placeholder={searchPlaceholder} />
      </div>

      {typeForm === ETypeForm.characters && (
        <div className={style.form__selectGroup}>
          <Select
            options={SELECT_STATUS}
            value={querysCharacters.status === null ? '' : querysCharacters.status}
            placeholder="status.."
            onChange={(value) =>
              handleChangeCharacterFilter('status', value === 'default' ? null : value)
            }
            id="1"
          />
          <Select
            options={SELECT_SPECIES}
            value={querysCharacters.species === null ? '' : querysCharacters.species}
            placeholder="species.."
            onChange={(value) =>
              handleChangeCharacterFilter('species', value === 'default' ? null : value)
            }
            id="2"
          />
          <Select
            options={SELECT_GENDER}
            value={querysCharacters.gender === null ? '' : querysCharacters.gender}
            placeholder="gender.."
            onChange={(value) =>
              handleChangeCharacterFilter('gender', value === 'default' ? null : value)
            }
            id="3"
          />
        </div>
      )}

      <div className={style.form__selectSingle}>
        <div className={style.form__selectSingleFlex}>
          <Select
            options={SELECT_TABEL}
            value={typeForm}
            placeholder="tabel.."
            onChange={onChangeTypeForm}
            id="4"
          />
        </div>
      </div>
    </form>
  );
}
export default Form;
