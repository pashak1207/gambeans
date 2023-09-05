import style from "./DashboardCode.module.scss"

export default function DashboardCode() {
    return <div className={style.dashboardCode}>
        <h5>Daily code - </h5>
        <div className={style.inputs}>
            <input type="phone" maxLength={1} />
            <input type="phone" maxLength={1} />
            <input type="phone" maxLength={1} />
            <input type="phone" maxLength={1} />
        </div>
    </div>
}