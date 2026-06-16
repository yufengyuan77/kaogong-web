package com.kaogong.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "positions")
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String major;

    private String education;

    private Integer count;

    private Double ratio;

    public Position() {}

    public Position(String name, String major, String education, Integer count, Double ratio) {
        this.name = name;
        this.major = major;
        this.education = education;
        this.count = count;
        this.ratio = ratio;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getMajor() { return major; }
    public void setMajor(String major) { this.major = major; }
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }
    public Double getRatio() { return ratio; }
    public void setRatio(Double ratio) { this.ratio = ratio; }
}
