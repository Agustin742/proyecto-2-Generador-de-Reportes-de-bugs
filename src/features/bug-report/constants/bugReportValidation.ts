export const BUG_REPORT_FIELD_LIMITS = {
  title: {
    min: 3,
    max: 100,
  },
  description: {
    min: 20,
    max: 600,
  },
  steps: {
    min: 10,
    max: 1000,
  },
  expectedResult: {
    min: 5,
    max: 500,
  },
  actualResult: {
    min: 5,
    max: 500,
  },
  environment: {
    min: 3,
    max: 300,
  },
} as const;
