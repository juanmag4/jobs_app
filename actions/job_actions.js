import axios from "axios";
import qs from "qs";

import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from "../actions/types";
import locationify from "../utils/locationify";

const GITHUB_ADDRESS = "https://authenticjobs.com/api/?";

const JOB_QUERY_PARAMS = {
  api_key: "bd30dde2e8c818a9792851aef058eeae",
  method: "aj.jobs.search",
  perpage: "10",
  format: "json",
  keywords: "javascript"
};

const buildJobsUrl = () => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS });
  return `${GITHUB_ADDRESS}${query}`;
};

export const fetchJobs = (region, callback, distance = 10) => async dispatch => {
  try {
    const url = buildJobsUrl();
    let job_list = await axios.get(url);
    job_list = {
      results: locationify(
        region,
        job_list.data.listings.listing,
        distance,
        (obj, coords) => {
          obj.company.location = { ...obj.company.location, ...coords };
          return obj;
        }
      )
    };
    // console.log(job_list);
    dispatch({
      type: FETCH_JOBS,
      payload: job_list
    });
    callback();
  } catch (e) {
    console.log("fetchJobs ACTION ERROR:", e.message);
  }
};

export const likeJob = (job) => {
  // console.log(job);
  return {
    type: LIKE_JOB,
    payload: job
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
}