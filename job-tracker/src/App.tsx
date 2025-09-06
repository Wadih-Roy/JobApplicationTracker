  import "./App.css";
  import { useEffect, useState, useRef } from "react";
  import {
    addJobs,
    type JobStatus,
    type Job,
    STATUS,
    subscribeJobs,
    loadJobs,
    removeJob,
  } from "./jobs";

  export function App() {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [status, setStatus] = useState<JobStatus>("Applied");
    const [link, setLink] = useState("");
    const [jobs, setJobs] = useState<Job[]>([]);
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const unsubscribe = subscribeJobs(setJobs);
      return unsubscribe;
    }, []);

    useEffect(() => {
      loadJobs().then(setJobs);
    }, []);

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (!title.trim() || !company.trim() || !status.trim() || !link) return;

      await addJobs({
        title: title.trim(),
        company: company.trim(),
        status,
        link: link.trim() || undefined,
      });

      setTitle("");
      setCompany("");
      setStatus("Applied");
      setLink("");
      titleRef.current?.focus();
    }

    function handleDelete(id: string) {
      return removeJob(id);
    } 

    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3x1 font-bold mb-6"> Job Tracker </h1>

        {/* FORM SECTION */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font medium mb-1">Job Title</label>

            <input
              id="title"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border rounded px-3 py-2"
              placeholder="Software Developer"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1"> Company </label>
            <input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border border rounded px-3 py-2"
              placeholder="Google"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font medium mb-1"> Status </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as JobStatus)}
              className="w-full border border rounded px-3 py-2"
            >
              {STATUS.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font medium mb-1">
              Application Link
            </label>
            <input
              id="link"
              value={link}
              type="url"
              inputMode="url"
              onChange={(e) => setLink(e.target.value)}
              className="w-full border border rounded px-3 py-2"
              placeholder="Site URL"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover: bg-blue-700"
          >
            Add Job
          </button>
        </form>

        {/* JOB LIST SECTION */}

        <section className="max-w-xl">
          <h2 className="txt-xl font-semibold mb-4"> Job List </h2>
          {jobs.length === 0 ? (
            <p className="text-gray-600"> No jobs added yet. </p>
          ) : (
            <ul className="space-y-3">
              {jobs.map((job) => (
                <li key={job.id} className="text-gray-600">
                  <div className="font-medium">
                    {job.title} at{" "}
                    {job.company && (
                      <span className="text-gray=600">@ {job.company} </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{job.status}</div>
                  {job.link && (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      {job.link}
                    </a>
                  )}
                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="ml-4 text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    );
  }
