import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./EditableText.module.scss"
import PrizeClientService from "@/services/prizeClient.service";

enum Prize_change_fields {
    TEXT="TEXT",
    IMAGE="IMAGE",
    EXPIRES="EXPIRES",
    COST="COST",
    REVENUE="REVENUE",
    PROBABILITY="PROBABILITY",
    MAX_AMOUNT="MAX_AMOUNT",
}

const EditableText = ({ initialText, prizeId, type, setPrizes } : { initialText:string, prizeId:number, type:Prize_change_fields, setPrizes:Dispatch<SetStateAction<IPrize[]>> }) => {
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
        
        setPrizes((prev:IPrize[]) => {
            return prev.map((prize:IPrize) => {
              if (prize.id === prizeId) {
                const newPrize = prize

                switch(type){
                    case Prize_change_fields.TEXT:
                        newPrize.text = text
                        break;
                    case Prize_change_fields.IMAGE:
                        newPrize.image = text
                        break;
                    case Prize_change_fields.EXPIRES:
                        newPrize.expires_at = +text
                        break;
                    case Prize_change_fields.COST:
                        newPrize.cost = +text
                        break;
                    case Prize_change_fields.REVENUE:
                        newPrize.revenue = +text
                        break;
                    case Prize_change_fields.PROBABILITY:
                        newPrize.probability = +text
                        break;
                    case Prize_change_fields.MAX_AMOUNT:
                        newPrize.max_amount = +text
                        break;
                }
                PrizeClientService.updatePrize(newPrize)

                return newPrize

              }
              return prize;
            });
        });
    };
  
    return (
      <div className={styles.doubleClick} onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <input
            type="text"
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
  };
  
  export default EditableText;