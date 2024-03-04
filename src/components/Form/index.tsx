import { useState } from 'react';
import Search from '../Search';
import Select from '../Select';
import style from './index.module.scss';

function Form() {
  const [dataFilter, setDataFilter] = useState({ some: '' });

  const dataSomeChange = (value: string) => {
    setDataFilter((prev) => {
      return { ...prev, some: value };
    });
  };
  return (
    <form className={style.form__container}>
      <div className={style.form__searchContainer}>
        <Search />
      </div>

      <div className={style.form__selectGroup}>
        <Select
          options={['1', '2', '4', '5']}
          value={dataFilter.some}
          placeholder="some"
          onChange={dataSomeChange}
          id="1"
        />
        <Select
          options={['1', '2', '4', '5']}
          value={dataFilter.some}
          placeholder="some"
          onChange={dataSomeChange}
          id="2"
        />
        <Select
          options={['1', '2', '4', '5']}
          value={dataFilter.some}
          placeholder="some"
          onChange={dataSomeChange}
          id="3"
        />
      </div>
      <div className={style.form__selectSingle}>
        <div className={style.form__selectSingleFlex}>
          <Select
            options={['1', '2', '4', '5']}
            value={dataFilter.some}
            placeholder="some"
            onChange={dataSomeChange}
            id="3"
          />
        </div>
      </div>
    </form>
  );
}

export default Form;
