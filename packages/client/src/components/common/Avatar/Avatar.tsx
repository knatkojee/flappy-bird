import React from 'react'
import styles from './Avatar.module.css'

interface AvatarProps {
  size?: number
  borderWidth?: number
  borderColor?: string
  shadow?: boolean
  children: React.ReactNode
}

interface AvatarImageProps {
  src: string
  alt: string
  onError?: () => void
}

interface AvatarFallbackProps {
  fontSize?: number
  children: React.ReactNode
}

const Avatar: React.FC<AvatarProps> = ({
  size = 40,
  borderWidth = 0,
  borderColor = 'transparent',
  shadow = false,
  children,
}) => (
  <div
    className={styles.avatar}
    style={{
      width: size,
      height: size,
      borderWidth,
      borderColor,
      borderStyle: borderWidth > 0 ? 'solid' : 'none',
      boxShadow: shadow ? 'var(--shadow)' : 'none',
    }}>
    {children}
  </div>
)

const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt, onError }) => (
  <img className={styles.avatarImage} src={src} alt={alt} onError={onError} />
)

const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  fontSize = 16,
  children,
}) => (
  <div className={styles.avatarFallback} style={{ fontSize }}>
    {children}
  </div>
)

export { Avatar, AvatarImage, AvatarFallback }
