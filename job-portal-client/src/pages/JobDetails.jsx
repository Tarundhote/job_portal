import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    fetch(`https://mern-jobportal-ckfs.onrender.com/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  const handleJobApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "CV or Resume URL address",
      inputPlaceholder: "Enter the URL",
    });
    if (url) {
      Swal.fire("Application Submitted Successfully!", "", "success");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 xl:px-24">
      <PageHeader title="Job Details" path="Single Job" />

      {/* HEADER SECTION */}
      <div className="mt-10 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-sm text-gray-500 mb-2">
          Job ID: <span className="font-medium">{id}</span>
        </h3>

        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          {job.jobTitle}
        </h2>

        <p className="text-gray-600 max-w-2xl">
          Here’s how the job details align with your preferences. You can manage
          your job preferences anytime from your profile.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-6">
          <div className="flex items-center gap-2 text-gray-700">
            <FaBriefcase />
            <span className="font-medium">{job.employmentType}</span>
          </div>

          <button className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm">
            {job.jobTitle}
          </button>

          <button
            onClick={handleJobApply}
            className="px-5 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* BENEFITS */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold mb-3">Benefits</h4>
          <p className="text-sm text-gray-500 mb-4">
            Pulled from the full job description
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
            <li>${job.minPrice}k – ${job.maxPrice}k salary</li>
            <li>Health insurance</li>
            <li>Dental insurance</li>
            <li>Vision insurance</li>
            <li>Paid time off</li>
            <li>Employee discount</li>
            <li>Flexible spending account</li>
            <li>Volunteer time off</li>
          </ul>
        </div>

        {/* OUTLINE */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold mb-3">Outline</h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            Grand Canyon Education (GCE) is a rapidly growing educational service
            company that provides educational, operational, and technological
            support services. This role involves working with a close-knit web
            development team building modern applications using the latest web
            technologies.
          </p>
        </div>

        {/* FUTURE GROWTH */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold mb-3">Future Growth</h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            We focus on innovation, teamwork, and long-term growth. Developers
            at all experience levels are encouraged to apply and grow their
            careers in a supportive and collaborative environment.
          </p>
        </div>
      </div>

      {/* LONG DESCRIPTION */}
      <div className="mt-12 bg-white rounded-lg shadow-sm p-6 space-y-5 text-gray-700 text-sm leading-relaxed">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          tempore alias dolores. Maxime id quas, asperiores dolor illo
          veritatis quibusdam sint possimus quod hic nulla officiis
          necessitatibus laudantium expedita commodi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, cum
          nostrum. Exercitationem, dolores, tenetur culpa quas perspiciatis,
          libero iste voluptate totam mollitia facere fugiat fugit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          tempore alias dolores. Maxime id quas, asperiores dolor illo
          veritatis quibusdam sint possimus quod hic nulla officiis.
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
