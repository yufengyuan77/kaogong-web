package com.kaogong.controller;

import com.kaogong.entity.Question;
import com.kaogong.repository.QuestionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuestionController {

    private final QuestionRepository questionRepo;

    public QuestionController(QuestionRepository questionRepo) {
        this.questionRepo = questionRepo;
    }

    /** 题库列表，支持 ?type=practice&category=言语理解 */
    @GetMapping("/questions")
    public List<Question> getQuestions(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String category) {

        if (type != null && category != null) {
            return questionRepo.findByTypeAndCategory(type, category);
        }
        if (type != null) {
            return questionRepo.findByType(type);
        }
        return questionRepo.findAll();
    }

    /** 题目详情 */
    @GetMapping("/questions/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        return questionRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
