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

  // ==================== 第四章：赤壁之战 ====================
  'new_chapter': {
    id: 'new_chapter',
    title: '第四章：曹操南下',
    text: [
      '建安十三年，曹操率领八十万大军南下。',
      '荆州刘表病死，其子刘琮不战而降。',
      '你从樊城撤退，携民渡江，百姓相随者十余万。',
      '曹操虎豹骑追击，在长坂坡赶上...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'protect_people',
        text: '「百姓相随，岂可弃之？」坚持携民而行',
        effects: {
          stats: { charm: 10, leadership: 5 },
          flags: { add: ['benevolent_ruler'] },
          resources: { reputation: 20 }
        },
        nextSceneId: 'changban_slope'
      },
      {
        id: 'abandon_people',
        text: '轻装撤退，保全实力',
        effects: {
          stats: { politics: 5 },
          resources: { reputation: -20 }
        },
        nextSceneId: 'changban_slope_escape'
      }
    ]
  },

  'changban_slope': {
    id: 'changban_slope',
    title: '第四章：长坂坡之战',
    text: [
      '赵云在乱军中七进七出，救出幼主阿斗。',
      '张飞率领二十骑在长坂桥断后，大喝：「燕人张翼德在此，谁敢来决死战？」',
      '曹操疑有伏兵，不敢追击。',
      '你军得以撤退至江夏，与刘琦合兵一处。',
      '此时，东吴鲁肃前来，提出孙刘联盟...'
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'alliance',
        text: '同意结盟，共抗曹操',
        requirements: {
          stats: { intelligence: 70 }
        },
        effects: {
          flags: { add: ['sun_liu_alliance'] },
          stats: { intelligence: 5, politics: 5 },
          resources: { reputation: 10 }
        },
        nextSceneId: 'east_wu_negotiation'
      },
      {
        id: 'hesitate',
        text: '对东吴存疑，犹豫不决',
        effects: {
          stats: { politics: 3 }
        },
        nextSceneId: 'zhuge_mission'
      }
    ]
  },

  'east_wu_negotiation': {
    id: 'east_wu_negotiation',
    title: '第四章：舌战群儒',
    text: [
      '你派诸葛亮前往东吴，在朝堂之上舌战群儒，说服孙权抗曹。',
      '「曹操之众，远道而来，疲弊不堪。」',
      '「将军若能以命世之才，协同刘豫州，并力抗之，则必破曹矣。」',
      '孙权拔剑砍下桌角：「诸将吏敢复有言当迎操者，与此案同！」',
      '联盟达成！周瑜率水军三万，与你军会师赤壁...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'fire_attack_plan',
        text: '采纳黄盖诈降、火攻之计',
        requirements: {
          items: ['诸葛亮']
        },
        effects: {
          flags: { add: ['fire_attack_strategy'] },
          stats: { intelligence: 10, leadership: 5 }
        },
        nextSceneId: 'chibi_fire_attack'
      },
      {
        id: 'conventional_battle',
        text: '正面水战，硬碰硬',
        effects: {
          stats: { war: 5, leadership: 3 }
        },
        nextSceneId: 'chibi_conventional'
      }
    ]
  },

  'chibi_fire_attack': {
    id: 'chibi_fire_attack',
    title: '第四章：火烧赤壁',
    text: [
      '「万事俱备，只欠东风。」',
      '诸葛亮设坛祭风，十一月二十日，东南风大起！',
      '黄盖率领火船冲入曹军水寨，烈焰冲天，曹军船只皆被点燃。',
      '八十万大军，灰飞烟灭！',
      '曹操狼狈北逃，经华容道时...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'release_cao',
        text: '念及旧情，放曹操一条生路',
        requirements: {
          flags: ['benevolent_ruler']
        },
        effects: {
          flags: { add: ['released_cao_cao'] },
          stats: { charm: 10, leadership: 5 },
          resources: { reputation: 15 }
        },
        nextSceneId: 'cao_escapes'
      },
      {
        id: 'capture_cao',
        text: '趁机擒杀曹操',
        effects: {
          flags: { add: ['killed_cao_cao'] },
          stats: { war: 10, leadership: 5 },
          resources: { reputation: 30 }
        },
        nextSceneId: 'cao_dies_alternate'
      }
    ]
  },

  'cao_escapes': {
    id: 'cao_escapes',
    title: '第四章：曹操北归',
    text: [
      '关羽念及昔日曹操厚待之恩，放曹操通过华容道。',
      '曹操逃回北方，留曹仁守南郡。',
      '赤壁之战，你以弱胜强，威震天下！',
      '周瑜攻取南郡，你趁机夺取荆州四郡...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'occupy_jingzhou',
        text: '占据荆州，以此为根基',
        effects: {
          flags: { add: ['occupied_jingzhou'] },
          stats: { politics: 5, leadership: 5 },
          resources: { soldiers: 5000, gold: 100 }
        },
        nextSceneId: 'jingzhou_base'
      }
    ]
  },

  'cao_dies_alternate': {
    id: 'cao_dies_alternate',
    title: '第四章：历史改变',
    text: [
      '曹操被擒身亡，北方大乱！',
      '曹丕、曹彰诸子争位，内战爆发。',
      '你军威势大盛，一举攻下许都，迎汉帝归位。',
      '历史由此改变...',
      '',
      '【架空历史结局】',
      '恭喜达成：魏武之死',
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

  // ==================== 第五章：入川益州 ====================
  'jingzhou_base': {
    id: 'jingzhou_base',
    title: '第五章：立足荆州',
    text: [
      '建安十五年，你占据荆州，暂得立足之地。',
      '然而东吴周瑜对荆州虎视眈眈，曹操在北方积蓄力量。',
      '此时，益州牧刘璋邀请你入川，共抗张鲁。',
      '这是一个机会，也可能是陷阱...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'enter_yizhou',
        text: '入川图谋益州，实现隆中对',
        requirements: {
          flags: ['longzhong_strategy'],
          items: ['诸葛亮']
        },
        effects: {
          flags: { add: ['entered_yizhou'] },
          stats: { leadership: 5, politics: 5 },
          resources: { gold: 50 }
        },
        nextSceneId: 'enter_sichuan'
      },
      {
        id: 'stay_jingzhou',
        text: '坚守荆州，稳固基业',
        effects: {
          stats: { politics: 5, intelligence: 3 }
        },
        nextSceneId: 'zhouyu_death'
      }
    ]
  },

  'enter_sichuan': {
    id: 'enter_sichuan',
    title: '第五章：西进益州',
    text: [
      '你率领庞统、黄忠、魏延等将入川。',
      '刘璋亲至涪城相迎，设宴款待。',
      '席间，庞统示意你趁机擒杀刘璋，一举夺益州。',
      '这是一个残酷但诱人的提议...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'honor_treaty',
        text: '「刘璋以诚相待，岂可暗算？」拒绝',
        requirements: {
          flags: ['benevolent_ruler']
        },
        effects: {
          flags: { add: ['honorable_leader'] },
          stats: { charm: 10, leadership: 5 },
          resources: { reputation: 20 }
        },
        nextSceneId: 'honorable_path'
      },
      {
        id: 'seize_opportunity',
        text: '「兵不厌诈！」趁机动手',
        effects: {
          flags: { add: ['ruthless_leader'] },
          stats: { politics: 10, intelligence: 5 },
          resources: { reputation: -15 }
        },
        nextSceneId: 'quick_victory_yizhou'
      }
    ]
  },

  'honorable_path': {
    id: 'honorable_path',
    title: '第五章：葭萌关',
    text: [
      '你选择光明正大，在葭萌关厚树恩德，收买人心。',
      '然而，张松献图事发，刘璋翻脸！',
      '你与刘璋正式开战，但益州易守难攻...',
      '庞统在落凤坡中伏身亡，你痛失一臂...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'summon_zhuge',
        text: '急召诸葛亮、张飞入川增援',
        effects: {
          flags: { add: ['zhuge_in_sichuan'] },
          stats: { leadership: 5 },
          resources: { soldiers: 3000 }
        },
        nextSceneId: 'siege_chengdu'
      },
      {
        id: 'persevere',
        text: '靠自己坚持下去',
        effects: {
          stats: { war: 5, leadership: 5 }
        },
        nextSceneId: 'hard_siege'
      }
    ]
  },

  'siege_chengdu': {
    id: 'siege_chengdu',
    title: '第五章：兵临成都',
    text: [
      '诸葛亮、张飞、赵云陆续入川，形成合围之势。',
      '马超也来投奔，威震蜀中。',
      '成都被围数十日，粮草将尽。',
      '你派人劝降刘璋...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'lenient_surrender',
        text: '善待刘璋，保全其宗族',
        requirements: {
          flags: ['honorable_leader']
        },
        effects: {
          flags: { add: ['magnanimous_victor'] },
          stats: { charm: 10, leadership: 5 },
          resources: { reputation: 25 }
        },
        nextSceneId: 'yizhou_secured'
      },
      {
        id: 'harsh_terms',
        text: '严苛条件，彻底清算',
        effects: {
          flags: { add: ['harsh_ruler'] },
          stats: { politics: 5 },
          resources: { reputation: -10 }
        },
        nextSceneId: 'yizhou_secured'
      }
    ]
  },

  'yizhou_secured': {
    id: 'yizhou_secured',
    title: '第五章：汉中王',
    text: [
      '建安二十四年，你与曹操在汉中展开决战。',
      '「鸡肋！」曹操撤军，你取得汉中之战的胜利！',
      '群下上表，尊你为「汉中王」。',
      '你终于拥有荆、益二州，实现了隆中对的规划。',
      '然而，关羽镇守的荆州，危机四伏...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'support_guan_yu',
        text: '派兵支援关羽，防备东吴',
        requirements: {
          stats: { intelligence: 80 }
        },
        effects: {
          flags: { add: ['supported_guan_yu'] },
          stats: { intelligence: 5, leadership: 5 }
        },
        nextSceneId: 'jingzhou_saved'
      },
      {
        id: 'focus_hanzhong',
        text: '专注于汉中防务',
        effects: {
          stats: { politics: 3 }
        },
        nextSceneId: 'guan_yu_death'
      }
    ]
  },

  'guan_yu_death': {
    id: 'guan_yu_death',
    title: '第五章：痛失二弟',
    text: [
      '孙权派吕蒙白衣渡江，袭取荆州。',
      '关羽腹背受敌，败走麦城，被东吴擒杀。',
      '「云长啊！」你闻讯痛哭，昏厥于地。',
      '桃园结义，如今又少一人...',
      '你怒火中烧，欲举倾国之兵伐吴为弟报仇！',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'revenge_wu',
        text: '「不破东吴，誓不回还！」出兵伐吴',
        effects: {
          flags: { add: ['revenge_path'] },
          stats: { war: 5, leadership: 3 },
          resources: { soldiers: 75000, gold: -200 }
        },
        nextSceneId: 'yiling_battle'
      },
      {
        id: 'wait_opportunity',
        text: '「孤乃汉中王，当以大局为重！」忍辱待时',
        requirements: {
          stats: { intelligence: 85 }
        },
        effects: {
          flags: { add: ['rational_leader'] },
          stats: { intelligence: 5, politics: 5 }
        },
        nextSceneId: 'wait_for_opportunity'
      }
    ]
  },

  'yiling_battle': {
    id: 'yiling_battle',
    title: '第五章：夷陵之战',
    text: [
      '你率领七十万大军伐吴，连营七百里。',
      '陆逊坚守不出，等待时机。',
      '盛夏酷暑，你令士兵移营林中避暑...',
      '「不好！中计了！」',
      '陆逊一把火烧尽你军连营，七十万大军灰飞烟灭！',
      '你败退白帝城，一病不起...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'reflect',
        text: '反思错误，托孤诸葛亮',
        effects: {
          flags: { add: ['bai_di_tuo_gu'] },
          stats: { intelligence: 10, leadership: 5 },
          resources: { reputation: 10 }
        },
        nextSceneId: 'bai_di_city'
      }
    ]
  },

  'bai_di_city': {
    id: 'bai_di_city',
    title: '第五章：白帝托孤',
    text: [
      '白帝城病榻之上，你唤诸葛亮前来。',
      '「君才十倍曹丕，必能安国，终定大事。」',
      '「若嗣子可辅，辅之；如其不才，君可自取。」',
      '诸葛亮涕泣曰：「臣敢竭股肱之力，效忠贞之节，继之以死！」',
      '建安二十五年，你于白帝城驾崩，享年六十三岁。',
      '',
      '【刘玄德结局】',
      '你一生颠沛流离，屡败屡战，最终建立蜀汉基业。',
      '虽未能兴复汉室，但你的仁德之名流芳百世。',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        nextSceneId: 'intro'
      },
      {
        id: 'continue_as_shan',
        text: '继续扮演刘禅',
        nextSceneId: 'liu_shan_reign'
      }
    ]
  },

  // ==================== 刘禅线 ====================
  'liu_shan_reign': {
    id: 'liu_shan_reign',
    title: '第六章：阿斗继位',
    text: [
      '你现在是刘禅，字公嗣，小名阿斗。',
      '父亲刘备驾崩，丞相诸葛亮辅政。',
      '蜀汉国力疲惫，内忧外患。',
      '你将如何治理这个国家？',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'trust_zhuge',
        text: '「相父，一切全凭您做主！」',
        effects: {
          flags: { add: ['trusted_regent'] },
          stats: { leadership: 3, politics: 3 }
        },
        nextSceneId: 'zhuge_northern_expedition'
      },
      {
        id: 'assert_authority',
        text: '开始亲政，收回权力',
        effects: {
          flags: { add: ['assertive_emperor'] },
          stats: { politics: 5, leadership: 5 }
        },
        nextSceneId: 'zhuge_restrained'
      }
    ]
  },

  'zhuge_northern_expedition': {
    id: 'zhuge_northern_expedition',
    title: '第六章：北伐中原',
    text: [
      '诸葛亮六出祁山，北伐曹魏。',
      '每次都因粮草不济或意外而功败垂成。',
      '建兴十二年，诸葛亮于五丈原病逝。',
      '「鞠躬尽瘁，死而后已。」',
      '蜀汉失去支柱，你该如何自处？',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'continue_policy',
        text: '继续诸葛亮的北伐政策',
        effects: {
          flags: { add: ['continued_northern_expedition'] },
          stats: { leadership: 5, war: 3 },
          resources: { gold: -100, soldiers: -10000 }
        },
        nextSceneId: 'jiang_wan_failed'
      },
      {
        id: 'peaceful_development',
        text: '休养生息，发展国力',
        requirements: {
          stats: { politics: 75 }
        },
        effects: {
          flags: { add: ['peaceful_development'] },
          stats: { politics: 10, intelligence: 5 },
          resources: { gold: 50 }
        },
        nextSceneId: 'shu_han_prosperity'
      }
    ]
  },

  'jiang_wan_failed': {
    id: 'jiang_wan_failed',
    title: '第六章：国力衰竭',
    text: [
      '你继续北伐，但国力难以支撑。',
      '姜维九伐中原，次次失利。',
      '蜀汉国力日衰，民怨沸腾。',
      '魏军大举入侵...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'fight_to_death',
        text: '誓死抵抗，与国同休',
        effects: {
          flags: { add: ['martyr_emperor'] },
          stats: { leadership: 10, charm: 10 },
          resources: { reputation: 30 }
        },
        nextSceneId: 'shu_han_falls'
      },
      {
        id: 'surrender',
        text: '投降魏国，保全百姓',
        effects: {
          flags: { add: ['surrendered_emperor'] },
          stats: { charm: 10 },
          resources: { reputation: -20 }
        },
        nextSceneId: 'peaceful_surrender'
      }
    ]
  },

  'shu_han_prosperity': {
    id: 'shu_han_prosperity',
    title: '第六章：休养生息',
    text: [
      '你选择停止北伐，专注发展国力。',
      '蜀汉在西南偏安一隅，百姓安居乐业。',
      '虽然没有实现兴复汉室的理想，',
      '但至少保住了父亲创下的基业。',
      '',
      '【仁守之主结局】',
      '你虽无雄才大略，但能守成保民。',
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

  'shu_han_falls': {
    id: 'shu_han_falls',
    title: '第六章：蜀汉灭亡',
    text: [
      '炎兴元年，魏军攻入成都。',
      '你率众投降，蜀汉灭亡。',
      '「此间乐，不思蜀。」',
      '你在洛阳度过余生，虽苟活于世，',
      '但蜀汉基业，终归尘土...',
      '',
      '【亡国之君结局】',
      '蜀汉享国四十三年，二世而亡。',
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

  'peaceful_surrender': {
    id: 'peaceful_surrender',
    title: '第六章：禅让结局',
    text: [
      '你主动禅位，避免生灵涂炭。',
      '魏帝封你为「归命侯」，善待于你。',
      '虽然失去帝位，但百姓得以保全。',
      '历史评价：仁而弱，守成之主。',
      '',
      '【和平禅让结局】',
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

  // ==================== 其他分支完善 ====================
  'zhuge_restrained': {
    id: 'zhuge_restrained',
    title: '第六章：收回权力',
    text: [
      '你开始亲政，收回部分权力。',
      '诸葛亮虽然忠心，但对此颇为遗憾。',
      '北伐效果大打折扣...',
      '',
      '【猜忌君王结局】',
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

  'changban_slope_escape': {
    id: 'changban_slope_escape',
    title: '第四章：仓皇撤退',
    text: [
      '你抛弃百姓，轻装撤退。',
      '虽然保全了兵力，但失去了人心。',
      '赵云救出阿斗，张飞断后。',
      '但你选择放弃百姓的传闻，让天下人失望...',
      '',
      '【弃民而逃结局】',
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

  'chibi_conventional': {
    id: 'chibi_conventional',
    title: '第四章：赤壁惨败',
    text: [
      '你选择正面水战，但因兵力悬殊而大败。',
      '曹操南下之势不可阻挡，天下大势已去...',
      '',
      '【赤壁败亡结局】',
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

  'zhuge_mission': {
    id: 'zhuge_mission',
    title: '第四章：诸葛亮出使',
    text: [
      '虽然你犹豫不决，但诸葛亮主动请缨出使东吴。',
      '他成功说服孙权，达成联盟。',
      '但你的犹豫让东吴对你颇有微词...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'join_alliance_late',
        text: '最终同意联盟',
        effects: {
          flags: { add: ['sun_liu_alliance'] },
          stats: { politics: 3 }
        },
        nextSceneId: 'chibi_fire_attack'
      }
    ]
  },

  'zhouyu_death': {
    id: 'zhouyu_death',
    title: '第五章：周瑜病逝',
    text: [
      '你坚守荆州，东吴周瑜在巴丘病逝。',
      '孙权暂时没有对荆州用兵。',
      '但好景不长，吕蒙陆逊正在谋划...',
      '',
      '【偏安一隅结局】',
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

  'quick_victory_yizhou': {
    id: 'quick_victory_yizhou',
    title: '第五章：速取益州',
    text: [
      '你擒杀刘璋，速取益州。',
      '虽然手段狠辣，但确实高效。',
      '然而，此恶名传遍天下...',
      '',
      '【狠辣枭雄结局】',
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

  'hard_siege': {
    id: 'hard_siege',
    title: '第五章：艰苦围城',
    text: [
      '你独自坚持围攻成都，损失惨重。',
      '虽然最终成功，但代价巨大...',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'eventual_success',
        text: '最终成功',
        nextSceneId: 'yizhou_secured'
      }
    ]
  },

  'jingzhou_saved': {
    id: 'jingzhou_saved',
    title: '第五章：荆州保全',
    text: [
      '你及时派兵支援荆州，关羽识破吕蒙诡计。',
      '荆州安然无恙，隆中对战略得以完整实现！',
      '蜀汉拥有荆、益二州，国力鼎盛。',
      '此时，魏主曹丕篡汉称帝...',
      '',
      '【鼎足三分完美结局】',
      '恭喜达成完美路线！',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'claim_emperor',
        text: '继承汉统，登基称帝',
        effects: {
          flags: { add: ['emperor_xuan_de'] },
          resources: { reputation: 50 }
        },
        nextSceneId: 'han_emperor_restored'
      }
    ]
  },

  'han_emperor_restored': {
    id: 'han_emperor_restored',
    title: '终章：昭烈皇帝',
    text: [
      '章武元年，你于成都称帝，国号「汉」，史称蜀汉。',
      '你是汉室宗亲，继承大统，名正言顺。',
      '此时你坐拥荆、益二州，兵强马壮。',
      '北方曹魏篡汉，东吴孙权割据。',
      '天下三分，你有机会兴复汉室！',
      '',
      '【昭烈皇帝结局】',
      '刘玄德，字德，汉景帝之子中山靖王刘胜之后。',
      '一生颠沛流离，屡败屡战，终成帝业。',
      '虽有赤壁之胜、入川之功，但未能北伐成功，一统天下。',
      '但你的仁德之名，永垂青史！',
    ],
    speaker: '旁白',
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        nextSceneId: 'intro'
      },
      {
        id: 'continue_north',
        text: '发动北伐（待续...）',
        nextSceneId: 'coming_soon'
      }
    ]
  },

  'wait_for_opportunity': {
    id: 'wait_for_opportunity',
    title: '第五章：忍辱待时',
    text: [
      '你强忍悲痛，暂不伐吴，专注发展。',
      '数年后，国力恢复。',
      '但此时魏国更加强大...',
      '',
      '【隐忍待时结局】',
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

  'coming_soon': {
    id: 'coming_soon',
    title: '敬请期待',
    text: [
      '北伐中原的故事，敬请期待后续更新...',
      '',
      '【当前版本完结】',
      '感谢游玩！',
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
