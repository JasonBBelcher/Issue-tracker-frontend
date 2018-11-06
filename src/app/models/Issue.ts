export class Issue {
  title: string;
  responsible: string;
  description: string;
  severity: string;
  status: string;
  createdBy: { username: string; email: string };
  _id: string;
}
