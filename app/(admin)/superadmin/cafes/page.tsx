import styles from "./../../page.module.scss"
import AdminMenu from '@/components/admin/AdminMenu/AdminMenu'
import AdminWrapper from '@/components/admin/AdminWrapper/AdminWrapper'
import SuperAdminCafes from "@/components/superadmin/SuperAdminCafes/SuperAdminCafes"
import CafesPagination from "@/components/ui/CafesPagination/CafesPagination"
import { getDictionary } from "@/dictionaries/dictionaries"
import CafeServerService from "@/services/cafeServer.service"
import { headers } from "next/headers"

export default async function SuperdminPage({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {      
    
        const paginationParams = searchParams["q"] ? +searchParams["q"] : 1
            
        let cafes:ICafe[] = [];
        let onPage:number = 0;
        
        const lang = headers().get('x-language') || "en"
        const dict = await getDictionary(lang)
        
        await CafeServerService.getAllCafes(paginationParams).then(data => {
            cafes = data.cafes!
            onPage = data.onPage!
        });

        return <main className={styles.adminMain}>
                    <AdminMenu lang={lang} dictionary={dict.admin.menu} superadmin={true} cafes={true} />
                    <AdminWrapper>
                        <SuperAdminCafes cafes={cafes} />
                        <CafesPagination current={paginationParams} onPage={onPage} />
                    </AdminWrapper>
                </main>
}