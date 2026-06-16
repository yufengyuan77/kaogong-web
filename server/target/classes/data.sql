-- ===== 课程数据 =====
INSERT INTO courses (id, title, category, description, instructor, thumbnail, total_lessons, duration)
SELECT 1, '行测基础课程', '行测', '从零开始系统学习行政职业能力测验，涵盖言语理解、数量关系、判断推理、资料分析四大模块，适合备考初期打基础。', '张老师', '📊', 5, '2小时15分'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE id = 1);

INSERT INTO courses (id, title, category, description, instructor, thumbnail, total_lessons, duration)
SELECT 2, '言语理解专项', '行测', '深入讲解言语理解与表达的核心考点，包括逻辑填空、阅读理解、语句表达等题型技巧，提升答题速度和准确率。', '李老师', '📖', 5, '2小时30分'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE id = 2);

INSERT INTO courses (id, title, category, description, instructor, thumbnail, total_lessons, duration)
SELECT 3, '判断推理专题', '行测', '系统学习图形推理、定义判断、类比推理、逻辑判断四大题型，掌握快速破题方法和常见陷阱。', '王老师', '🧩', 4, '2小时00分'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE id = 3);

INSERT INTO courses (id, title, category, description, instructor, thumbnail, total_lessons, duration)
SELECT 4, '申论基础课程', '申论', '申论写作入门到精通，从材料阅读、要点提炼到文章写作，全面讲解申论考试的核心能力要求。', '赵老师', '✍️', 5, '2小时45分'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE id = 4);

INSERT INTO courses (id, title, category, description, instructor, thumbnail, total_lessons, duration)
SELECT 5, '申论写作提升', '申论', '针对有一定基础的考生，重点突破大作文写作技巧，包括论点提炼、论证方法、文章结构等高分要素。', '赵老师', '📝', 4, '2小时10分'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE id = 5);

INSERT INTO courses (id, title, category, description, instructor, thumbnail, total_lessons, duration)
SELECT 6, '结构化面试', '面试', '全面解析公务员结构化面试流程，包括综合分析、组织管理、应急应变、人际交往等题型的答题思路与技巧。', '陈老师', '🎤', 5, '3小时00分'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE id = 6);

-- ===== 课时数据：课程1：行测基础课程 =====
INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 101, 1, '行测概述与备考策略', '25:30', 'https://www.bilibili.com/video/BV1Y5r5BeEdx/', 1
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 101);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 102, 1, '言语理解模块入门', '28:15', 'https://www.w3schools.com/html/mov_bbb.mp4', 2
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 102);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 103, 1, '数量关系基础方法', '30:00', 'https://www.w3schools.com/html/mov_bbb.mp4', 3
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 103);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 104, 1, '判断推理题型总览', '26:45', 'https://www.w3schools.com/html/mov_bbb.mp4', 4
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 104);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 105, 1, '资料分析速算技巧', '24:30', 'https://www.w3schools.com/html/mov_bbb.mp4', 5
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 105);

-- ===== 课时数据：课程2：言语理解专项 =====
INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 201, 2, '逻辑填空解题思维', '32:10', 'https://www.w3schools.com/html/mov_bbb.mp4', 1
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 201);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 202, 2, '语境分析与词义辨析', '28:50', 'https://www.w3schools.com/html/mov_bbb.mp4', 2
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 202);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 203, 2, '阅读理解主旨题技巧', '30:20', 'https://www.w3schools.com/html/mov_bbb.mp4', 3
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 203);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 204, 2, '细节理解与推断题', '27:40', 'https://www.w3schools.com/html/mov_bbb.mp4', 4
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 204);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 205, 2, '语句表达与排序', '31:00', 'https://www.w3schools.com/html/mov_bbb.mp4', 5
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 205);

-- ===== 课时数据：课程3：判断推理专题 =====
INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 301, 3, '图形推理规律总结', '30:15', 'https://www.w3schools.com/html/mov_bbb.mp4', 1
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 301);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 302, 3, '定义判断快速匹配', '28:30', 'https://www.w3schools.com/html/mov_bbb.mp4', 2
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 302);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 303, 3, '类比推理常见关系', '26:00', 'https://www.w3schools.com/html/mov_bbb.mp4', 3
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 303);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 304, 3, '逻辑判断精讲', '35:15', 'https://www.w3schools.com/html/mov_bbb.mp4', 4
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 304);

