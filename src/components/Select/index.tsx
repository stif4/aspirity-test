import { useState, useMemo, useEffect, InputHTMLAttributes } from 'react';
import style from './index.module.scss';

interface ISelect extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  options: string[];
  onChange: (value: string) => void;
}

function Select({ options, id, onChange, ...rest }: ISelect) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleOutsideClick(e: globalThis.MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(`#Toggle-${id}`) && !target.closest(`#Select-${id}`)) setOpen(false);
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const opt = useMemo(() => {
    const OPTIONS = options.filter((o) => o.toString().toLowerCase() !== '');

    return OPTIONS.length > 0
      ? OPTIONS.map((o, i) => (
          <div
            key={i}
            className={style.select__option}
            onClick={() => {
              onChange(o.toString());
              setOpen(false);
            }}>
            {o}
          </div>
        ))
      : [
          <div
            key={'not-found'}
            className={style.select__optionNotFound}
            onClick={() => {
              onChange('');
              setOpen(false);
            }}>
            No Matches Found
          </div>
        ];
  }, [options]);

  return (
    <div id={`Select-${id}`} className={style.select__container}>
      <div className={style.select__inputContainer}>
        <input className={style.select__input} readOnly onFocus={() => setOpen(true)} {...rest} />
        <span
          className={style.select__inputSpan}
          onClick={() => setOpen((p) => !p)}
          id={`Toggle-${id}`}>
          <span className={style.select__inputSpanRow}></span>
        </span>
      </div>
      {open ? (
        <div id="options" className={style.select__optionsContainer}>
          {opt}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Select;
