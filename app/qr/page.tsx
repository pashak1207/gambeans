import QR from "@/components/ui/QR/QR"
import styles from "./page.module.scss"
import { headers } from 'next/headers';

export default async function QRPage() {

    const headerList = headers()
    const proto = headerList.get("x-forwarded-proto") ? "https://" : "http://";
    const domain = headerList.get('host')    

    return (
        <main>
            <section className={styles.qr}>
                <QR domain={proto+domain} />
            </section>
        </main>
    )
}