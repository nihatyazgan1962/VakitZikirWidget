/* ==========================================================================
   ZİKİRMATİK & VİRD PRO - FULL ADVANCED APPLICATION ENGINE
   Geliştirici & Tasarım: Serhat Sarıboğa
   ========================================================================== */

// --- 1. VERİ HAVUZU (DATA STORE) ---

// 81 İl, 900+ İlçe ve Dünya Şehirleri Veritabanı
const CITIES = (typeof window !== 'undefined' && window.ALL_LOCATIONS && window.ALL_LOCATIONS.length > 0)
  ? window.ALL_LOCATIONS
  : [
      { name: "İstanbul", province: "İstanbul", district: "Merkez", lat: 41.0082, lng: 28.9784, country: "Türkiye", display: "İstanbul (İl Merkezi)" },
      { name: "Ankara", province: "Ankara", district: "Merkez", lat: 39.9334, lng: 32.8597, country: "Türkiye", display: "Ankara (İl Merkezi)" },
      { name: "İzmir", province: "İzmir", district: "Merkez", lat: 38.4237, lng: 27.1428, country: "Türkiye", display: "İzmir (İl Merkezi)" },
      { name: "Adana", province: "Adana", district: "Merkez", lat: 37.0000, lng: 35.3213, country: "Türkiye", display: "Adana (İl Merkezi)" },
      { name: "Antalya", province: "Antalya", district: "Merkez", lat: 36.8969, lng: 30.7133, country: "Türkiye", display: "Antalya (İl Merkezi)" },
      { name: "Bursa", province: "Bursa", district: "Merkez", lat: 40.1885, lng: 29.0610, country: "Türkiye", display: "Bursa (İl Merkezi)" },
      { name: "Diyarbakır", province: "Diyarbakır", district: "Merkez", lat: 37.9144, lng: 40.2306, country: "Türkiye", display: "Diyarbakır (İl Merkezi)" },
      { name: "Erzurum", province: "Erzurum", district: "Merkez", lat: 39.9043, lng: 41.2678, country: "Türkiye", display: "Erzurum (İl Merkezi)" },
      { name: "Gaziantep", province: "Gaziantep", district: "Merkez", lat: 37.0662, lng: 37.3833, country: "Türkiye", display: "Gaziantep (İl Merkezi)" },
      { name: "Konya", province: "Konya", district: "Merkez", lat: 37.8746, lng: 32.4932, country: "Türkiye", display: "Konya (İl Merkezi)" },
      { name: "Mekke (Makkah)", lat: 21.4225, lng: 39.8262, country: "Suudi Arabistan", isHoly: true, display: "Mekke-i Mükerreme" },
      { name: "Medine (Madinah)", lat: 24.5247, lng: 39.5692, country: "Suudi Arabistan", isHoly: true, display: "Medine-i Münevvere" },
      { name: "Kudüs (Jerusalem)", lat: 31.7683, lng: 35.2137, country: "Filistin", isHoly: true, display: "Kudüs-ü Şerif" }
    ];

