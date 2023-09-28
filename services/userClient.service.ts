const UserClientService = {   
    async updateChecked(userId: number, isActive: boolean): Promise<{message?:string, user?:IUser}> {

        const response = await fetch(`/api/users/${userId}?check`, {
            method: "PUT",
            body: JSON.stringify({
                isActive
            })
        })

        return await response!.json()
    },
}

export default UserClientService;