import styles from "./LacoDecorativo.module.css"

export default function LacoDecorativo() {
  return (
    <div className={styles.container} aria-hidden="true">
      <svg
        viewBox="0 0 160 120"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        
        <path
          d="M80 60 C60 40, 20 30, 15 50 C10 70, 40 80, 80 60 Z"
          fill="#8b0000"
          opacity="0.9"
        />
        <path
          d="M80 60 C60 40, 20 30, 15 50 C10 70, 40 80, 80 60 Z"
          fill="url(#gradLaco)"
          opacity="0.5"
        />

        <path
          d="M80 60 C100 40, 140 30, 145 50 C150 70, 120 80, 80 60 Z"
          fill="#8b0000"
          opacity="0.9"
        />
        <path
          d="M80 60 C100 40, 140 30, 145 50 C150 70, 120 80, 80 60 Z"
          fill="url(#gradLacoDir)"
          opacity="0.5"
        />

   
        <path
          d="M75 65 C70 85, 55 100, 50 120"
          stroke="#7a0000"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M75 65 C70 85, 55 100, 50 120"
          stroke="#a00010"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

  
        <path
          d="M85 65 C90 85, 105 100, 110 120"
          stroke="#7a0000"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M85 65 C90 85, 105 100, 110 120"
          stroke="#a00010"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

   
        <ellipse cx="80" cy="60" rx="10" ry="8" fill="#6a0000" />
        <ellipse cx="80" cy="58" rx="6" ry="4" fill="#8b0010" opacity="0.8" />

    
        <path
          d="M40 42 Q50 38 60 45"
          stroke="rgba(255,150,150,0.25)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="gradLaco" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c0001a" />
            <stop offset="100%" stopColor="#4a0000" />
          </linearGradient>
          <linearGradient id="gradLacoDir" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c0001a" />
            <stop offset="100%" stopColor="#4a0000" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