-- ===== 课时数据：课程4：申论基础课程 =====
INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 401, 4, '申论考试大纲解读', '30:00', 'https://www.w3schools.com/html/mov_bbb.mp4', 1
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 401);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 402, 4, '材料阅读与要点提炼', '35:20', 'https://www.w3schools.com/html/mov_bbb.mp4', 2
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 402);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 403, 4, '概括归纳题答题方法', '32:10', 'https://www.w3schools.com/html/mov_bbb.mp4', 3
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 403);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 404, 4, '综合分析题解题思路', '34:50', 'https://www.w3schools.com/html/mov_bbb.mp4', 4
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 404);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 405, 4, '对策建议题写作技巧', '32:40', 'https://www.w3schools.com/html/mov_bbb.mp4', 5
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 405);

-- ===== 课时数据：课程5：申论写作提升 =====
INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 501, 5, '大作文审题与立意', '33:00', 'https://www.w3schools.com/html/mov_bbb.mp4', 1
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 501);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 502, 5, '议论文结构搭建', '30:30', 'https://www.w3schools.com/html/mov_bbb.mp4', 2
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 502);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 503, 5, '论证方法与素材运用', '32:15', 'https://www.w3schools.com/html/mov_bbb.mp4', 3
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 503);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 504, 5, '申论高分范文精讲', '34:15', 'https://www.w3schools.com/html/mov_bbb.mp4', 4
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 504);

-- ===== 课时数据：课程6：结构化面试 =====
INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 601, 6, '面试流程与评分标准', '28:00', 'https://www.w3schools.com/html/mov_bbb.mp4', 1
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 601);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 602, 6, '综合分析题答题框架', '35:30', 'https://www.w3schools.com/html/mov_bbb.mp4', 2
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 602);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 603, 6, '组织管理题解题思路', '32:00', 'https://www.w3schools.com/html/mov_bbb.mp4', 3
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 603);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 604, 6, '应急应变与情景模拟', '30:45', 'https://www.w3schools.com/html/mov_bbb.mp4', 4
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 604);

INSERT INTO lessons (id, course_id, title, duration, video_url, order_num)
SELECT 605, 6, '面试礼仪与表达技巧', '33:45', 'https://www.w3schools.com/html/mov_bbb.mp4', 5
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE id = 605);

-- ===== 练习题 (type=practice) =====
INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 1, 'practice', '言语理解', '下列成语使用正确的是：', '["A. 他做事总是马马虎虎，一丝不苟。","B. 这篇文章条理清晰，层次分明。","C. 他对朋友漠不关心，乐于助人。","D. 大家齐心协力，南辕北辙。"]', 'B', '条理清晰、层次分明使用正确。'
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 1);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 2, 'practice', '判断推理', '如果所有公务员都需要考试，小王是公务员，那么：', '["A. 小王不需要考试","B. 小王需要考试","C. 无法确定","D. 小王已经考试"]', 'B', '典型充分条件推理。'
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 2);

-- ===== 模拟考题 (type=exam) =====
INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 3, 'exam', '行测', '公务员考试属于：', '["A. 选拔考试","B. 资格考试","C. 学历考试","D. 技能考试"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 3);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 4, 'exam', '行测', '逻辑推理题属于：', '["A. 申论","B. 行测","C. 面试","D. 公基"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 4);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 5, 'exam', '行测', '资料分析主要考察：', '["A. 阅读能力","B. 计算能力","C. 写作能力","D. 表达能力"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 5);

-- ===== 模拟考题 (type=exam) — 常识判断 =====
INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 9, 'exam', '常识判断', '我国现行宪法是哪一年通过的：', '["A. 1954年","B. 1978年","C. 1982年","D. 1999年"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 9);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 10, 'exam', '常识判断', '中华人民共和国国歌《义勇军进行曲》的词作者是：', '["A. 聂耳","B. 田汉","C. 冼星海","D. 贺绿汀"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 10);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 11, 'exam', '常识判断', '我国最高国家权力机关是：', '["A. 国务院","B. 全国人民代表大会","C. 最高人民法院","D. 最高人民检察院"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 11);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 12, 'exam', '常识判断', '下列哪项不属于我国四大发明：', '["A. 造纸术","B. 印刷术","C. 地动仪","D. 火药"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 12);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 13, 'exam', '常识判断', '光年是什么的单位：', '["A. 时间","B. 距离","C. 速度","D. 亮度"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 13);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 14, 'exam', '常识判断', '中国共产党的根本宗旨是：', '["A. 实现共产主义","B. 全心全意为人民服务","C. 以经济建设为中心","D. 坚持改革开放"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 14);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 15, 'exam', '常识判断', '下列哪个是我国最大的淡水湖：', '["A. 洞庭湖","B. 鄱阳湖","C. 太湖","D. 青海湖"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 15);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 16, 'exam', '常识判断', '一带一路中的"一带"指的是：', '["A. 长江经济带","B. 丝绸之路经济带","C. 沿海经济带","D. 黄河经济带"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 16);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 17, 'exam', '常识判断', '我国第一部诗歌总集是：', '["A. 《楚辞》","B. 《诗经》","C. 《乐府诗集》","D. 《唐诗三百首》"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 17);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 18, 'exam', '常识判断', '世界上海拔最高的高原是：', '["A. 青藏高原","B. 帕米尔高原","C. 云贵高原","D. 蒙古高原"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 18);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 19, 'exam', '常识判断', '下列不属于可再生能源的是：', '["A. 太阳能","B. 风能","C. 天然气","D. 水能"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 19);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 20, 'exam', '常识判断', '我国法定退休年龄中，男性一般为：', '["A. 55周岁","B. 60周岁","C. 62周岁","D. 65周岁"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 20);

