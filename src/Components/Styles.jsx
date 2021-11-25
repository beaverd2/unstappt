import { Flex, Heading } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Container, Select, useBreakpointValue } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import LegendElement from './LegendElement';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import randomColor from 'randomcolor';
ChartJS.register(ChartDataLabels);
// ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Styles = ({ beers }) => {
  const [style, setStyle] = useState('short');
  const mapUnsorted = beers.items
    .map(beer => beer.beer.beer_style)
    // eslint-disable-next-line no-sequences
    .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

  const mapShortUnsorted = beers.items
    .map(beer => beer.beer.beer_style.split('-')[0])
    // eslint-disable-next-line no-sequences
    .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

  const mapShort = Object.fromEntries(
    Object.entries(mapShortUnsorted).sort(([, a], [, b]) => b - a)
  );
  const map = Object.fromEntries(
    Object.entries(mapUnsorted).sort(([, a], [, b]) => b - a)
  );
  const styles = style === 'short' ? Object.keys(mapShort) : Object.keys(map);
  const count =
    style === 'short' ? Object.values(mapShort) : Object.values(map);
  const colors = styles.map(
    () => '#' + Math.floor(Math.random() * 16777215).toString(16)
  );

  const colors2 = randomColor({
    hue: 'random',
    luminosity: 'light',
    count: styles.length,
  });
  console.log(colors2);
  const handleSelect = e => {
    setStyle(e.target.value);
  };
  const showScales = useBreakpointValue({ base: false, sm: true });
  return (
    <Flex marginTop={4}>
      <Container maxW="container.sm">
        <Flex bgColor="white" p={2} shadow="base" flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Heading size="sm">Styles</Heading>
            <Select
              maxW={28}
              // placeholder="Short style"
              size="xs"
              variant="filled"
              onChange={handleSelect}
            >
              <option value="short">Short style</option>
              <option value="full">Full style</option>
            </Select>
          </Flex>
          <Flex alignSelf="center" w="100%">
            {/* <Doughnut
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
                    backgroundColor: function (context) {
                      return context.dataset.backgroundColor;
                    },
                    borderColor: 'white',
                    borderRadius: 25,
                    borderWidth: 2,
                    color: 'white',
                    anchor: 'end',
                    font: {
                      weight: 'bold',
                    },
                    padding: 5,
                  },
                },
              }}
              data={{
                labels: styles,
                datasets: [
                  {
                    data: count,
                    backgroundColor: colors2,
                    hoverOffset: 0,
                    borderColor: colors2,
                    borderWidth: 1,
                    datalabels: {
                      // anchor: 'end',
                    },
                  },
                ],
              }}
            /> */}
            <Bar
              height={300}
              options={{
                responsive: true,
                indexAxis: 'y',
                layout: {
                  padding: 8,
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    display: showScales,
                    grid: { display: false },
                  },
                },
              }}
              data={{
                labels: styles,
                datasets: [
                  {
                    data: count,
                    backgroundColor: colors2,
                    borderColor: colors2,
                    borderWidth: 1,
                    datalabels: {
                      align: 'center',
                      anchor: 'center',
                      font: {
                        weight: 700,
                      },
                    },
                  },
                ],
              }}
            />
          </Flex>
          <Flex flexWrap="wrap" justifyContent="flex-start" gridColumnGap={4}>
            {!showScales &&
              styles.map((value, index) => (
                <LegendElement
                  key={value}
                  color={colors2[index]}
                  style={value}
                  value={count[index]}
                />
              ))}
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Styles;
