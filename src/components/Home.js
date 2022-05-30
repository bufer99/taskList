import styles from '../styles/Home.module.css'
import { default as logo } from '../media/clipboard.png';

export const Home = () => {
    return (
        <div className={styles.wrapper}>

            <div className={styles.grid}>
                <img className={styles.img} src={logo}></img>
                <div className={styles.content}>
                    <h2>Feladatsorok alkalmazás</h2>

                    <p>A Feladatsorok egy webes alkalmazás, amelyben egy tanárnak lehetősége van egy feladatsort összeállítani, pl. óra vagy dolgozat céljából. A tanár létrehozhat egy új feladatsort, majd a feladatbankban a feladatok között böngészve egy-egy feladatot hozzáadhat a szerkesztésre jelölt feladatsorhoz. A feladatok és a feladatsorok listázhatók, részleteik megtekinthetők, a feladatsorok szerkeszthetők.</p>
                </div>
            </div>
        </div>
    )
}