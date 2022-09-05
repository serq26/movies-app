import React, { useState, SyntheticEvent } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DetailList from "./DetailsList";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
          sx={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
          aria-label="Details Tab"
        >
          <Tab sx={{ width: "50%" }} label="Details" {...a11yProps(0)} />
          <Tab sx={{ width: "50%" }} label="Comments" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DetailList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Accordion sx={{background:"transparent"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{background:"rgba(0,0,0,0.5)"}}
          >
            <Typography>Make Your Comment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CommentForm />
          </AccordionDetails>
        </Accordion>
        <CommentsList />
      </TabPanel>
    </Box>
  );
}
