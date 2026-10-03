interface SparkleProps {
  size?: number;
  className?: string;
}

export const Sparkle = ({ size = 24, className = '' }: SparkleProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 0C12.6 6.6 17.4 11.4 24 12C17.4 12.6 12.6 17.4 12 24C11.4 17.4 6.6 12.6 0 12C6.6 11.4 11.4 6.6 12 0Z"
      fill="currentColor"
    />
  </svg>
);

/** Two-star cluster, outlined large star + small solid star (hero accent). */
export const SparkleCluster = ({ className = '' }: { className?: string }) => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
    <path
      d="M30 4C31.2 18.4 39.6 26.8 54 28C39.6 29.2 31.2 37.6 30 52C28.8 37.6 20.4 29.2 6 28C20.4 26.8 28.8 18.4 30 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M58 46C58.5 52 61 54.5 67 55C61 55.5 58.5 58 58 64C57.5 58 55 55.5 49 55C55 54.5 57.5 52 58 46Z"
      fill="currentColor"
    />
  </svg>
);
