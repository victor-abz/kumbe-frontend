import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CardHeader,
  Divider
} from '@material-ui/core';
import _ from 'lodash';
import { useTableStyles } from './styles';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';
import { GenericMoreButton } from 'components';
import Paginate from 'components/Paginate';

export const CustomisedTable = ({
  className,
  data = [],
  tableTitle = '',
  dataCount = 0,
  pageCount = 0,
  page = 1,
  columns = [],
  selectedData = [],
  withSelect = false,
  loading = false,
  withPagination = true,
  handleSelectOne,
  handlePageChange,
  handleSelectAll,
  size = 'medium'
}) => {
  const classes = useTableStyles();
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  return (
    <div className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {dataCount} Records found. Page {page} of {pageCount}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title={tableTitle} />
        <Divider />
        <CardContent className={classes.tableContent}>
          {loading ? (
            <Loading />
          ) : data.length ? (
            <PerfectScrollbar>
              <Table size={size}>
                <TableHead>
                  <TableRow>
                    {withSelect ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedData.length === data.length}
                          color="primary"
                          indeterminate={
                            selectedData.length > 0 &&
                            selectedData.length < data.length
                          }
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                    ) : null}
                    {columns.map(({ label }, columnIdx) => (
                      <TableCell key={columnIdx}>{label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, itemIdx) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={itemIdx}
                      selected={selectedData.indexOf(item.id) !== -1}>
                      {withSelect ? (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedData.indexOf(item.id) !== -1}
                            color="primary"
                            onChange={event => handleSelectOne(event, item.id)}
                            value="true"
                          />
                        </TableCell>
                      ) : null}
                      {columns.map((cellColumn, cellColumnIdx) => (
                        <TableCell key={cellColumnIdx}>
                          {renderCell(item, cellColumn)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
          ) : (
            <NoDisplayData />
          )}
        </CardContent>
        {pageCount !== 0 && withPagination && (
          <CardActions className={classes.actions}>
            <Paginate
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              pageCount={pageCount}
              pageRangeDisplayed={1}
            />
          </CardActions>
        )}
      </Card>
    </div>
  );
};
