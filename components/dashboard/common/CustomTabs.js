import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Item One' {...a11yProps(0)} />
          <Tab label='Item Two' {...a11yProps(1)} />
          <Tab label='Item Three' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

// import { Box, Tab, Tabs } from '@mui/material'
// import React from 'react'

// const defaultTabValues = [
//   {
//     tabLabel: "Tab 1",
//     tabPanel: "Tab 1",
//   },
//   {
//     tabLabel: "Tab 2",
//     tabPanel: "Tab 2",
//   }
// ]

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role='tabpanel'
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// const CustomTabs = ({tabProps}) => {
//   const tabProperties = tabProps ? tabProps : defaultTabValues

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label='basic tabs example'
//         >
//           {
//               tabProperties.map((tab, index) => {
//                 {<Tab label={tab.tabLabel} {...a11yProps(index)} />}
//               })
//           }
//         </Tabs>
//       </Box>
//       {
//         tabProperties.map((tab, index) => {
//                 {
//                   <TabPanel value={index} index={index}>
//                     {tab.tabPanel}
//                   </TabPanel>;
//                   }
//               })
//       }
//     </Box>
//   )
// }

// export default CustomTabs
