import styles from "./batom.module.css"

export default function BatomDecorativo() {
  return (
    <div className={styles.container} aria-hidden="true">
      <div className={styles.buque}></div>
    </div>
  )
}
