import styles from './Header.module.scss'
import Image from 'next/image';

interface IHeaderProps{
    logoURL: string;
    color: string;
}

export default function Header({logoURL, color} : IHeaderProps) {
    return (
      <header className={styles.header} style={{background: color}}>
        <Image
            src={logoURL}
            alt="logo"
            width={70}
            height={41}
        />
      </header>
    )
  }