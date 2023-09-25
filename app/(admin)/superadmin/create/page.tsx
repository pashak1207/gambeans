import AdminCafe from "@/components/admin/AdminCafe/AdminCafe";
import AdminMenu from "@/components/admin/AdminMenu/AdminMenu";
import AdminWrapper from "@/components/admin/AdminWrapper/AdminWrapper";
import styles from "./../../page.module.scss"


export default async function SuperdminCreatePage() {      
  
        return <main className={styles.adminMain}>
                    <AdminMenu superadmin={true} cafes={true} />
                    <AdminWrapper>
                        <AdminCafe isCreate={true}/>
                    </AdminWrapper>
                </main>
}