-- ===== 模拟考题 (type=exam) — 言语理解 =====
INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 21, 'exam', '言语理解', '下列句子中没有语病的是：', '["A. 通过这次学习，使我提高了认识","B. 他的写作水平有了明显的提高","C. 我们要善于发扬并总结工作经验","D. 能否刻苦学习是取得好成绩的关键"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 21);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 22, 'exam', '言语理解', '填入划横线处最恰当的一项是：他的发言_____，赢得了与会者的一致好评。', '["A. 言简意赅","B. 喋喋不休","C. 含糊其辞","D. 夸夸其谈"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 22);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 23, 'exam', '言语理解', '下列词语书写完全正确的一组是：', '["A. 按部就班 迫不及待","B. 按步就班 迫不急待","C. 按部就搬 迫不及待","D. 安步就班 迫不急待"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 23);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 24, 'exam', '言语理解', '这段文字主要说明的是：保护生态环境就是保护生产力，改善生态环境就是发展生产力。', '["A. 经济与环保的关系","B. 生产力与环保的关系","C. 如何改善环境","D. 环保的重要性"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 24);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 25, 'exam', '言语理解', '下列各句中使用修辞手法错误的是：', '["A. 春天像小姑娘，花枝招展的","B. 他的声音像雷鸣一般响亮","C. 月亮躲进了云层里","D. 他非常高兴，脸色像白纸一样"]', 'D', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 25);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 26, 'exam', '言语理解', '"纸上得来终觉浅，绝知此事要躬行"强调的是：', '["A. 读书的重要性","B. 实践的重要性","C. 理论的重要性","D. 思考的重要性"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 26);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 27, 'exam', '言语理解', '下列词语感情色彩相同的一组是：', '["A. 坚强 顽固","B. 聪明 狡猾","C. 勇敢 英勇","D. 节俭 吝啬"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 27);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 28, 'exam', '言语理解', '最适合做这段文字标题的是：人工智能技术正在深刻改变我们的生活方式，从智能家居到自动驾驶，AI无处不在。', '["A. 科技改变生活","B. AI技术深度融入日常","C. 智能家居的发展","D. 人工智能的未来趋势"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 28);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 29, 'exam', '言语理解', '下列句子中成语使用恰当的是：', '["A. 他学习刻苦，成绩首屈一指","B. 阅览室里人迹罕至，十分安静","C. 这里风景美不胜收，令人叹为观止","D. 敌人锐不可当地向我军扑来"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 29);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 30, 'exam', '言语理解', '填入下面横线处最恰当的一组关联词是：_____困难有多大，我们_____要坚持到底。', '["A. 即使 也","B. 因为 所以","C. 只有 才","D. 虽然 但是"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 30);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 31, 'exam', '言语理解', '下列选项中对"欲速则不达"理解正确的是：', '["A. 速度越快越好","B. 急于求成反而达不到目的","C. 不要追求速度","D. 速度与结果无关"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 31);

