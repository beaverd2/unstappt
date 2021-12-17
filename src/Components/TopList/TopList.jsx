import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TopElement from './TopElement';

const TopList = ({ data, isLoading, isCompact, filter, hoverable }) => {
  console.log('data', data);
  return (
    <>
      <AnimatePresence>
        {data &&
          !isLoading &&
          (isCompact
            ? data.slice(0, 5).map(data => (
                <TopElement
                  key={data.name}
                  data={{
                    name: data.name,
                    name2: data?.name2,
                    img: data?.img,
                    url: data?.url,
                    count: data.count,
                    avgRating: data.avgRating,
                  }}
                  filter={filter}
                  hoverable={hoverable ? true : false}
                />
              ))
            : data.map(data => (
                <TopElement
                  key={data.name}
                  data={{
                    name: data.name,
                    name2: data?.name2,
                    img: data?.img,
                    url: data?.url,
                    count: data.count,
                    avgRating: data.avgRating,
                  }}
                  filter={filter}
                  hoverable={hoverable ? true : false}
                />
              )))}
        {isLoading &&
          Array.from(Array(5).keys()).map(elem => (
            <TopElement key={elem} skeleton />
          ))}
      </AnimatePresence>
    </>
  );
};

export default TopList;
