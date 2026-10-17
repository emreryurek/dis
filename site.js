/* ========================================
   PERLA AĞIZ VE DİŞ SAĞLIĞI - site.js (ayarlar)
   MÜŞTERİYE TESLİMDE: bilgileri ve hekimleri doldur, DEMO'yu false yap.
   SAĞLIK KURALI: Fiyat, kampanya, hasta yorumu, "en iyi" gibi ifadeler EKLEME
   (Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik).
   Asistan tıbbi değerlendirme yapmaz, hekime ve randevuya yönlendirir.
======================================== */

window.ERY = {
    DEMO: true,
    isletme: 'Perla Ağız ve Diş Sağlığı',
    kisa: 'P',
    whatsapp: '905555555555',
    telefon: '0555 555 55 55',
    adres: 'Örnek Mah. Örnek Sk. No:1, İstanbul',
    harita: 'https://www.google.com/maps/search/?api=1&query=Istanbul%2C%20Turkey',
    demoMesaj: 'Merhaba, diş kliniği örneğindeki online randevu sistemini kliniğime istiyorum.',

    // 0 = Pazar ... 6 = Cumartesi
    saatler: { 0: null, 1: [9, 19], 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [9, 15] },

    booking: {
        coklu: false,
        adim: 30,
        hizmetBaslik: 'Randevu nedeni',
        hizmetEmoji: '🗓',
        mesajBaslik: 'Merhaba, online randevu talebim:',
        // Sağlık sitesi: fiyat yazılmaz. Sadece süre gösterilir.
        hizmetler: [
            { id: 'muayene', ad: 'Muayene / Kontrol',        sure: 30 },
            { id: 'temizlik', ad: 'Diş Taşı Temizliği',      sure: 30 },
            { id: 'dolgu',   ad: 'Dolgu',                    sure: 45 },
            { id: 'kanal',   ad: 'Kanal Tedavisi',           sure: 60 },
            { id: 'implant', ad: 'İmplant Görüşmesi',        sure: 30 },
            { id: 'orto',    ad: 'Ortodonti Görüşmesi',      sure: 30 },
            { id: 'beyaz',   ad: 'Diş Beyazlatma Görüşmesi', sure: 30 },
            { id: 'cocuk',   ad: 'Çocuk Muayenesi',          sure: 30 }
        ],
        ustaBaslik: 'Hekim',
        ustaEmoji: '🦷',
        ustalar: [
            { id: 'elif',   ad: 'Dt. Elif Aksoy',    unvan: 'Diş hekimi' },
            { id: 'can',    ad: 'Dt. Can Demir',     unvan: 'Ortodonti uzmanı' },
            { id: 'zeynep', ad: 'Dt. Zeynep Arslan', unvan: 'Pedodonti uzmanı' }
        ]
    },

    bot: {
        ad: 'Perla Asistan',
        hosgeldin: 'Merhaba! Perla asistanıyım. Randevu, çalışma saatleri, hekimlerimiz ve tedaviler hakkında genel bilgi verebilirim. Sağlık durumunuzla ilgili değerlendirmeyi hekimlerimiz muayenede yapar.',
        hizli: ['Randevu almak istiyorum', 'Çalışma saatleri', 'Hekimleriniz', 'Adres', 'Fiyat bilgisi'],
        yedek: 'Bu soruyu ekibimize iletmem daha doğru olur. Sağlıkla ilgili sorularınızı hekimlerimiz muayenede yanıtlar. Bize ulaşmak için: 0555 555 55 55',
        sss: [
            // 1) Şikâyet ve tıbbi sorular: değerlendirme yapma, randevuya yönlendir (ilk sırada kalsın)
            { k: ['ağrı', 'agri', 'ağrıyor', 'agriyor', 'sızı', 'sizi', 'zonkl', 'şiş', 'sislik', 'kanama', 'kanıyor', 'kaniyor', 'hassas', 'acıyor', 'aciyor', 'apse', 'iltihap', 'kırıldı', 'kirildi', 'kırık', 'düştü', 'dustu', 'ne yapmalıyım', 'ne yapayım', 'ne yapmaliyim', 'ilaç', 'ilac', 'antibiyotik', 'ağrı kesici', 'normal mi', 'tehlikeli mi', 'gerekir mi', 'lazım mı', 'lazim mi'],
              c: function () { return 'Bu konuda size doğru bilgiyi ancak hekimimiz muayeneyle verebilir, ben tıbbi değerlendirme yapamıyorum. Size en yakın boş saate randevu oluşturalım.\nŞiddetli ağrı, yüzde şişlik ya da diş travması varsa lütfen hemen arayın: ' + ERY.telefon + '. Mesai dışında en yakın acil servise başvurun.'; }, go: '#randevu', btn: 'Randevu al' },
            { k: ['süre', 'sure', 'kaç dakika', 'kac dakika', 'ne kadar sürer', 'ne kadar surer', 'uzun sürer', 'kaç seans', 'kac seans'],
              c: 'Muayene randevuları yaklaşık 30 dakika sürer. Tedavinin süresi ve seans sayısı, muayeneden sonra hekiminiz tarafından planlanır.' },
            { k: ['fiyat', 'ücret', 'ucret', 'kaç para', 'kac para', 'ne kadar', 'kaç tl', 'kac tl', 'pahalı', 'pahali', 'taksit', 'indirim', 'kampanya'],
              c: 'Tedavi ücretleri, muayene ve gerekli görüntülemelerden sonra size özel tedavi planıyla birlikte hekimimiz tarafından bildirilir. İlk adım için muayene randevusu alabilirsiniz.', go: '#randevu', btn: 'Muayene randevusu al' },
            { k: ['boş', 'bos', 'müsait', 'musait', 'yer var', 'bugün', 'bugun', 'randevu', 'yarın', 'yarin'],
              c: 'Online randevuda hekiminizi, günü ve boş saati seçebilirsiniz. Talebiniz WhatsApp\'tan bize ulaşır, onaylayıp size dönüş yaparız.', go: '#randevu', btn: 'Boş saatleri gör' },
            { k: ['saat', 'açık', 'acik', 'kapalı', 'kapali', 'kaçta', 'kacta', 'pazar', 'cumartesi', 'mesai'],
              c: function () { return 'Pazartesi - Cuma 09:00 - 19:00, Cumartesi 09:00 - 15:00 arası açığız, pazar kapalı.\n' + ERY.acikDurum() + '.'; } },
            { k: ['adres', 'nerede', 'konum', 'yol', 'harita', 'otopark', 'metro', 'ulaşım', 'ulasim', 'engelli'],
              c: function () { return 'Adresimiz: ' + ERY.adres + '.\nYol tarifi: ' + ERY.harita + '\nKliniğimiz engelli erişimine uygundur.'; } },
            { k: ['hekim', 'doktor', 'dr.', 'dt.', 'uzman', 'ortodontist', 'kim bak', 'kadın hekim', 'kadin hekim'],
              c: 'Hekimlerimiz: Dt. Elif Aksoy (diş hekimi), Dt. Can Demir (ortodonti uzmanı) ve Dt. Zeynep Arslan (pedodonti uzmanı). Randevu alırken hekiminizi seçebilir ya da ilk boş saati alabilirsiniz.', go: '#hekimler', btn: 'Hekimleri gör' },
            { k: ['implant'],
              c: 'İmplant, kaybedilen dişin yerine çene kemiğine yerleştirilen yapay kökle yapılan bir tedavi yöntemidir. Size uygun olup olmadığını hekimimiz muayene ve görüntüleme sonrası değerlendirir.', go: '#randevu', btn: 'Görüşme randevusu al' },
            { k: ['ortodonti', 'tel tak', 'diş teli', 'dis teli', 'şeffaf plak', 'seffaf plak', 'çapraşık', 'caprasik'],
              c: 'Ortodonti, dişlerin ve çenenin konumunu düzenleyen tedavi alanıdır; tel ya da şeffaf plak gibi yöntemler kullanılabilir. Hangi yöntemin uygun olduğunu ortodonti uzmanımız muayenede belirler.', go: '#randevu', btn: 'Ortodonti görüşmesi' },
            { k: ['beyazlatma', 'beyaz', 'bleaching', 'sararma'],
              c: 'Diş beyazlatma, diş renginin açılması için hekim kontrolünde yapılan bir uygulamadır. Uygun olup olmadığı muayenede değerlendirilir.', go: '#randevu', btn: 'Görüşme randevusu al' },
            { k: ['çocuk', 'cocuk', 'oğlum', 'oglum', 'kızım', 'kizim', 'bebek', 'süt diş', 'sut dis', 'pedodonti', 'kaç yaş', 'kac yas'],
              c: 'Çocuk diş hekimliğinde pedodonti uzmanımız Dt. Zeynep Arslan hizmet veriyor. İlk diş kontrolü için zamanlamayı hekimimizle görüşebilirsiniz.', go: '#randevu', btn: 'Çocuk muayenesi al' },
            { k: ['sigorta', 'sgk', 'anlaşma', 'anlasma', 'tamamlayıcı', 'tamamlayici', 'kurum'],
              c: function () { return 'Anlaşmalı kurumlar ve sigorta bilgisi için lütfen bizi arayın: ' + ERY.telefon; } },
            { k: ['iptal', 'ertele', 'değiştir', 'degistir', 'gelemeyeceğim', 'gelemeyecegim'],
              c: function () { return 'Randevunuzu değiştirmek ya da iptal etmek için en az bir gün önceden WhatsApp\'tan yazmanız yeterli: ' + ERY.telefon; } },
            { k: ['steril', 'hijyen', 'temiz', 'tek kullanımlık'],
              c: 'Kullanılan aletler her hastadan sonra sterilizasyon ünitemizde sterilize edilir, tek kullanımlık malzemeler her seferinde yenilenir.' },
            { k: ['merhaba', 'selam', 'slm', 'iyi günler', 'sa '],
              c: 'Merhaba! Size nasıl yardımcı olabilirim? Randevu, çalışma saatleri veya hekimlerimiz hakkında sorabilirsiniz.' },
            { k: ['teşekkür', 'tesekkur', 'sağol', 'sagol', 'tamam'],
              c: 'Rica ederim, sağlıklı günler dileriz.' }
        ]
    }
};
