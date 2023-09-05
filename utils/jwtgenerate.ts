import * as jose from 'jose'

const accessSecret = process.env.JWT_ACCESS_SECRET || "";
const refreshSecret = process.env.JWT_REFRESH_SECRET || "";
const ACCESS_MAX_AGE = process.env.ACCESS_MAX_AGE || 1800
const REFRESH_MAX_AGE = process.env.REFRESH_MAX_AGE || 2592000

const alg = 'HS256'

const JWT = {
    async generateAccessToken(user:any) {        
        const token = await new jose.SignJWT({ 'id': user.id })
                .setProtectedHeader({ alg })
                .setExpirationTime(`${ACCESS_MAX_AGE}s`)
                .sign(new TextEncoder().encode(accessSecret))

        const payload:ICookie = {
            key: "JWTAccessToken",
            value: token,
            cookie: {
                path: "/",
                httpOnly: true,
                maxAge: +ACCESS_MAX_AGE
            }
        }

        payload[Symbol.iterator] = function* () {
            for (const key in this) {
                if (typeof this[key] === 'object') {
                    for (const innerKey in this[key]) {
                        yield this[key][innerKey];
                    }
                } else {
                    yield this[key];
                }
            }
        }

        return payload
    },

    async generateRefreshToken(user:any) {
        const token = await new jose.SignJWT({ 'id': user.id })
                .setProtectedHeader({ alg })
                .setExpirationTime(`${REFRESH_MAX_AGE}s`)
                .sign(new TextEncoder().encode(refreshSecret))

        const payload:ICookie = {
            key: "JWTRefreshToken",
            value: token,
            cookie: {
                path: "/",
                httpOnly: true,
                maxAge: +REFRESH_MAX_AGE
            }
        }

        payload[Symbol.iterator] = function* () {
            for (const key in this) {
                if (typeof this[key] === 'object') {
                    for (const innerKey in this[key]) {
                        yield this[key][innerKey];
                    }
                } else {
                    yield this[key];
                }
            }
        }

        return payload
    },

    async verfiyAccessToken(token:string) {        
        const verified = await jose.jwtVerify(token, new TextEncoder().encode(accessSecret), {
            algorithms: [alg]
          }).catch(err => {throw new Error(err)})

        return verified
    },

    async verfiyRefreshToken(token:string) {
        const verified = await jose.jwtVerify(token, new TextEncoder().encode(refreshSecret), {
            algorithms: [alg]
          }).catch(err => {throw new Error(err)})
          
        return verified     
    }
}

export default JWT