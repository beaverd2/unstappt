import { Flex, Heading } from '@chakra-ui/layout';
import React, { memo } from 'react';
import { Container, Select } from '@chakra-ui/react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DrinkingPattern = ({ beers }) => {
  const daysOfWeek = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

  const map = beers
    .map(beer => beer.recent_created_at.split(',')[0])
    // eslint-disable-next-line no-sequences
    .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

  Object.keys(map).map((key, index) => {
    daysOfWeek[key] = map[key];
  });

  const days = Object.keys(daysOfWeek);
  const count = Object.values(daysOfWeek);

  console.log(daysOfWeek);
  return (
    <Flex marginTop={4}>
      <Container maxW="container.sm">
        <Flex bgColor="white" p={2} shadow="base" flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Heading size="sm">Drinking pattern</Heading>
            <Select maxW={24} placeholder="option" size="xs" />
          </Flex>
          <Flex alignSelf="center" w="100%">
            <Bar
              options={{
                responsive: true,
                layout: {
                  padding: 16,
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  datalabels: {
                    color: 'white',
                    display: function (context) {
                      return context.dataset.data[context.dataIndex] > 0;
                    },
                    font: {
                      weight: 'bold',
                    },
                  },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { display: false } },
                },
              }}
              data={{
                labels: days,
                datasets: [
                  {
                    data: count,
                    backgroundColor: '#FFBA2E',
                    hoverOffset: 0,
                    // borderColor: colors,
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default memo(DrinkingPattern);
