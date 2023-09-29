export interface IDictionary {
    meta: Meta
    welcome: Welcome2
    login: Login2
    dashboard: Dashboard2
    admin: Admin2
}

export interface Meta {
    welcome: Welcome
    login: Login
    dashboard: Dashboard
    admin: Admin
}

export interface Welcome {
    title: string
    desc: string
}

export interface Login {
    title: string
    desc: string
}

export interface Dashboard {
    title: string
    desc: string
}

export interface Admin {
    title: string
    desc: string
}

export interface Welcome2 {
    heading: string
    textStart: string
    textEnd: string
    rewards: string
    fun: string
    rights: string
    button: string
}

export interface Login2 {
    first: First
    second: Second
    third: Third
    fourth: Fourth
    fifth: Fifth
}

export interface First {
    title: string
    text: string
    small: string
    validation: string
    button: string
}

export interface Second {
    toast: string
    toast_sent: string
    title: string
    text: string
    resend: string
    timer: string
    validation: string
    button: string
    small: string
    terms: string
}

export interface Third {
    title: string,
    confirm: string,
    button: string,
    validEmail: string,
    validCheck: string
}

export interface Fourth {
    nameValid: string
    dateValid: string
    title: string
    name: string
    age: string
    button: string
}

export interface Fifth{
    title: string
    arrive: string
    scan: string
    unlock: string
    visit: string
    button: string
}

export interface Dashboard2 {
    heading: Heading
    main: Main
    code: Code
    prizes: Prizes
    prize: Prize
}

export interface Heading {
    prizes: string
}

export interface Main {
    journey: string
}

export interface Code {
    daily: string
}

export interface Prizes {
    titleStart: string
    titleEnd: string
    won: string
    noPrizes: string
    button: string
}

export interface Prize {
    scratch: string
    revel: string
    redeem: string
    show: string
    won: string
    try: string
    tomorrow: string
    work: string
    expires: string
    scr: string
    firstText: string
    scored: string
    secondText: string
    spin: string
    spinText: string
    jackpot: string
    jackpotText: string
    swipe: Swipe
    slot: Slot
}

export interface Slot{
    title: string
    button: string
}

export interface Swipe {
    redeem: string
    redeemed: string
}

export interface Admin2 {
    menu: Menu
    cafe: Cafe
}

export interface Menu {
    dashboard: string
    shops: string
    logout: Logout
}

export interface Logout {
    text: string
}

export interface Cafe {
    hbrEnv: string
    engEnv: string
    logoColor: string
    envVersion: string
    mail: string
    address: string
    join: string
    name: string
    phone: string
    ftw: string
    daily: string
    blocks: Blocks
}

export interface Blocks {
    dailyPhone: string
    dailyCode: string
    registrated: string
    visits: string
    new7: string
    return7: string
    revenue: string
    revenue30: string
    new30: string
    return30: string
}