// Hazır Zikir Listesi
const PRESET_ZIKIRS = [
  { id: 'subhanallah', title: 'Sübhanallâh', arabic: 'سُبْحَانَ اللَّهِ', meaning: 'Allah her türlü noksanlıktan uzaktır.', target: 33 },
  { id: 'elhamdulillah', title: 'Elhamdülillâh', arabic: 'الْحَمْدُ لِلَّهِ', meaning: 'Hamd ve övgü yalnızca Allah’a aittir.', target: 33 },
  { id: 'allahuekber', title: 'Allâhu Ekber', arabic: 'اللَّهُ أَكْبَرُ', meaning: 'Allah en büyüktür.', target: 33 },
  { id: 'lailaheillallah', title: 'Lâ ilâhe illallâh', arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ', meaning: 'Allah’tan başka ilah yoktur.', target: 100 },
  { id: 'estagfirullah', title: 'Estağfirullâh', arabic: 'أَسْتَغْفِرُ اللَّهَ', meaning: 'Allah’tan bağışlanma dilerim.', target: 100 },
  { id: 'salavat', title: 'Allâhümme Salli Alâ Seyyidinâ Muhammed', arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ', meaning: 'Ey Rabbimiz! Efendimiz Hz. Muhammed’e salât eyle.', target: 100 },
  { id: 'hasbunallah', title: 'Hasbünallâhu ve Ni\'mel Vekîl', arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', meaning: 'Allah bize yeter, O ne güzel vekildir.', target: 100 },
  { id: 'lakarre', title: 'Lâ Havle Velâ Kuvvete İllâ Billâh', arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', meaning: 'Güç ve kuvvet ancak yüce Allah’ındır.', target: 100 },
  { id: 'ya_sabur', title: 'Yâ Sabûr C.C.', arabic: 'يَا صَبُورُ', meaning: 'Sonsuz sabır sahibi olan.', target: 298 },
  { id: 'ya_vedud', title: 'Yâ Vedûd C.C.', arabic: 'يَا وَدُودُ', meaning: 'Kullarını çok seven, sevilmeye layık olan.', target: 400 },
  { id: 'ya_fettah', title: 'Yâ Fettâh C.C.', arabic: 'يَا فَتَّاحُ', meaning: 'Bütün hayır ve fetih kapılarını açan.', target: 489 },
  { id: 'ya_rezzak', title: 'Yâ Rezzâk C.C.', arabic: 'يَا رَزَّاقُ', meaning: 'Bütün mahlukatın rızkını veren.', target: 308 }
];

// Günün Manevi Ayet & Hadis & Duaları
const DAILY_SPIRITUAL_POOL = [
  {
    type: 'GÜNÜN AYETİ',
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    turkish: 'Bilesiniz ki, kalpler ancak Allah’ı anmakla (zikretmekle) huzur bulur.',
    source: 'Ra\'d Suresi, 28. Ayet'
  },
  {
    type: 'GÜNÜN HADİSİ',
    arabic: 'كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    turkish: 'Dile hafif, mizanda ağır, Rahmân’a sevgili olan iki kelime: Sübhânallâhi ve bi-hamdihî, Sübhânallâhi’l-Azîm.',
    source: 'Buhârî, Deavât 65'
  },
  {
    type: 'GÜNÜN DUASI',
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    turkish: 'Allah’ım! Seni zikretmek, sana şükretmek ve sana güzelce ibadet etmek hususunda bana yardım et.',
    source: 'Ebû Dâvûd, Vitir 26'
  },
  {
    type: 'GÜNÜN AYETİ',
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    turkish: 'Öyleyse yalnız beni anın ki ben de sizi anayım. Bana şükredin, nankörlük etmeyin.',
    source: 'Bakara Suresi, 152. Ayet'
  },
  {
    type: 'GÜNÜN HADİSİ',
    arabic: 'مَنْ صَلَّى عَلَيَّ صَلَاةً صَلَّى اللَّهُ عَلَيْهِ بِهَا عَشْرًا',
    turkish: 'Kim bana bir salavat getirirse, Allah Teâlâ da ona on misliyle rahmet eyler.',
    source: 'Müslim, Salât 70'
  }
];

// Dini Günler & Kandiller Verisi (2026 - 2027)
const HOLY_DAYS_DATA = [
  { name: "Regaip Kandili", dateStr: "2026-01-15", hijri: "1 Receb 1447", desc: "Üç ayların müjdecisi, rahmet ve mağfiret kapılarının açıldığı mübarek gece." },
  { name: "Miraç Kandili", dateStr: "2026-02-06", hijri: "27 Receb 1447", desc: "Peygamber Efendimiz'in (s.a.v) semaya yükselişi ve beş vakit namazın farz kılındığı gece." },
  { name: "Berat Kandili", dateStr: "2026-02-23", hijri: "15 Şaban 1447", desc: "Kulların affa kavuştuğu, bir yıllık kaderin takdir olunduğu berat gecesi." },
  { name: "Ramazan-ı Şerif Başlangıcı", dateStr: "2026-03-11", hijri: "1 Ramazan 1447", desc: "On bir ayın sultanı, oruç ve Kur'an ayı." },
  { name: "Kadir Gecesi", dateStr: "2026-04-05", hijri: "27 Ramazan 1447", desc: "Bin aydan daha hayırlı olan Kur'an-ı Kerim'in indirildiği kutlu gece." },
  { name: "Ramazan Bayramı (1. Gün)", dateStr: "2026-04-10", hijri: "1 Şevval 1447", desc: "Orucun ve rahmet ayının sevinç bayramı." },
  { name: "Kurban Bayramı (Arefe & 1. Gün)", dateStr: "2026-06-16", hijri: "10 Zilhicce 1447", desc: "Hac ibadeti, kurban teslimiyeti ve tekbir günleri." },
  { name: "Hicri Yılbaşı (1448)", dateStr: "2026-07-07", hijri: "1 Muharrem 1448", desc: "Yeni hicri yılımızın başlangıcı." },
  { name: "Aşure Günü", dateStr: "2026-07-16", hijri: "10 Muharrem 1448", desc: "Peygamberlerin kurtuluşa erdiği bereketli aşure günü." },
  { name: "Mevlid Kandili", dateStr: "2026-09-15", hijri: "12 Rebiülevvel 1448", desc: "İki Cihan Güneşi Peygamberimiz Hz. Muhammed'in (s.a.v) dünyayı teşrifi." }
];

// Kur'an-ı Kerim Seçkin Sureler
const SURAHS_DATA = [
  {
    id: "fatiha",
    name: "Fâtiha Suresi",
    versesCount: "7 Ayet",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
    turkishRead: "Bismillâhirrahmânirrahîm. Elhamdü lillâhi rabbil'âlemîn. Errahmânirrahîm. Mâliki yevmiddîn. İyyâke na'büdü ve iyyâke neste'în. İhdinassırâtal müstakîm. Sırâtallezîne en'amte aleyhim gayrilmagdûbi aleyhim veleddâllîn.",
    translation: "Rahmân ve Rahîm olan Allah’ın adıyla. Hamd, âlemlerin Rabbi Allah’a mahsustur. O, Rahmândır, Rahîmdir. Din (hesap) gününün sahibidir. (Rabbimiz!) Ancak sana kulluk eder ve yalnız senden yardım dileriz. Bizi doğru yola ilet; kendilerine nimet verdiğin kimselerin yoluna; gazaba uğrayanların ve sapıtanların yoluna değil.",
    audioUrl: "https://server8.mp3quran.net/afs/001.mp3"
  },
  {
    id: "ayetelkursi",
    name: "Âyet-el Kürsî (Bakara 255)",
    versesCount: "1 Büyük Ayet",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    turkishRead: "Allâhü lâ ilâhe illâ hüvel hayyül kayyûm, lâ te'huzühû sinetün velâ nevm, lehû mâ fis-semâvâti vemâ fil-ard, men zellezî yeşfe'u 'indehû illâ bi-iznih, ya'lemü mâ beyne eydîhim vemâ halfehüm, velâ yühîtûne bişey'in min 'ilmihî illâ bimâ şâe, vesi'a kürsiyyühüs-semâvâti vel-ard, velâ yeûdühû hıfzuhümâ, ve hüvel 'aliyyül 'azîm.",
    translation: "Allah, O’ndan başka ilah olmayandır; Hayy’dır (diridir), Kayyûm’dur (bütün varlığı ayakta tutandır). O’nu ne bir uyuklama ne de uyku tutar. Göklerde ve yerde ne varsa hepsi O’nundur. İzni olmadan O’nun katında kim şefaat edebilir? O, kulların önlerindekini ve arkalarındakini bilir. O’nun ilminden dilediği kadarından başka hiçbir şeyi kavrayamazlar. O’nun kürsüsü gökleri ve yeri kaplamıştır. Onları koruyup gözetmek O’na asla ağır gelmez. O, çok yücedir, çok büyüktür.",
    audioUrl: "https://everyayah.com/data/Alafasy_128kbps/002255.mp3"
  },
  {
    id: "ihlas",
    name: "İhlâs Suresi",
    versesCount: "4 Ayet",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾",
    turkishRead: "Kul hüvallâhu ehad. Allâhussamed. Lem yelid ve lem yûled. Ve lem yekün lehû küfüven ehad.",
    translation: "De ki: O, Allah birdir. Allah Samed’dir (her şey O’na muhtaçtır, O hiçbir şeye muhtaç değildir). O doğurmamış ve doğmamıştır. O’nun hiçbir dengi yoktur.",
    audioUrl: "https://server8.mp3quran.net/afs/112.mp3"
  },
  {
    id: "felak",
    name: "Felâk Suresi",
    versesCount: "5 Ayet",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾",
    turkishRead: "Kul e'ûzü bi-rabbil felak. Min şerri mâ halak. Ve min şerri gâsikın izâ vekab. Ve min şerrin-neffâsâti fil 'ukad. Ve min şerri hâsidin izâ hased.",
    translation: "De ki: Yarattığı şeylerin şerrinden, karanlığı çöktüğü zaman gecenin şerrinden, düğümlere üfleyen büyücülerin şerrinden ve haset ettiği zaman hasetçinin şerrinden sabahın Rabbine sığınırım.",
    audioUrl: "https://server8.mp3quran.net/afs/113.mp3"
  },
  {
    id: "nas",
    name: "Nâs Suresi",
    versesCount: "6 Ayet",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾",
    turkishRead: "Kul e'ûzü bi-rabbin-nâs. Melikin-nâs. İlâhin-nâs. Min şerril vesvâsil hannâs. Ellezî yüvesvisü fî sudûrin-nâs. Minel cinneti ven-nâs.",
    translation: "De ki: Cinlerden ve insanlardan olup, insanların kalplerine vesvese veren o sinsi şeytanın şerrinden, insanların Rabbine, insanların Hükümdarına, insanların İlahına sığınırım.",
    audioUrl: "https://server8.mp3quran.net/afs/114.mp3"
  },
  {
    id: "yasin",
    name: "Yâsîn-i Şerîf (Giriş & Fazileti)",
    versesCount: "Kur'an'ın Kalbi",
    arabic: "يس ﴿١﴾ وَالْقُرْآنِ الْحَكِيمِ ﴿٢﴾ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ﴿٣﴾ عَلَىٰ صِرَاطٍ مُسْتَقِيمٍ ﴿٤﴾ تَنْزِيلَ الْعَزِيزِ الرَّحِيمِ ﴿٥﴾",
    turkishRead: "Yâsîn. Vel Kur'ânil hakîm. İnneke leminel mürselîn. 'Alâ sırâtın müstakîm. Tenzîlel 'azîzir-rahîm...",
    translation: "Yâsîn. Hikmet dolu Kur'an'a andolsun ki sen şüphesiz doğru bir yol üzere gönderilmiş peygamberlerdensin. Bu kitap, çok güçlü ve çok merhametli olan Allah tarafından indirilmiştir.",
    audioUrl: "https://server8.mp3quran.net/afs/036.mp3"
  },
  {
    id: "mulk",
    name: "Mülk (Tebâreke) Suresi",
    versesCount: "30 Ayet (Kabir Kurtarıcısı)",
    arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ﴿١﴾ الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ ﴿٢﴾",
    turkishRead: "Tebârekellezî biyedihil mülkü ve hüve 'alâ külli şey'in kadîr. Ellezî halakal mevte vel hayâte liyeblüveküm eyyüküm ahsenü 'amelâ...",
    translation: "Mülk elinde bulunan Allah yüceler yücesidir. O her şeye hakkıyla gücü yetendir. Hanginizin daha güzel amel yapacağını sınamak için ölümü ve hayatı yaratan O'dur.",
    audioUrl: "https://server8.mp3quran.net/afs/067.mp3"
  },
  {
    id: "insirah",
    name: "İnşirâh Suresi (Kalp Ferahlığı)",
    versesCount: "8 Ayet",
    arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ﴿١﴾ وَوَضَعْنَا عَنكَ وِزْرَكَ ﴿٢﴾ الَّذِي أَنقَضَ ظَهْرَكَ ﴿٣﴾ وَرَفَعْنَا لَكَ ذِكْرَكَ ﴿٤﴾ فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ﴿٥﴾ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴿٦﴾ فَإِذَا فَرَغْتَ فَانصَبْ ﴿٧﴾ وَإِلَىٰ رَبِّكَ فَارْغَب ﴿٨﴾",
    turkishRead: "Elem neşrah leke sadrak. Ve vada'nâ 'anke vizrak. Ellezî enkada zahrak. Ve refa'nâ leke zikrak. Fe-inne me'al 'usri yusrâ. İnne me'al 'usri yusrâ. Fe-izâ ferağte fensab. Ve ilâ rabbike ferğab.",
    translation: "Biz senin göğsünü açıp genişletmedik mi? Belini büken yükünü üzerinden kaldırmadık mı? Senin şanını yüceltmedik mi? Elbette zorlukla beraber bir kolaylık vardır. Şüphesiz her zorlukla beraber bir kolaylık daha vardır. Öyleyse bir işi bitirince hemen diğerine koyul ve yalnız Rabbine yönel.",
    audioUrl: "https://server8.mp3quran.net/afs/094.mp3"
  }
];

// Ortak Zikir & Hatim Halkaları
const DEFAULT_COMMUNITY_CIRCLES = [
  { id: 'c1', title: '70.000 Kelime-i Tevhid Halkası', target: 70000, current: 43250, badge: 'Tevhid' },
  { id: 'c2', title: '4.444 Salât-ı Tefriciye Duası', target: 4444, current: 3180, badge: 'Hacet & Şifa' },
  { id: 'c3', title: '100.000 İhlâs-ı Şerîf Hatmi', target: 100000, current: 67800, badge: 'İhlas Hatmi' },
  { id: 'c4', title: '1.000.000 Salavat-ı Şerife Zinciri', target: 1000000, current: 785200, badge: 'Salavat' }
];

// Günlük Virdler Verisi
const VIRDLER_DATA = {
  sabah: [
    { id: 'v_s1', title: 'Sabah İstiğfarı', arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ', turkish: 'Estağfirullâhe\'l-Azîm ve etûbü ileyh (Günde 100 defa)', target: 100 },
    { id: 'v_s2', title: 'Tevhid Zikri', arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', turkish: 'Sabah 10 veya 100 defa okunması büyük sevap ve koruyucudur.', target: 100 },
    { id: 'v_s3', title: 'Ayetel Kürsi & İhlas Felak Nas', arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...', turkish: 'Sabah namazı akabinde 1 Ayetel Kürsi ve 3’er İhlâs, Felak, Nâs.', target: 3 },
    { id: 'v_s4', title: 'Seyyidü\'l İstiğfar', arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ...', turkish: 'Sabah okuyup o gün vefat eden kimse cennet ehlinden olur.', target: 1 }
  ],
  aksam: [
    { id: 'v_a1', title: 'Zararlardan Korunma Duası', arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', turkish: 'Bismillâhillezî lâ yedurru ma\'asmihî şey\'ün... (3 defa)', target: 3 },
    { id: 'v_a2', title: 'Şerlerden Sığınma Virdi', arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', turkish: 'Eûzü bi-kelimâtillâhi\'t-tâmmâti min şerri mâ halak (3 defa)', target: 3 },
    { id: 'v_a3', title: 'Haşr Suresi Son Üç Ayet', arabic: 'هُوَ اللَّهُ الَّذِي لَا إِلٰهَ إِلَّا هُوَ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ...', turkish: 'Akşam namazından sonra okuyana 70 bin melek istiğfar eder.', target: 1 },
    { id: 'v_a4', title: 'Akşam Salavatı', arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَسَلِّمْ', turkish: 'Günün sonunda kalbe huzur ve bereket için 100 Salavat.', target: 100 }
  ],
  haftalik: [
    { id: 'v_h1', day: 'Pazartesi', title: 'Peygamberimize Muhabbet Virdi', arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ', turkish: 'Pazartesi günü en az 300 Salavat-ı Şerife.', target: 300 },
    { id: 'v_h2', day: 'Salı', title: 'Geniş Rızık ve Afiyet Virdi', arabic: 'يَا فَتَّاحُ يَا رَزَّاقُ يَا كَرِيمُ', turkish: 'Salı günü 100 defa Yâ Fettâh Yâ Rezzâk zikri.', target: 100 },
    { id: 'v_h3', day: 'Çarşamba', title: 'İlim ve Basiret Virdi', arabic: 'رَبِّ زِدْنِي عِلْمًا وَفَهْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ', turkish: 'Rabbim ilmimi artır ve beni salihlere kat (100 defa)', target: 100 },
    { id: 'v_h4', day: 'Perşembe', title: 'Tevbe ve Mağfiret Virdi', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ', turkish: 'Dilde hafif mizanda ağır gelen tesbih (100 defa)', target: 100 },
    { id: 'v_h5', day: 'Cuma', title: 'Cuma Günü Salavat & Kehf Virdi', arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ', turkish: 'Cuma günü ve gecesi 1000 Salavat ve Kehf Suresi.', target: 1000 },
    { id: 'v_h6', day: 'Cumartesi', title: 'Şükür ve Hamd Virdi', arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ عَلَى كُلِّ حَالٍ', turkish: 'Her halimiz için alemlerin Rabbine sonsuz hamd (100 defa)', target: 100 },
    { id: 'v_h7', day: 'Pazar', title: 'Tevhid ve İhlas Virdi', arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ الْمَلِكُ الْحَقُّ الْمُبِينُ', turkish: 'Lâ ilâhe illallâhu\'l-Melikü\'l-Hakku\'l-Mübîn (100 defa)', target: 100 }
  ],
  tesbihat: [
    { id: 'v_t1', title: 'Namaz Sonrası Tesbihi - 1', arabic: 'سُبْحَانَ اللَّهِ', turkish: '33 Defa Sübhanallah', target: 33 },
    { id: 'v_t2', title: 'Namaz Sonrası Tesbihi - 2', arabic: 'الْحَمْدُ لِلَّهِ', turkish: '33 Defa Elhamdülillah', target: 33 },
    { id: 'v_t3', title: 'Namaz Sonrası Tesbihi - 3', arabic: 'اللَّهُ أَكْبَرُ', turkish: '33 Defa Allahuekber', target: 33 },
    { id: 'v_t4', title: 'Tesbih Sonu Duası', arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ...', turkish: '100\'e tamamlayan tehlil.', target: 1 }
  ]
};

// 99 Esmâül Hüsnâ Veritabanı
const ESMAUL_HUSNA = [
  { no: 1, name: "Allah", arabic: "الله", meaning: "Her şeyin yaratıcısı ve mutlak hakimi olan yüce Zât.", ebced: 66, virtue: "Her türlü hayır kapısının açılması ve kalbin nurlanması için." },
  { no: 2, name: "Er-Rahmân", arabic: "الرَّحْمَن", meaning: "Dünyada bütün mahlukata merhamet eden, şefkat gösteren.", ebced: 298, virtue: "Kalp yumuşaklığı ve merhamet duygusu kazanmak için." },
  { no: 3, name: "Er-Rahîm", arabic: "الرَّحِيم", meaning: "Ahirette sadece müminlere sonsuz merhamet ve lütufta bulunan.", ebced: 258, virtue: "Maddi ve manevi rızkın artması ve huzur için." },
  { no: 4, name: "El-Melik", arabic: "المَلِك", meaning: "Mülkün ve kainatın gerçek sahibi, mutlak hükümdar.", ebced: 90, virtue: "Maddi ve manevi güçlü olmak ve sözünün tesirli olması için." },
  { no: 5, name: "El-Kuddûs", arabic: "القُدُّوس", meaning: "Her türlü noksanlıktan, ayıptan ve kusurdan münezzeh ve mukaddes.", ebced: 170, virtue: "Gönül temizliği ve kötü huylardan arınmak için." },
  { no: 6, name: "Es-Selâm", arabic: "السَّلَام", meaning: "Kullarını her türlü tehlikeden selamete çıkaran, esenlik veren.", ebced: 131, virtue: "Huzurlu bir yaşam ve her türlü afetten korunmak için." },
  { no: 7, name: "El-Mü'min", arabic: "المُؤْمِن", meaning: "Gönüllere iman nuru veren, güven sağlayan ve koruyan.", ebced: 137, virtue: "Korkulardan emin olmak ve sarsılmaz bir iman için." },
  { no: 8, name: "El-Müheymin", arabic: "المُهَيْمِن", meaning: "Her şeyi görüp gözeten, koruyup himaye eden.", ebced: 145, virtue: "Düşman şerrinden korunmak ve hafıza kuvveti için." },
  { no: 9, name: "El-Azîz", arabic: "العَزِيز", meaning: "Yenilgiye uğramayan, her şeye galip gelen mutlak izzet sahibi.", ebced: 94, virtue: "İzzet, şeref ve heybet kazanmak için." },
  { no: 10, name: "El-Cebbâr", arabic: "الجَبَّار", meaning: "Dilediğini zorla yaptıran, kırılanları onaran, eksikleri gideren.", ebced: 206, virtue: "Zulme uğramaktan korunmak ve isteklerin gerçekleşmesi için." },
  { no: 11, name: "El-Mütekebbir", arabic: "المُتَكَبِّر", meaning: "Büyüklükte eşi ve benzeri olmayan, mutlak azamet sahibi.", ebced: 662, virtue: "Makam ve mevki sahibi olmak, saygı görmek için." },
  { no: 12, name: "El-Hâlık", arabic: "الخَالِق", meaning: "Her şeyi yoktan var eden, yaratan.", ebced: 731, virtue: "Zor işlerin kolaylaşması ve sıkıntılardan kurtulmak için." },
  { no: 13, name: "El-Bâri'", arabic: "البَارِئ", meaning: "Her şeyi kusursuz, dengeli ve ahenkli yaratan.", ebced: 213, virtue: "Başarıya ulaşmak ve ruhsal ferahlık bulmak için." },
  { no: 14, name: "El-Musavvir", arabic: "المُصَوِّر", meaning: "Bütün varlıklara en güzel suret ve şekli veren.", ebced: 336, virtue: "İlham ve yeteneklerin gelişmesi, güzel ahlak için." },
  { no: 15, name: "El-Gaffâr", arabic: "الغَفَّار", meaning: "Günahları çokça bağışlayan, örten ve affeden.", ebced: 1281, virtue: "Günahların affı ve manevi perdelerin açılması için." },
  { no: 16, name: "El-Kahhâr", arabic: "القَهَّار", meaning: "Her şeye boyun eğdiren, galip gelen mutlak kudret.", ebced: 306, virtue: "Nefis ve şeytanın şerrinden, düşman baskısından kurtulmak için." },
  { no: 17, name: "El-Vehhâb", arabic: "الوَهَّاب", meaning: "Karşılıksız, sınırsız ve hesapsızca lütfeden ve ihsan eden.", ebced: 14, virtue: "Maddi ve manevi rızkın yağması, darlıktan kurtulmak için." },
  { no: 18, name: "Er-Rezzâk", arabic: "الرَّزَّاق", meaning: "Bütün canlıların rızkını veren, ihtiyaçlarını karşılayan.", ebced: 308, virtue: "Bol kazanç ve bereket kapılarının açılması için." },
  { no: 19, name: "El-Fettâh", arabic: "الفَتَّاح", meaning: "Bütün hayır, zafer ve fetih kapılarını ardına kadar açan.", ebced: 489, virtue: "Tıkanmış işlerin açılması, kalp ferahlığı ve başarı için." },
  { no: 20, name: "El-Alîm", arabic: "العَلِيم", meaning: "Her şeyi, geçmişi, geleceği ve gizliyi hakkıyla bilen.", ebced: 150, virtue: "İlim, anlayış, kavrayış ve hafıza kuvveti için." },
  { no: 21, name: "El-Kâbıd", arabic: "القَابِض", meaning: "Dilediğine rızkı ve gönlü daraltan, sıkan.", ebced: 903, virtue: "Düşman hilesinden korunmak için." },
  { no: 22, name: "El-Bâsıt", arabic: "البَاسِط", meaning: "Dilediğine rızkı ve neşeyi bol bol veren, genişleten.", ebced: 72, virtue: "Gönül darlığından kurtulup rızkın bollaşması için." },
  { no: 23, name: "El-Hâfıd", arabic: "الخَافِض", meaning: "Zalimleri, kibirlenenleri alçaltan, zelil kılan.", ebced: 1481, virtue: "Zalimlerin şerrinden korunmak için." },
  { no: 24, name: "Er-Râfi'", arabic: "الرَّافِع", meaning: "Müminleri, hak edenleri yükselten, yücelten.", ebced: 351, virtue: "Toplumda itibar ve manevi derecelerin yükselmesi için." },
  { no: 25, name: "El-Mu'izz", arabic: "المُعِزّ", meaning: "Dilediğine izzet, şeref ve güç veren.", ebced: 117, virtue: "Saygınlık kazanmak ve zillete düşmemek için." },
  { no: 26, name: "El-Müzill", arabic: "المُذِلّ", meaning: "Dilediğini zelil eden, hor ve hakir kılan.", ebced: 770, virtue: "Hasetçilerden ve düşmanlardan emin olmak için." },
  { no: 27, name: "Es-Semî'", arabic: "السَّمِيع", meaning: "Gizli ve açık her sesi ve yakarışı işiten.", ebced: 180, virtue: "Duaların kabul olması ve kalbin nurlanması için." },
  { no: 28, name: "El-Basîr", arabic: "البَصِير", meaning: "Her şeyi, en karanlık ve gizli olanı bile gören.", ebced: 302, virtue: "Basiret gözünün açılması ve gafletten kurtulmak için." },
  { no: 29, name: "El-Hakem", arabic: "الحَكَم", meaning: "Hüküm veren, hakkı batıldan ayıran adil hâkim.", ebced: 68, virtue: "Hakkın tecellisi ve doğru kararlar vermek için." },
  { no: 30, name: "El-Adl", arabic: "العَدْل", meaning: "Mutlak adalet sahibi, her şeyi yerli yerince yapan.", ebced: 104, virtue: "Adaletin tesisi ve nefsin ıslahı için." },
  { no: 31, name: "El-Latîf", arabic: "اللَّطِيف", meaning: "Bütün incelikleri bilen, kullarına hissettirmeden lütufta bulunan.", ebced: 129, virtue: "Beklenmedik kapıların açılması, ferahlık ve şifa için." },
  { no: 32, name: "El-Habîr", arabic: "الخَبِير", meaning: "Her şeyin iç yüzünden ve gizlisinden haberdar olan.", ebced: 812, virtue: "Manevi sırlar ve işlerin hakikatini kavramak için." },
  { no: 33, name: "El-Halîm", arabic: "الحَلِيم", meaning: "Cezalandırmada acele etmeyen, yumuşak muamele eden.", ebced: 88, virtue: "Öfkeyi yenmek, sükunet ve ağırbaşlılık kazanmak için." },
  { no: 34, name: "El-Azîm", arabic: "العَظِيم", meaning: "Azamet ve büyüklüğü kavranamayacak kadar yüce olan.", ebced: 1020, virtue: "Şifa, büyüklük ve saygı kazanmak için." },
  { no: 35, name: "El-Gafûr", arabic: "الغَفُور", meaning: "Mağfireti çok bol olan, kullarının günahlarını örten.", ebced: 1286, virtue: "Maddi-manevi günahlardan temizlenmek ve affedilmek için." },
  { no: 36, name: "Eş-Şekûr", arabic: "الشَّكُور", meaning: "Az amele çok mükafat veren, şükredenlerin nimetini artıran.", ebced: 526, virtue: "Nimetlerin artması ve bereket için." },
  { no: 37, name: "El-Aliyy", arabic: "العَلِيّ", meaning: "Yücelikte eşsiz ve benzersiz olan, en yüksekteki.", ebced: 110, virtue: "Makam ve derecelerin yükselmesi için." },
  { no: 38, name: "El-Kebîr", arabic: "الكَبِير", meaning: "Büyüklüğünün sonu ve sınırı bulunmayan.", ebced: 232, virtue: "Manevi olgunluk ve saygınlık için." },
  { no: 39, name: "El-Hafîz", arabic: "الحَفِيظ", meaning: "Her şeyi koruyan, saklayan ve muhafaza eden.", ebced: 998, virtue: "Her türlü bela, afet, kaza ve nazardan korunmak için." }
];

const DEFAULT_PRAYER_ALERTS = {
  imsak: {
    name: 'İmsak / Sabah',
    soundMode: 'ezan', // 'ezan', 'tone', 'vibrate', 'off'
    ezanKey: 'saba',
    notificationTone: 'tekbir',
    customEzanData: null,
    customEzanName: ''
  },
  gunes: {
    name: 'Güneş',
    soundMode: 'tone',
    ezanKey: 'default',
    notificationTone: 'bird',
    customEzanData: null,
    customEzanName: ''
  },
  ogle: {
    name: 'Öğle',
    soundMode: 'ezan',
    ezanKey: 'rast',
    notificationTone: 'chime',
    customEzanData: null,
    customEzanName: ''
  },
  ikindi: {
    name: 'İkindi',
    soundMode: 'ezan',
    ezanKey: 'hicaz',
    notificationTone: 'tekbir',
    customEzanData: null,
    customEzanName: ''
  },
  aksam: {
    name: 'Akşam',
    soundMode: 'ezan',
    ezanKey: 'segah',
    notificationTone: 'ney',
    customEzanData: null,
    customEzanName: ''
  },
  yatsi: {
    name: 'Yatsı',
    soundMode: 'ezan',
    ezanKey: 'ussak',
    notificationTone: 'chime',
    customEzanData: null,
    customEzanName: ''
  }
};

// --- 2. UYGULAMA DURUMU (APP STATE) ---
let state = {
  counter: 0,
  target: 33,
  tour: 0,
  activeZikir: PRESET_ZIKIRS[0],
  currentCity: CITIES[0],
  prayerTimes: null,
  soundEnabled: true,
  vibrateEnabled: true,
  theme: 'theme-emerald',
  zikirMode: 'digital', // 'digital', 'beads', 'voice'
  dailySpiritualIdx: 0,
  kazaPrayers: {
    sabah: 0,
    ogle: 0,
    ikindi: 0,
    aksam: 0,
    yatsi: 0,
    vitir: 0,
    oruc: 0
  },
  communityCircles: DEFAULT_COMMUNITY_CIRCLES,
  history: [],
  activeAudio: null,
  activeAudioId: null,
  voiceRecognition: null,
  isVoiceListening: false,
  compassHeading: 0,
  qiblaBearing: 0,
  isQiblaAligned: false,
  qiblaVoiceEnabled: true,
  defaultEzan: 'mekke',
  customEzanName: '',
  customEzanData: null,
  activeEzanAudio: null,
  activePrayerConfigKey: 'ogle',
  prayerAlerts: JSON.parse(JSON.stringify(DEFAULT_PRAYER_ALERTS)),
  lastTriggeredPrayer: null,
  activeAlertAudio: null
};

// --- 3. BAŞLANGIÇ & INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  applyTheme(state.theme);
  updateZikirDisplay();
  renderDailySpiritualCard();
  renderHolyDays();
  renderSurahs();
  renderCircles();
  renderKazaPanel();
  renderVirdler('sabah');
  renderEsmaulHusna();
  renderHistory();
  updateStats();
  initPrayerTimes();
  initQiblaCompass();
  updateQiblaVoiceUI();
  updateEzanUI();
  initVoiceRecognition();
  initBeadSwipe();
  checkNotificationPermissionNotice();

  // Otomatik Konum Tespiti (GPS)
  if (!state.currentCity || state.currentCity.isAutoGPS || !localStorage.getItem('vakit_zikir_pro_state')) {
    setTimeout(() => { detectUserLocation(false); }, 500);
  }
});

// --- 4. ZİKİRMATİK MODLARI VE SAYAÇ MOTORU ---

function switchZikirMode(mode) {
  state.zikirMode = mode;
  document.querySelectorAll('.zikir-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  const digitalDevice = document.getElementById('tasbeeh-digital-device');
  const beadsDevice = document.getElementById('tasbeeh-beads-device');
  const voiceDevice = document.getElementById('tasbeeh-voice-device');

  if (digitalDevice) digitalDevice.style.display = (mode === 'digital') ? 'block' : 'none';
  if (beadsDevice) beadsDevice.style.display = (mode === 'beads') ? 'flex' : 'none';
  if (voiceDevice) voiceDevice.style.display = (mode === 'voice') ? 'flex' : 'none';

  if (mode !== 'voice' && state.isVoiceListening) {
    stopVoiceRecognition();
  }
}

function incrementZikir() {
  state.counter++;
  playHaptic(30);
  playClickSound();

  if (state.target > 0 && state.counter >= state.target) {
    state.tour++;
    state.counter = 0;
    playHaptic([80, 50, 120]);
    playCompletionSound();
    showToast(`Tebrikler! ${state.activeZikir.title} için ${state.tour}. tur tamamlandı! 🎉`);
  }

  saveToStorage();
  updateZikirDisplay();
  saveHistoryRecord();
  updateStats();
}

function decrementZikir() {
  if (state.counter > 0) {
    state.counter--;
    playHaptic(20);
    saveToStorage();
    updateZikirDisplay();
  }
}

function resetZikir() {
  if (confirm('Mevcut sayaç sıfırlansın mı?')) {
    state.counter = 0;
    state.tour = 0;
    saveToStorage();
    updateZikirDisplay();
    showToast('Sayaç sıfırlandı.');
  }
}

function setTarget(val) {
  state.target = parseInt(val, 10);
  document.querySelectorAll('.target-badge').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.target, 10) === state.target);
  });
  saveToStorage();
  updateZikirDisplay();
}

function selectZikir(zikirId) {
  const found = PRESET_ZIKIRS.find(z => z.id === zikirId);
  if (found) {
    state.activeZikir = found;
    state.counter = 0;
    state.tour = 0;
    if (found.target) state.target = found.target;
    saveToStorage();
    updateZikirDisplay();
    closeAllModals();
    showToast(`${found.title} seçildi.`);
  }
}

function updateZikirDisplay() {
  const titleEl = document.getElementById('active-zikir-title');
  const arabicEl = document.getElementById('active-zikir-arabic');
  const countEl = document.getElementById('counter-display');
  const tourEl = document.getElementById('tour-counter-display');
  const targetEl = document.getElementById('target-counter-display');
  const barEl = document.getElementById('lcd-progress-bar');
  const beadNumEl = document.getElementById('bead-number-display');

  if (titleEl) titleEl.textContent = state.activeZikir.title;
  if (arabicEl) arabicEl.textContent = state.activeZikir.arabic;
  if (countEl) countEl.textContent = String(state.counter).padStart(3, '0');
  if (tourEl) tourEl.textContent = `TUR: ${state.tour}`;
  if (targetEl) targetEl.textContent = state.target > 0 ? `HEDEF: ${state.target}` : 'HEDEF: Serbest';
  if (beadNumEl) beadNumEl.textContent = state.counter;

  if (barEl) {
    if (state.target > 0) {
      const pct = Math.min(100, Math.round((state.counter / state.target) * 100));
      barEl.style.width = `${pct}%`;
    } else {
      barEl.style.width = '100%';
    }
  }
}

// --- 5. HAKİKİ BONCUKLU TESBİH SİMÜLASYONU (SWIPE & CLICK) ---
function initBeadSwipe() {
  const viewport = document.getElementById('bead-rosary-viewport');
  if (!viewport) return;

  let startY = 0;
  viewport.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    if (Math.abs(endY - startY) > 25) {
      animateBeadPull();
      incrementZikir();
    }
  }, { passive: true });

  viewport.addEventListener('click', () => {
    animateBeadPull();
    incrementZikir();
  });
}

function animateBeadPull() {
  const bead = document.getElementById('rosary-bead-active');
  if (bead) {
    bead.style.transform = 'scale(0.88) translateY(12px)';
    setTimeout(() => {
      bead.style.transform = '';
    }, 180);
  }
}

// --- 6. SESLE ZİKİR ALGILAMA (SPEECH RECOGNITION) ---
function initVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  state.voiceRecognition = new SpeechRecognition();
  state.voiceRecognition.lang = 'tr-TR';
  state.voiceRecognition.continuous = true;
  state.voiceRecognition.interimResults = false;

  state.voiceRecognition.onresult = (event) => {
    const lastResult = event.results[event.results.length - 1];
    if (lastResult.isFinal) {
      const transcript = lastResult[0].transcript.trim().toLowerCase();
      handleVoiceCommand(transcript);
    }
  };

  state.voiceRecognition.onerror = (e) => {
    console.warn('Voice error:', e);
  };
}

function toggleVoiceListening() {
  if (!state.voiceRecognition) {
    showToast('Tarayıcınız ses tanıma özelliğini desteklemiyor.');
    return;
  }

  const btn = document.getElementById('voice-pulse-btn');
  const wordEl = document.getElementById('voice-detected-word');

  if (state.isVoiceListening) {
    stopVoiceRecognition();
  } else {
    try {
      state.voiceRecognition.start();
      state.isVoiceListening = true;
      if (btn) btn.classList.add('listening');
      if (wordEl) wordEl.innerHTML = '<i class="bi bi-soundwave"></i> Dinleniyor...';
      showToast('Mikrofon aktif. Zikrinizi söyleyiniz.');
    } catch (err) {
      console.warn(err);
    }
  }
}

function stopVoiceRecognition() {
  if (state.voiceRecognition && state.isVoiceListening) {
    state.voiceRecognition.stop();
    state.isVoiceListening = false;
    const btn = document.getElementById('voice-pulse-btn');
    const wordEl = document.getElementById('voice-detected-word');
    if (btn) btn.classList.remove('listening');
    if (wordEl) wordEl.innerHTML = '<i class="bi bi-mic-mute"></i> Başlamak için mikrofona dokunun';
  }
}

function handleVoiceCommand(text) {
  const wordEl = document.getElementById('voice-detected-word');
  if (wordEl) wordEl.innerHTML = `<i class="bi bi-check-circle-fill" style="color:var(--accent-emerald)"></i> "${text}"`;

  const keywords = ['allah', 'sübhanallah', 'subhanallah', 'elhamdülillah', 'elhamdulillah', 'ekber', 'estağfirullah', 'salavat', 'lailaheillallah', 'tevhid'];
  const matches = keywords.some(k => text.includes(k));

  if (matches || text.length > 2) {
    incrementZikir();
  }
}

// --- 7. GÜNÜN MANEVİ KARTI VE PAYLAŞIM ---
function renderDailySpiritualCard() {
  const container = document.getElementById('daily-spiritual-content');
  if (!container) return;

  const item = DAILY_SPIRITUAL_POOL[state.dailySpiritualIdx % DAILY_SPIRITUAL_POOL.length];
  container.innerHTML = `
    <div class="daily-card-header">
      <div class="daily-card-tag"><i class="bi bi-stars"></i> ${item.type}</div>
      <div class="daily-card-actions">
        <button class="daily-action-btn" onclick="nextDailySpiritual()" title="Yenile"><i class="bi bi-arrow-clockwise"></i></button>
        <button class="daily-action-btn" onclick="shareDailySpiritual()" title="Paylaş"><i class="bi bi-share-fill"></i></button>
        <button class="daily-action-btn" onclick="copyDailySpiritual()" title="Kopyala"><i class="bi bi-copy"></i></button>
      </div>
    </div>
    <div class="daily-arabic">${item.arabic}</div>
    <div class="daily-translation">"${item.turkish}"</div>
    <div class="daily-source">— ${item.source}</div>
  `;
}

function nextDailySpiritual() {
  state.dailySpiritualIdx = (state.dailySpiritualIdx + 1) % DAILY_SPIRITUAL_POOL.length;
  renderDailySpiritualCard();
  playHaptic(20);
}

function copyDailySpiritual() {
  const item = DAILY_SPIRITUAL_POOL[state.dailySpiritualIdx % DAILY_SPIRITUAL_POOL.length];
  const text = `${item.type}\n\n${item.arabic}\n\n"${item.turkish}"\n\n— ${item.source}\n(Zikir & Vird Pro | Geliştirici: Serhat Sarıboğa)`;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Manevi kart panoya kopyalandı! 📋');
  });
}

function shareDailySpiritual() {
  const item = DAILY_SPIRITUAL_POOL[state.dailySpiritualIdx % DAILY_SPIRITUAL_POOL.length];
  const text = `${item.type}\n\n${item.arabic}\n\n"${item.turkish}"\n\n— ${item.source}`;
  if (navigator.share) {
    navigator.share({
      title: 'Zikir & Vird Pro - Günün Manevi Sözü',
      text: text,
      url: window.location.href
    }).catch(() => {});
  } else {
    copyDailySpiritual();
  }
}

// --- 8. KIBLE PUSULASI & OTOMATİK KONUM (QIBLA COMPASS WITH SECCADE & KÂBE) ---
let compassState = {
  hasAbsoluteListener: false,
  isListening: false,
  rawHeading: 0,
  smoothedHeading: 0
};

function initQiblaCompass() {
  calculateQiblaBearing();
  startCompassListening();
}

function startCompassListening() {
  if (compassState.isListening) return;

  const onOrientationAbsolute = (e) => {
    compassState.hasAbsoluteListener = true;
    processOrientationEvent(e, true);
  };

  const onOrientationStandard = (e) => {
    // Mutlak yönelim dinleniyorsa göreceli yönelim ezmesin
    if (compassState.hasAbsoluteListener) return;
    processOrientationEvent(e, false);
  };

  if ('ondeviceorientationabsolute' in window) {
    window.addEventListener('deviceorientationabsolute', onOrientationAbsolute, true);
  }
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', onOrientationStandard, true);
  }

  compassState.isListening = true;
}

function requestCompassPermission() {
  // iOS 13+ Sensör İzni Talebi
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          showToast('Pusula sensörü etkinleştirildi. 🧭');
          startCompassListening();
        } else {
          showToast('Pusula sensör izni verilmedi.');
        }
      })
      .catch(err => {
        console.warn(err);
        showToast('Sensör başlatılamadı.');
      });
  } else {
    startCompassListening();
    showToast('Pusula sensörü aktif. Telefonunuzu düz tutunuz.');
  }
}

