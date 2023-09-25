const CafeClientService = {

    async compareCodes(code: string) {
        const response = await fetch(`/api/cafes/compareCodes`, 
        {
            method: "POST", 
            body:JSON.stringify({
                userCode: code
            })}
        )

        return await response.json()
    },

    async updateCafe(cafeObj: ICafe): Promise<any> {

        const response = await fetch(`/api/cafes/${cafeObj.id}`, {
            method: "PUT",
            body: JSON.stringify({
                cafeObj
            })
        })

        return await response!.json()
    },
}

export default CafeClientService;