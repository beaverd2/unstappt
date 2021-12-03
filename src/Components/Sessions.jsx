import dayjs from 'dayjs';
import { Flex, Heading } from '@chakra-ui/layout';
import React, { memo, useState, useEffect } from 'react';
import { Container, Skeleton } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';

const Sessions = ({ beers, isLoading }) => {
  const [sessions, setSessions] = useState([]);
  console.log('beers', beers);
  console.log('sessions', sessions);

  useEffect(() => {
    if (beers) {
      const getSessions = beers => {
        const sortedArray = beers
          .sort((a, b) => a.recent_checkin_id - b.recent_checkin_id)
          .map(beer => beer.recent_created_at);
        let data = {};
        let counter = 0;
        for (let i = 0; i < sortedArray.length - 1; i++) {
          if (
            dayjs(sortedArray[i + 1]).diff(dayjs(sortedArray[i]), 'hour') < 2
          ) {
            data[counter] =
              data[counter] === undefined
                ? [sortedArray[i], sortedArray[i + 1]]
                : [...data[counter], sortedArray[i], sortedArray[i + 1]];
          } else counter++;
        }
        Object.entries(data).forEach(([key, value]) => {
          data[key] = [...new Set(value)];
        });

        const filteredByValue = Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value.length > 2)
        );
        return Object.values(filteredByValue).map(session => ({
          startTime: dayjs(session[0]).format('DD MMM YYYY HH:mm'),
          endTime: dayjs(session[session.length - 1]).format(
            'DD MMM YYYY HH:mm'
          ),
          total: session.length,
        }));
      };
      const sessions = getSessions(beers);
      setSessions(sessions);
    }
  }, [beers]);

  const data = React.useMemo(
    () => (isLoading ? Array(3).fill({}) : sessions),
    [isLoading, sessions]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Start time',
        accessor: 'startTime',
      },
      {
        Header: 'End time',
        accessor: 'endTime',
      },
      {
        Header: 'Total drinks',
        accessor: 'total',
        isNumeric: true,
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

  return (
    <Flex marginTop={4}>
      <Container maxW="container.sm">
        <Flex bgColor="white" p={2} shadow="base" flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Heading size="sm">Drinking Sessions</Heading>
          </Flex>
          <Flex>
            <Table size="sm" {...getTableProps()}>
              <Thead>
                {headerGroups.map(headerGroup => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
                    <Tr {...row.getRowProps()}>
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
      </Container>
    </Flex>
  );
};

export default memo(Sessions);
