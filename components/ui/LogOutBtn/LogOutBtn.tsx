'use client'
import AuthClientService from "@/services/authClient.service"
import styles from "./LogOutBtn.module.scss"
import { useRouter } from 'next/navigation'
import { Logout } from "@/dictionaries/type"

export default function LogOutBtn({dictionary, lang}:{dictionary:Logout, lang:string}) { 
    const router = useRouter()
    
    async function logOut(){
        AuthClientService.logOut().then(data => router.push("./login"))
    }

    return <button className={`${styles.logOutBtn} ${lang==="he" ? styles.rtl : ""}`} onClick={logOut}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <g id="material-symbols:logout-sharp">
                <path id="Vector" d="M3.125 21.875V3.125H12.5V5.20833H5.20833V19.7917H12.5V21.875H3.125ZM16.6667 17.7083L15.2344 16.1979L17.8906 13.5417H9.375V11.4583H17.8906L15.2344 8.80208L16.6667 7.29167L21.875 12.5L16.6667 17.7083Z" fill="#545454"/>
                </g>
            </svg>
            {dictionary.text}
        </button>
}