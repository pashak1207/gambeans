import styles from './Header.module.scss'
import Image from 'next/image';
import CafeServerService from '@/services/cafeServer.service';
import Link from 'next/link';

export default async function Header() {
 
  const {cafe: {color, logo}} = await CafeServerService.getCafe()

  return (
    <header className={styles.header} style={{background: color}}>
      <Link href={"/dashboard"} >
        <Image
            src={logo}
            priority
            alt="logo"
            width={70}
            height={41}
        />
      </Link>
    </header>
  )
  }