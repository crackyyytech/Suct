
export type LeaderboardStudent = {
  id: string;
  rank: number;
  name: string;
  school: string;
  score: number;
};

export const leaderboardData: LeaderboardStudent[] = [
  {
    id: 'student-1',
    rank: 1,
    name: 'Arjun Verma',
    school: 'Sunshine Primary School',
    score: 1250,
  },
  {
    id: 'student-2',
    rank: 2,
    name: 'Priya Sharma',
    school: 'Sunshine Primary School',
    score: 1180,
  },
  {
    id: 'student-3',
    rank: 3,
    name: 'Rohan Mehta',
    school: 'Sunshine Primary School',
    score: 1120,
  },
  {
    id: 'student-4',
    rank: 4,
    name: 'Sneha Patel',
    school: 'Sunshine Primary School',
    score: 1050,
  },
  {
    id: 'student-5',
    rank: 5,
    name: 'Vikram Singh',
    school: 'Sunshine Primary School',
    score: 980,
  },
];
