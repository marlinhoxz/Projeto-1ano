import styles from "./batom.module.css"

export default function BatomDecorativo() {
  return (
    <div className={styles.container} aria-hidden="true">
      <svg
        viewBox="0 0 80 50"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
  
        <path
          d="M5 22 Q15 8 28 18 Q35 22 40 20"
          fill="#c0001a"
          opacity="0.85"
        />
        
        <path
          d="M40 20 Q45 22 52 18 Q65 8 75 22"
          fill="#c0001a"
          opacity="0.85"
        />
     
        <path
          d="M5 22 Q20 42 40 38 Q60 42 75 22 Q55 28 40 26 Q25 28 5 22 Z"
          fill="#a0001a"
          opacity="0.9"
        />
       
        <path
          d="M5 22 Q28 18 40 20 Q52 18 75 22"
          stroke="#7a0010"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        
        <ellipse cx="30" cy="27" rx="10" ry="4" fill="rgba(255,150,150,0.2)" transform="rotate(-10 30 27)" />
      </svg>
    </div>
  )
}
