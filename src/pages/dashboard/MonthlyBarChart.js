import { useState } from 'react';
// import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import apiTestJson from '../../../src/APITestJson.json';

// Define methods array
const methods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'];

// MonthlyBarChart component
const MonthlyBarChart = () => {
  // const theme = useTheme();
  // const info = theme.palette.info.light;

  // Count the occurrences of each method in the API data
  const count = methods.map((method) => {
    return apiTestJson?.filter((entry) => entry?.api_method === method)?.length ?? 0;
  });

  // Define colors for each bar based on labels
  const colors = ['#ada557', '#16d930', '#4973a6', '#5749a6', '#d91616'];

  // Initialize state for series data and options
  const [series] = useState([{ name: 'COUNT', data: count }]);
  // const [options, setOptions] = useState({
  //   chart: {
  //     type: 'bar',
  //     height: 365,
  //     toolbar: {
  //       show: false
  //     }
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: '45%',
  //       borderRadius: 4
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   xaxis: {
  //     categories: methods,
  //     axisBorder: {
  //       show: false
  //     },
  //     axisTicks: {
  //       show: false
  //     }
  //   },
  //   yaxis: {
  //     show: false
  //   },
  //   grid: {
  //     show: false
  //   }
  // });
  const options = {
    chart: {
      height: 350,
      type: 'bar'
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: methods,
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
          fontWeight: '700'
        }
      }
    },
    tooltip: {
      theme: 'light'
    }
  };
  // Update options when component mounts
  // useEffect(() => {
  //   setOptions((prevOptions) => ({
  //     ...prevOptions,
  //     colors: colors, // Assign colors array to the chart options
  //     xaxis: {
  //       labels: {
  //         style: {
  //           colors: colors, // Assign colors array to the label style
  //           fontWeight: '700'
  //         }
  //       }
  //     },
  //     tooltip: {
  //       theme: 'light'
  //     }
  //   }));
  // }, []);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
};

export default MonthlyBarChart;