function processOrientationEvent(e, isAbsolute) {
  let heading = null;

  // 1. iOS webkitCompassHeading (Doğrudan Manyetik/Gerçek Kuzey, eğim telafili)
  if (typeof e.webkitCompassHeading === 'number' && !isNaN(e.webkitCompassHeading)) {
    heading = e.webkitCompassHeading;
  }
  // 2. Android / Standart Yönelim (Eğim Telafili 3D Hesaplama)
  else if (e.alpha !== null && e.alpha !== undefined) {
    const alpha = e.alpha;
    const beta = e.beta;
    const gamma = e.gamma;

    // Telefon elde eğik tutulurken (30°-60°) oluşan sapmayı düzeltme
    if (beta !== null && gamma !== null && (Math.abs(beta) > 8 || Math.abs(gamma) > 8)) {
      const degToRad = Math.PI / 180;
      const x = beta * degToRad;  // pitch
      const y = gamma * degToRad; // roll
      const z = alpha * degToRad; // yaw

      const cX = Math.cos(x);
      const cY = Math.cos(y);
      const cZ = Math.cos(z);
      const sX = Math.sin(x);
      const sY = Math.sin(y);
      const sZ = Math.sin(z);

      const vX = -cZ * sY - sZ * sX * cY;
      const vY = -sZ * sY + cZ * sX * cY;

      heading = Math.atan2(vX, vY) * (180 / Math.PI);
      if (heading < 0) heading += 360;
    } else {
      // Düz masaüstü
      heading = (360 - alpha) % 360;
    }
  }

  if (heading !== null && !isNaN(heading)) {
    // Ekran yönelimi düzeltmesi (dikey / yatay)
    const screenAngle = (window.screen && window.screen.orientation && window.screen.orientation.angle) || window.orientation || 0;
    heading = (heading + screenAngle + 360) % 360;

    compassState.rawHeading = heading;

    // Düşük geçiren filtre (yumuşak, titreşimsiz akıcı dönüş için)
    let diff = (heading - compassState.smoothedHeading + 180) % 360 - 180;
    compassState.smoothedHeading = (compassState.smoothedHeading + diff * 0.25 + 360) % 360;

    state.compassHeading = Math.round(compassState.smoothedHeading);
    updateCompassUI(state.compassHeading);
  }
}

