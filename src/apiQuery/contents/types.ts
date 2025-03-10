export interface ExcerciseProps {
  question: string;
  image: string;
  options: string[];
  answer: string;
  subject_id: number;
  tutorial_center_id: string;
  solution: string;
  created_by: string;
}

export interface CreateContentProps {
  subject_id: number;
  topic: string;
  contentUrl: string;
  tutorial_center_id: string;
  exercises: ExcerciseProps[];
  free: true;
}

export interface ContentResponseProps {
  id: string;
  subject: {
    name: string;
  };
  contentUrl: string;
  created_at: string;
  free: boolean;
  topic: string;
  exercises: { [x: string]: any }[];
}

export interface GroupedContentResponseProps {
  contents: ContentResponseProps[];
  page: number;
  pages: number;
  total: number;
}
