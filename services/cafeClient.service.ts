const CafeClientService = {

    async compareCodes(code: string) {
        const response = await fetch(`/api/cafes/compareCodes`, 
        {
            method: "POST", 
            body:JSON.stringify({
                userCode: code
            })}
        )

        const body = await response.json()

        return body
    }
}

export default CafeClientService;