import CafeServerService from "@/services/cafeServer.service";
import Link from "next/link";
import styles from "./CafesPagination.module.scss"

export default async function CafesPagination({current, onPage}:{current:number, onPage: number}) { 
    
    const cafesCount = await CafeServerService.getAllCafesCount().then(data => data.cafes) as number
    const paginationPagesCount = Math.ceil(cafesCount / onPage)
    const paginationLinks:React.ReactNode[] = []    

    if(paginationPagesCount > 1){
        for(let i = 1; i <= paginationPagesCount; i++){                
            paginationLinks.push(<Link className={i===current ? styles.active : ""} key={i-1} href={`/superadmin/cafes?q=${i}`}>{i}</Link>)
        }

        return (<div className={styles.pagination}>
            {paginationLinks.length > 0 ? paginationLinks : null}
        </div>)

    }else{
        return <></>
    }
}