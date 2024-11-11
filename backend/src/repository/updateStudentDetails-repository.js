const makeConnection = require("../utils/connectToDB");

async function UpdateStdentCourse(data) {
  try {
    const db = makeConnection();
    const old_course_id = data.oldID;
    const new_course_id = data.newID;
    const student_id = data.ID;
    const [results] = await db.query(
      `UPDATE student
        SET 
            Course1ID = CASE WHEN Course1ID = ${old_course_id} THEN ${new_course_id} ELSE Course1ID END,
            Course2ID = CASE WHEN Course2ID = ${old_course_id} THEN ${new_course_id} ELSE Course2ID END,
            Course3ID = CASE WHEN Course3ID = ${old_course_id} THEN ${new_course_id} ELSE Course3ID END,
            Course4ID = CASE WHEN Course4ID = ${old_course_id} THEN ${new_course_id} ELSE Course4ID END,
            Course5ID = CASE WHEN Course5ID = ${old_course_id} THEN ${new_course_id} ELSE Course5ID END
        WHERE 
            ID = ${student_id}
        AND ${new_course_id} NOT IN (Course1ID, Course2ID, Course3ID, Course4ID, Course5ID);
        `
    );

    if (results.affectedRows >= 1) {
      await db.query(
        `
        UPDATE performance 
SET 
    Course1_Marks = CASE 
                      WHEN Course1ID = ${old_course_id} 
                           AND ${new_course_id} NOT IN (Course1ID, Course2ID, Course3ID, Course4ID, Course5ID) 
                      THEN 0.00 
                      ELSE Course1_Marks 
                    END,
    Course1ID = CASE 
                  WHEN Course1ID = ${old_course_id} THEN ${new_course_id} 
                  ELSE Course1ID 
                END,

    Course2_Marks = CASE 
                      WHEN Course2ID = ${old_course_id} 
                           AND ${new_course_id} NOT IN (Course1ID, Course2ID, Course3ID, Course4ID, Course5ID) 
                      THEN 0.00 
                      ELSE Course2_Marks 
                    END,
    Course2ID = CASE 
                  WHEN Course2ID = ${old_course_id} THEN ${new_course_id} 
                  ELSE Course2ID 
                END,

    Course3_Marks = CASE 
                      WHEN Course3ID = ${old_course_id} 
                           AND ${new_course_id} NOT IN (Course1ID, Course2ID, Course3ID, Course4ID, Course5ID) 
                      THEN 0.00 
                      ELSE Course3_Marks 
                    END,
    Course3ID = CASE 
                  WHEN Course3ID = ${old_course_id} THEN ${new_course_id} 
                  ELSE Course3ID 
                END,

    Course4_Marks = CASE 
                      WHEN Course4ID = ${old_course_id} 
                           AND ${new_course_id} NOT IN (Course1ID, Course2ID, Course3ID, Course4ID, Course5ID) 
                      THEN 0.00 
                      ELSE Course4_Marks 
                    END,
    Course4ID = CASE 
                  WHEN Course4ID = ${old_course_id} THEN ${new_course_id} 
                  ELSE Course4ID 
                END,

    Course5_Marks = CASE 
                      WHEN Course5ID = ${old_course_id} 
                           AND ${new_course_id} NOT IN (Course1ID, Course2ID, Course3ID, Course4ID, Course5ID) 
                      THEN 0.00 
                      ELSE Course5_Marks 
                    END,
    Course5ID = CASE 
                  WHEN Course5ID = ${old_course_id} THEN ${new_course_id} 
                  ELSE Course5ID 
                END
    WHERE 
        ID = ${student_id}
        AND ${new_course_id} NOT IN (Course1ID, Course2ID, Course3ID, Course4ID, Course5ID);
    `
      );
      return results;
    }

    throw new Error("Invalid student id or selected course");
  } catch (error) {
    console.error("Error during changinh the course: ", error);
    throw error;
  }
}

module.exports = UpdateStdentCourse;
