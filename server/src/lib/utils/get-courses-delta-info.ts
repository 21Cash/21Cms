interface CourseData {
  course: string;
  classesHeld: number;
  classesPresent: number;
}

interface CourseDeltaInfoProps {
  prevCourseData: CourseData[];
  currentCourseData: CourseData[];
}

interface CourseDelta {
  courseCode: string;
  presentCount: number;
  absentCount: number;
  classesHeld: number;
  classesPresent: number;
}

const getCoursesDelta = ({
  prevCourseData,
  currentCourseData,
}: CourseDeltaInfoProps): CourseDelta[] => {
  return currentCourseData.map((current) => {
    const prev =
      prevCourseData && prevCourseData.length > 0
        ? prevCourseData.find((p) => p.course === current.course) || {
            classesHeld: 0,
            classesPresent: 0,
          }
        : { classesHeld: 0, classesPresent: 0 };

    const heldDiff = current.classesHeld - prev.classesHeld;
    const presentDiff = current.classesPresent - prev.classesPresent;
    const absentDiff = heldDiff - presentDiff;

    return {
      courseCode: current.course,
      presentCount: presentDiff > 0 ? presentDiff : 0,
      absentCount: absentDiff > 0 ? absentDiff : 0,
      classesHeld: current.classesHeld,
      classesPresent: current.classesPresent,
    };
  });
};

export { getCoursesDelta, CourseData, CourseDelta, CourseDeltaInfoProps };
