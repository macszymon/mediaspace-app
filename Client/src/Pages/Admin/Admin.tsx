import { useState } from "react"
import AddTitle from "../../Components/AddTitle/AddTitle"

import styles from "./Admin.module.css"

type Props = {}

function Admin({}: Props) {
    const [active, setActive] = useState("addTitle")

  return (
    <div>
        <ul className={styles.list}>
            <li><button className="link" onClick={() => setActive("addTitle")}>Add title</button></li>
        </ul>
    {active === "addTitle" && <AddTitle/>} 
    </div>
  )
}

export default Admin