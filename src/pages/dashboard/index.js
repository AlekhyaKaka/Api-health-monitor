import { useState } from 'react';

// material-ui
import {
  // Avatar,
  // AvatarGroup,
  Box,
  Button,
  Grid,
  // List,
  // ListItemAvatar,
  // ListItemButton,
  // ListItemSecondaryAction,
  // ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import GaugeChart from 'react-gauge-chart';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import apiTestJson from '../../../src/APITestJson.json';
import CustomDatePicker from './CustomDatePicker';

// assets
// import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
// import avatar1 from 'assets/images/users/avatar-1.png';
// import avatar2 from 'assets/images/users/avatar-2.png';
// import avatar3 from 'assets/images/users/avatar-3.png';
// import avatar4 from 'assets/images/users/avatar-4.png';

// const avatarSX = {
//   width: 36,
//   height: 36,
//   fontSize: '1rem'
// };

// const actionSX = {
//   mt: 0.75,
//   ml: 1,
//   top: 'auto',
//   right: 'auto',
//   alignSelf: 'flex-start',
//   transform: 'none'
// };

const status = [
  {
    value: 'GET',
    label: 'GET'
  },
  {
    value: 'POST',
    label: 'POST'
  },
  {
    value: 'PUT',
    label: 'PUT'
  },
  {
    value: 'DELETE',
    label: 'DELETE'
  },
  {
    value: 'PATCH',
    label: 'PATCH'
  }
];

const DashboardDefault = () => {
  const [method, setMethod] = useState('GET');
  const [apiUrl, setApiUrl] = useState('');
  const [slot, setSlot] = useState('week');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const apisList = [...new Set(apiTestJson?.map((each) => each?.url))];
  // Calculate total unique users
  const uniqueUsers = [...new Set(apiTestJson.map((item) => item.user_id))];
  const totalUsers = uniqueUsers.length;

  const uniqueUrls = [...new Set(apiTestJson.map((item) => item.url))];
  const totalUrls = uniqueUrls.length;

  // Calculate average memory utilization
  const totalMemoryUtilization = apiTestJson.reduce((acc, item) => acc + item.memory_utilization, 0);
  const averageMemoryUtilization = totalMemoryUtilization / apiTestJson.length;

  const failedRequests = apiTestJson.filter((item) => item.status === 'fail');

  // Calculate failure rate
  const failureRate = (failedRequests.length / apiTestJson.length) * 100;

  // Calculate average CPU utilization
  //const totalCpuUtilization = apiTestJson.reduce((acc, item) => acc + item.cpu_utilization, 0);
  //const averageCpuUtilization = totalCpuUtilization / apiTestJson.length;
  // Get the maximum CPU utilization value
  //const maxCpuUtilizationValue = Math.max(...apiTestJson.map((item) => item.cpu_utilization));

  //const averageCpuUtilizationPercentage = (averageCpuUtilization / maxCpuUtilizationValue) * 100;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Average Memory Utilization" count={averageMemoryUtilization.toFixed(2)} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count={totalUsers} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total APIs" count={totalUrls} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Failure Rate" count={`${failureRate.toFixed(2)}%`} percentage={27.4} />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">APIs Status Check</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">API methods analysis</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                Overall Statistics
              </Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">API Information</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item>
            <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              size="small"
              select
              value={apiUrl}
              fullWidth
              minWidth={200}
              label="Select URL"
              onChange={(e) => setApiUrl(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' }, minWidth: 110 }}
            >
              {apisList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <ReportAreaChart selectedDate={selectedDate} apiUrl={apiUrl} />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={4}>
            <Typography variant="h5">Metrics</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              size="small"
              select
              value={method}
              fullWidth
              minWidth={200}
              label="Select Method"
              onChange={(e) => setMethod(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' }, minWidth: 110 }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} pl={2}>
            <TextField
              size="small"
              select
              value={apiUrl}
              fullWidth
              minWidth={200}
              label="Select URL"
              onChange={(e) => setApiUrl(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' }, minWidth: 110 }}
            >
              {apisList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{}}>
            <Typography variant="h6" color="secondary">
              Total Users :<Typography component="span">??</Typography>
            </Typography>
          </Stack>
          <SalesColumnChart method={method} apiUrl={apiUrl} />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Average CPU Utilization</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <GaugeChart
            id="gauge-chart5"
            nrOfLevels={420}
            arcsLength={[0.6, 0.25, 0.15]}
            colors={['#5BE12C', '#F5CD19', '#EA4228']}
            percent={0.37}
            arcPadding={0.02}
            textColor="#7a9c76"
            //textColor="#684a75"
          />
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              {/* <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid> */}
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
