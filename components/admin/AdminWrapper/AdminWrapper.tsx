import styles from "./AdminWrapper.module.scss"

export default function AdminWrapper({children}:{children:React.ReactNode}) {    
    return <section className={styles.adminWrapper}>
        {children}
    </section>
}