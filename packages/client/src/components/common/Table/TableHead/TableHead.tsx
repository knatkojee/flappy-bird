import React from 'react'
import classNames from 'classnames'
import styles from './TableHead.module.css'

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  align?: 'left' | 'center' | 'right'
  responsive?: 'sm' | 'md' | 'lg'
}

export const TableHead = ({
  className = '',
  align = 'left',
  responsive,
  ...props
}: TableHeadProps) => (
  <th
    className={classNames(
      styles.head,
      styles[align],
      { [styles[`hidden-${responsive}`]]: responsive },
      className
    )}
    {...props}
  />
)
