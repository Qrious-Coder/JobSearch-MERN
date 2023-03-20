import React, { useState } from 'react'
import styles from './styles.modules.scss'
import { useSelector} from "react-redux"
import cs from 'classnames'

const Alert= ({children}) => {
  const [ isShow, setIsShow ] = useState(true)
  const { alertText, alertType, showAlert } = useSelector( state => state.common)
  const handleClose = () => {
    setIsShow( prevState => !prevState )
  }
  const renderChildEl = () => {
    return React.cloneElement(children)
  }
  return (
    <>
      { showAlert && <div className={ cs( styles.alert, 
        styles[alertType],
        !isShow && styles.isHide )}>
        <span className={ styles.closeBtn }
          onClick={ handleClose }
        >
          &times;
        </span>
        { children ? renderChildEl() : alertText}     
      </div> }
    </>

  )
}

export default Alert

/**ref: https://blog.logrocket.com/create-custom-react-alert-message */