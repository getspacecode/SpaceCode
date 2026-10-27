// Placeholder data — swap for a database fetch later.
// Add real entries here (or fetch them) and every field below will show up
// on both /projects and /projects/[id] automatically.

export type Project = {
  id: string;
  title: string;
  image: string;
  category: string;
  year: string;
  client: string;
  duration: string;
  role: string;
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  tags: string[];
  liveUrl?: string;
};
