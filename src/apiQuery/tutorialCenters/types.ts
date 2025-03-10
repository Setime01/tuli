export interface TutorialCenters {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  _count: {
    users: number;
  };
  admins: { first_name: string; last_name: string; created_at: string }[];
}