function calculateQiblaBearing() {
  const kaabaLat = 21.4225 * (Math.PI / 180);
  const kaabaLng = 39.8262 * (Math.PI / 180);
  const userLat = ((state.currentCity && state.currentCity.lat) || 41.0082) * (Math.PI / 180);
  const userLng = ((state.currentCity && state.currentCity.lng) || 28.9784) * (Math.PI / 180);

  const dLng = kaabaLng - userLng;
  const y = Math.sin(dLng);
  const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(dLng);
  let qibla = Math.atan2(y, x) * (180 / Math.PI);
  qibla = (qibla + 360) % 360;

  state.qiblaBearing = Math.round(qibla);
  updateCompassUI(state.compassHeading || 0);
}

function getKaabaDistanceKm() {
  const R = 6371; // Dünya yarıçapı km
  const lat1 = ((state.currentCity && state.currentCity.lat) || 41.0082) * (Math.PI / 180);
  const lng1 = ((state.currentCity && state.currentCity.lng) || 28.9784) * (Math.PI / 180);
  const lat2 = 21.4225 * (Math.PI / 180);
  const lng2 = 39.8262 * (Math.PI / 180);

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function manualRotateCompass(deg) {
  state.compassHeading = (state.compassHeading + deg + 360) % 360;
  compassState.smoothedHeading = state.compassHeading;
  updateCompassUI(state.compassHeading);
}

function updateCompassUI(heading) {
  const wrapper = document.getElementById('compass-wrapper');
  const dial = document.getElementById('compass-dial');
  const seccadeCard = document.getElementById('compass-seccade-card');
  const rotator = document.getElementById('compass-qibla-rotator');
  const mekkeCard = document.getElementById('mekke-target-card');
  const statusEl = document.getElementById('qibla-status-banner');
  const degEl = document.getElementById('qibla-heading-deg');
  const targetDegEl = document.getElementById('qibla-target-deg');
  const distEl = document.getElementById('qibla-distance-km');

  // Konum kapsül metnini güncelle
  updateQiblaLocationPill();

  // Dış pusula kadranını döndür
  if (dial) dial.style.transform = `rotate(${-heading}deg)`;

  // Kâbe açısının cihaz yönüne göre bağıl açısı
  const kaabaRelAngle = (state.qiblaBearing - heading + 360) % 360;
  if (rotator) rotator.style.transform = `rotate(${kaabaRelAngle}deg)`;
  // Mekke kartını dik tutarak okunaklı kalmasını sağla
  if (mekkeCard) mekkeCard.style.transform = `translate(-50%, -50%) rotate(${-kaabaRelAngle}deg)`;

  // Bilgi kutuları
  if (degEl) degEl.textContent = `${heading}°`;
  if (targetDegEl) targetDegEl.textContent = `${state.qiblaBearing}°`;
  if (distEl) distEl.textContent = `${getKaabaDistanceKm().toLocaleString('tr-TR')} km`;

  // Kıbleye olan açı farkı [-180, 180]
  const diff = (state.qiblaBearing - heading + 540) % 360 - 180;
  const absDiff = Math.abs(diff);
  const aligned = absDiff <= 6; // ±6 derece tolerans ile tam kıbleye hizalanma

  if (wrapper) wrapper.classList.toggle('aligned', aligned);
  if (seccadeCard) seccadeCard.classList.toggle('aligned', aligned);

  if (statusEl) {
    if (aligned) {
      statusEl.className = 'qibla-aligned-status aligned';
      statusEl.innerHTML = '<i class="bi bi-check-circle-fill"></i> KIBLEYE YÖNLENDİRİLDİNİZ';
      if (!state.isQiblaAligned) {
        playHaptic([80, 40, 120]);
        playCompletionSound();
        speakQiblaAnnouncement();
        state.isQiblaAligned = true;
      }
    } else {
      statusEl.className = 'qibla-aligned-status not-aligned';
      state.isQiblaAligned = false;

      if (diff > 0) {
        statusEl.innerHTML = `<i class="bi bi-arrow-right-circle-fill" style="color:var(--gold-primary);"></i> Sağa Dönünüz (${Math.round(diff)}°)`;
      } else {
        statusEl.innerHTML = `<i class="bi bi-arrow-left-circle-fill" style="color:var(--gold-primary);"></i> Sola Dönünüz (${Math.round(absDiff)}°)`;
      }
    }
  }
}

function updateQiblaLocationPill() {
  const pillText = document.getElementById('qibla-location-pill-text');
  if (!pillText) return;
  if (!state.currentCity) {
    pillText.textContent = 'Esenler, Istanbul, Türkiye';
    return;
  }
  const c = state.currentCity;
  const parts = [];
  if (c.district) parts.push(c.district);
  if (c.province && c.province !== c.district) parts.push(c.province);
  else if (c.name && !parts.includes(c.name)) parts.push(c.name);
  if (c.country) parts.push(c.country);

  pillText.textContent = parts.length > 0 ? parts.join(', ') : (c.display || 'Esenler, Istanbul, Türkiye');
}

// Sesli Kıble Uyarısı ("Kıbleye yönlendirildiniz" Seslendirme)
let lastQiblaSpokenTime = 0;
function speakQiblaAnnouncement() {
  if (state.qiblaVoiceEnabled === false) return;
  const now = Date.now();
  if (now - lastQiblaSpokenTime < 4500) return; // 4.5 saniye debounce
  lastQiblaSpokenTime = now;

  showToast('✓ KIBLEYE YÖNLENDİRİLDİNİZ! 🕋');

  // Web Speech Synthesis API
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance('Kıbleye yönlendirildiniz');
      utter.lang = 'tr-TR';
      utter.rate = 0.95;
      utter.pitch = 1.0;
      utter.volume = 1.0;
      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  }
}

