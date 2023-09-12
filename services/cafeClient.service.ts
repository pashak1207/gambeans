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
    }
}

export default CafeClientService;