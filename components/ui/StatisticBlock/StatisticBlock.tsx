import styles from "./StatisticBlock.module.scss"
import { formatNumber } from "@/utils/formatNumber"

interface IStatisticBlockProps{
    title: string,
    num: number | string,
    progress: number
}

export default function StatisticBlock({title, num, progress}:IStatisticBlockProps) {    
    return <div className={styles.item}>
        <h5>{title}</h5>
        <div className={styles.numbers}>
            {typeof num === 'number' ?
            <h4>{formatNumber(num)}</h4>
            :
            <h4>{num}</h4>}
            <p>
                {progress !== 0 &&
                    <span>{progress > 0 ? ("+" + progress.toString()) : progress.toString()}%</span>
                }
                {progress < 0
                    &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g id="ArrowFall">
                        <path id="Vector" fillRule="evenodd" clipRule="evenodd" d="M14.3463 3.63931C14.5455 3.83054 14.5519 4.14706 14.3607 4.34627L11.0007 7.84627C10.9064 7.94448 10.7761 8 10.64 8C10.5039 8 10.3736 7.94448 10.2793 7.84627L8.24 5.72199L5.82335 8.23933L7.54513 9.89223L2 11.5L3.38019 5.8939L5.10197 7.5468L7.87931 4.65373C7.97359 4.55552 8.10385 4.5 8.24 4.5C8.37615 4.5 8.50641 4.55552 8.60069 4.65373L10.64 6.77801L13.6393 3.65373C13.8305 3.45453 14.1471 3.44807 14.3463 3.63931Z" fill="#1C1C1C"/>
                        </g>
                    </svg>
                }
                {progress > 0
                    &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g id="ArrowRise">
                        <path id="Vector" fillRule="evenodd" clipRule="evenodd" d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z" fill="#1C1C1C"/>
                        </g>
                    </svg>
                }
            </p>
        </div>
    </div>
}