import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import apiTestJson from '../../../src/APITestJson.json';

// chart options

// ==============================|| REPORT AREA CHART ||============================== //

const ReportAreaChart = ({ apiUrl, selectedDate }) => {
  const theme = useTheme();
  const selectedDateFormatted = new Date(selectedDate).toISOString().slice(0, 10);

  const selectedDateData = apiTestJson?.filter((each) => {
    // Convert each timestamp to a comparable format
    const timestampFormatted = new Date(each?.timestamp).toISOString().slice(0, 10);
    // Filter based on the formatted dates
    return timestampFormatted === selectedDateFormatted && each?.url === apiUrl;
  });

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

    yaxis: {
      show: true
    },
    tooltip: {
      x: {
        format: 'hh:mm'
      }
    }
  };

  // const selectedDateData = apiTestJson
  //   ?.filter((each) => new Date(each?.timestamp) === new Date(selectedDate))
  //   ?.filter((eachApi) => eachApi?.url == apiUrl);

  console.log(selectedDateData, 'selectedDateData');
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const responseTimes = selectedDateData?.map((each) => each.response_time) || [];
  const timeStampsData = selectedDateData
    ?.map((each) => {
      const timestamp = new Date(each.timestamp);
      return { timestamp: timestamp.toISOString(), original: each.timestamp };
    })
    .sort((a, b) => new Date(a.original) - new Date(b.original))
    .map((item) => item.timestamp);
  // const timeStampsData =
  //   selectedDateData?.map((each) => {
  //     const timestamp = new Date(each.timestamp);
  //     return timestamp.toISOString();
  //   }) || [];
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main],
      xaxis: {
        type: 'datetime',
        categories: timeStampsData,
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
  }, [primary, secondary, line, theme, timeStampsData, apiUrl.selectedDate]);
  // Extract response_time values from selectedDateData

  // Update series state with responseTimes

  // const [series] = useState([
  //   {
  //     name: 'Series 1',
  //     data: [58, 115, 28, 83, 63, 75, 35, 55]
  //   }
  // ]);

  return timeStampsData?.length > 0 ? (
    <ReactApexChart
      options={options}
      series={[
        {
          name: 'Response Time',
          data: responseTimes
        }
      ]}
      type="line"
      height={345}
    />
  ) : (
    ''
  );
};

export default ReportAreaChart;
