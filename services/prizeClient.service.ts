const PrizeClientService = {
    
    async getAllPrizes() {
        const response = await fetch(`/api/prizes`)

        return await response.json()
    }
}

export default PrizeClientService;