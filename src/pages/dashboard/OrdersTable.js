import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party

// project import
import Dot from 'components/@extended/Dot';
import apiTestJson from '../../../src/APITestJson.json';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'sNo',
    align: 'left',
    disablePadding: false,
    label: 'S.No'
  },
  {
    id: 'url',
    align: 'left',
    disablePadding: true,
    label: 'URL'
  },
  {
    id: 'passCount',
    align: 'right',
    disablePadding: false,
    label: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography>Pass Count</Typography>
        <CheckCircleOutlined style={{ color: 'green' }} />
      </Box>
    )
  },
  {
    id: 'failCount',
    align: 'left',
    disablePadding: false,

    label: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography>Fail Count</Typography>
        <CloseCircleOutlined style={{ color: 'red' }} />
      </Box>
    )
  },
  {
    id: 'methods',
    align: 'center',
    disablePadding: false,
    label: 'Methods'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  // Step 1: Remove duplicates from URLs
  const uniqueUrls = [...new Set(apiTestJson?.map((each) => each?.url))];

  // Step 2: Iterate through unique URLs and calculate pass count, fail count, and methods
  const updatedTableData = uniqueUrls.map((url) => {
    // Filter data for the current URL
    const dataForUrl = apiTestJson.filter((entry) => entry.url === url);

    // Calculate pass count, fail count, and methods for the current URL
    const { passCount, failCount, methods } = dataForUrl.reduce(
      (accumulator, currentEntry) => {
        // Increment pass count if status is 'pass'
        if (currentEntry.status === 'pass') {
          accumulator.passCount++;
        }
        // Increment fail count if status is 'fail'
        else if (currentEntry.status === 'fail') {
          accumulator.failCount++;
        }

        // Add method to the methods array if not already present
        if (!accumulator.methods.includes(currentEntry.api_method)) {
          accumulator.methods.push(currentEntry.api_method);
        }

        return accumulator;
      },
      { passCount: 0, failCount: 0, methods: [] } // Initial values
    );

    return {
      url,
      passCount,
      failCount,
      methods
    };
  });

  // Output the updated table data

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {updatedTableData.map((row, index) => {
              const isItemSelected = isSelected(index + 1);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.trackingNo}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {index + 1}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.url}</TableCell>
                  <TableCell align="center">{row.passCount}</TableCell>
                  <TableCell align="center">{row.failCount}</TableCell>
                  <TableCell align="center">
                    {row.methods?.map((method, i) => (
                      <Typography component="span" key={method}>
                        {method}
                        {row?.methods?.length - 1 > i && ', '}
                      </Typography>
                    ))}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
