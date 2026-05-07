import styles from "./rodadecorativa.module.css";

export default function RosaDecorativa() {
  return (
    <div className={styles.container} aria-hidden="true">
      <svg
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <path
          d="M100 220 Q95 180 98 150 Q100 120 100 90"
          stroke="#2d5a1b"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M98 155 Q70 145 60 125 Q80 128 98 150"
          fill="#2d5a1b"
          opacity="0.9"
        />

        <path
          d="M100 140 Q128 128 140 108 Q120 115 100 138"
          fill="#2d5a1b"
          opacity="0.9"
        />

        <ellipse
          cx="100"
          cy="72"
          rx="28"
          ry="22"
          fill="#8b0000"
          opacity="0.7"
          transform="rotate(-15 100 72)"
        />
        <ellipse
          cx="100"
          cy="72"
          rx="28"
          ry="22"
          fill="#8b0000"
          opacity="0.7"
          transform="rotate(15 100 72)"
        />
        <ellipse
          cx="100"
          cy="72"
          rx="26"
          ry="20"
          fill="#9b0000"
          opacity="0.8"
          transform="rotate(45 100 72)"
        />
        <ellipse
          cx="100"
          cy="72"
          rx="26"
          ry="20"
          fill="#9b0000"
          opacity="0.8"
          transform="rotate(-45 100 72)"
        />

        <ellipse
          cx="100"
          cy="68"
          rx="22"
          ry="17"
          fill="#b00010"
          transform="rotate(0 100 68)"
        />
        <ellipse
          cx="100"
          cy="68"
          rx="22"
          ry="17"
          fill="#b00010"
          transform="rotate(30 100 68)"
        />
        <ellipse
          cx="100"
          cy="68"
          rx="22"
          ry="17"
          fill="#b00010"
          transform="rotate(-30 100 68)"
        />
        <ellipse
          cx="100"
          cy="68"
          rx="22"
          ry="17"
          fill="#b00010"
          transform="rotate(60 100 68)"
        />
        <ellipse
          cx="100"
          cy="68"
          rx="22"
          ry="17"
          fill="#b00010"
          transform="rotate(-60 100 68)"
        />

        <ellipse
          cx="100"
          cy="65"
          rx="16"
          ry="13"
          fill="#cc0015"
          transform="rotate(20 100 65)"
        />
        <ellipse
          cx="100"
          cy="65"
          rx="16"
          ry="13"
          fill="#cc0015"
          transform="rotate(-20 100 65)"
        />
        <ellipse
          cx="100"
          cy="65"
          rx="16"
          ry="13"
          fill="#cc0015"
          transform="rotate(70 100 65)"
        />

        <ellipse cx="100" cy="63" rx="10" ry="8" fill="#990010" />
        <ellipse cx="100" cy="62" rx="6" ry="5" fill="#7a000c" />

        <ellipse
          cx="96"
          cy="59"
          rx="3"
          ry="2"
          fill="rgba(255,100,100,0.3)"
          transform="rotate(-20 96 59)"
        />

        <path
          d="M85 85 Q88 78 100 90 Q96 80 88 82 Z"
          fill="#1a3a0a"
          opacity="0.8"
        />
        <path
          d="M115 85 Q112 78 100 90 Q104 80 112 82 Z"
          fill="#1a3a0a"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
