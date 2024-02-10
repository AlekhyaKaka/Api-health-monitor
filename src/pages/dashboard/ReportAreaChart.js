import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 340,
    type: 'line',
    toolbar: {
      show: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 1.5
  },
  grid: {
    strokeDashArray: 4
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-05-19T00:00:00.000Z',
      '2018-05-19T00:30:00.000Z',
      '2018-05-19T01:00:00.000Z',
      '2018-05-19T01:30:00.000Z',
      '2018-05-19T02:00:00.000Z',
      '2018-05-19T02:30:00.000Z',
      '2018-05-19T03:00:00.000Z',
      '2018-05-19T03:30:00.000Z',
      '2018-05-19T04:00:00.000Z'
    ],
    labels: {
      format: 'hh:mm'
    },
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: true
    }
  },
  yaxis: {
    show: true
  },
  tooltip: {
    x: {
      format: 'hh:mm'
    }
  }
};

// ==============================|| REPORT AREA CHART ||============================== //

const ReportAreaChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [primary, secondary, line, theme]);

  const [series] = useState([
    {
      name: 'Series 1',
      data: [58, 115, 28, 83, 63, 75, 35, 55]
    }
  ]);

  return <ReactApexChart options={options} series={series} type="line" height={345} />;
};

export default ReportAreaChart;
