import dayjs from 'dayjs';
import React, { memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useBreakpointValue } from '@chakra-ui/media-query';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Activity = ({ beers, startDate, endDate }) => {
  const isMoible = useBreakpointValue({ base: true, sm: false });

  const getDatesBetweenDates = (startDate, endDate) => {
    let dates = [];
    const theDate = new Date(startDate);
    while (theDate < endDate) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, endDate];
    return dates;
  };
  const dataset = {};
  console.log('Activity', startDate, endDate);
  getDatesBetweenDates(startDate, endDate)
    .map(date => dayjs(date).format('DD/MM/YYYY'))
    .forEach(date => (dataset[date] = 0));
  const mapOfDates = beers
    .map(beer => dayjs(beer.recent_created_at).format('DD/MM/YYYY'))
    // eslint-disable-next-line no-sequences
    .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

  Object.keys(mapOfDates).map((key, index) => {
    dataset[key] = mapOfDates[key];
  });

  const labels = Object.keys(dataset);
  const data = Object.values(dataset);

  console.log('mapOfDates', mapOfDates);
  console.log('dataset', dataset);
  return (
    <Line
      height={250}
      options={{
        aspectRatio: false,
        borderWidth: isMoible ? 1 : 3,
        pointRadius: isMoible ? 2 : 3,
        responsive: true,
        layout: {
          padding: {
            top: 8,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: true,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              callback: function (val, index) {
                if (index === 0) {
                  return '';
                }
                if (index % 2 === 0) {
                  return this.getLabelForValue(val);
                }
                return '';
              },
            },
          },
          y: { max: Math.max.apply(null, data) + 1 },
        },
      }}
      data={{
        labels: labels,
        datasets: [
          {
            label: 'Check-ins',
            data: data,
            backgroundColor: '#FFBA2E',
            borderColor: '#FFBA2E',
            tension: 0.4,
            pointRadius: context => (context.raw === 0 ? 0 : isMoible ? 2 : 3),
          },
        ],
      }}
    />
  );
};

export default memo(Activity);
