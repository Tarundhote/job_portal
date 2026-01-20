import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Jobs from "./Jobs";
import Card from "../components/Card";
import Newsletter from "../components/Newsletter";

/* ===================== BANNER (INLINE) ===================== */
const Banner = ({
  jobQuery,
  locationQuery,
  onJobChange,
  onLocationChange,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
      <div className="max-w-5xl mx-auto px-4 text-center text-white">
        <h1 className="text-4xl font-bold mb-3 text-black">
          Find Your Dream Job
        </h1>
        <p className="mb-10 text-black">
          Search jobs by title and location
        </p>

        {/* SEARCH BAR CONTAINER */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-8 items-center border border-gray-200">
          {/* JOB SEARCH */}
          <div className="flex items-center w-full md:w-1/2 border-2 border-gray-300 rounded-xl px-4 py-1 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
            <span className="text-gray-400 mr-3 text-lg">💼</span>
            <input
              type="text"
              placeholder="Job title (React, Frontend...)"
              value={jobQuery}
              onChange={onJobChange}
              className="w-full py-3 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* LOCATION SEARCH */}
          <div className="flex items-center w-full md:w-1/2 border-2 border-gray-300 rounded-xl px-4 py-1 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
            <span className="text-gray-400 mr-3 text-lg">📍</span>
            <input
              type="text"
              placeholder="Location (Delhi, Pune...)"
              value={locationQuery}
              onChange={onLocationChange}
              className="w-full py-3 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


/* ===================== HOME PAGE ===================== */
const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(true);

  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  /* ---------------- FETCH JOBS ---------------- */
  useEffect(() => {
    setIsLoading(true);
    fetch("https://mern-jobportal-ckfs.onrender.com/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  /* ---------------- INPUT HANDLERS ---------------- */
  const handleJobChange = (e) => {
    setJobQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleLocationChange = (e) => {
    setLocationQuery(e.target.value);
    setCurrentPage(1);
  };

  /* ---------------- SEARCH LOGIC ---------------- */
  const filteredItems = jobs
    .filter(Boolean)
    .filter((job) => {
      const jobText = jobQuery.toLowerCase();
      const locationText = locationQuery.toLowerCase();

      const matchJob =
        !jobText ||
        (job?.jobTitle ?? "").toLowerCase().includes(jobText);

      const matchLocation =
        !locationText ||
        (job?.jobLocation ?? "").toLowerCase().includes(locationText);

      return matchJob && matchLocation;
    });

  /* ---------------- SIDEBAR FILTERS ---------------- */
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  /* ---------------- PAGINATION ---------------- */
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  /* ---------------- CATEGORY FILTER ---------------- */
  let finalJobs = filteredItems;

  if (selectedCategory) {
    finalJobs = finalJobs.filter(
      ({
        jobLocation,
        salaryType,
        experienceLevel,
        maxPrice,
        employmentType,
      }) =>
        (jobLocation ?? "").toLowerCase() ===
          selectedCategory.toLowerCase() ||
        (salaryType ?? "").toLowerCase() ===
          selectedCategory.toLowerCase() ||
        (experienceLevel ?? "").toLowerCase() ===
          selectedCategory.toLowerCase() ||
        (employmentType ?? "").toLowerCase() ===
          selectedCategory.toLowerCase() ||
        (Number(maxPrice) && Number(maxPrice) <= Number(selectedCategory))
    );
  }

  const paginatedJobs = finalJobs.slice(startIndex, endIndex);

  /* ---------------- UI ---------------- */
  return (
    <div>
      <Banner
        jobQuery={jobQuery}
        locationQuery={locationQuery}
        onJobChange={handleJobChange}
        onLocationChange={handleLocationChange}
      />

      <div className="bg-gray-50 md:grid grid-cols-4 gap-8 max-w-7xl mx-auto px-4 py-12">
        {/* Sidebar */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* Jobs */}
        <div className="col-span-2 bg-white p-5 rounded-lg shadow-sm">
          {isLoading ? (
            <p className="font-medium text-gray-600">Loading jobs...</p>
          ) : paginatedJobs.length > 0 ? (
            <Jobs
              result={paginatedJobs.map((job, i) => (
                <Card key={job?._id || i} data={job} />
              ))}
            />
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold mb-2">
                No Jobs Found
              </h3>
              <p className="text-gray-500">
                Try changing your search or filters
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredItems.length > 0 && (
            <div className="flex justify-center items-center mt-8 gap-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded border hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-gray-600">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>

              <button
                onClick={nextPage}
                disabled={
                  currentPage ===
                  Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="px-4 py-2 rounded border hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Newsletter */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