function toggleQiblaVoice() {
  state.qiblaVoiceEnabled = (state.qiblaVoiceEnabled === false) ? true : false;
  saveToStorage();
  updateQiblaVoiceUI();
  showToast(state.qiblaVoiceEnabled ? 'Sesli Kıble Açık: Kıble bulununca "Kıbleye yönlendirildiniz" diyecek 🗣️' : 'Sesli Kıble Kapatıldı 🔇');
}

function updateQiblaVoiceUI() {
  const btn = document.getElementById('btn-toggle-qibla-voice');
  const btnText = document.getElementById('qibla-voice-text');
  const active = state.qiblaVoiceEnabled !== false;
  if (btnText) btnText.textContent = active ? 'Sesli Kıble: Açık' : 'Sesli Kıble: Kapalı';
  if (btn) {
    btn.innerHTML = active
      ? '<i class="bi bi-volume-up-fill" style="color:var(--gold-primary);"></i> <span id="qibla-voice-text">Sesli Kıble: Açık</span>'
      : '<i class="bi bi-volume-mute-fill" style="color:var(--text-muted);"></i> <span id="qibla-voice-text">Sesli Kıble: Kapalı</span>';
  }
}

// --- OTOMATİK KONUM MOTORU (GPS GEOLOCATION) ---
async function detectUserLocation(isUserInitiated = false) {
  if (isUserInitiated) {
    showToast('GPS ile konumunuz aranıyor... 🛰️');
  }

  // 1. Capacitor Geolocation Eklentisi (Mobil Cihazlarda En Güvenilir)
  const hasCapacitorGeo = typeof window !== 'undefined' &&
    window.Capacitor &&
    window.Capacitor.Plugins &&
    window.Capacitor.Plugins.Geolocation;

  if (hasCapacitorGeo) {
    try {
      const geo = window.Capacitor.Plugins.Geolocation;
      let perm = await geo.checkPermissions();
      if (!perm || perm.location !== 'granted') {
        perm = await geo.requestPermissions();
      }
      if (perm && (perm.location === 'granted' || perm.coarseLocation === 'granted')) {
        const pos = await geo.getCurrentPosition({ enableHighAccuracy: true, timeout: 12000 });
        if (pos && pos.coords) {
          applyDetectedCoords(pos.coords.latitude, pos.coords.longitude, isUserInitiated);
          return;
        }
      }
    } catch (e) {
      console.warn('Capacitor Geolocation error:', e);
    }
  }

  // 2. Standart Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        applyDetectedCoords(pos.coords.latitude, pos.coords.longitude, isUserInitiated);
      },
      (err) => {
        console.warn('Navigator geolocation error, IP fallback trying:', err);
        fetchIpLocation(isUserInitiated);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  } else {
    fetchIpLocation(isUserInitiated);
  }
}

function fetchIpLocation(isUserInitiated = false) {
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      if (data && data.latitude && data.longitude) {
        applyDetectedCoords(data.latitude, data.longitude, isUserInitiated);
      } else if (isUserInitiated) {
        showToast('Konum belirlenemedi. Lütfen listeden şehir seçiniz.');
      }
    })
    .catch(() => {
      if (isUserInitiated) {
        showToast('Konum servislerine ulaşılamadı. Lütfen listeden şehir seçiniz.');
      }
    });
}

