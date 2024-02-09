import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

import apiTestJson from '../../../src/APITestJson.json';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);

  const monthlyFailedCount = Array.from({ length: 12 }, (_, i) => {
    // Create a date range for each month
    const startDate = new Date(2023, i, 1); // assuming the year is 2023
    const endDate = new Date(2023, i + 1, 0); // last day of the month

    // Filter the data for the current month and count the failed requests
    const count = apiTestJson.filter((entry) => {
      // Parse the timestamp to a Date object
      const timestamp = new Date(entry.timestamp);

      // Check if the timestamp is within the current month
      return timestamp >= startDate && timestamp <= endDate && entry.status === 'fail';
    }).length;

    return count;
  });

  const monthlySuccessCount = Array.from({ length: 12 }, (_, i) => {
    // Create a date range for each month
    const startDate = new Date(2023, i, 1); // assuming the year is 2023
    const endDate = new Date(2023, i + 1, 0); // last day of the month

    // Filter the data for the current month and count the failed requests
    const count = apiTestJson.filter((entry) => {
      // Parse the timestamp to a Date object
      const timestamp = new Date(entry.timestamp);

      // Check if the timestamp is within the current month
      return timestamp >= startDate && timestamp <= endDate && entry.status === 'pass';
    }).length;

    return count;
  });

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.success.main, theme.palette.error.main],
      xaxis: {
        categories:
          slot === 'month'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, slot]);

  useEffect(() => {
    setSeries([
      {
        name: 'Success',
        data: slot === 'month' ? monthlySuccessCount : [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Failed',
        data: slot === 'month' ? monthlyFailedCount : [11, 32, 45, 32, 34, 52, 41]
      }
    ]);
  }, [slot]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

IncomeAreaChart.propTypes = {
  slot: PropTypes.string
};

export default IncomeAreaChart;
