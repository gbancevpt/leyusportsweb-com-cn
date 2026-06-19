const contentSections = [
  {
    id: 'home',
    title: '首页',
    tags: ['乐鱼体育', '体育新闻', '赛事动态'],
    description: '乐鱼体育为您提供最新体育资讯与赛事推荐。'
  },
  {
    id: 'live',
    title: '直播',
    tags: ['乐鱼体育', '直播赛事', '比分直播', '体育直播'],
    description: '乐鱼体育直播频道涵盖足球、篮球、网球等热门运动。'
  },
  {
    id: 'news',
    title: '新闻',
    tags: ['乐鱼体育', '体育新闻', '转会消息', '深度报道'],
    description: '乐鱼体育新闻板块为您带来最新鲜的体育资讯。'
  },
  {
    id: 'video',
    title: '视频',
    tags: ['乐鱼体育', '精彩集锦', '赛事回放', '独家采访'],
    description: '乐鱼体育视频中心提供高清赛事录像与花絮。'
  },
  {
    id: 'community',
    title: '社区',
    tags: ['乐鱼体育', '球迷论坛', '互动讨论'],
    description: '乐鱼体育社区汇聚全球球迷，畅聊体育世界。'
  }
];

const keywordMap = {
  '乐鱼体育': ['live', 'news', 'video'],
  '体育新闻': ['news', 'home'],
  '直播赛事': ['live'],
  '精彩集锦': ['video'],
  '球迷论坛': ['community']
};

function normalize(str) {
  return str.toLowerCase().replace(/[\s\-]+/g, '');
}

function searchSections(query) {
  if (!query || typeof query !== 'string') return [];
  const normalized = normalize(query);
  const results = [];
  const seenIds = new Set();

  // 检查关键词映射
  const mappedIds = keywordMap[query];
  if (mappedIds) {
    for (const id of mappedIds) {
      if (!seenIds.has(id)) {
        seenIds.add(id);
        const section = contentSections.find(s => s.id === id);
        if (section) results.push(section);
      }
    }
  }

  // 标签匹配
  for (const section of contentSections) {
    if (seenIds.has(section.id)) continue;
    for (const tag of section.tags) {
      if (normalize(tag).includes(normalized)) {
        seenIds.add(section.id);
        results.push(section);
        break;
      }
    }
  }

  // 标题和描述模糊搜索
  for (const section of contentSections) {
    if (seenIds.has(section.id)) continue;
    const titleNorm = normalize(section.title);
    const descNorm = normalize(section.description);
    if (titleNorm.includes(normalized) || descNorm.includes(normalized)) {
      seenIds.add(section.id);
      results.push(section);
    }
  }

  return results;
}

function getSectionById(id) {
  return contentSections.find(s => s.id === id) || null;
}

function getAllTags() {
  const tagSet = new Set();
  for (const section of contentSections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

// 示例数据：关联站点与核心关键词
const siteInfo = {
  url: 'https://leyusportsweb.com.cn',
  name: '乐鱼体育',
  version: '1.0.0'
};

// 简单的搜索测试（示例）
const sampleQueries = ['乐鱼体育', '直播', '篮球', '新闻'];
for (const q of sampleQueries) {
  const found = searchSections(q);
  console.log(`搜索 "${q}" 找到 ${found.length} 个分区`);
}

module.exports = {
  contentSections,
  keywordMap,
  searchSections,
  getSectionById,
  getAllTags,
  siteInfo
};