window.onload = function () {
  const saved = JSON.parse(localStorage.getItem("jobs"));

  if (saved) {
    for (const job of saved || []) {
        content(job.title, job.status, job.date, job.link)
    }
  }
};

const addButton = document.getElementById("add-job");

addButton.addEventListener("click", () => {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  const jobTitle = document.getElementById("job-input").value;
  const status = document.getElementById("status-select").value;
  const date = document.getElementById("date-input").value;
  const link = document.getElementById("link-input").value;
  if (!jobTitle || !status || !date || !link)
    return console.log("Please fill all fields");

  const jobArr = { title: jobTitle, status: status, date: date, link: link };

  jobs.push(jobArr);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  content(jobTitle, status, date, link)
});

function content(title, status, date, link) {
    const jobList = document.getElementById("jobs-ul");
    const listItem = document.createElement("li");
    const a = document.createElement("a");
    a.href = link;
    a.textContent = title;
    a.target = "_blank";
    listItem.innerHTML = `${title} - ${status} - ${date} - `;
    listItem.appendChild(a);
    jobList.appendChild(listItem)
}