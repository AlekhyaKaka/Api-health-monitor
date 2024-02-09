import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import apiTestJson from '../../../src/APITestJson.json';

function calculateAveragePercentage(numbers, maxResponseSize) {
  if (numbers.length === 0) {
    return 0; // Return 0 for empty arrays
  }

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const average = sum / numbers.length;

  // Calculate percentage
  const percentage = (average / maxResponseSize) * 100;

  return Math.round(percentage);
}

const SalesColumnChart = ({ method, apiUrl = '' }) => {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const success = theme.palette.success.main;
  const error = theme.palette.error.main;
  const filteredData = apiTestJson?.filter((each) => each.api_method === method && each.url === apiUrl);

  const uniqueCountries = [...new Set(filteredData?.map((each) => each.location))];

  const getCountByStatusAndCountry = (status) =>
    uniqueCountries.map((location) => filteredData.filter((each) => each.location === location && each.status === status).length);

  const apiHitCountBasedOnCountry = uniqueCountries.map((location) => filteredData.filter((each) => each.location === location).length);

  const apiPassedCountBasedOnCountry = getCountByStatusAndCountry('pass');

  const apiFailedCountBasedOnCountry = getCountByStatusAndCountry('fail');

  const avgResponseSize = uniqueCountries.map((location) => {
    const responseSizes = filteredData.filter((each) => each.location === location).map((each) => each.response_size);

    // Assuming maxResponseSize represents the maximum possible response size
    const maxResponseSize = 1000; // Example value, replace with the actual maximum response size

    return calculateAveragePercentage(responseSizes, maxResponseSize);
  });

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      stacked: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [primaryMain, success, error],
    stroke: {
      width: [4, 4, 4]
    },
    plotOptions: {
      bar: {
        columnWidth: '10%'
      }
    },
    xaxis: {
      categories: uniqueCountries
    },
    yaxis: [
      {
        seriesName: 'Number Of APIs',
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true
        },
        title: {
          text: 'Number Of APIs'
        }
      },
      {
        seriesName: 'Number Of APIs',
        show: false
      },
      {
        seriesName: 'Number Of APIs',
        show: false
      },
      {
        opposite: true,
        seriesName: 'Response Size',
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true
        },
        title: {
          text: 'Average Response Size (%)'
        }
      }
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false
      }
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40
    }
  });

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [primaryMain, success, error]
    }));
  }, [primaryMain, success, error]);

  return (
    <ReactApexChart
      series={[
        { name: 'Number Of APIs', type: 'column', data: apiHitCountBasedOnCountry },
        { name: 'Passed', type: 'column', data: apiPassedCountBasedOnCountry },
        { name: 'Failed', type: 'column', data: apiFailedCountBasedOnCountry },
        {
          name: 'Response Size',
          type: 'line',
          data: avgResponseSize
        }
      ]}
      options={options}
      height={430}
    />
  );
};

export default SalesColumnChart;
