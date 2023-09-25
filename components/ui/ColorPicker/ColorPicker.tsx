import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./ColorPicker.module.scss"

export default function ColorPicker({colorStr, setCafe} : {colorStr: string, setCafe: Dispatch<SetStateAction<ICafe>>}){
    
    const [ color, setColor ] = useState<string>(colorStr)

    function onSetColorChange(e : React.ChangeEvent<HTMLInputElement>){
        let value = e.target.value
        setColor(value)
        setCafe(prev => ({...prev, color: value}))
    }

    return <input type="color" className={styles.color} value={color} onChange={onSetColorChange}/>
}