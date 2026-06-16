package com.kaogong.repository;

import com.kaogong.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByType(String type);
    List<Question> findByTypeAndCategory(String type, String category);
}
