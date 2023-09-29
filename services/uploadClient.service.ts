const UploadClientService = {
    
    async prizeImage(formData:FormData, prizeId: number): Promise<{message?:string, url?:string}>{
               
        const response = await fetch(`/api/upload/image?prize=${prizeId}`, {
            method: "POST",
            body: formData
        })

        return await response!.json()
    },

    async cafeImage(formData:FormData): Promise<{message?:string, url?:string}>{
               
        const response = await fetch(`/api/upload/image?cafe`, {
            method: "POST",
            body: formData
        })

        return await response!.json()
    },
}

export default UploadClientService;