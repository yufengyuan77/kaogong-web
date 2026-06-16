package com.kaogong.controller;

import com.kaogong.entity.Position;
import com.kaogong.repository.PositionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PositionController {

    private final PositionRepository positionRepo;

    public PositionController(PositionRepository positionRepo) {
        this.positionRepo = positionRepo;
    }

    /** 岗位列表，支持 ?keyword=税务 搜索 */
    @GetMapping("/positions")
    public List<Position> getPositions(@RequestParam(required = false) String keyword) {
        if (keyword != null && !keyword.isEmpty()) {
            return positionRepo.search(keyword);
        }
        return positionRepo.findAll();
    }
}
