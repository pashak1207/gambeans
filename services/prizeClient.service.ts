const PrizeClientService = {
    
    async getAllPrizes() {
        const response = await fetch(`/api/prizes`)

        const body = await response.json()

        return body
    }
}

export default PrizeClientService;