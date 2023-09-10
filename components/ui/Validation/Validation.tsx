import styles from "./Validation.module.scss"

interface IValidationProps{
    isValid: boolean
    text: string
}

export default function Validation({isValid, text}:IValidationProps) {
    if(!isValid && text){
        return (
            <div className={styles.validation}>
                <p>{text}</p>
            </div>
        )
    }
}