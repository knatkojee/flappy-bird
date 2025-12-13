import React from 'react'
import styles from './Icon.module.css'

interface IconProps {
  name: 'user' | 'mail' | 'lock'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const iconPaths = {
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  mail: 'm4 4 16 0c1.1 0 2 .9 2 2l0 12c0 1.1-.9 2-2 2l-16 0c-1.1 0-2-.9-2-2l0-12c0-1.1.9-2 2-2z m0 4 8 5 8-5',
  lock: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
}

export const User = ({ className = '' }: { className?: string }) => (
  <svg
    className={`${styles.icon} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d={iconPaths.user} />
  </svg>
)

export const Mail = ({ className = '' }: { className?: string }) => (
  <svg
    className={`${styles.icon} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d={iconPaths.mail} />
  </svg>
)

export const Lock = ({ className = '' }: { className?: string }) => (
  <svg
    className={`${styles.icon} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d={iconPaths.lock} />
  </svg>
)
