import UploadClientService from '@/services/uploadClient.service';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import styles from "./ImageCafeUpload.module.scss"

export default function ImageCafeUpload({ url, editable, setCafe }:{ url:string, editable:boolean, setCafe:Dispatch<SetStateAction<ICafe>> }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>(url);

  const uploadImage = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const formData = new FormData();   
    
    formData.set('image', file);
    
    const url = await UploadClientService.prizeImage(formData).then(data => data.url);
    setImageUrl(URL.createObjectURL(file));
    setCafe(prev => ({...prev, logo: url}))    

    e.target.value = '';
  };

  return (
    <div className={styles.upload}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={uploadImage}
      />
      { editable && <button className={styles.transparent} onClick={() => fileInputRef?.current?.click()}></button> }
      <Image alt='Logo' width={270} height={155} src={imageUrl} />
    </div>
  );
};