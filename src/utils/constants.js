export const constants = {
    Role: {
        UNAUTHORIZED: -1,
        ADMIN: 0,
        DOCTOR: 1,
        PATIENT: 2,
        ANY: -2
    },
    uziTexts: [
        `Дата В полости матки один живой плод, соответствует [] недель. КТР [] мм. ТВП [] мм. НК +. PI DV [], PI ПМА — [], PI ЛМА — []. Хорион по [] стенке, высоко, ц/канал [] мм. Ретрохориальная гематома по задней стенке []x[] мм.`,
        `Дата В полости матки один живой плод, соответствует [] недель, ПМП [], о/воды в умеренном количестве, АИ [] мм. Плацента по задней стенке, высоко. Ц/канал [] мм.`
    ],
    analyze_constants: [
        ["Протромбиновый индекс", "МНО", "Фибриноген", "АПТВ", "Тромбиновое время", "Антитромбин III", "Тест на LA", "Д-димер", "Гомоцистеин", "Протеин C", "Протеин S"],
        ["АТ к β2-гликопротеину", "АТ к кардиолипину", "АТ к аннексину V", "АТ к ХГЧ", "АТ к протромбину", "АТ к фосфатидилсерину", "АТ к фосфатидил к-те", "АТ к фосфатидилинозитолу", "Антинуклеарный фактор", "АТ к 2сп ДНК"],
        ["Lei", "Hb", "Ht", "Tr", "Ферритин", "ТТГ"]
    ],
    crops_constants: [
        ["Посев мочи", "Посев из ц/канала", "Посев из носа", "Посев из зева"],
        ["Не выделена", "E. coli", "Enterococcus sp.", "Enterococcus faecalis", "Klebsiella sp.", "Staphyloc. ep.", "Streptococcus anginosus", "Streptococcus agalact.", "Streptococcus or.", "Streptococcus spp", "Streptococcus pneumoniae", "Candida albicans", "Lactobacillus sp.", "Proteus mirabilis", "Citrobacter", "Enterobacteriaceae", "Pseudomonas aeruginosa", "Haemophilus influenzae", "Moraxella catarrhalis", "Neisseria sicca", "Neisseria spp.", "Corynebacterium spp"],
        ["Не выделена", "10³ КОЕ/мл", "10⁴ КОЕ/мл", "10⁵ КОЕ/мл", "10⁶ КОЕ/мл", "10⁷ КОЕ/мл", "10⁸ КОЕ/мл"]
    ]
}