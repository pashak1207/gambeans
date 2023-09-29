import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const Redirect = {
    loginPage(request: NextRequest){
        return NextResponse.redirect(new URL('/login', request.url))
    },

    dashboard(request: NextRequest){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    },

    notFound(request: NextRequest){
        return NextResponse.rewrite(new URL('/404', request.url))
    },

    superadmin(request: NextRequest){
        return NextResponse.rewrite(new URL('/superadmin', request.url))
    }
}

export default Redirect