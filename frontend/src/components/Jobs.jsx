import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from 'framer-motion';
import Footer from "./shared/Footer";


const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const dispatch= useDispatch();

  useEffect(() => {
      if (searchedQuery) {
          const filteredJobs = allJobs.filter((job) => {
              return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                  job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                  job.location.toLowerCase().includes(searchedQuery.toLowerCase())
          })
          setFilterJobs(filteredJobs)
      } else {
          setFilterJobs(allJobs)
      }
  }, [allJobs, searchedQuery]);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20% hidden sm:block">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 my-4">
                {filterJobs.map((job) => (
                  <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job?._id}>
                  <Job job={job} />
                </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Jobs;
