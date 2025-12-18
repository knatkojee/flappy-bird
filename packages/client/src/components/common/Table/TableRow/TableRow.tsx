import React from 'react'
import classNames from 'classnames'
import styles from './TableRow.module.css'

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  variant?: 'default' | 'highlighted' | 'header'
}

export const TableRow = ({
  className = '',
  variant = 'default',
  ...props
}: TableRowProps) => (
  <tr
    className={classNames(
      styles.row,
      { [styles.highlighted]: variant === 'highlighted' },
      { [styles.headerRow]: variant === 'header' },
      className
    )}
    {...props}
  />
)