function applyDetectedCoords(lat, lng, showFeedback = true) {
  const nearest = findNearestCity(lat, lng);
  const displayName = nearest ? (nearest.display || `${nearest.province} / ${nearest.district}`) : `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;

  state.currentCity = {
    name: nearest ? nearest.name : 'GPS Konumu',
    display: `${displayName} 📍`,
    province: nearest ? nearest.province : '',
    district: nearest ? nearest.district : '',
    lat: Number(lat.toFixed(4)),
    lng: Number(lng.toFixed(4)),
    isAutoGPS: true,
    country: nearest ? (nearest.country || 'Türkiye') : 'Türkiye'
  };

  saveToStorage();
  initPrayerTimes();
  calculateQiblaBearing();
  closeAllModals();

  if (showFeedback) {
    showToast(`✓ Konumunuz belirlendi: ${state.currentCity.display}`);
    playHaptic([60, 40]);
  }
}

function findNearestCity(lat, lng) {
  const locs = (typeof window !== 'undefined' && window.ALL_LOCATIONS && window.ALL_LOCATIONS.length > 0)
    ? window.ALL_LOCATIONS
    : CITIES;

  let nearest = null;
  let minDist = Infinity;

  for (let i = 0; i < locs.length; i++) {
    const c = locs[i];
    const dLat = (c.lat - lat) * (Math.PI / 180);
    const dLng = (c.lng - lng) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat * (Math.PI / 180)) * Math.cos(c.lat * (Math.PI / 180)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const dist = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    if (dist < minDist) {
      minDist = dist;
      nearest = c;
    }
  }

  return nearest;
}

// --- 9. KAZA NAMAZI & ORUÇ TAKİPÇİSİ ---
function renderKazaPanel() {
  const grid = document.getElementById('kaza-grid-container');
  if (!grid) return;

  const prayers = [
    { key: 'sabah', name: 'Sabah (2 Rekat)' },
    { key: 'ogle', name: 'Öğle (4 Rekat)' },
    { key: 'ikindi', name: 'İkindi (4 Rekat)' },
    { key: 'aksam', name: 'Akşam (3 Rekat)' },
    { key: 'yatsi', name: 'Yatsı (4 Rekat)' },
    { key: 'vitir', name: 'Vitir (3 Rekat)' },
    { key: 'oruc', name: 'Kaza Orucu (Gün)' }
  ];

  grid.innerHTML = prayers.map(p => `
    <div class="kaza-card">
      <div class="kaza-card-top">
        <span class="kaza-name">${p.name}</span>
        <span class="kaza-count" id="kaza-val-${p.key}">${state.kazaPrayers[p.key] || 0}</span>
      </div>
      <div class="kaza-actions">
        <button class="kaza-btn btn-plus" onclick="updateKaza('${p.key}', 1)">+1 Kıl</button>
        <button class="kaza-btn" onclick="updateKaza('${p.key}', -1)">-1</button>
        <button class="kaza-btn" onclick="updateKaza('${p.key}', 5)">+5</button>
      </div>
    </div>
  `).join('');

  updateKazaSummary();
}

function updateKaza(key, delta) {
  state.kazaPrayers[key] = Math.max(0, (state.kazaPrayers[key] || 0) + delta);
  const el = document.getElementById(`kaza-val-${key}`);
  if (el) el.textContent = state.kazaPrayers[key];
  saveToStorage();
  updateKazaSummary();
  playHaptic(25);
}

function updateKazaSummary() {
  const totalEl = document.getElementById('kaza-total-count');
  if (!totalEl) return;
  const total = Object.values(state.kazaPrayers).reduce((a, b) => a + b, 0);
  totalEl.textContent = total;
}

// --- 10. DİNİ GÜNLER & KANDİLLER ---
function renderHolyDays() {
  const list = document.getElementById('holy-days-list');
  if (!list) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  list.innerHTML = HOLY_DAYS_DATA.map(h => {
    const targetDate = new Date(h.dateStr);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let badgeHtml = '';

    if (diffDays === 0) {
      badgeHtml = '<span class="holy-day-badge highlight">BUGÜN!</span>';
    } else if (diffDays > 0) {
      badgeHtml = `<span class="holy-day-badge ${diffDays <= 30 ? 'highlight' : ''}">${diffDays} Gün Kaldı</span>`;
    } else {
      badgeHtml = '<span class="holy-day-badge">Geçti</span>';
    }

    return `
      <div class="holy-day-card ${diffDays >= 0 && diffDays <= 30 ? 'upcoming' : ''}">
        <div>
          <div class="holy-day-title">${h.name}</div>
          <div class="holy-day-date"><i class="bi bi-calendar-event"></i> ${h.dateStr} | ${h.hijri}</div>
          <div style="font-size:0.72rem; color:var(--text-secondary); margin-top:4px;">${h.desc}</div>
        </div>
        <div>${badgeHtml}</div>
      </div>
    `;
  }).join('');
}

// --- 11. KUR'AN-I KERİM SURELER & SESLİ TİLAVET ---
function renderSurahs() {
  const list = document.getElementById('surahs-list-container');
  if (!list) return;

  list.innerHTML = SURAHS_DATA.map(s => `
    <div class="surah-card">
      <div class="surah-header-row">
        <div>
          <div class="surah-name">${s.name}</div>
          <div style="font-size:0.7rem; color:var(--text-muted);">${s.versesCount}</div>
        </div>
        <button id="btn-play-surah-${s.id}" class="surah-play-btn" onclick="toggleSurahAudio('${s.id}', '${s.audioUrl}')">
          <i class="bi bi-play-fill"></i> Dinle
        </button>
      </div>
      <div class="surah-arabic-text">${s.arabic}</div>
      <div style="font-size:0.75rem; color:var(--gold-light); font-weight:700;">Okunuş:</div>
      <div style="font-size:0.78rem; color:var(--text-muted);">${s.turkishRead}</div>
      <div style="font-size:0.75rem; color:var(--gold-light); font-weight:700; margin-top:4px;">Meal:</div>
      <div class="surah-translation">${s.translation}</div>
    </div>
  `).join('');
}

function toggleSurahAudio(id, url) {
  const btn = document.getElementById(`btn-play-surah-${id}`);

  if (state.activeAudio && state.activeAudioId === id) {
    if (!state.activeAudio.paused) {
      state.activeAudio.pause();
      if (btn) btn.innerHTML = '<i class="bi bi-play-fill"></i> Dinle';
      return;
    } else {
      state.activeAudio.play();
      if (btn) btn.innerHTML = '<i class="bi bi-pause-fill"></i> Duraklat';
      return;
    }
  }

  if (state.activeAudio) {
    state.activeAudio.pause();
    document.querySelectorAll('.surah-play-btn').forEach(b => b.innerHTML = '<i class="bi bi-play-fill"></i> Dinle');
  }

  state.activeAudio = new Audio(url);
  state.activeAudioId = id;
  state.activeAudio.play().then(() => {
    if (btn) btn.innerHTML = '<i class="bi bi-pause-fill"></i> Duraklat';
    showToast('Sure tilaveti başladı.');
  }).catch(e => {
    showToast('Ses yüklenemedi. İnternet bağlantınızı kontrol ediniz.');
  });

  state.activeAudio.onended = () => {
    if (btn) btn.innerHTML = '<i class="bi bi-play-fill"></i> Dinle';
  };
}

// --- 12. ORTAK ZİKİR & HATİM HALKALARI ---
function renderCircles() {
  const list = document.getElementById('circles-list-container');
  if (!list) return;

  list.innerHTML = state.communityCircles.map(c => {
    const pct = Math.min(100, Math.round((c.current / c.target) * 100));
    return `
      <div class="circle-card">
        <div class="circle-top">
          <div class="circle-title"><i class="bi bi-people-fill" style="color:var(--gold-primary);"></i> ${c.title}</div>
          <span class="circle-target-badge">${c.badge}</span>
        </div>
        <div class="circle-progress-track">
          <div class="circle-progress-fill" style="width: ${pct}%"></div>
        </div>
        <div class="circle-numbers-row">
          <span>İlerleme: %${pct}</span>
          <span>${c.current.toLocaleString()} / ${c.target.toLocaleString()}</span>
        </div>
        <div class="circle-actions-row">
          <button class="circle-add-btn" onclick="contributeCircle('${c.id}', 10)">+10 Ekle</button>
          <button class="circle-add-btn" onclick="contributeCircle('${c.id}', 100)">+100 Ekle</button>
          <button class="circle-add-btn" onclick="contributeCircle('${c.id}', 1000)">+1.000 Ekle</button>
        </div>
      </div>
    `;
  }).join('');
}

function contributeCircle(circleId, amount) {
  const circle = state.communityCircles.find(c => c.id === circleId);
  if (circle) {
    circle.current = Math.min(circle.target, circle.current + amount);
    saveToStorage();
    renderCircles();
    playHaptic([40, 40]);
    showToast(`${circle.title} halkasına +${amount} zikir eklendi! 🤲`);
  }
}

// --- 13. GERÇEK EZAN SESLERİ, MAKAMLAR & BİLDİRİM TONLARI MOTORU ---
const REAL_EZAN_LIST = {
  saba: {
    id: 'saba',
    title: 'Sabah: Saba Makamı Ezanı',
    desc: 'Sabahın seher vaktine mahsus, huşû ve hüzün veren Saba makamı',
    url: 'ezan_default.mp3'
  },
  rast: {
    id: 'rast',
    title: 'Öğle: Rast Makamı Ezanı',
    desc: 'Günün en aydınlık anında canlılık ve neşve veren asil Rast makamı',
    url: 'ezan_default.mp3'
  },
  hicaz: {
    id: 'hicaz',
    title: 'İkindi: Hicaz Makamı Ezanı',
    desc: 'Günün yorgunluğunu alan derin ve yakarış dolu Hicaz makamı',
    url: 'ezan_mekke.ogg'
  },
  segah: {
    id: 'segah',
    title: 'Akşam: Segah Makamı Ezanı',
    desc: 'Günün batışında telaşsız, tesirli ve hızlı Segah makamı',
    url: 'ezan_default.mp3'
  },
  ussak: {
    id: 'ussak',
    title: 'Yatsı: Uşşak Makamı Ezanı',
    desc: 'Gece istirahatine girerken hüznü ve huzuru buluşturan Uşşak makamı',
    url: 'ezan_mekke.ogg'
  },
  mekke: {
    id: 'mekke',
    title: 'Mekke-i Mükerreme Ezanı',
    desc: 'Mescid-i Haram (Kâbe) Müezzini - Gerçek Orijinal Kayıt',
    url: 'ezan_mekke.ogg'
  },
  default: {
    id: 'default',
    title: 'Klasik Türk & Hicaz Ezanı',
    desc: 'Huşû Veren Geleneksel Ezan-ı Muhammedi',
    url: 'ezan_default.mp3'
  },
  medine: {
    id: 'medine',
    title: 'Medine-i Münevvere Ezanı',
    desc: 'Mescid-i Nebevi Müezzini - Çevrimiçi Kayıt',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Azan.ogg'
  }
};

// Çevrimdışı Manevi Kısa Bildirim Tonları (Web Audio API)
function playNotificationTone(toneKey = 'tekbir') {
  if (!state.soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (toneKey === 'tekbir') {
      // 3 Aşamalı Huşû Veren Tekbir Armonisi (Allahu Ekber Akordu)
      const notes = [
        { f: 349.23, start: 0, dur: 0.45 },
        { f: 440.00, start: 0.45, dur: 0.55 },
        { f: 523.25, start: 1.0, dur: 1.3 }
      ];
      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, now + n.start);
        gain.gain.setValueAtTime(0, now + n.start);
        gain.gain.linearRampToValueAtTime(0.28, now + n.start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur);
      });
    } else if (toneKey === 'chime') {
      // Manevi Çınlayan Akustik Çan
      [523.25, 1046.50, 1567.98].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.25 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 2.8);
      });
    } else if (toneKey === 'ney') {
      // Dinlendirici Ney / Flüt Nağmesi
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.5);
      osc.frequency.exponentialRampToValueAtTime(493.88, now + 1.2);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.0);
    } else if (toneKey === 'bird') {
      // Seher Kuş Cıvıltısı
      [0, 0.22, 0.48].forEach((st, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2600 + (i * 220), now + st);
        osc.frequency.exponentialRampToValueAtTime(3400 + (i * 150), now + st + 0.08);
        osc.frequency.exponentialRampToValueAtTime(2200, now + st + 0.18);
        gain.gain.setValueAtTime(0.18, now + st);
        gain.gain.exponentialRampToValueAtTime(0.001, now + st + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + st);
        osc.stop(now + st + 0.18);
      });
    } else {
      // Standart Çift Bip
      [880, 1175].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.12);
        gain.gain.setValueAtTime(0.2, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.1);
      });
    }
  } catch (e) {
    console.warn(e);
  }
}

function playEzanMakam(makam) {
  const item = REAL_EZAN_LIST[makam] || REAL_EZAN_LIST.saba;
  playEzanPreview(makam);
  showToast(`▶ ${item.title} çalınıyor...`);
}

function playEzanPreview(key) {
  if (state.activeEzanAudio) {
    state.activeEzanAudio.pause();
    state.activeEzanAudio = null;
  }

  let url = '';
  let title = '';

  if (key === 'custom') {
    if (!state.customEzanData) {
      showToast('Henüz özel bir ses dosyası seçilmedi.');
      return;
    }
    url = state.customEzanData;
    title = state.customEzanName || 'Özel Ezan';
  } else {
    const item = REAL_EZAN_LIST[key] || REAL_EZAN_LIST.mekke;
    url = item.url;
    title = item.title;
  }

  playAudioUrlWithBar(url, title);
}

function playAudioUrlWithBar(url, title) {
  stopCurrentEzanAudio();
  try {
    state.activeEzanAudio = new Audio(url);
    const playerBar = document.getElementById('ezan-player-bar');
    const playingTitle = document.getElementById('ezan-playing-title');
    const quickBtn = document.getElementById('btn-quick-play-ezan');
    const testBtn = document.getElementById('btn-test-prayer-sound');

    if (playerBar) playerBar.style.display = 'flex';
    if (playingTitle) playingTitle.textContent = `▶ Çalınıyor: ${title}`;
    if (quickBtn) quickBtn.innerHTML = '<i class="bi bi-stop-circle-fill" style="color:#ef4444;"></i>';
    if (testBtn) testBtn.innerHTML = '<i class="bi bi-stop-circle-fill" style="color:#ef4444;"></i> Sesi Durdur';

    state.activeEzanAudio.play().then(() => {
      showToast(`${title} çalınıyor... 🕌`);
      playHaptic(40);
    }).catch(e => {
      console.warn('Audio play error, trying fallback:', e);
      if (url !== 'ezan_default.mp3') {
        playAudioUrlWithBar('ezan_default.mp3', `${title} (Çevrimdışı Klasik)`);
      } else {
        showToast('Ses yüklenemedi. Dosya formatını kontrol ediniz.');
        stopCurrentEzanAudio();
      }
    });

    state.activeEzanAudio.onended = () => {
      stopCurrentEzanAudio();
    };
  } catch (err) {
    showToast('Ses motoru başlatılamadı.');
  }
}

function stopCurrentEzanAudio() {
  if (state.activeEzanAudio) {
    try { state.activeEzanAudio.pause(); } catch(e) {}
    state.activeEzanAudio = null;
  }
  const playerBar = document.getElementById('ezan-player-bar');
  const quickBtn = document.getElementById('btn-quick-play-ezan');
  const testBtn = document.getElementById('btn-test-prayer-sound');

  if (playerBar) playerBar.style.display = 'none';
  if (quickBtn) quickBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
  if (testBtn) testBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i> Sesi Dinle (Test)';
}

function toggleCurrentEzanAudio() {
  if (state.activeEzanAudio && !state.activeEzanAudio.paused) {
    stopCurrentEzanAudio();
    showToast('Ezan durduruldu.');
  } else {
    const key = state.defaultEzan || 'mekke';
    playEzanPreview(key);
  }
}

function selectDefaultEzan(key) {
  state.defaultEzan = key;
  saveToStorage();
  updateEzanUI();
  const name = key === 'custom' ? (state.customEzanName || 'Özel Ses') : (REAL_EZAN_LIST[key] ? REAL_EZAN_LIST[key].title : key);
  showToast(`✓ Varsayılan ezan seçildi: ${name}`);
  playHaptic([40, 40]);
}

function handleCustomEzanFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i)) {
    showToast('Lütfen geçerli bir ses dosyası (.mp3, .wav, .m4a vb.) seçiniz.');
    return;
  }

  showToast('Ses dosyası yükleniyor...');
  const reader = new FileReader();
  reader.onload = (e) => {
    state.customEzanData = e.target.result;
    state.customEzanName = file.name;
    state.defaultEzan = 'custom';
    saveToStorage();
    updateEzanUI();
    showToast(`✓ "${file.name}" ezan sesi olarak kaydedildi! 🎵`);
    playEzanPreview('custom');
  };
  reader.onerror = () => {
    showToast('Dosya okunamadı. Lütfen başka bir dosya deneyiniz.');
  };
  reader.readAsDataURL(file);
}

function openEzanSettingsModal() {
  openPrayerSoundModal();
}

function openPrayerSoundModal(prayerKey) {
  if (prayerKey) {
    state.activePrayerConfigKey = prayerKey;
  }
  switchSoundModalTab('prayers');
  renderPrayerSoundConfigUI();
  checkNotificationPermissionNotice();
  const d = document.getElementById('dialog-ezan-settings');
  if (d) d.showModal();
}

function switchSoundModalTab(tabId) {
  const btnPrayers = document.getElementById('tab-btn-sound-prayers');
  const btnLibrary = document.getElementById('tab-btn-sound-library');
  const secPrayers = document.getElementById('sound-sec-prayers');
  const secLibrary = document.getElementById('sound-sec-library');

  if (tabId === 'prayers') {
    if (btnPrayers) btnPrayers.classList.add('active');
    if (btnLibrary) btnLibrary.classList.remove('active');
    if (secPrayers) secPrayers.style.display = 'block';
    if (secLibrary) secLibrary.style.display = 'none';
  } else {
    if (btnPrayers) btnPrayers.classList.remove('active');
    if (btnLibrary) btnLibrary.classList.add('active');
    if (secPrayers) secPrayers.style.display = 'none';
    if (secLibrary) secLibrary.style.display = 'block';
  }
}

function selectPrayerSoundConfig(prayerKey) {
  state.activePrayerConfigKey = prayerKey;
  renderPrayerSoundConfigUI();
}

function renderPrayerSoundConfigUI() {
  const pKey = state.activePrayerConfigKey || 'ogle';
  if (!state.prayerAlerts[pKey]) {
    state.prayerAlerts[pKey] = { ...DEFAULT_PRAYER_ALERTS[pKey] };
  }
  const conf = state.prayerAlerts[pKey];

  // Hap butonlar (Sabah, Güneş, Öğle, İkindi, Akşam, Yatsı)
  document.querySelectorAll('.prayer-select-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.prayer === pKey);
  });

  // Vakit başlığı ve saati
  const titleEl = document.getElementById('conf-prayer-title');
  const timeEl = document.getElementById('conf-prayer-time');
  const badgeEl = document.getElementById('conf-prayer-badge');

  const prayerNames = {
    imsak: 'İmsak / Sabah Vakti',
    gunes: 'Güneş Doğuşu',
    ogle: 'Öğle Vakti',
    ikindi: 'İkindi Vakti',
    aksam: 'Akşam Vakti',
    yatsi: 'Yatsı Vakti'
  };

  const pTime = (state.prayerTimes && {
    imsak: state.prayerTimes.Fajr,
    gunes: state.prayerTimes.Sunrise,
    ogle: state.prayerTimes.Dhuhr,
    ikindi: state.prayerTimes.Asr,
    aksam: state.prayerTimes.Maghrib,
    yatsi: state.prayerTimes.Isha
  }[pKey]) || '--:--';

  if (titleEl) titleEl.textContent = prayerNames[pKey] || pKey;
  if (timeEl) timeEl.textContent = `Vakit Saati: ${pTime}`;

  // Mod butonları & badge
  const mode = conf.soundMode || 'ezan';
  document.querySelectorAll('.sound-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  const modeBadges = {
    ezan: { text: 'Tam Ezan', cls: 'mode-ezan' },
    tone: { text: 'Kısa Ses', cls: 'mode-tone' },
    vibrate: { text: 'Titreşim', cls: 'mode-vibrate' },
    off: { text: 'Kapalı', cls: 'mode-off' }
  };
  if (badgeEl && modeBadges[mode]) {
    badgeEl.className = `conf-mode-badge ${modeBadges[mode].cls}`;
    badgeEl.textContent = modeBadges[mode].text;
  }

  // Grupların görünürlüğü
  const ezanGroup = document.getElementById('conf-ezan-group');
  const toneGroup = document.getElementById('conf-tone-group');
  if (ezanGroup) ezanGroup.style.display = (mode === 'ezan') ? 'block' : 'none';
  if (toneGroup) toneGroup.style.display = (mode === 'tone') ? 'block' : 'none';

  // Seçim kutuları
  const ezanSelect = document.getElementById('select-prayer-ezan');
  if (ezanSelect) ezanSelect.value = conf.ezanKey || 'default';

  const toneSelect = document.getElementById('select-prayer-tone');
  if (toneSelect) toneSelect.value = conf.notificationTone || 'tekbir';

  // Özel dosya bilgisi
  const customFileInfo = document.getElementById('prayer-custom-file-info');
  const customFileName = document.getElementById('prayer-custom-filename');
  if (conf.customEzanName && conf.customEzanData) {
    if (customFileInfo) customFileInfo.style.display = 'flex';
    if (customFileName) customFileName.textContent = conf.customEzanName;
  } else {
    if (customFileInfo) customFileInfo.style.display = 'none';
  }
}

function setPrayerSoundMode(mode) {
  const pKey = state.activePrayerConfigKey || 'ogle';
  if (!state.prayerAlerts[pKey]) state.prayerAlerts[pKey] = { ...DEFAULT_PRAYER_ALERTS[pKey] };
  state.prayerAlerts[pKey].soundMode = mode;
  saveToStorage();
  renderPrayerSoundConfigUI();
  updatePrayerTimesUI();
  const label = mode === 'ezan' ? 'Tam Ezan Oku' : mode === 'tone' ? 'Kısa Bildirim Sesi' : mode === 'vibrate' ? 'Titreşim' : 'Kapalı';
  showToast(`✓ ${state.prayerAlerts[pKey].name} için: ${label}`);
}

function changePrayerEzanSound(ezanKey) {
  const pKey = state.activePrayerConfigKey || 'ogle';
  if (!state.prayerAlerts[pKey]) state.prayerAlerts[pKey] = { ...DEFAULT_PRAYER_ALERTS[pKey] };
  state.prayerAlerts[pKey].ezanKey = ezanKey;
  saveToStorage();
  renderPrayerSoundConfigUI();
  const name = REAL_EZAN_LIST[ezanKey] ? REAL_EZAN_LIST[ezanKey].title : ezanKey;
  showToast(`✓ ${state.prayerAlerts[pKey].name} ezanı: ${name}`);
}

function changePrayerNotificationTone(toneKey) {
  const pKey = state.activePrayerConfigKey || 'ogle';
  if (!state.prayerAlerts[pKey]) state.prayerAlerts[pKey] = { ...DEFAULT_PRAYER_ALERTS[pKey] };
  state.prayerAlerts[pKey].notificationTone = toneKey;
  saveToStorage();
  playNotificationTone(toneKey);
  showToast('✓ Bildirim tonu seçildi.');
}

function handlePrayerCustomAudioUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i)) {
    showToast('Lütfen geçerli bir ses dosyası (.mp3, .wav, vb.) seçiniz.');
    return;
  }

  showToast('Özel ses yükleniyor...');
  const reader = new FileReader();
  reader.onload = (e) => {
    const pKey = state.activePrayerConfigKey || 'ogle';
    if (!state.prayerAlerts[pKey]) state.prayerAlerts[pKey] = { ...DEFAULT_PRAYER_ALERTS[pKey] };
    state.prayerAlerts[pKey].customEzanData = e.target.result;
    state.prayerAlerts[pKey].customEzanName = file.name;
    state.prayerAlerts[pKey].ezanKey = 'custom';
    saveToStorage();
    renderPrayerSoundConfigUI();
    showToast(`✓ "${file.name}" bu vakit için kaydedildi!`);
    testActivePrayerSound();
  };
  reader.onerror = () => {
    showToast('Dosya okunamadı.');
  };
  reader.readAsDataURL(file);
}

function testActivePrayerSound() {
  const pKey = state.activePrayerConfigKey || 'ogle';
  const conf = state.prayerAlerts[pKey] || DEFAULT_PRAYER_ALERTS[pKey];

  if (state.activeEzanAudio) {
    stopCurrentEzanAudio();
    return;
  }

  if (conf.soundMode === 'off') {
    showToast('Bu vakit için ses kapalı olarak ayarlanmış.');
    return;
  }

  if (conf.soundMode === 'vibrate') {
    playHaptic([200, 100, 200, 100, 400]);
    showToast('Titreşim testi yapıldı.');
    return;
  }

  if (conf.soundMode === 'tone') {
    playNotificationTone(conf.notificationTone || 'tekbir');
    playHaptic(50);
    showToast('Bildirim sesi testi yapıldı.');
    return;
  }

  // Tam ezan
  let url = '';
  let title = '';

  if (conf.ezanKey === 'custom') {
    if (!conf.customEzanData) {
      showToast('Henüz bu vakit için özel dosya seçilmedi.');
      return;
    }
    url = conf.customEzanData;
    title = conf.customEzanName || 'Özel Ezan';
  } else {
    const item = REAL_EZAN_LIST[conf.ezanKey] || REAL_EZAN_LIST.default;
    url = item.url;
    title = item.title;
  }

  playAudioUrlWithBar(url, `${conf.name}: ${title}`);
}

function copySettingsToAllPrayers() {
  const pKey = state.activePrayerConfigKey || 'ogle';
  const conf = state.prayerAlerts[pKey] || DEFAULT_PRAYER_ALERTS[pKey];

  ['imsak', 'gunes', 'ogle', 'ikindi', 'aksam', 'yatsi'].forEach(k => {
    if (k !== pKey) {
      state.prayerAlerts[k] = {
        ...state.prayerAlerts[k],
        soundMode: conf.soundMode,
        ezanKey: conf.ezanKey,
        notificationTone: conf.notificationTone,
        customEzanData: conf.customEzanData,
        customEzanName: conf.customEzanName
      };
    }
  });

  saveToStorage();
  updatePrayerTimesUI();
  showToast(`✓ ${conf.name} ayarları tüm 6 vakte uygulandı! 📋`);
}

function checkNotificationPermissionNotice() {
  const banner = document.getElementById('notification-perm-box');
  if (!banner) return;
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      banner.style.display = 'flex';
    } else {
      banner.style.display = 'none';
    }
  } else {
    banner.style.display = 'none';
  }
}

function requestSystemNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(perm => {
      if (perm === 'granted') {
        showToast('✓ Bildirim izni verildi! Vakit girdiğinde bildirim alacaksınız.');
        try {
          new Notification('Zikir & Vakit Pro', {
            body: 'Bildirimler başarıyla etkinleştirildi.',
            icon: 'manifest.json'
          });
        } catch(e) {}
      } else {
        showToast('Bildirim izni reddedildi.');
      }
      checkNotificationPermissionNotice();
    });
  }
}

function updateEzanUI() {
  document.querySelectorAll('.ezan-item-card').forEach(c => c.classList.remove('active-selected'));
  const activeKey = state.defaultEzan || 'mekke';
  const card = document.getElementById(`ezan-card-${activeKey}`);
  if (card) card.classList.add('active-selected');
}

// --- 14. NAMAZ VAKİTLERİ & DİYANET API ---
let countdownInterval = null;

async function initPrayerTimes() {
  const dateObj = new Date();
  const gregStr = dateObj.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const gregEl = document.getElementById('gregorian-date-label');
  if (gregEl) gregEl.textContent = gregStr;

  const cityLabel = document.getElementById('current-city-label');
  if (cityLabel) cityLabel.textContent = state.currentCity.display || state.currentCity.name;

  try {
    const lat = state.currentCity.lat;
    const lng = state.currentCity.lng;
    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=13`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.code === 200 && json.data) {
      state.prayerTimes = json.data.timings;
      const hijri = json.data.date.hijri;
      const hijriEl = document.getElementById('hijri-date-label');
      if (hijriEl) hijriEl.textContent = `${hijri.day} ${hijri.month.tr || hijri.month.en} ${hijri.year}`;
      updatePrayerTimesUI();
    }
  } catch (err) {
    fallbackPrayerTimes();
  }

  if (!countdownInterval) {
    countdownInterval = setInterval(updateCountdown, 1000);
  }
}

