const PrizeClientService = {
    async setExpiredPrize(userprizeId: number, expiresAt:number): Promise<any> {
               
        const response = await fetch(`/api/prizes/setExpired`, {
            method: "POST",
            body: JSON.stringify({
                userprizeId,
                expiresAt
            })
        })

        return await response!.json()
    },

    async setUsedPrize(userprizeId: number): Promise<any> {
               
        const response = await fetch(`/api/prizes/setUsed`, {
            method: "POST",
            body: JSON.stringify({
                userprizeId,
            })
        })

        return await response!.json()
    },

    async setOpenedPrize(): Promise<any> {
               
        const response = await fetch(`/api/prizes/setOpened`, {
            method: "POST"
        })

        return await response!.json()
    }
}

export default PrizeClientService;