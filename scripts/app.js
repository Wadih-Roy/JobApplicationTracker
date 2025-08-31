
const saved = JSON.parse(localStorage.getItem("jobs"));
if (saved) {
  for (const job of saved || []) {
    const jobList = document.getElementById("jobs-ul");
    const listItem = document.createElement("li");
    listItem.textContent = `${job.title} - ${job.status} - ${job.date} - ${job.link}`;
    jobList.appendChild(listItem);
  }
}

const addButton = document.getElementById("add-job");

addButton.addEventListener("click", () => {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  const jobTitle = document.getElementById("job-input").value;
  const status = document.getElementById("status-select").value;
  const date = document.getElementById("date-input").value;
  const link = document.getElementById("link-input").value;
  if (!jobTitle || !status || !date || !link)
    return console.log("Please fill all fields");

  const jobArr = { title: jobTitle, status: status, date: date, link: link};

  jobs.push(jobArr);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  const jobList = document.getElementById("jobs-ul");
    const listItem = document.createElement("li");
    listItem.textContent = `${jobTitle} - ${status} - ${date} - ${link}`;
    jobList.appendChild(listItem);

});


