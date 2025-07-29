import React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { motion } from 'framer-motion';
import './style.css';

export default function PaginationComponent({ page, handelPageChange, count }) {
  return (
    <motion.div
      className="pagination-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Typography className="page-label">Page: {page}</Typography>
      <Pagination
        count={count}
        page={page}
        onChange={handelPageChange}
        color="standard"
        shape="rounded"
      />
    </motion.div>
  );
}
