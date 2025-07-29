import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./style.css";
import { createTheme, ThemeProvider } from "@mui/material";
import Grid from "../Grid";
import List from "../List";
import { motion, AnimatePresence } from "framer-motion";

export default function TabsComponent({ coins }) {
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#00ff7f", // green
      },
    },
  });

  // Animation variants
  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="tabs-container">
      <ThemeProvider theme={theme}>
        <TabContext value={value}>
          <motion.div
            className="tabs-wrapper"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TabList
              onChange={handleChange}
              aria-label="tabs"
              className="tab-list"
              variant="fullWidth"
            >
              <Tab label="Grid" value="grid" className="tab-item" />
              <Tab label="List" value="list" className="tab-item" />
            </TabList>
          </motion.div>

          <AnimatePresence mode="wait">
            {value === "grid" && (
              <TabPanel value="grid" className="tab-panel">
                <motion.div
                  className="grid-wrapper"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                >
                  {coins.map((coin, i) => (
                    <Grid coin={coin} key={i} />
                  ))}
                </motion.div>
              </TabPanel>
            )}

            {value === "list" && (
              <TabPanel value="list" className="tab-panel">
                <motion.div
                  className="list-wrapper"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                >
                  {coins.map((coin, i) => (
                    <List coin={coin} key={i} />
                  ))}
                </motion.div>
              </TabPanel>
            )}
          </AnimatePresence>
        </TabContext>
      </ThemeProvider>
    </div>
  );
}
