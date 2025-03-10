export interface BaseTestsProps {
  id: string;
  name: string;
  tutorial_center_id: string;
  short_description: string;
  year: string;
  type: string;
  solution?: string;
  subject_id: number;
  exam_type_id: number;
  created_at?: string;
  active: boolean;
  allow_retake: boolean;
  show_answers: boolean;
  duration: number;
  ExamType: { id: number; name: string };
  Subject: { id: number; name: string };
  questions: any[];
}

export interface CreateTestsProps
  extends Omit<
    BaseTestsProps,
    "created_at" | "id" | "type" | "ExamType" | "Subject" | "active"
  > {}

export interface SubmitTestProps {
  total_score: number;
  scores: {
    subject_id: number;
    name: string;
    score: number;
  }[];
  test_ids: string[];
}

export interface GroupedTestResponseProps {
  tests: BaseTestsProps[];
  page: number;
  pages: number;
  total: number;
}
