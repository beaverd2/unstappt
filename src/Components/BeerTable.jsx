import dayjs from 'dayjs';
import { Flex, Heading } from '@chakra-ui/layout';
import React, { memo, useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Skeleton,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import { useBreakpointValue } from '@chakra-ui/media-query';

const BeerTable = ({ beers, isLoading, user }) => {
  const [tableData, setTableData] = useState([]);
  const isMoible = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (beers) {
      const getData = beers => {
        return beers.map(beer => ({
          beerName: beer.beer.beer_name,
          breweryName: beer.brewery.brewery_name,
          style: beer.beer.beer_style,
          userRating: beer.rating_score.toPrecision(3),
          globalRating: Number(beer.beer.rating_score.toPrecision(3)),
          date: dayjs(beer.recent_created_at).format('DD MMM YYYY HH:mm'),
          id: beer.recent_checkin_id,
        }));
      };
      const data = getData(beers);
      setTableData(data);
    }
  }, [beers]);

  const data = React.useMemo(
    () => (isLoading ? Array(3).fill({}) : tableData),
    [isLoading, tableData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'beerName',
      },
      {
        Header: 'Brewery',
        accessor: 'breweryName',
      },
      {
        Header: 'Style',
        accessor: 'style',
      },
      {
        Header: 'User rating',
        accessor: 'userRating',
        isNumeric: true,
      },
      {
        Header: 'Global rating',
        accessor: 'globalRating',
        isNumeric: true,
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
    ],
    []
  );

  const tableColumns = React.useMemo(
    () =>
      isLoading
        ? columns.map(column => ({
            ...column,
            Cell: <Skeleton h={4} w="100%" />,
          }))
        : columns,
    [isLoading, columns]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableColumns, data }, useSortBy);

  const openInNewTab = id => {
    const newWindow = window.open(
      `https://untappd.com/user/${user.user_name}/checkin/` + id,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Flex
      display={isMoible ? 'none' : 'flex'}
      marginTop={4}
      bgColor="white"
      p={2}
      shadow="base"
      flexDirection="column"
      borderRadius="base"
    >
      <Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Heading size="sm">Beer table</Heading>
      </Flex>
      <Flex>
        <Table size="sm" {...getTableProps()}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {column.render('Header')}
                    <chakra.span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <Tr
                  transition="0.2s"
                  _hover={{ bgColor: 'gray.100' }}
                  cursor="pointer"
                  {...row.getRowProps()}
                  onClick={() => openInNewTab(row.original.id)}
                >
                  {row.cells.map(cell => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default memo(BeerTable);
