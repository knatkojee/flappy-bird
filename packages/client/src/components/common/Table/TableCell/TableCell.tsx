import React from 'react'
import classNames from 'classnames'
import styles from './TableCell.module.css'

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  align?: 'left' | 'center' | 'right'
  responsive?: 'sm' | 'md' | 'lg'
}

export const TableCell = ({
  className = '',
  align = 'left',
  responsive,
  ...props
}: TableCellProps) => (
  <td
    className={classNames(
      styles.cell,
      styles[align],
      { [styles[`hidden-${responsive}`]]: responsive },
      className
    )}
    {...props}
  />
)
