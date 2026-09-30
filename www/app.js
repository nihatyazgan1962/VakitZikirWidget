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
  isQiblaAligned: false
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
  initVoiceRecognition();
  initBeadSwipe();
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

// --- 8. KIBLE PUSULASI (QIBLA COMPASS) ---
function initQiblaCompass() {
  calculateQiblaBearing();

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    window.addEventListener('deviceorientation', handleOrientation, true);
  }
}

function calculateQiblaBearing() {
  const kaabaLat = 21.4225 * (Math.PI / 180);
  const kaabaLng = 39.8262 * (Math.PI / 180);
  const userLat = state.currentCity.lat * (Math.PI / 180);
  const userLng = state.currentCity.lng * (Math.PI / 180);

  const y = Math.sin(kaabaLng - userLng);
  const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(kaabaLng - userLng);
  let qibla = Math.atan2(y, x) * (180 / Math.PI);
  qibla = (qibla + 360) % 360;

  state.qiblaBearing = Math.round(qibla);
  updateCompassUI(0);
}

function handleOrientation(e) {
  let heading = 0;
  if (e.webkitCompassHeading) {
    heading = e.webkitCompassHeading;
  } else if (e.alpha) {
    heading = 360 - e.alpha;
  }
  state.compassHeading = Math.round(heading);
  updateCompassUI(state.compassHeading);
}

function manualRotateCompass(deg) {
  state.compassHeading = (state.compassHeading + deg + 360) % 360;
  updateCompassUI(state.compassHeading);
}

function updateCompassUI(heading) {
  const dial = document.getElementById('compass-dial');
  const needle = document.getElementById('compass-needle-kaaba');
  const statusEl = document.getElementById('qibla-status-banner');
  const degEl = document.getElementById('qibla-heading-deg');
  const targetDegEl = document.getElementById('qibla-target-deg');

  if (dial) dial.style.transform = `rotate(${-heading}deg)`;
  if (needle) needle.style.transform = `rotate(${state.qiblaBearing - heading}deg)`;

  if (degEl) degEl.textContent = `${heading}°`;
  if (targetDegEl) targetDegEl.textContent = `${state.qiblaBearing}°`;

  const diff = Math.abs(heading - state.qiblaBearing);
  const aligned = diff <= 6 || diff >= 354;

  if (statusEl) {
    if (aligned) {
      statusEl.className = 'qibla-aligned-status aligned';
      statusEl.innerHTML = '<i class="bi bi-check-circle-fill"></i> KIBLEYE HİZALANDINIZ (KÂBE)';
      if (!state.isQiblaAligned) {
        playHaptic([100, 50, 100]);
        state.isQiblaAligned = true;
      }
    } else {
      statusEl.className = 'qibla-aligned-status not-aligned';
      statusEl.innerHTML = `<i class="bi bi-compass"></i> Kâbe Açısı: ${state.qiblaBearing}°`;
      state.isQiblaAligned = false;
    }
  }
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

// --- 13. EZAN MAKAMLARI VE SESLER ---
function playEzanMakam(makam) {
  const frequencies = {
    saba: [330, 370, 415, 493],
    rast: [261, 293, 329, 392],
    hicaz: [293, 311, 370, 440],
    ussak: [293, 329, 349, 440],
    segah: [311, 349, 392, 466]
  };

  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const freqs = frequencies[makam] || frequencies.hicaz;
    let delay = 0;

    freqs.forEach((f, idx) => {
      setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      }, delay);
      delay += 400;
    });

    showToast(`${makam.toUpperCase()} makamı ezan melodisi çalınıyor... 🕌`);
  } catch (e) {
    showToast('Ses motoru başlatılamadı.');
  }
}

// --- 14. NAMAZ VAKİTLERİ & DİYANET API ---
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

  setInterval(updateCountdown, 1000);
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
      history: state.history
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
