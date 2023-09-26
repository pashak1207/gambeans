const UploadClientService = {
    
    async prizeImage(formData:FormData, prizeId: number): Promise<any> {
               
        const response = await fetch(`/api/upload/image?prize=${prizeId}`, {
            method: "POST",
            body: formData
        })

        return await response!.json()
    },

    async cafeImage(formData:FormData): Promise<any> {
               
        const response = await fetch(`/api/upload/image?cafe`, {
            method: "POST",
            body: formData
        })

        return await response!.json()
    },
}

export default UploadClientService;