import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import './table.scss';

interface TableProps extends PropsWithChildren {
  className?: string;
}

export const Table: FC<TableProps> = ({ children, className }) => {
  return <div className={classNames(className, 'table')}>{children}</div>;
};

interface TableRowProps extends PropsWithChildren {
  className?: string;
}

export const TableRow: FC<TableRowProps> = ({ children, className }) => {
  return <div className={classNames(className, 'table__row')}>{children}</div>;
};

interface TableCellProps extends PropsWithChildren {
  className?: string;
}

export const TableCell: FC<TableCellProps> = ({ children, className }) => {
  return <div className={classNames(className, 'table__cell')}>{children}</div>;
};
