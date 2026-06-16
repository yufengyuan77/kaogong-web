package com.kaogong.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class StatsController {

    /** 用户学习统计 */
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return Map.of(
                "todayStudyHours", "2h",
                "todayQuestions", 50,
                "examScore", 78,
                "streakDays", 15,
                "totalCourses", 6,
                "totalQuestions", 8,
                "totalPositions", 5
        );
    }
}
