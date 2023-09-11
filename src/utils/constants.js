export const constants = {
    Role: {
        UNAUTHORIZED: -1,
        ADMIN: 0,
        DOCTOR: 1,
        PATIENT: 2,
        ANY: -2
    },
    uziTexts: [
        `Дата В полости матки один живой плод, соответствует 13 3/7 недель. КТР 68 мм. ТВП 1,7 мм. НК +. PI DV 0,9, PI ПМА — 0,99, PI ЛМА — 1,25. Хорион по задней стенке, высоко, ц/канал 40 мм. Ретрохориальная гематома по задней стенке 15х20 мм.`,
        `Дата В полости матки один живой плод, соответствует 32 4/7 недель, ПМП 2050, о/воды в умеренном количестве, АИ 156 мм. Плацента по задней стенке, высоко. Ц/канал 38 мм.`
    ],
    analyze_constants: [
        ["Протромбиновый индекс", "МНО", "Фибриноген", "АПТВ", "Тромбиновое время", "Антитромбин III", "Тест на LA", "Д-димер", "Гомоцистеин", "Протеин C", "Протеин S"],
        ["АТ к β2-гликопротеину", "АТ к кардиолипину", "АТ к аннексину V", "АТ к ХГЧ", "АТ к протромбину", "АТ к фосфатидилсерину", "АТ к фосфатидил к-те", "АТ к фосфатидилинозитолу", "Антинуклеарный фактор", "АТ к 2сп ДНК"],
        ["Lei", "Hb", "Ht", "Tr", "Ферритин", "ТТГ"]
    ],
    crops_constants: [
        ["Посев мочи", "Посев из ц/канала", "Посев из носа", "Посев из зева"],
        ["Не выделена", "E. coli", "Enterococcus sp.", "Enterococcus faecalis", "Klebsiella sp.", "Staphyloc. ep.", "Streptococcus anginosus", "Streptococcus agalact.", "Streptococcus or.", "Streptococcus spp", "Streptococcus pneumoniae", "Candida albicans", "Lactobacillus sp.", "Proteus mirabilis", "Citrobacter", "Enterobacteriaceae", "Pseudomonas aeruginosa", "Haemophilus influenzae", "Moraxella catarrhalis", "Neisseria sicca", "Neisseria spp.", "Corynebacterium spp", "Staphylococcus aureus", "Klebsiella pn."],
        ["Не выделена", "10³ КОЕ/мл", "10⁴ КОЕ/мл", "10⁵ КОЕ/мл", "10⁶ КОЕ/мл", "10⁷ КОЕ/мл", "10⁸ КОЕ/мл"]
    ],
    dropdowns: {
        keyNames: {
            rubec: "Рубец на матке",
            hemodynamics: "Нарушения гемодинамики",
            gsd: "ГСД"
        },
        rubec: [
            "Отсутствует",
            "Рубец на матке после  кесарева сечения",
            "Рубец на матке после 2-х операций кесарева сечения",
            "Рубец на матке после малого кесарева сечения",
            "Рубец на матке после перфорации матки",
            "Рубец на матке после консервативной миомэктомии"
        ],
        hemodynamics: [
            "Отсутствуют",
            "I степени",
            "II степени",
            "III степени"
        ],
        gsd: [
            "Отсутствует",
            "Диета",
            "Инсулинотерапия"
        ]
    },
    detailed: {
        operations: {
            0: "Операции, травмы, сотрясение ГМ отрицает",
            1: "Флебэктомия в анамнезе",
            2: "Гемиструмэктомия в анамнезе",
            3: "Лазерная коррекция зрения в анамнезе",
            4: "Спленэктомия в анамнезе",
            5: "Оперативное лечение хронического геморроя",
            6: "Секторальная резекция молочной железы",
            7: "Аппендэктомия без осложнений",
            8: "Аппендэктомия, перитонит"
        },
        trombofilia: {
            0: "Не проводилось",
            1: "АФС",
            2: "Носительство LA",
            3: "Наследственная тромбофилия",
            4: "FV (G/A)",
            5: "FII (G/A)",
            6: "FV, FII – мутации не выявлены",
            7: "Дефицит АТIII",
            8: "Дефицит протеина С",
            9: "Дефицит протеина S",
            10: "Гипергомоцистеинемия",
            100: "Наследственная тромбофилия не выявлена"
        },
        illnesses: {
            1: "Хронический тонзиллит",
            2: "Хронический пиелонефрит",
            3: "Хронический цистит",
            4: "МКБ",
            5: "Единственная почка",
            6: "Хроническая АГ",
            7: "Варикозная болезнь",
            8: "Тромбоз в анамнезе",
            9: "Флебэктомия в анамнезе",
            10: "АИТ. Эутиреоз",
            11: "Субклинический гипотиреоз (ЗГТ)",
            12: "Узловой зоб",
            13: "Тиреотоксикоз",
            14: "ФАМ молочных желёз",
            15: "Секторальная резекция молочной железы",
            16: "Заболевания глаз", //?
            17: "Лазерная коррекция зрения в анамнезе",
            18: "Микропролактинома гипофиза",
            19: "Образование надпочечников",
            20: "Ожирение", //?
            21: "Сахарный диабет", //?
            22: "Хроническая никотиновая интоксикация",
            23: "ДЖВП",
            24: "ЖКБ",
            25: "Холецистэктомия в анамнезе",
            26: "Нейросенсорная тугоухость",
            27: "Лекарственная аллергия",
            28: "Бронхиальная астма",
            29: "ТИА в анамнезе",
            30: "ТЭЛА в анамнезе",
            31: "Мигрень",
            32: "Спленэктомия в анамнезе",
            33: "Хронический гепатит",
            34: "Tbc в анамнезе",
            35: "Lues в анамнезе",
            36: "Узловая эритема",
            37: "Атопический дерматит",
            38: "Болезнь Виллебранда",
            39: "Пролапс МК",
            40: "Аномалия сосудов ГМ",
            41: "Очаг.образ.печени",
            42: "Хронический гастрит",
            43: "НЯК",
            44: "Хронический геморрой",
            45: "Оперативное лечение хронического геморроя",
            46: "ДДЗП с грыжеобразованием",
            47: "В/оспа",
            48: "Краснуха",
            49: "Корь",
            50: "Хронический отит",
            51: "Гиперметропия",
            52: "Пневмония в детстве",
            1001: "Миопия слабой степени", // Заболевания глаз
            1002: "Миопия средней степени",
            1003: "Миопия высокой степени",
            1004: "Миопический астигматизм",
            1005: "Врожденная катаракта",
            1006: "ПХРД",
            2001: "Ожирение I степени", // Ожирение
            2002: "Ожирение II степени",
            2003: "Ожирение III степени",
            2004: "Ожирение IV степени",
            3001: "Сахарный диабет 1 типа", // Сахарный диабет
            3002: "Сахарный диабет 2 типа на диете",
            3003: "Сахарный диабет 2 типа на инсулине"
        },
        hemotransfusios: {
            1: "Отрицает",
            2: "Гемотрансфузии в анамнезе"
        },
        inheritance: {
            0: "Не отягощена",
            1: "ТЭЛА у близких родственников",
            2: "ИМ до 45 лет у близких родственников",
            3: "ОНМК до 45 лет у близких родственников",
            4: "Тромбозы у близких родственников",
            5: "ГБ у близких",
            6: "СД у близких"
        },
        anameses_desiases: {
            1: "Миома матки",
            2: "Хронический эндометрит",
            3: "Хронический аднексит",
            4: "Привычное невынашивание",
            5: "ST I",
            6: "ST II",
            7: "CIN III, эксцизия ш/м",
            8: "Ca in citu ш/м",
            9: "Рубцовая деформация ш/м",
            10: "Дермоидные кисты яичников",
            11: "НГЭ III, комбинированное лечение",
            12: "НГЭ II, комбинированное лечение",
            13: "НМЦ",
            14: "Цистэктомия в анамнезе",
            15: "Полип эндометрия, г/с, полипэктомия",
            16: "Полип ц/канала",
            17: "Рассечение синехий полости матки",
            18: "ИЦН",
            19: "Неудачи ЭКО"
        }
    },
    additional_blocks: {
        eko: {
            0: "Нет",
            1: "ЭКО",
            2: "ЭКО+ИКСИ",
            3: "ДЯ"
        },
        dvoina: {
            0: "Нет",
            1: "ДХДА",
            2: "Монохориальная двойня"
        },
        ab_therapy: {
            0: "Нет",
            1: "Амоксиклав",
            2: "Цефтриаксон",
            3: "Вильпрафен",
            4: "1+2",
            5: "Монурал",
            6: "Панцеф + азитром"
        },
        vvig: {
            0: "Нет",
            1: "Октагам",
            2: "Интратект",
            3: "Привиджен",
            4: "Иммуновенин"
        },
        plasmapheres: {
            0: "Нет",
            1: "При планировании беременности",
            2: "При данной беременности"
        },
        nmg: {
            0: "Нет",
            1: "Фраксипарин 0,3",
            2: "Фраксипарин 0,3х2",
            3: "Клексан 0,4",
            4: "Клексан 0,4x2",
            5: "Флюксум 0,4",
            6: "Флюксум 0,4x2"
        }
    },
    diagnosisCheckboxes: {
        1: "Рвота берем",
        2: "Угроза прерывания беременности",
        3: "Угрожающие преждевременные роды",
        4: "Отеки беременных",
        5: "Гестационная АГ",
        6: "Умеренная преэклампсия",
        7: "Низкая плацентация",
        8: "Предлежание плаценты",
        9: "Децидуальный полип",
        10: "Гипергомоцистеинемия",
        11: "Анемия беременных",
        12: "Крупный плод",
        13: "ИЦН",
        14: "Установка РАП",
        15: "Шов на шейке матки",
        16: "Гестационный пиелонефрит",
        17: "ИМВП при беременности",
        19: "Гипотрофия плода",
        20: "Ангидрамнион",
        21: "Маловодие",
        22: "Многоводие",
        23: "Холестаз при беременности",
        24: "Гепатоз беременных",
        25: "Тазовое предлежание",
        26: "Поперечное пол",
        27: "Симфизиопатия",
        28: "УЗ-маркры ХПП",
        29: "Б/х маркеры ХПП",
        30: "Узкий таз",
        31: "Rh(-) без АТ",
        33: "ДДЗП с грыжеобразованием",
        34: "ОГА",
        35: "Привычное невынашивание",
        36: "Кольпит",
        37: "Планирование беременности",
        38: "Планирование протокола ЭКО",
        101: "АФС",
        102: "Акушерский АФС",
        103: "Вероятный АФС"
    },
    recommendedCheckboxes: {
        1: "Компрессионный трикотаж I класса компрессии (Medi Step) — носить ежедневно!!!",
        2: "Водный режим (2000-2500 мл в день)!!!",
        3: "Осмотр эндокринолога в ближайшее время",
        4: "Осмотр терапевта, кардиолога, ЛОР",
        5: "Коленно-локтевое положение 15-20 минут 3-4 раза в день",
        6: "Фемибион-I + метафолин 800 + Витамин Д 5000 МЕ - ежедневно",
        7: "Клексан 0,4 п/к (флюксум 0,4 / фрагмин 5000 Ед / цибор 5000 Ед / фраксипарин 0,4) – продолжить",
        8: "Канефрон 2 т х 3 раза до родов",
        9: "Галакси 1 т х 3 раза + свечи с папаверином ректально 2-3 раза в день — при болях, либо при нагрузке",
        10: "Утрожестан 200 мг х 3 раза (утро + день - перорально, на ночь — вагинально) длительно!!!",
        11: "Магнелис В6 форте 1 х 2-3 раза в день – в постоянном режиме",
        12: "Допегит 250 мг х 3 раза в день + контроль АД х 3 раза + ведение дневника АД!!!",
        13: "Учитывая наличие патогенной микрофлоры в посевах мочи и ц/канала, а также наличия сахарного диабета беременных на инсулинотерапии – рекомендовано начать курс антибактериальной терапии (с учетом чувствительности микрофлоры) - Амоксиклав (875 мг + 125 мг) по 1 т х 2 раза 7 дней + Линекс 1 к х 3 раза 14 дней + Эссенциале форте 1 х 3 раза 10-14 дней Свечи Нео-пенотран форте вагинально на ночь по 1 свече 7 дней, далее – Лактожиналь вагинально на ночь 14 дней",
        14: "На данном этапе показано проведение 2 курса внутривенных иммуноглобулинов – Октагам 5% - 100 в/в капельно медленно №3 с интервалом 3 дня (Интратект / Привиджен / Иммуновенин), либо курса плазмафереза",
        15: "УЗИ плода + ранний допплер в 16 недель",
        16: "Расширенная коагулограмма (ПТИ, ФГ, АПТВ, ТВ, МНО, АТ III), Д-димер, гомоцистеин, волчаночный антикоагулянт (скрининг+подтверждение), клинический анализ крови, ферритин – через 2 недели",
        17: "Кровь на гены наследственной тромбофилии (12 генов)",
        18: "Кровь на АТ: к β2-гликопротеину, кардиолипину, аннексину V, ХГЧ, протромбину, фосфатидилсерину, фосфатидиловой кислоте, фосфатидилинозитолу, 2 спиральной ДНК, антинуклеарный фактор",
        19: "Кровь на субпопуляцию лимфоцитов",
        20: "Биопсия эндометрия с выполнением ИГХ (19-21 д.м.ц., забор материала в НИИ АГиР им. Д.О. Отта, запись на прием к врачам отделения оперативной гинекологии)",
        21: "Посев мочи + посев из ц/канала – через неделю после окончания антибактериальной терапии",
        22: "Посев из носа, посев из зева",
        23: "Консультация Цыпурдеевой Анны Алексеевны – НИИ АГиР им. Д.О. Отта (обсуждение вопроса о наложении серкляжа лапароскопическим методом)",
        24: "Допплер сосудов нижних конечностей — Порембская Ольга Ярославовна (+7 921 310 66 29)",
        25: "Омега-3 800-1000 мг ежедневно",
        26: "Утрожестан 200 мг с 16 по 25 день менструального цикла до момента наступления беременности, при наступлении беременности – по 200 мг х 3 раза (не отменять гормональную поддержку)",
        27: "Перед планированием беременности показано проведение плазмафереза",
        28: "В плане: с 1 дня протокола ЭКО – тромбо-Асс 100 мг + клексан 0,4 п/к ежедневно, кроме дня пункции",
        29: "Прогинова 1 т х 3 раза , если не будет дополнительных жалоб, то с 01.02.23 - постепенная отмена - по 1/4 1 раз в 3 дня",
        30: "Госпитализация во II ДО (явка с копиями паспорта, полиса СНИЛС)",
        31: "Осмотр с результатами"
    }
}