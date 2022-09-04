import React, { useState, SyntheticEvent } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DetailList from "./DetailsList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DetailsTab(props: any) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{borderBottom:"1px solid rgba(255,255,255,0.2)"}}
          aria-label="Details Tab"
        >
          <Tab sx={{width:"33.33%"}} label="Details" {...a11yProps(0)} />
          <Tab sx={{width:"33.33%"}} label="Suggestions" {...a11yProps(1)} />
          <Tab sx={{width:"33.33%"}} label="Comments" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DetailList/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Suggestions
      </TabPanel>
      <TabPanel value={value} index={2}>
        Comments
      </TabPanel>
    </Box>
  );
}
