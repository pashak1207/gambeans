import React, { useState } from "react";
import styles from "./Dropdown.module.scss"

interface IProps {
    items: string[],
    defaultValue?: string,
    setState: React.Dispatch<React.SetStateAction<ICafe>>
}

export default function Dropdown({items, defaultValue, setState}:IProps) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [selected, setIsSelected] = useState<string>(defaultValue || "Choose one");

    function setActiveHandler(e : any){
        setIsSelected(e.target.textContent);
        setIsActive(!isActive);
        
        setState((prev:ICafe) => ({...prev, env_version: e.target.textContent}))
    }
    
    return (
        <div className={styles.dropdown}>
            <div
                onClick={(e) => {
                    setIsActive(!isActive);
                }}
                className={styles.dropdown_btn}
            >
            {selected}
            <span
                className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
            />
            </div>
            <div className={styles.dropdown_content} style={{ display: isActive ? "block" : "none" }} >
                {items.length > 0 && items.map((item:string, index:number) => {
                    return <div key={index} onClick={setActiveHandler} className={styles.item} >
                                {item}
                            </div>
                })}
            </div>
        </div>
    );
  }