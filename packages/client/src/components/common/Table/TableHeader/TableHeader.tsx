import React from 'react'
import classNames from 'classnames'
import styles from './TableHeader.module.css'

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  variant?: 'default' | 'gradient'
}

export const TableHeader = ({
  className = '',
  variant = 'default',
  ...props
}: TableHeaderProps) => (
  <thead
    className={classNames(
      styles.header,
      { [styles.gradient]: variant === 'gradient' },
      className
    )}
    {...props}
  />
)
