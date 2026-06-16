package com.kaogong.repository;

import com.kaogong.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PositionRepository extends JpaRepository<Position, Long> {

    @Query("SELECT p FROM Position p WHERE p.name LIKE %:keyword% OR p.major LIKE %:keyword%")
    List<Position> search(String keyword);
}
