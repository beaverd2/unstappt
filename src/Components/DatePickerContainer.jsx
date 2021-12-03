import { Button } from '@chakra-ui/button';
import { Container } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerContainer = ({ fetchBeersForRange, isLoading }) => {
  const [startDate, setStartDate] = useState(
    dayjs(new Date()).subtract(7, 'days').$d
  );
  const [endDate, setEndDate] = useState(dayjs(new Date()).$d);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      fetchBeersForRange(start, end);
    }
  };
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      onClick={onClick}
      ref={ref}
      variant="outline"
      bg="white"
      width="100%"
    >
      {value}
    </Button>
  ));

  return (
    <Container maxW="container.sm" mb={2}>
      {isLoading ? (
        <Skeleton height={8} width="100%" />
      ) : (
        <DatePicker
          dateFormat="dd/MM/yyyy"
          closeOnScroll={true}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          selectsRange
          openToDate={endDate}
          customInput={<ExampleCustomInput />}
        />
      )}
    </Container>
  );
};

export default DatePickerContainer;
