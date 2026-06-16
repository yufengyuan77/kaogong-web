package com.kaogong.controller;

import com.kaogong.entity.Course;
import com.kaogong.entity.Lesson;
import com.kaogong.repository.CourseRepository;
import com.kaogong.repository.LessonRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseController {

    private final CourseRepository courseRepo;
    private final LessonRepository lessonRepo;

    public CourseController(CourseRepository courseRepo, LessonRepository lessonRepo) {
        this.courseRepo = courseRepo;
        this.lessonRepo = lessonRepo;
    }

    /** 课程列表，支持 ?category=行测 筛选 */
    @GetMapping("/courses")
    public List<Course> getCourses(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return courseRepo.findByCategory(category);
        }
        return courseRepo.findAll();
    }

    /** 课程详情 */
    @GetMapping("/courses/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Long id) {
        return courseRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** 某课程的所有课时 */
    @GetMapping("/courses/{id}/lessons")
    public List<Lesson> getLessons(@PathVariable Long id) {
        return lessonRepo.findByCourseIdOrderByOrderNumAsc(id);
    }

    /** 课时详情 */
    @GetMapping("/lessons/{id}")
    public ResponseEntity<Lesson> getLesson(@PathVariable Long id) {
        return lessonRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
