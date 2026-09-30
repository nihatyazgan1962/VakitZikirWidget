# 📿 Vakit & Zikir & Widget — Zikirmatik, Virdler & Namaz Vakti Widget

Namaz vakitlerini, günlük virdleri ve zikirmatik sayacını tek uygulamada birleştiren; ana ekran widget desteği sunan bir Android uygulamasıdır.

## ✨ Özellikler

- 📿 Zikirmatik (titreşimli, sesli sayaç)
- 🕌 Namaz vakitleri (konum bazlı)
- 📖 Günlük virdler listesi
- 📱 Android Ana Ekran Widget desteği
- 💾 Zikir geçmişi kaydetme (Capacitor Preferences)
- 📳 Dokunsal geri bildirim (Haptics API)
- 📴 Çevrimdışı çalışma

## 🛠️ Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Mobil API | Capacitor 6.x |
| Titreşim | @capacitor/haptics |
| Depolama | @capacitor/preferences |
| Uygulama Yönetimi | @capacitor/app |
| Platform | Android APK |

## 📋 Gereksinimler

- Node.js 18+
- Android Studio
- Java 17+
- Android SDK 21+

## 🚀 Kurulum

```bash
npm install
npx cap sync android
npx cap open android
```

### APK Derleme
```powershell
.\apk_yap.ps1
# veya
.\apk_yap.bat
```

## 📁 Proje Yapısı

```
├── www/              # Web uygulaması (HTML/JS/CSS)
├── android/          # Android native proje + Widget
└── package.json
```

## 👨‍💻 Geliştirici

**Nihat Yazgan** — Yazgan Bilişim  
GitHub: [@nihatyazgan1962](https://github.com/nihatyazgan1962)
