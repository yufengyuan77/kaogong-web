package com.kaogong.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 题目类型: practice(练习), exam(考试), assessment(测评)
     */
    @Column(nullable = false)
    private String type;

    /**
     * 分类: 言语理解, 判断推理, 资料分析 等
     */
    private String category;

    @Column(nullable = false, length = 2000)
    private String title;

    /**
     * 选项，JSON 数组字符串，如 '["A. xxx","B. xxx","C. xxx","D. xxx"]'
     */
    @Column(length = 2000)
    private String options;

    private String answer;

    @Column(length = 2000)
    private String analysis;

    public Question() {}

    public Question(String type, String category, String title, String options,
                    String answer, String analysis) {
        this.type = type;
        this.category = category;
        this.title = title;
        this.options = options;
        this.answer = answer;
        this.analysis = analysis;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getOptions() { return options; }
    public void setOptions(String options) { this.options = options; }
    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
    public String getAnalysis() { return analysis; }
    public void setAnalysis(String analysis) { this.analysis = analysis; }
}
