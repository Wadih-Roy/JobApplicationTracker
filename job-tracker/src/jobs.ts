import { db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query,  } from "firebase/firestore";

export type JobStatus = "Applied" | "Interviewing" | "Offered" | "Rejected";
export const STATUS: JobStatus[] = ["Applied", "Interviewing", "Offered", "Rejected"];

export interface Job {
  id: string;
  title: string;
  company: string;
  status: JobStatus;
  link?: string;
  createdAt?: unknown
}

const jobsCol = collection(db, "jobs");

export async function loadJobs(): Promise<Job[]> {
  const q = query(jobsCol, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Job));
}

export function subscribeJobs(cb: (jobs: Job[]) => void) {
  const q = query(jobsCol, orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
        const data = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Job, "id">) }));
        cb(data);
    })
}

export async function addJobs(data: Omit<Job, "id"|"createAt"> ) {
    const ref = await addDoc(jobsCol, { ...data, createdAt: new Date() });
    return ref.id;
}

export function removeJob(id: string) {
    return deleteDoc(doc(jobsCol, id));
}