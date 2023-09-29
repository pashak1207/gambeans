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

    async getSortedUsers(orderBy:string, method:string):Promise<{message?:string, users?:IUser[]}> {

        const response = await fetch(`/api/users?orderBy=${orderBy}&method=${method}`)
       
        
        return await response!.json()
    },
}

export default UserClientService;