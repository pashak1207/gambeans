import Image from "next/image"

export default function Loading() {
    return (
        <div className="loadingPane">
            <Image
                src="/loading.png"
                alt="loading..."
                width={185}
                height={224}
            />
            <h2>GamBeans</h2>
            <p>Boosting Cafe Loyalty</p>
        </div>
    )
}