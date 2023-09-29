"use client"

import Image from "next/image"
import styles from "./Loading.module.scss"
import { useEffect, useState } from "react"

export default function Loading({delay}:{delay:number}) {
    const [visible, setVisible] = useState<boolean>(true);
    const [opacity, setOpacity] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
          setVisible(false);
        }, delay);

        const opacityTimer = setTimeout(() => {
            setOpacity(true)
        }, ((delay>1000 ? (delay - 2000) : 0)));

        return () => {
            clearTimeout(timer);
            clearTimeout(opacityTimer);
        };

    }, [delay]);

    return visible ? (
        <div className={`${styles.loadingPane} ${opacity ? styles.opacity : ""}`}>
            <Image
                src="/loading.png"
                alt="loading..."
                width={325}
                priority
                height={112}
            />
        </div>
    ) : null
}