-- ===== 模拟考题 (type=exam) — 数量关系 =====
INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 32, 'exam', '数量关系', '某商品原价200元，打八折后售价为：', '["A. 120元","B. 140元","C. 160元","D. 180元"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 32);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 33, 'exam', '数量关系', '甲、乙两人同时从A地出发前往B地，甲的速度是乙的1.5倍，甲比乙早到1小时，则甲到达B地用了：', '["A. 1小时","B. 2小时","C. 3小时","D. 4小时"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 33);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 34, 'exam', '数量关系', '某班有40名学生，其中男生占60%，则女生人数为：', '["A. 16人","B. 18人","C. 20人","D. 24人"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 34);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 35, 'exam', '数量关系', '1，3，6，10，15，（）：', '["A. 18","B. 20","C. 21","D. 25"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 35);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 36, 'exam', '数量关系', '一项工程，甲单独做需要10天，乙单独做需要15天，两人合作需要多少天：', '["A. 5天","B. 6天","C. 7天","D. 8天"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 36);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 37, 'exam', '数量关系', '某数除以5余3，除以7余4，这个数最小是：', '["A. 13","B. 18","C. 23","D. 38"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 37);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 38, 'exam', '数量关系', '一个长方形的周长是30厘米，长是宽的2倍，则面积为：', '["A. 30平方厘米","B. 40平方厘米","C. 50平方厘米","D. 60平方厘米"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 38);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 39, 'exam', '数量关系', '某公司去年利润增长20%，今年利润是去年的1.5倍，则今年利润是前年的：', '["A. 1.5倍","B. 1.7倍","C. 1.8倍","D. 2.0倍"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 39);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 40, 'exam', '数量关系', '有红、黄、蓝三种颜色的球各若干个，红球占总数的1/3，黄球比蓝球多5个，红球比蓝球多8个，则红球有：', '["A. 10个","B. 12个","C. 14个","D. 16个"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 40);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 41, 'exam', '数量关系', '2，5，10，17，26，（）：', '["A. 35","B. 37","C. 39","D. 41"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 41);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 42, 'exam', '数量关系', '在浓度为15%的盐水中加入20克盐，浓度变为25%，原来有盐水：', '["A. 100克","B. 150克","C. 200克","D. 250克"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 42);

-- ===== 模拟考题 (type=exam) — 判断推理 =====
INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 43, 'exam', '判断推理', '如果天下雨，那么地面湿。现在地面没有湿，可以推出：', '["A. 天没有下雨","B. 天下雨了","C. 无法确定","D. 地面干了"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 43);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 44, 'exam', '判断推理', '下列图形中，与众不同的是：', '["A. 正方形","B. 长方形","C. 菱形","D. 圆形"]', 'D', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 44);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 45, 'exam', '判断推理', '所有的公务员都通过了考试，小张是公务员，所以：', '["A. 小张通过了考试","B. 小张没有通过考试","C. 小张不是公务员","D. 无法确定"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 45);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 46, 'exam', '判断推理', '定义判断：行政许可是指行政机关根据公民、法人或者其他组织的申请，经依法审查，准予其行为。下列属于行政许可的是：', '["A. 交警对违章车辆罚款","B. 工商局为某公司颁发营业执照","C. 税务局对偷税行为进行处罚","D. 公安局对犯罪嫌疑人进行拘留"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 46);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 47, 'exam', '判断推理', '类比推理：医生对医院相当于教师对：', '["A. 教室","B. 学校","C. 学生","D. 教材"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 47);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 48, 'exam', '判断推理', '某单位有五名工作人员：甲、乙、丙、丁、戊。已知甲比乙高，丙比丁矮，戊比甲矮但比乙高。以下排序正确的是：', '["A. 甲>丙>丁","B. 甲>戊>乙","C. 丙<丁<戊","D. 乙>戊>甲"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 48);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 49, 'exam', '判断推理', '下列哪项最能削弱"只要努力学习，就一定能考上公务员"这一观点：', '["A. 很多人努力学习却没考上","B. 公务员考试很难","C. 有人不努力学习也考上了","D. 学习方法很重要"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 49);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 50, 'exam', '判断推理', '类比推理：鼠标对电脑相当于遥控器对：', '["A. 沙发","B. 电视","C. 空调","D. 冰箱"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 50);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 51, 'exam', '判断推理', '如果某人是党员，那么他一定拥护党的纲领。小张拥护党的纲领，因此：', '["A. 小张一定是党员","B. 小张不一定是党员","C. 小张一定不是党员","D. 以上都不对"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 51);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 52, 'exam', '判断推理', '①收集素材 ②确定选题 ③撰写初稿 ④修改润色 ⑤发表文章。正确的逻辑顺序是：', '["A. ①②③④⑤","B. ②①③④⑤","C. ②①③⑤④","D. ①②④③⑤"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 52);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 53, 'exam', '判断推理', '定义判断：机会成本是指为了得到某种东西而放弃的其他东西的最大价值。下列哪项涉及机会成本：', '["A. 小张花100元买了一本书","B. 小王选择加班而放弃了看电影","C. 小李把钱存入银行获得利息","D. 小赵付房租给房东"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 53);

