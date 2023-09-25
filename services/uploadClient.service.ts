const UploadClientService = {
    
    async prizeImage(formData:FormData): Promise<any> {
               
        const response = await fetch(`/api/upload/prize`, {
            method: "POST",
            body: formData
        })

        return await response!.json()
    },
}

export default UploadClientService;