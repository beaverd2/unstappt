import { Flex, Heading } from '@chakra-ui/layout';
import React, { memo, useState, useEffect } from 'react';
import { Select, Skeleton } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DrinkingPattern = ({ beers, isLoading }) => {
  const [filter, setFilter] = useState('days');
  const [days, setDays] = useState(null);
  const [countDays, setCountDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [countHours, setCountHours] = useState(null);
  const handleSelect = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    setFilter('days');
    if (beers) {
      const daysOfWeek = {
        Mon: null,
        Tue: null,
        Wed: null,
        Thu: null,
        Fri: null,
        Sat: null,
        Sun: null,
      };
      const hoursOfDay = {
        '0:00': null,
        '1:00': null,
        '2:00': null,
        '3:00': null,
        '4:00': null,
        '5:00': null,
        '6:00': null,
        '7:00': null,
        '8:00': null,
        '9:00': null,
        '11:00': null,
        '12:00': null,
        '13:00': null,
        '14:00': null,
        '15:00': null,
        '16:00': null,
        '17:00': null,
        '18:00': null,
        '19:00': null,
        '20:00': null,
        '21:00': null,
        '22:00': null,
        '23:00': null,
      };

      const mapOfDays = beers
        .map(beer => beer.recent_created_at.split(',')[0])
        // eslint-disable-next-line no-sequences
        .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

      const mapOfHours = beers
        .map(beer => dayjs(beer.recent_created_at).hour() + ':00')
        // eslint-disable-next-line no-sequences
        .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

      // eslint-disable-next-line array-callback-return
      Object.keys(mapOfDays).map((key, index) => {
        daysOfWeek[key] = mapOfDays[key];
      });

      // eslint-disable-next-line array-callback-return
      Object.keys(mapOfHours).map((key, index) => {
        hoursOfDay[key] = mapOfHours[key];
      });

      setDays(Object.keys(daysOfWeek));
      setCountDays(Object.values(daysOfWeek));
      setHours(Object.keys(hoursOfDay));
      setCountHours(Object.values(hoursOfDay));
    }
  }, [beers]);

  return (
    <Flex
      bgColor="white"
      p={2}
      shadow="base"
      flexDirection="column"
      mx="auto"
      width="100%"
      marginTop={4}
    >
      <Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Heading size="sm">Drinking Pattern</Heading>
        <Select
          maxW={24}
          size="xs"
          value={filter}
          onChange={handleSelect}
          disabled={isLoading}
        >
          <option value="days">By Day</option>
          <option value="hours">By Hour</option>
        </Select>
      </Flex>
      <Flex alignSelf="center" w="100%">
        {beers && !isLoading && (
          <Bar
            height={250}
            options={{
              aspectRatio: false,
              barThickness: 'flex',
              responsive: true,
              layout: {
                padding: 8,
              },
              plugins: {
                legend: {
                  display: false,
                },
                datalabels: {
                  display: filter === 'days' ? true : false,
                  color: 'white',
                  font: {
                    weight: 'bold',
                  },
                },
              },
              scales: {
                x: { grid: { display: false } },
              },
            }}
            data={{
              labels: filter === 'days' ? days : hours,
              datasets: [
                {
                  label: 'Check-ins',
                  data: filter === 'days' ? countDays : countHours,
                  backgroundColor: '#FFBA2E',
                },
              ],
            }}
          />
        )}
        {isLoading && <Skeleton height={40} width="100%" />}
      </Flex>
    </Flex>
  );
};

export default memo(DrinkingPattern);