-- ===== 模拟考题 (type=exam) — 资料分析 =====
INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 54, 'exam', '资料分析', '某市2023年GDP为5000亿元，同比增长8%，则2022年GDP约为：', '["A. 4600亿元","B. 4630亿元","C. 4850亿元","D. 4900亿元"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 54);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 55, 'exam', '资料分析', '某公司一季度销售额为120万元，二季度环比增长25%，则二季度销售额为：', '["A. 130万元","B. 140万元","C. 145万元","D. 150万元"]', 'D', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 55);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 56, 'exam', '资料分析', '某班级50人中，男生占48%，女生人数比男生多：', '["A. 1人","B. 2人","C. 3人","D. 4人"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 56);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 57, 'exam', '资料分析', '某地区人口为200万，年增长率为1.5%，按此速度增长，第二年人口约：', '["A. 201万","B. 203万","C. 230万","D. 215万"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 57);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 58, 'exam', '资料分析', '某商店5月份营业额比4月份增长20%，6月份比5月份下降10%，6月份营业额是4月份的：', '["A. 108%","B. 110%","C. 112%","D. 120%"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 58);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 59, 'exam', '资料分析', '某调查显示，受访者中25%选择A选项，35%选择B选项，20%选择C选项，其余选择D选项，则选择D选项的占比为：', '["A. 10%","B. 15%","C. 20%","D. 25%"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 59);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 60, 'exam', '资料分析', '根据下表，2019-2023年间增速最快的年份是（2019:100, 2020:115, 2021:126, 2022:145, 2023:168）：', '["A. 2020年","B. 2021年","C. 2022年","D. 2023年"]', 'A', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 60);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 61, 'exam', '资料分析', '甲乙两人的收入比为5:3，甲比乙多收入1200元，则甲的收入为：', '["A. 2000元","B. 2400元","C. 3000元","D. 3600元"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 61);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 62, 'exam', '资料分析', '某产品合格率为95%，现抽查200件产品，预计合格品约为：', '["A. 180件","B. 185件","C. 190件","D. 195件"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 62);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 63, 'exam', '资料分析', '某地去年粮食产量为800万吨，今年比去年增产12%，今年产量为：', '["A. 880万吨","B. 896万吨","C. 912万吨","D. 960万吨"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 63);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 64, 'exam', '资料分析', '在1000人的调查中，有600人使用手机支付，400人使用现金，200人两者都用。则至少使用一种支付方式的人数是：', '["A. 600人","B. 800人","C. 1000人","D. 1200人"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 64);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 65, 'exam', '资料分析', '某工厂前三季度产量分别为120、150、180吨，第四季度预计比第三季度增长10%，则全年产量约为：', '["A. 608吨","B. 618吨","C. 638吨","D. 648吨"]', 'D', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 65);

-- ===== 能力测评题 (type=assessment) =====
INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 6, 'assessment', '言语理解', '下列词语使用正确的是：', '["A. 南辕北辙","B. 条理清晰","C. 自相矛盾","D. 张冠李戴"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 6);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 7, 'assessment', '判断推理', '所有公务员都需要考试，小王是公务员，那么：', '["A. 小王不考试","B. 小王需要考试","C. 无法判断","D. 小王已经考试"]', 'B', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 7);

INSERT INTO questions (id, type, category, title, options, answer, analysis)
SELECT 8, 'assessment', '资料分析', '某单位人数由100增长到120，增长率为：', '["A. 10%","B. 15%","C. 20%","D. 25%"]', 'C', null
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE id = 8);

-- ===== 岗位数据 =====
INSERT INTO positions (id, name, major, education, count, ratio)
SELECT 1, '国家税务总局', '不限专业', '本科', 5000, 45
WHERE NOT EXISTS (SELECT 1 FROM positions WHERE id = 1);

INSERT INTO positions (id, name, major, education, count, ratio)
SELECT 2, '海关', '计算机类', '本科', 800, 32
WHERE NOT EXISTS (SELECT 1 FROM positions WHERE id = 2);

INSERT INTO positions (id, name, major, education, count, ratio)
SELECT 3, '市场监督管理局', '法学', '本科', 600, 28
WHERE NOT EXISTS (SELECT 1 FROM positions WHERE id = 3);

INSERT INTO positions (id, name, major, education, count, ratio)
SELECT 4, '财政局', '会计学', '本科', 500, 20
WHERE NOT EXISTS (SELECT 1 FROM positions WHERE id = 4);

INSERT INTO positions (id, name, major, education, count, ratio)
SELECT 5, '公安系统', '计算机类', '本科', 1200, 35
WHERE NOT EXISTS (SELECT 1 FROM positions WHERE id = 5);
