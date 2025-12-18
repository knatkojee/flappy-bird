import React from 'react'
import styles from './Avatar.module.css'

type AvatarProps = {
  size?: number
  borderWidth?: number
  borderColor?: string
  shadow?: boolean
  children: React.ReactNode
}

type AvatarImageProps = {
  src: string
  alt: string
  onError?: () => void
}

type AvatarFallbackProps = {
  fontSize?: number
  children: React.ReactNode
}

const Avatar = ({
  size = 40,
  borderWidth = 0,
  borderColor = 'transparent',
  shadow = false,
  children,
}: AvatarProps) => (
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

const AvatarImage = ({ src, alt, onError }: AvatarImageProps) => (
  <img className={styles.avatarImage} src={src} alt={alt} onError={onError} />
)

const AvatarFallback = ({ fontSize = 16, children }: AvatarFallbackProps) => (
  <div className={styles.avatarFallback} style={{ fontSize }}>
    {children}
  </div>
)

export { Avatar, AvatarImage, AvatarFallback }