function fallbackPrayerTimes() {
  state.prayerTimes = {
    Fajr: "05:14",
    Sunrise: "06:42",
    Dhuhr: "13:08",
    Asr: "16:34",
    Maghrib: "19:22",
    Isha: "20:44"
  };
  updatePrayerTimesUI();
}

function updatePrayerTimesUI() {
  if (!state.prayerTimes) return;
  const t = state.prayerTimes;
  const setT = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setT('time-imsak', t.Fajr);
  setT('time-gunes', t.Sunrise);
  setT('time-ogle', t.Dhuhr);
  setT('time-ikindi', t.Asr);
  setT('time-aksam', t.Maghrib);
  setT('time-yatsi', t.Isha);

  // Vakit Çubuğundaki Ses Rozetlerini Güncelle
  const prayerKeys = ['imsak', 'gunes', 'ogle', 'ikindi', 'aksam', 'yatsi'];
  prayerKeys.forEach(k => {
    const iconEl = document.getElementById(`sound-icon-${k}`);
    if (iconEl) {
      const conf = (state.prayerAlerts && state.prayerAlerts[k]) || DEFAULT_PRAYER_ALERTS[k];
      const mode = conf.soundMode || 'ezan';
      if (mode === 'ezan') {
        iconEl.className = 'bi bi-volume-up-fill prayer-sound-icon';
        iconEl.style.color = 'var(--gold-primary)';
      } else if (mode === 'tone') {
        iconEl.className = 'bi bi-bell-fill prayer-sound-icon';
        iconEl.style.color = '#38bdf8';
      } else if (mode === 'vibrate') {
        iconEl.className = 'bi bi-phone-vibrate-fill prayer-sound-icon';
        iconEl.style.color = '#fbbf24';
      } else {
        iconEl.className = 'bi bi-bell-slash prayer-sound-icon';
        iconEl.style.color = '#64748b';
      }
    }
  });

  updateCountdown();
}

function updateCountdown() {
  if (!state.prayerTimes) return;
  const now = new Date();
  const times = [
    { name: 'İmsak', time: state.prayerTimes.Fajr },
    { name: 'Güneş', time: state.prayerTimes.Sunrise },
    { name: 'Öğle', time: state.prayerTimes.Dhuhr },
    { name: 'İkindi', time: state.prayerTimes.Asr },
    { name: 'Akşam', time: state.prayerTimes.Maghrib },
    { name: 'Yatsı', time: state.prayerTimes.Isha }
  ];

  let nextPrayer = null;
  let minDiff = Infinity;

  times.forEach(p => {
    const [h, m] = p.time.split(':').map(Number);
    const pDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
    let diff = pDate - now;
    if (diff < 0) diff += 24 * 60 * 60 * 1000;
    if (diff < minDiff) {
      minDiff = diff;
      nextPrayer = p;
    }
  });

  if (nextPrayer) {
    const nextNameEl = document.getElementById('next-prayer-name');
    const cdEl = document.getElementById('next-prayer-countdown');
    if (nextNameEl) nextNameEl.textContent = `${nextPrayer.name} Vakti`;

    const totalSec = Math.floor(minDiff / 1000);
    const hours = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    if (cdEl) cdEl.textContent = `${hours}:${mins}:${secs}`;
  }

  // Vakit Girdi mi Kontrolü (Dakika başında ve saniye 0 olduğunda)
  const currentHHMM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

  const prayerKeyMap = {
    'İmsak': 'imsak',
    'Güneş': 'gunes',
    'Öğle': 'ogle',
    'İkindi': 'ikindi',
    'Akşam': 'aksam',
    'Yatsı': 'yatsi'
  };

  times.forEach(p => {
    if (p.time === currentHHMM && now.getSeconds() === 0) {
      const pKey = prayerKeyMap[p.name];
      const triggerId = `${todayKey}_${pKey}`;
      if (state.lastTriggeredPrayer !== triggerId) {
        state.lastTriggeredPrayer = triggerId;
        triggerPrayerAlert(pKey, p.name, p.time);
      }
    }
  });
}

function triggerPrayerAlert(pKey, pName, pTime) {
  const conf = (state.prayerAlerts && state.prayerAlerts[pKey]) || DEFAULT_PRAYER_ALERTS[pKey];

  // Sistem bildirimi
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(`${pName} Vakti Girdi (${pTime})`, {
        body: 'Haydin namaza, haydin kurtuluşa! Vaktin bereketini kaçırmayınız.',
        icon: 'manifest.json'
      });
    } catch(e) {}
  }

  // Titreşim
  playHaptic([200, 100, 200, 100, 500]);

  if (conf.soundMode === 'off') {
    showToast(`🕌 ${pName} Vakti Girdi (${pTime})`);
    return;
  }

  if (conf.soundMode === 'vibrate') {
    showToast(`📳 ${pName} Vakti Girdi (${pTime})`);
    return;
  }

  if (conf.soundMode === 'tone') {
    playNotificationTone(conf.notificationTone || 'tekbir');
    showToast(`🔔 ${pName} Vakti Girdi (${pTime})`);
    return;
  }

  // Tam Ezan Oku
  let url = '';
  let title = '';

  if (conf.ezanKey === 'custom' && conf.customEzanData) {
    url = conf.customEzanData;
    title = conf.customEzanName || 'Özel Ezan';
  } else {
    const item = REAL_EZAN_LIST[conf.ezanKey] || REAL_EZAN_LIST.default;
    url = item.url;
    title = item.title;
  }

  try {
    if (state.activeAlertAudio) {
      state.activeAlertAudio.pause();
      state.activeAlertAudio = null;
    }
    state.activeAlertAudio = new Audio(url);
    state.activeAlertAudio.play().catch(e => {
      console.warn('Alert audio play error:', e);
      if (url !== 'ezan_default.mp3') {
        state.activeAlertAudio = new Audio('ezan_default.mp3');
        state.activeAlertAudio.play().catch(()=>{});
      }
    });
  } catch (e) {}

  // Canlı Bildirim Modalı Aç
  const alertModal = document.getElementById('dialog-prayer-alert');
  const alertTitle = document.getElementById('alert-prayer-title');
  const alertTime = document.getElementById('alert-prayer-time');
  const alertSound = document.getElementById('alert-sound-playing');

  if (alertTitle) alertTitle.textContent = `${pName} Vakti Girdi!`;
  if (alertTime) alertTime.textContent = pTime;
  if (alertSound) alertSound.textContent = `▶ ${title} Çalınıyor...`;
  if (alertModal) alertModal.showModal();
}

