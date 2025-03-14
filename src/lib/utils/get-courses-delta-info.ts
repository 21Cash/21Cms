interface CourseData {
  course: string;
  classesHeld: number;
  classesPresent: number;
}

interface CourseDeltaInfoProps {
  prevCourseData: CourseData[];
  currentCourseData: CourseData[];
}

interface AbsentClass {
  courseCode: string;
  absentCnt: number;
}

interface PresentClass {
  courseCode: string;
  presentCnt: number;
}

interface CourseDeltaResult {
  absentClasses: AbsentClass[];
  presentClasses: PresentClass[];
}

const getCoursesDeltaInfo = ({
  prevCourseData,
  currentCourseData,
}: CourseDeltaInfoProps): CourseDeltaResult => {
  const absentClasses: AbsentClass[] = [];
  const presentClasses: PresentClass[] = [];

  currentCourseData.forEach((current) => {
    const prev = prevCourseData.find((p) => p.course === current.course);
    if (!prev) return;

    const heldDiff = current.classesHeld - prev.classesHeld;
    const presentDiff = current.classesPresent - prev.classesPresent;
    const absentDiff = heldDiff - presentDiff;

    if (presentDiff > 0) {
      presentClasses.push({
        courseCode: current.course,
        presentCnt: presentDiff,
      });
    }

    if (absentDiff > 0) {
      absentClasses.push({ courseCode: current.course, absentCnt: absentDiff });
    }
  });

  return { absentClasses, presentClasses };
};

export { getCoursesDeltaInfo, CourseData };
