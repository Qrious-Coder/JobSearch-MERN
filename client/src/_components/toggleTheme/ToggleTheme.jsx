import React, { useState, useEffect } from 'react';
import Switch from "react-switch";
import {switchTheme} from "../../_actions/commonAction";
import { useSelector, useDispatch } from "react-redux";
import { TbSun , TbSunOff } from 'react-icons/tb';
import styles from './styles.module.scss'

const ToggleTheme = () => {
  const { theme } = useSelector( state => state.common )
  const dispatch = useDispatch()
  const [ curTheme, setCurTheme ] = useState(theme)
  const isLight = curTheme === 'light'
  //If no Ls saved, set theme back to default: light
  useEffect(() => {
    let savedTheme = localStorage.getItem('theme')
    if( savedTheme) {
      setCurTheme( savedTheme )
    }else{
      setCurTheme('light')
    }
  }, [])


  useEffect(() => {
    localStorage.setItem('theme', curTheme)
    document.body.setAttribute('data-theme', curTheme)
  }, [curTheme])

  const toggleTheme = (cur ) => {
    if(isLight) {
      setCurTheme('dark')
    }else{
      setCurTheme('light')
    }
    dispatch(switchTheme(cur))
  };


  return (
    <div className={ styles.switchCtn }>
      <Switch checked={ curTheme === 'dark'}
        onChange={ () => toggleTheme(curTheme) }
        onColor={ '#bef8fd'}
        onHandleColor ={ '#0e7c86' }
        uncheckedIcon = {<TbSun color='#fff'  fontSize='28px' />}
        checkedIcon={ <TbSunOff color='#9fb3c8'  fontSize='28px' />}
        width={60}
        height={28}
      />
    </div>
  );
};

export default ToggleTheme;