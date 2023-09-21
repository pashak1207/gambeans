import Prize from "@/components/client/Prize/Prize";
import style from "./page.module.scss"

export default function PrizePage({ params: {prizeId} }: { params: { prizeId: string } }) {    
    return (
        <main>
            <section className={style.prizeSection}>
                <Prize prizeId={prizeId} />
            </section>
        </main>
    )
}