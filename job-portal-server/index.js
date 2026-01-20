const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config(); // 👈 ENV LOAD HERE

const app = express();
const port = process.env.PORT || 5000;

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

/* -------------------- MONGODB CONNECTION -------------------- */
const uri = process.env.MONGO_URI; // 👈 ONLY ENV VARIABLE

if (!uri) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/* -------------------- RUN SERVER -------------------- */
async function run() {
  try {
    await client.connect();
    console.log("✅ MongoDB Atlas Connected Successfully");

    const db = client.db("mernJobPortal");
    const jobsCollection = db.collection("jobs");

    /* -------------------- INDEXES -------------------- */
    await jobsCollection.createIndex({ jobTitle: 1 });
    await jobsCollection.createIndex({ postedBy: 1 });

    /* -------------------- SANITIZER -------------------- */
    const sanitizeJob = (data) => ({
      jobTitle: data.jobTitle?.trim() || "",
      companyName: data.companyName?.trim() || "",
      jobLocation: data.jobLocation?.trim() || "",
      employmentType: data.employmentType || "",
      experienceLevel: data.experienceLevel || "",
      salaryType: data.salaryType || "",
      minPrice: Number(data.minPrice) || 0,
      maxPrice: Number(data.maxPrice) || 0,
      description: data.description?.trim() || "",
      postedBy: data.postedBy ? data.postedBy.toLowerCase() : "",
      createdAt: new Date(),
    });

    /* -------------------- POST JOB -------------------- */
    app.post("/post-job", async (req, res) => {
      const jobData = sanitizeJob(req.body);

      if (!jobData.jobTitle || !jobData.postedBy) {
        return res.status(400).json({
          message: "jobTitle and postedBy are required",
        });
      }

      const result = await jobsCollection.insertOne(jobData);
      res.status(201).json(result);
    });

    /* -------------------- GET ALL JOBS -------------------- */
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      res.json(jobs);
    });

    /* -------------------- GET MY JOBS -------------------- */
    app.get("/myJobs/:email", async (req, res) => {
      const email = req.params.email?.toLowerCase() || "";
      const jobs = await jobsCollection
        .find({ postedBy: email })
        .toArray();
      res.json(jobs);
    });

    /* -------------------- HEALTH CHECK -------------------- */
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB Ping Successful");
  } catch (error) {
    console.error("❌ Server Error:", error);
  }
}

run();

/* -------------------- SHUTDOWN -------------------- */
process.on("SIGINT", async () => {
  await client.close();
  process.exit(0);
});

/* -------------------- ROOT -------------------- */
app.get("/", (req, res) => {
  res.send("🚀 Job Portal Backend Running");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
