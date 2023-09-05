import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const Redirect = {
    loginPage(request: NextRequest){
        return NextResponse.redirect(new URL('/login', request.url))
    },

    dashboard(request: NextRequest){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

export default Redirect