function stopPrayerAlert() {
  if (state.activeAlertAudio) {
    try { state.activeAlertAudio.pause(); } catch(e) {}
    state.activeAlertAudio = null;
  }
  stopCurrentEzanAudio();
  const alertModal = document.getElementById('dialog-prayer-alert');
  if (alertModal) alertModal.close();
  showToast('Ezan durduruldu.');
}

function closePrayerAlert() {
  const alertModal = document.getElementById('dialog-prayer-alert');
  if (alertModal) alertModal.close();
}

function toggleEzanDuaText() {
  const el = document.getElementById('ezan-dua-text-box');
  if (el) el.style.display = (el.style.display === 'none') ? 'block' : 'none';
}

// --- 15. VİRDLER, ESMÂÜL HÜSNÂ, İSTATİSTİKLER ---
function renderVirdler(category) {
  const container = document.getElementById('vird-cards-list');
  if (!container) return;
  const items = VIRDLER_DATA[category] || [];

  container.innerHTML = items.map(v => `
    <div class="vird-card">
      <div class="vird-card-header">
        <h4 class="vird-card-title">${v.day ? v.day + ' - ' : ''}${v.title}</h4>
        <span class="vird-target-badge">${v.target} Defa</span>
      </div>
      <div class="vird-arabic">${v.arabic}</div>
      <div class="vird-turkish">${v.turkish}</div>
      <button class="vird-action-btn" onclick="startVirdZikir('${v.title}', '${v.arabic}', ${v.target})">
        <i class="bi bi-play-circle-fill"></i> Zikre Başla
      </button>
    </div>
  `).join('');
}

function startVirdZikir(title, arabic, target) {
  state.activeZikir = { id: 'custom', title: title, arabic: arabic, meaning: title, target: target };
  state.target = target;
  state.counter = 0;
  state.tour = 0;
  saveToStorage();
  updateZikirDisplay();
  switchTab('zikirmatik');
  showToast(`${title} seçildi.`);
}

function renderEsmaulHusna(query = '') {
  const grid = document.getElementById('esma-grid');
  if (!grid) return;

  const q = query.toLowerCase().trim();
  const filtered = ESMAUL_HUSNA.filter(e => 
    e.name.toLowerCase().includes(q) || 
    e.meaning.toLowerCase().includes(q) || 
    e.virtue.toLowerCase().includes(q)
  );

  grid.innerHTML = filtered.map(e => `
    <div class="esma-card" onclick="startVirdZikir('${e.name} C.C.', '${e.arabic}', ${e.ebced})">
      <div class="esma-top">
        <span class="esma-number">#${e.no}</span>
        <span class="esma-ebced">Ebced: ${e.ebced}</span>
      </div>
      <div class="esma-arabic">${e.arabic}</div>
      <div class="esma-name">${e.name}</div>
      <div class="esma-meaning">${e.meaning}</div>
      <div class="esma-virtue"><i class="bi bi-stars"></i> ${e.virtue}</div>
    </div>
  `).join('');
}

function saveHistoryRecord() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('tr-TR');
  const existing = state.history.find(h => h.date === dateStr && h.title === state.activeZikir.title);
  if (existing) {
    existing.count++;
  } else {
    state.history.unshift({
      id: Date.now(),
      date: dateStr,
      time: now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      title: state.activeZikir.title,
      count: 1
    });
  }
}

function renderHistory() {
  const list = document.getElementById('history-list');
  if (!list) return;
  if (!state.history || state.history.length === 0) {
    list.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted);">Henüz zikir kaydı bulunmuyor.</div>';
    return;
  }

  list.innerHTML = state.history.slice(0, 15).map(h => `
    <div class="history-item">
      <div>
        <div class="history-item-title">${h.title}</div>
        <div class="history-item-date">${h.date} ${h.time || ''}</div>
      </div>
      <div class="history-item-count">+${h.count}</div>
    </div>
  `).join('');
}

function updateStats() {
  const totalCountEl = document.getElementById('stat-total-count');
  const totalToursEl = document.getElementById('stat-total-tours');
  const totalRecordsEl = document.getElementById('stat-records-count');

  const total = state.history.reduce((a, b) => a + (b.count || 0), 0);
  if (totalCountEl) totalCountEl.textContent = total.toLocaleString();
  if (totalToursEl) totalToursEl.textContent = state.tour;
  if (totalRecordsEl) totalRecordsEl.textContent = state.history.length;
}

// --- 16. İBADET RAPORU (PRINT / PDF) ---
function printIbadetReport() {
  window.print();
}

// --- 17. SES, TİTREŞİM VE TEMA YARDIMCILARI ---
function playHaptic(duration = 25) {
  if (state.vibrateEnabled && navigator.vibrate) {
    navigator.vibrate(duration);
  }
}

function playClickSound() {
  if (!state.soundEnabled) return;
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch (e) {}
}

function playCompletionSound() {
  if (!state.soundEnabled) return;
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      }, i * 90);
    });
  } catch (e) {}
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  const btn = document.getElementById('btn-toggle-sound');
  if (btn) btn.innerHTML = state.soundEnabled ? '<i class="bi bi-volume-up-fill"></i>' : '<i class="bi bi-volume-mute-fill"></i>';
  showToast(state.soundEnabled ? 'Ses Açık' : 'Ses Sessize Alındı');
}

function toggleVibrate() {
  state.vibrateEnabled = !state.vibrateEnabled;
  const btn = document.getElementById('btn-toggle-vibrate');
  if (btn) btn.innerHTML = state.vibrateEnabled ? '<i class="bi bi-phone-vibrate-fill"></i>' : '<i class="bi bi-phone-fill"></i>';
  showToast(state.vibrateEnabled ? 'Titreşim Açık' : 'Titreşim Kapalı');
}

function setTheme(themeName) {
  state.theme = themeName;
  applyTheme(themeName);
  saveToStorage();
  showToast('Tema uygulandı.');
}

function applyTheme(themeName) {
  document.body.className = themeName;
}

// --- 18. SEKME VE MODAL YÖNETİMİ ---
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  const targetTab = document.getElementById(`tab-${tabId}`);
  const targetNav = document.getElementById(`nav-${tabId}`);
  if (targetTab) targetTab.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchIbadetSubTab(subId) {
  document.querySelectorAll('.ibadet-sub-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.ibadet-sub-btn').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(`ibadet-sub-${subId}`);
  const btn = document.getElementById(`btn-ibadet-sub-${subId}`);
  if (target) target.style.display = 'block';
  if (btn) btn.classList.add('active');

  if (subId === 'kible') {
    calculateQiblaBearing();
  }
}

function switchKuranSubTab(subId) {
  document.querySelectorAll('.kuran-sub-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.kuran-sub-btn').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(`kuran-sub-${subId}`);
  const btn = document.getElementById(`btn-kuran-sub-${subId}`);
  if (target) target.style.display = 'block';
  if (btn) btn.classList.add('active');
}

// 81 İl ve 900+ İlçe Seçim Modalı
function openCityModal() {
  const dialog = document.getElementById('dialog-city');
  const input = document.getElementById('city-search-input');
  if (input) input.value = '';
  filterCitiesList('');
  if (dialog) dialog.showModal();
}

function normalizeTr(str) {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/i̇/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}

function filterCitiesList(query = '') {
  const list = document.getElementById('city-select-list');
  if (!list) return;

  const locs = (typeof window !== 'undefined' && window.ALL_LOCATIONS && window.ALL_LOCATIONS.length > 0)
    ? window.ALL_LOCATIONS
    : (typeof CITIES !== 'undefined' ? CITIES : []);
  
  const rawQ = (query || '').trim().toLowerCase();
  const normQ = normalizeTr(rawQ);

  let filtered = [];
  if (!rawQ) {
    // Arama yoksa ilk 81 il merkezi ve kutsal şehirleri göster
    filtered = locs.filter(c => c.district === 'Merkez' || c.isHoly || c.country !== 'Türkiye').slice(0, 90);
    if (filtered.length === 0) filtered = locs.slice(0, 85);
  } else {
    filtered = locs.filter(c => {
      const nameNorm = normalizeTr(c.name || '');
      const provNorm = normalizeTr(c.province || '');
      const distNorm = normalizeTr(c.district || '');
      const dispNorm = normalizeTr(c.display || '');
      return nameNorm.includes(normQ) || provNorm.includes(normQ) || distNorm.includes(normQ) || dispNorm.includes(normQ);
    }).slice(0, 80);
  }

  if (filtered.length === 0) {
    list.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted);"><i class="bi bi-search"></i> Eşleşen il veya ilçe bulunamadı.</div>';
    return;
  }

  list.innerHTML = filtered.map(c => `
    <div class="preset-zikir-item" onclick="selectCityByCoord(${c.lat}, ${c.lng}, '${(c.display || c.name).replace(/'/g, "\\'")}', '${(c.country || 'Türkiye').replace(/'/g, "\\'")}')">
      <div>
        <strong style="color:var(--text-primary);"><i class="bi bi-geo-alt-fill" style="color:var(--gold-primary);"></i> ${c.display || c.name}</strong>
        <div style="font-size:0.72rem; color:var(--text-muted);">${c.province ? c.province + ' / ' + c.district : (c.country || 'Türkiye')}</div>
      </div>
      <span style="font-size:0.75rem; color:var(--gold-light); font-weight:700;"><i class="bi bi-check2"></i> Seç</span>
    </div>
  `).join('');
}

function selectCityByCoord(lat, lng, displayName, country) {
  state.currentCity = {
    name: displayName,
    display: displayName,
    lat: lat,
    lng: lng,
    country: country || 'Türkiye'
  };
  saveToStorage();
  initPrayerTimes();
  calculateQiblaBearing();
  closeAllModals();
  showToast(`${displayName} seçildi.`);
}

function selectCity(cityName) {
  const locs = (typeof CITIES !== 'undefined') ? CITIES : [];
  const found = locs.find(c => c.name === cityName || c.display === cityName);
  if (found) {
    selectCityByCoord(found.lat, found.lng, found.display || found.name, found.country);
  }
}

function openZikirModal() {
  const dialog = document.getElementById('dialog-preset-zikir');
  const list = document.getElementById('preset-zikir-modal-list');
  if (list) {
    list.innerHTML = PRESET_ZIKIRS.map(z => `
      <div class="preset-zikir-item" onclick="selectZikir('${z.id}')">
        <div>
          <div style="font-weight:700; color:var(--text-primary);">${z.title}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${z.meaning}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:var(--font-arabic); color:var(--gold-light);">${z.arabic}</div>
          <div style="font-size:0.7rem; color:var(--text-gold);">Hedef: ${z.target}</div>
        </div>
      </div>
    `).join('');
  }
  if (dialog) dialog.showModal();
}

function closeAllModals() {
  document.querySelectorAll('dialog').forEach(d => {
    try { d.close(); } catch(e) {}
  });
}

function showToast(msg) {
  const toast = document.getElementById('app-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.display = 'block';
  toast.style.opacity = '1';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 300);
  }, 2600);
}

// --- 19. YEREL DEPOLAMA (STORAGE & BACKUP) ---
function saveToStorage() {
  try {
    const data = {
      counter: state.counter,
      target: state.target,
      tour: state.tour,
      activeZikir: state.activeZikir,
      currentCity: state.currentCity,
      theme: state.theme,
      kazaPrayers: state.kazaPrayers,
      communityCircles: state.communityCircles,
      history: state.history,
      defaultEzan: state.defaultEzan,
      customEzanName: state.customEzanName,
      customEzanData: state.customEzanData,
      prayerAlerts: state.prayerAlerts,
      qiblaVoiceEnabled: state.qiblaVoiceEnabled
    };
    localStorage.setItem('vakit_zikir_pro_state', JSON.stringify(data));
  } catch (e) {}
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem('vakit_zikir_pro_state');
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
      if (parsed.prayerAlerts) {
        state.prayerAlerts = { ...JSON.parse(JSON.stringify(DEFAULT_PRAYER_ALERTS)), ...parsed.prayerAlerts };
      }
    }
  } catch (e) {}
}

function exportBackup() {
  const data = localStorage.getItem('vakit_zikir_pro_state') || '{}';
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ZikirPro_Yedek_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  showToast('Yedek dosyası indirildi.');
}

function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      state = { ...state, ...data };
      saveToStorage();
      location.reload();
    } catch (err) {
      showToast('Geçersiz yedek dosyası.');
    }
  };
  reader.readAsText(file);
}
