import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./EditableText.module.scss"
import PrizeClientService from "@/services/prizeClient.service";

enum Prize_Cafe_change_fields {
  TEXT="TEXT",
  EXPIRES="EXPIRES",
  COST="COST",
  REVENUE="REVENUE",
  PROBABILITY="PROBABILITY",
  MAX_AMOUNT="MAX_AMOUNT",
  
  HEB_DOMAIN="HEB_DOMAIN",
  ENG_DOMAIN="ENG_DOMAIN",
  EMAIL="EMAIL",
  ADDRESS="ADDRESS",
  NAME="NAME",
  CONTACT_PHONE="CONTACT_PHONE",
  CONTACT_NAME="CONTACT_NAME",
  FTW="FTW",
  DAILY_PHONE="DAILY_PHONE",
}

const EditableText = ({ initialText, prizeId, type, setPrizes, setCafe, isPrize = true } : 
  { initialText:string, 
    prizeId?:number, 
    type?:Prize_Cafe_change_fields, 
    setPrizes?:Dispatch<SetStateAction<IPrize[]>>, 
    setCafe?:Dispatch<SetStateAction<ICafe>>, 
    isPrize:boolean }) => {
      
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {      
      setText(event.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);

        if(text.trim() === ""){
          if(type === Prize_Cafe_change_fields.TEXT){
            setText("Add prize name")
          }else if(type === Prize_Cafe_change_fields.EMAIL){
            setText("Add cafe email")
          }else if(type === Prize_Cafe_change_fields.ADDRESS){
            setText("Add cafe address")
          }else if(type === Prize_Cafe_change_fields.CONTACT_NAME){
            setText("Add cafe contact name")
          }else if(type === Prize_Cafe_change_fields.CONTACT_PHONE){
            setText("Add cafe contact phone")
          }else if(type === Prize_Cafe_change_fields.HEB_DOMAIN){
            setText("Enter HEB domain")
          }else if(type === Prize_Cafe_change_fields.ENG_DOMAIN){
            setText("Enter ENG domain")
          }else if(type === Prize_Cafe_change_fields.NAME){
            setText("Enter cafe name")
          }else if(type === Prize_Cafe_change_fields.FTW){
            setText("50")
          }else if(type === Prize_Cafe_change_fields.DAILY_PHONE){
            setText("Enter daily phone number")
          }else{
            setText("1")
          }
        }
        
        if(isPrize && setPrizes){
          setPrizes((prev:IPrize[]) => {
              return prev.map((prize:IPrize) => {
                if (prize.id === prizeId) {
                  const newPrize = prize

                  switch(type){
                      case Prize_Cafe_change_fields.TEXT:
                          newPrize.text = text
                          break;
                      case Prize_Cafe_change_fields.EXPIRES:
                          newPrize.expires_at = +text
                          break;
                      case Prize_Cafe_change_fields.COST:
                          newPrize.cost = +text
                          break;
                      case Prize_Cafe_change_fields.REVENUE:
                          newPrize.revenue = +text
                          break;
                      case Prize_Cafe_change_fields.PROBABILITY:
                          newPrize.probability = +text
                          break;
                      case Prize_Cafe_change_fields.MAX_AMOUNT:
                          newPrize.max_amount = +text
                          break;
                  }
                  PrizeClientService.updatePrize(newPrize)

                  return newPrize

                }
                return prize;
              });
          });
        }else if(!isPrize && setCafe){
          switch(type){
            case Prize_Cafe_change_fields.EMAIL:
              setCafe(prev => ({...prev, email: text}))
              return
            case Prize_Cafe_change_fields.ADDRESS:
              setCafe(prev => ({...prev, address: text}))
              return
            case Prize_Cafe_change_fields.CONTACT_NAME:
              setCafe(prev => ({...prev, contact_name: text}))
              return
            case Prize_Cafe_change_fields.CONTACT_PHONE:
              setCafe(prev => ({...prev, contact_phone: text}))
              return
            case Prize_Cafe_change_fields.HEB_DOMAIN:
              setCafe(prev => ({...prev, link_heb: text !== "Enter HEB domain" ? text : ""}))
              return
            case Prize_Cafe_change_fields.ENG_DOMAIN:
              setCafe(prev => ({...prev, link_eng: text !== "Enter ENG domain" ? text : ""}))
              return
            case Prize_Cafe_change_fields.NAME:
              setCafe(prev => ({...prev, name: text}))
              return
            case Prize_Cafe_change_fields.FTW:
              setCafe(prev => ({...prev, ftw: +text}))
              return
            case Prize_Cafe_change_fields.DAILY_PHONE:
              setCafe(prev => ({...prev, send_phone: text}))
              return
          }
        }
    };

    if(isPrize){   
      return (
        <div className={styles.doubleClick} onDoubleClick={handleDoubleClick}>
          {isEditing ? (
            <input
              type={type === Prize_Cafe_change_fields.TEXT ? "text" : "number"}
              maxLength={type === Prize_Cafe_change_fields.TEXT ? 35 : 10}
              autoFocus
              value={text}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : (
            <span>{text}</span>
          )}
        </div>
      );
    }
    
    return (
      <div className={styles.doubleClick} onDoubleClick={handleDoubleClick}>
          <input
            type={"text"}
            maxLength={35}
            autoFocus
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
          />
      </div>
    );
  };
  
  export default EditableText;