import Link from 'next/link'
import styles from './Button.module.scss'

interface IButtonProps {
    title: string
    isLink: boolean
    path?: string
    onClickHandler?: (event:any) => void
}

export default function Button({title, onClickHandler, isLink, path} : IButtonProps) {
    if(isLink && path){
      return(
        <Link className={styles.simpleButton} href={path} as="/dashboard">{title}</Link>
      )
    }else{
      return (
        <button onClick={onClickHandler} className={styles.simpleButton}>{title}</button>
      )
    }
  }