import type { StoryScene } from '../core/types';

export const storyScenes: Record<string, StoryScene> = {
  // ==================== 序章 ====================
  'intro': {
    id: 'intro',
    title: '序章：桃园结义',
    text: [
      '东汉末年，朝廷腐败，黄巾起义席卷天下。',
      '涿郡县城外，桃花盛开。你乃中山靖王之后，姓刘名备，字玄德。',
      '今日，你在此遇上了两位豪杰——河东关羽解良人，以及涿郡张飞翼德。',
      '三人意气相投，决定在桃园结为异姓兄弟，共图大事。',
      '这一刻，你心中暗下决心...'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'ambitious',
        text: '「我要匡扶汉室，拯救苍生！」',
        effects: {
          stats: { leadership: 5, charm: 3 },
          resources: { reputation: 10 },
          flags: { add: ['righteous_path'] }
        },
        nextSceneId: 'oath_taken'
      },
      {
        id: 'pragmatic',
        text: '「乱世之中，先保全自身，再图发展。」',
        effects: {
          stats: { intelligence: 5, politics: 5 },
          flags: { add: ['pragmatic_path'] }
        },
        nextSceneId: 'oath_taken'
      },
      {
        id: 'military',
        text: '「唯有武力可定天下！」',
        effects: {
          stats: { war: 5, leadership: 3 },
          flags: { add: ['military_path'] }
        },
        nextSceneId: 'oath_taken'
      }
    ]
  },

  'oath_taken': {
    id: 'oath_taken',
    title: '序章：桃园结义',
    text: [
      '「念刘备、关羽、张飞，虽然异姓，既结为兄弟，则同心协力，救困扶危；上报国家，下安黎庶。',
      '不求同年同月同日生，但求同年同月同日死。」',
      '三人焚香再拜，桃园结义已成。',
      '黄巾军势大，幽州太守刘焉出榜招募义兵。'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'join_government',
        text: '率领义军投奔刘焉，正式起兵',
        effects: {
          resources: { soldiers: 300, gold: 50, reputation: 5 }
        },
        nextSceneId: 'first_battle'
      },
      {
        id: 'independent',
        text: '暂不投奔，先自行发展壮大',
        effects: {
          stats: { intelligence: 3, leadership: 3 }
        },
        nextSceneId: 'independent_start'
      }
    ]
  },

  // ==================== 第一章：初出茅庐 ====================
  'first_battle': {
    id: 'first_battle',
    title: '第一章：初战黄巾',
    text: [
      '你率领义军来到战场，前方黄巾军首领程远志正率五万人马杀来。',
      '你方只有区区五百人，敌众我寡。',
      '关羽策马而出：「大哥莫慌，某去取贼将首级！」',
      '张飞亦大喝：「三姓家休走！燕人张翼德在此！」',
      '此时，你必须做出决断...'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'direct_assault',
        text: '正面迎敌，与二弟并肩作战',
        requirements: {
          stats: { war: 70 }
        },
        effects: {
          stats: { war: 5, leadership: 5 },
          resources: { reputation: 15 },
          flags: { add: ['brave_reputation'] }
        },
        nextSceneId: 'victory_yellow_turban'
      },
      {
        id: 'tactical',
        text: '观察敌军阵型，寻找破绽',
        requirements: {
          stats: { intelligence: 70 }
        },
        effects: {
          stats: { intelligence: 5, leadership: 3 },
          flags: { add: ['tactical_mind'] }
        },
        nextSceneId: 'victory_yellow_turban'
      },
      {
        id: 'defensive',
        text: '据守险要，以逸待劳',
        effects: {
          stats: { intelligence: 3, politics: 2 }
        },
        nextSceneId: 'defensive_battle'
      }
    ]
  },

  'victory_yellow_turban': {
    id: 'victory_yellow_turban',
    title: '第一章：首战告捷',
    text: [
      '关羽一刀斩下程远志首级，张飞挺枪冲入敌阵，如入无人之境。',
      '黄巾军大败，你军首战告捷！',
      '战后，刘焉大喜，设宴庆功。',
      '席间，一位老者前来拜访，自称是中山靖王之后...'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'accept_lineage',
        text: '恭敬相认，确认宗族关系',
        effects: {
          flags: { add: ['imperial_recognized'] },
          resources: { reputation: 20 }
        },
        nextSceneId: 'imperial_recognition'
      },
      {
        id: 'cautious',
        text: '谨慎核实，避免冒认皇亲',
        effects: {
          stats: { intelligence: 3, politics: 3 }
        },
        nextSceneId: 'imperial_recognition'
      }
    ]
  },

  'imperial_recognition': {
    id: 'imperial_recognition',
    title: '第一章：皇叔身份',
    text: [
      '「我乃中山靖王刘胜之后，刘弘之子。你可唤我皇叔。」',
      '此言一出，满座皆惊。你终于找到了自己的宗族根源。',
      '从此，你以"刘皇叔"之名行走天下。',
      '数年后，黄巾起义虽被镇压，但天下分崩离析，群雄并起...',
      '董卓入京，残暴不仁，十八路诸侯联名讨伐...'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'join_coalition',
        text: '响应号召，加入讨董联盟',
        effects: {
          flags: { add: ['anti_dong_zhuo'] },
          resources: { reputation: 10 }
        },
        nextSceneId: 'anti_dong_zhuo'
      },
      {
        id: 'wait_observe',
        text: '暂且观望，等待时机',
        effects: {
          stats: { intelligence: 3 }
        },
        nextSceneId: 'waiting_game'
      }
    ]
  },

  // ==================== 第二章：虎牢关 ====================
  'anti_dong_zhuo': {
    id: 'anti_dong_zhuo',
    title: '第二章：讨董联盟',
    text: [
      '诸侯会盟，推举袁绍为盟主。',
      '然而诸侯各怀鬼胎，互相推诿，无人敢先出战。',
      '董卓帐下猛将华雄在阵前叫阵，连斩数员盟军大将。',
      '帐内一片死寂，众诸侯面面相觑...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'guan_yu_fight',
        text: '「关某愿往！」让关羽出战',
        effects: {
          flags: { add: ['guan_yu_fame'] },
          resources: { reputation: 15 }
        },
        nextSceneId: 'guan_yu_victory'
      },
      {
        id: 'wait_see',
        text: '静观其变，让别人先上',
        effects: {
          stats: { politics: 3 }
        },
        nextSceneId: 'other_generals_die'
      }
    ]
  },

  'guan_yu_victory': {
    id: 'guan_yu_victory',
    title: '第二章：温酒斩华雄',
    text: [
      '曹操为关羽斟酒：「壮士饮酒再行。」',
      '关羽却道：「酒且放下，某去便来。」',
      '须臾，关羽提华雄头级归来，掷于地上。',
      '其酒尚温！',
      '满座皆惊，袁术却怒喝：「一介马夫卒，安敢在此逞能！」',
      '气氛骤然紧张...'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'defend_brother',
        text: '「二弟武艺超群，何须计较出身！」',
        effects: {
          stats: { leadership: 5, charm: 5 },
          flags: { add: ['loyal_brotherhood'] }
        },
        nextSceneId: 'hu_lao_guan'
      },
      {
        id: 'apologetic',
        text: '低头示弱，避免冲突',
        effects: {
          resources: { reputation: -5 },
          stats: { politics: 3 }
        },
        nextSceneId: 'hu_lao_guan'
      }
    ]
  },

  'hu_lao_guan': {
    id: 'hu_lao_guan',
    title: '第二章：三英战吕布',
    text: [
      '虎牢关下，吕布骑着赤兔马，手持方天画戟，如战神降临。',
      '「谁敢与我吕奉先一决高下？」',
      '八路诸侯无人敢应，接连数员大将败下阵来。',
      '张飞大吼而出：「三姓家奴休走！燕人张翼德在这里！」',
      '两人激战五十回合，不分胜负。',
      '关羽见状，拍马舞刀上前助战...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'join_battle',
        text: '掣双股剑加入战斗，三英战吕布！',
        effects: {
          stats: { war: 5, leadership: 5 },
          flags: { add: ['three_heroes'] },
          resources: { reputation: 10 }
        },
        nextSceneId: 'lu_bu_retreat'
      },
      {
        id: 'observe_command',
        text: '观战指挥，寻找吕布破绽',
        requirements: {
          stats: { intelligence: 75 }
        },
        effects: {
          stats: { intelligence: 5, leadership: 5 }
        },
        nextSceneId: 'lu_bu_retreat'
      }
    ]
  },

  'lu_bu_retreat': {
    id: 'lu_bu_retreat',
    title: '第二章：吕布败退',
    text: [
      '你纵马加入战团，三英围攻吕布。',
      '吕布渐渐不敌，虚晃一戟，荡开缺口，败回虎牢关内。',
      '此战之后，"三英战吕布"之名威震天下！',
      '然而盟军虽胜，诸侯之间却因猜忌而各怀异心...',
      '洛阳城破，董卓焚烧洛阳，迁都长安。',
      '联盟不攻自破，诸侯各自散去...'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'return_empty',
        text: '无奈返回，前路迷茫',
        effects: {
          resources: { gold: -30 }
        },
        nextSceneId: 'wandering_period'
      },
      {
        id: 'seek_opportunity',
        text: '在此乱世中寻找新的机会',
        effects: {
          stats: { intelligence: 3 }
        },
        nextSceneId: 'wandering_period'
      }
    ]
  },

  // ==================== 流浪期 ====================
  'wandering_period': {
    id: 'wandering_period',
    title: '第三章：颠沛流离',
    text: [
      '讨董联盟解散后，你先后投奔过多个势力。',
      '然而每次都寄人篱下，难以施展抱负。',
      '公孙瓒、陶谦、袁绍、曹操...',
      '十余年间，你辗转漂泊，屡遭挫折。',
      '但是，你从未放弃心中的理想...',
      '建安十二年，你听闻隆中有一位奇人...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'visit_zhuge',
        text: '三顾茅庐，请诸葛亮出山',
        requirements: {
          flags: ['righteous_path']
        },
        effects: {
          flags: { add: ['visited_zhuge_liang'] },
          stats: { charm: 5, leadership: 3 },
          resources: { reputation: 10 }
        },
        nextSceneId: 'three_visits'
      },
      {
        id: 'rely_self',
        text: '依靠自己的能力崛起',
        effects: {
          stats: { leadership: 5, war: 3 },
          flags: { add: ['self_reliant'] }
        },
        nextSceneId: 'self_rise'
      }
    ]
  },

  'three_visits': {
    id: 'three_visits',
    title: '第三章：三顾茅庐',
    text: [
      '「卧龙凤雏，得一可安天下。」',
      '你第一次去隆中，诸葛亮外出未归。',
      '第二次去，又遇风雪，依然未见其人。',
      '关、张二弟劝你放弃：「不过一村夫，何必如此？」',
      '你却坚持第三次前往...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'persist',
        text: '「大贤岂可轻慢？再顾便是！」',
        effects: {
          stats: { charm: 5, leadership: 5 },
          flags: { add: ['persistent_leader'] }
        },
        nextSceneId: 'zhuge_liang_join'
      },
      {
        id: 'send_invite',
        text: '派人送去书信，请其前来',
        effects: {
          flags: { add: ['formal_approach'] }
        },
        nextSceneId: 'zhuge_refused'
      }
    ]
  },

  'zhuge_liang_join': {
    id: 'zhuge_liang_join',
    title: '第三章：隆中对',
    text: [
      '第三次来到茅庐，诸葛亮终在家。',
      '他分析了天下大势，提出著名的《隆中对》：',
      '「曹操已拥百万之众，挟天子以令诸侯，不可与争锋。」',
      '「孙权据有江东，已历三世，可以为援而不可图。」',
      '「荆州、益州，乃用武之地...若跨有荆、益，保其岩阻...则霸业可成，汉室可兴。」',
      '你听后如拨云见日，拜请诸葛亮出山相助。',
      '诸葛亮感于你的诚意，终于答应...'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'accept_plan',
        text: '「先生之计，甚合我意！」',
        effects: {
          stats: { intelligence: 10, leadership: 5 },
          flags: { add: ['longzhong_strategy'] },
          items: { add: ['诸葛亮'] }
        },
        nextSceneId: 'new_chapter'
      }
    ]
  },

  // ==================== 结局分支 ====================
  'new_chapter': {
    id: 'new_chapter',
    title: '新篇章开启',
    text: [
      '得到诸葛亮相助后，你的势力开始壮大。',
      '然而，这只是争霸天下的开始...',
      '前方还有无数的挑战等待着你：',
      '赤壁之战、夺取荆州、入川益州、汉中之战、北伐中原...',
      '',
      '【第一部分 完】',
      '感谢体验！更多章节敬请期待...'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        nextSceneId: 'intro'
      }
    ]
  },

  // ==================== 其他分支 ====================
  'independent_start': {
    id: 'independent_start',
    title: '第一章：自立门户',
    text: [
      '你选择暂时不依附任何势力，独自发展。',
      '这个决定让你的道路更加艰难...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'recruit_people',
        text: '招募义兵，扩充实力',
        effects: {
          resources: { soldiers: 200, gold: -30 }
        },
        nextSceneId: 'first_battle'
      }
    ]
  },

  'defensive_battle': {
    id: 'defensive_battle',
    title: '第一章：据守取胜',
    text: [
      '你选择据守险要，以逸待劳。',
      '虽然不是最英勇的选择，但最终也取得了胜利。',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'continue',
        text: '继续',
        nextSceneId: 'victory_yellow_turban'
      }
    ]
  },

  'other_generals_die': {
    id: 'other_generals_die',
    title: '第二章：痛失良机',
    text: [
      '俞涉、潘凤接连败亡，盟军颜面尽失。',
      '最终，关羽还是出战斩了华雄，但你的犹豫让盟友们对你颇有微词。',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'learn_lesson',
        text: '吸取教训',
        effects: {
          stats: { leadership: 2 }
        },
        nextSceneId: 'hu_lao_guan'
      }
    ]
  },

  'zhuge_refused': {
    id: 'zhuge_refused',
    title: '第三章：错失良机',
    text: [
      '诸葛亮收到你的书信，并未前来。',
      '你错失了这位绝世奇才...',
      '「大贤岂可轻慢？」你后悔不已。',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'try_again',
        text: '再次亲往邀请',
        nextSceneId: 'three_visits'
      },
      {
        id: 'give_up',
        text: '放弃寻找，靠自己',
        nextSceneId: 'self_rise'
      }
    ]
  },

  'waiting_game': {
    id: 'waiting_game',
    title: '第二章：静观其变',
    text: [
      '你选择暂时观望，等待更好的时机。',
      '但这个决定让你错过了积累声望的机会...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'join_later',
        text: '后来还是加入了联盟',
        nextSceneId: 'anti_dong_zhuo'
      }
    ]
  },

  'self_rise': {
    id: 'self_rise',
    title: '第三章：自强不息',
    text: [
      '你选择依靠自己的能力崛起，虽然更加艰难，但也锻炼了你的才干。',
      '多年后，你的势力逐渐壮大...',
      '',
      '【自强之路 完】',
      '感谢体验！更多分支敬请期待...'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        nextSceneId: 'intro'
      }
    ]
  }
};
