"use client"

import UploadClientService from '@/services/uploadClient.service';
import React, { useRef, useState } from 'react';
import styles from "./ImagePrizeUpload.module.scss"
import PrizeClientService from '@/services/prizeClient.service';

export default function ImagePrizeUpload({ title, prizeId }:{ title:string, prizeId:number }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ url, setUrl ] = useState<string>(title.trim() ? title : "Add image")

  const uploadImage = async (e:React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      const formData = new FormData();   

      formData.set('image', file);

      const tempUrl = await UploadClientService.prizeImage(formData).then(data => data.url)
      setUrl(tempUrl);
      PrizeClientService.updateImage(prizeId, tempUrl)

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
      <button onClick={() => fileInputRef?.current?.click()}>{url}</button>
    </div>
  );
};