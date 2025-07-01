
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translation {
  [key: string]: string;
}

interface Translations {
  [language: string]: Translation;
}

const translations: Translations = {
  English: {
    'bharatsetu': 'BharatSetu',
    'empowering_india': 'Empowering India',
    'all_in_one_platform': 'The All-in-One Empowerment Platform for India',
    'one_app_multiple_solutions': 'One App. Multiple Solutions. Infinite Impact.',
    'core_modules': 'Core Modules',
    'coming_soon': 'Coming Soon',
    'swasthyamitra': 'SwasthyaMitra',
    'ai_health_assistant': 'AI Health Assistant',
    'kanoon_sathi': 'KanoonSathi',
    'legal_aid_platform': 'Legal Aid Platform',
    'yuva_rojgar': 'YuvaRojgar',
    'career_empowerment': 'Career Empowerment',
    'samasya_report': 'SamasyaReport',
    'civic_issue_reporter': 'Civic Issue Reporter',
    'launch_module': 'Launch Module',
    'learn_more': 'Learn More',
    'health': 'Health',
    'legal_aid': 'Legal Aid',
    'employment': 'Employment',
    'civic_issues': 'Civic Issues',
    'login': 'Login',
    'voice': 'Voice',
    'stop': 'Stop',
    'live': 'Live',
    'ai_assistant': 'AI Assistant',
    'get_ai_help': 'Get AI Help',
    'ask_anything': 'Ask me anything about BharatSetu services'
  },
  'हिंदी': {
    'bharatsetu': 'भारतसेतु',
    'empowering_india': 'भारत को सशक्त बनाना',
    'all_in_one_platform': 'भारत के लिए एक सम्पूर्ण सशक्तिकरण मंच',
    'one_app_multiple_solutions': 'एक ऐप। कई समाधान। अनंत प्रभाव।',
    'core_modules': 'मुख्य मॉड्यूल',
    'coming_soon': 'जल्द आ रहा है',
    'swasthyamitra': 'स्वास्थ्यमित्र',
    'ai_health_assistant': 'एआई स्वास्थ्य सहायक',
    'kanoon_sathi': 'कानूनसाथी',
    'legal_aid_platform': 'कानूनी सहायता मंच',
    'yuva_rojgar': 'युवा रोजगार',
    'career_empowerment': 'करियर सशक्तिकरण',
    'samasya_report': 'समस्या रिपोर्ट',
    'civic_issue_reporter': 'नागरिक समस्या रिपोर्टर',
    'launch_module': 'मॉड्यूल लॉन्च करें',
    'learn_more': 'और जानें',
    'health': 'स्वास्थ्य',
    'legal_aid': 'कानूनी सहायता',
    'employment': 'रोजगार',
    'civic_issues': 'नागरिक समस्याएं',
    'login': 'लॉगिन',
    'voice': 'आवाज़',
    'stop': 'रोकें',
    'live': 'लाइव',
    'ai_assistant': 'एआई सहायक',
    'get_ai_help': 'एआई सहायता पाएं',
    'ask_anything': 'भारतसेतु सेवाओं के बारे में कुछ भी पूछें'
  },
  'বাংলা': {
    'bharatsetu': 'ভারতসেতু',
    'empowering_india': 'ভারতকে ক্ষমতায়ন',
    'all_in_one_platform': 'ভারতের জন্য সর্বসমাধানের ক্ষমতায়ন প্ল্যাটফর্ম',
    'one_app_multiple_solutions': 'একটি অ্যাপ। একাধিক সমাধান। অসীম প্রভাব।',
    'core_modules': 'মূল মডিউল',
    'coming_soon': 'শীঘ্রই আসছে',
    'swasthyamitra': 'স্বাস্থ্যমিত্র',
    'ai_health_assistant': 'এআই স্বাস্থ্য সহায়ক',
    'kanoon_sathi': 'কানুনসাথী',
    'legal_aid_platform': 'আইনি সহায়তা প্ল্যাটফর্ম',
    'yuva_rojgar': 'যুব রোজগার',
    'career_empowerment': 'ক্যারিয়ার ক্ষমতায়ন',
    'samasya_report': 'সমস্যা রিপোর্ট',
    'civic_issue_reporter': 'নাগরিক সমস্যা রিপোর্টার',
    'launch_module': 'মডিউল চালু করুন',
    'learn_more': 'আরও জানুন',
    'health': 'স্বাস্থ্য',
    'legal_aid': 'আইনি সহায়তা',
    'employment': 'কর্মসংস্থান',
    'civic_issues': 'নাগরিক সমস্যা',
    'login': 'লগইন',
    'voice': 'কণ্ঠস্বর',
    'stop': 'থামুন',
    'live': 'লাইভ',
    'ai_assistant': 'এআই সহায়ক',
    'get_ai_help': 'এআই সাহায্য নিন',
    'ask_anything': 'ভারতসেতু সেবা সম্পর্কে যেকোনো প্রশ্ন করুন'
  },
  'தமிழ்': {
    'bharatsetu': 'பாரதசேது',
    'empowering_india': 'இந்தியாவை வலுப்படுத்துதல்',
    'all_in_one_platform': 'இந்தியாவுக்கான அனைத்து-in-ஒன்று வலுப்படுத்தல் தளம்',
    'one_app_multiple_solutions': 'ஒரு ஆப். பல தீர்வுகள். எல்லையற்ற தாக்கம்।',
    'core_modules': 'முக்கிய தொகுதிகள்',
    'coming_soon': 'விரைவில் வருகிறது',
    'swasthyamitra': 'ஸ்வாஸ்த்யமித்ரா',
    'ai_health_assistant': 'ஏஐ சுகாதார உதவியாளர்',
    'kanoon_sathi': 'கானூன்சாதி',
    'legal_aid_platform': 'சட்ட உதவி தளம்',
    'yuva_rojgar': 'யுவா ரோஜ்கார்',
    'career_empowerment': 'வாழ்க்கை வலுப்படுத்தல்',
    'samasya_report': 'சமஸ்யா அறிக்கை',
    'civic_issue_reporter': 'குடிமக்கள் பிரச்சினை அறிக்கையாளர்',
    'launch_module': 'தொகுதியை தொடங்கு',
    'learn_more': 'மேலும் அறிய',
    'health': 'சுகாதாரம்',
    'legal_aid': 'சட்ட உதவி',
    'employment': 'வேலைவாய்ப்பு',
    'civic_issues': 'குடிமக்கள் பிரச்சினைகள்',
    'login': 'உள்நுழைய',
    'voice': 'குரல்',
    'stop': 'நிறுத்து',
    'live': 'நேரலை',
    'ai_assistant': 'ஏஐ உதவியாளர்',
    'get_ai_help': 'ஏஐ உதவி பெறுங்கள்',
    'ask_anything': 'பாரதசேது சேவைகள் பற்றி எதையும் கேளுங்கள்'
  },
  'తెలుగు': {
    'bharatsetu': 'భారతసేతు',
    'empowering_india': 'భారతదేశం శక్తివంతం',
    'all_in_one_platform': 'భారతదేశం కోసం ఆల్-ఇన్-వన్ ఎంపవర్మెంట్ ప్లాట్‌ఫారమ్',
    'one_app_multiple_solutions': 'ఒక యాప్. బహుళ పరిష్కారాలు. అనంత ప్రభావం.',
    'core_modules': 'కోర్ మాడ్యూల్స్',
    'coming_soon': 'త్వరలో వస్తోంది',
    'swasthyamitra': 'స్వాస్థ్యమిత్ర',
    'ai_health_assistant': 'ఏఐ ఆరోగ్య సహాయకుడు',
    'kanoon_sathi': 'కానూన్‌సాథి',
    'legal_aid_platform': 'న్యాయ సహాయ వేదిక',
    'yuva_rojgar': 'యువ రోజ్‌గార్',
    'career_empowerment': 'కెరీర్ శక్తివంతం',
    'samasya_report': 'సమస్యా రిపోర్ట్',
    'civic_issue_reporter': 'పౌర సమస్య రిపోర్టర్',
    'launch_module': 'మాడ్యూల్ ప్రారంభించండి',
    'learn_more': 'మరింత తెలుసుకోండి',
    'health': 'ఆరోగ్యం',
    'legal_aid': 'న్యాయ సహాయం',
    'employment': 'ఉపాధి',
    'civic_issues': 'పౌర సమస్యలు',
    'login': 'లాగిన్',
    'voice': 'వాయిస్',
    'stop': 'ఆపండి',
    'live': 'లైవ్',
    'ai_assistant': 'ఏఐ సహాయకుడు',
    'get_ai_help': 'ఏఐ సహాయం పొందండి',
    'ask_anything': 'భారతసేతు సేవల గురించి ఏదైనా అడగండి'
  },
  'ગુજરાતી': {
    'bharatsetu': 'ભારતસેતુ',
    'empowering_india': 'ભારતને સશક્ત બનાવવું',
    'all_in_one_platform': 'ભારત માટે સર્વસમાવેશક સશક્તિકરણ પ્લેટફોર્મ',
    'one_app_multiple_solutions': 'એક એપ્લિકેશન. અનેક ઉકેલો. અનંત અસર.',
    'core_modules': 'મુખ્ય મોડ્યુલો',
    'coming_soon': 'જલ્દી આવી રહ્યું છે',
    'swasthyamitra': 'સ્વાસ્થ્યમિત્ર',
    'ai_health_assistant': 'એઆઈ આરોગ્ય સહાયક',
    'kanoon_sathi': 'કાનૂનસાથી',
    'legal_aid_platform': 'કાનૂની સહાય પ્લેટફોર્મ',
    'yuva_rojgar': 'યુવા રોજગાર',
    'career_empowerment': 'કેરિયર સશક્તિકરણ',
    'samasya_report': 'સમસ્યા રિપોર્ટ',
    'civic_issue_reporter': 'નાગરિક સમસ્યા રિપોર્ટર',
    'launch_module': 'મોડ્યુલ લોન્ચ કરો',
    'learn_more': 'વધુ જાણો',
    'health': 'આરોગ્ય',
    'legal_aid': 'કાનૂની સહાય',
    'employment': 'રોજગાર',
    'civic_issues': 'નાગરિક સમસ્યાઓ',
    'login': 'લોગિન',
    'voice': 'અવાજ',
    'stop': 'બંધ કરો',
    'live': 'લાઈવ',
    'ai_assistant': 'એઆઈ સહાયક',
    'get_ai_help': 'એઆઈ મદદ મેળવો',
    'ask_anything': 'ભારતસેતુ સેવાઓ વિશે કંઈપણ પૂછો'
  },
  'ਪੰਜਾਬੀ': {
    'bharatsetu': 'ਭਾਰਤਸੇਤੂ',
    'empowering_india': 'ਭਾਰਤ ਨੂੰ ਸਸ਼ਕਤ ਬਣਾਉਣਾ',
    'all_in_one_platform': 'ਭਾਰਤ ਲਈ ਇੱਕ ਸਾਰੇ-ਇਨ-ਇੱਕ ਸਸ਼ਕਤੀਕਰਣ ਪਲੇਟਫਾਰਮ',
    'one_app_multiple_solutions': 'ਇੱਕ ਐਪ। ਕਈ ਹੱਲ। ਅਨੰਤ ਪ੍ਰਭਾਵ।',
    'core_modules': 'ਮੁੱਖ ਮਾਡਿਊਲ',
    'coming_soon': 'ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ',
    'swasthyamitra': 'ਸਵਾਸਥਿਆਮਿਤ੍ਰ',
    'ai_health_assistant': 'ਏਆਈ ਸਿਹਤ ਸਹਾਇਕ',
    'kanoon_sathi': 'ਕਾਨੂਨਸਾਥੀ',
    'legal_aid_platform': 'ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ ਪਲੇਟਫਾਰਮ',
    'yuva_rojgar': 'ਯੁਵਾ ਰੋਜ਼ਗਾਰ',
    'career_empowerment': 'ਕਰੀਅਰ ਸਸ਼ਕਤੀਕਰਣ',
    'samasya_report': 'ਸਮੱਸਿਆ ਰਿਪੋਰਟ',
    'civic_issue_reporter': 'ਨਾਗਰਿਕ ਮੁੱਦਾ ਰਿਪੋਰਟਰ',
    'launch_module': 'ਮਾਡਿਊਲ ਲਾਂਚ ਕਰੋ',
    'learn_more': 'ਹੋਰ ਜਾਣੋ',
    'health': 'ਸਿਹਤ',
    'legal_aid': 'ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ',
    'employment': 'ਰੋਜ਼ਗਾਰ',
    'civic_issues': 'ਨਾਗਰਿਕ ਮੁੱਦੇ',
    'login': 'ਲਾਗਇਨ',
    'voice': 'ਆਵਾਜ਼',
    'stop': 'ਰੁਕੋ',
    'live': 'ਲਾਈਵ',
    'ai_assistant': 'ਏਆਈ ਸਹਾਇਕ',
    'get_ai_help': 'ਏਆਈ ਮਦਦ ਲਓ',
    'ask_anything': 'ਭਾਰਤਸੇਤੂ ਸੇਵਾਵਾਂ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ'
  },
  'മലയാളം': {
    'bharatsetu': 'ഭാരതസേതു',
    'empowering_india': 'ഭാരതത്തെ ശക്തിപ്പെടുത്തുന്നു',
    'all_in_one_platform': 'ഭാരതത്തിനായുള്ള സമ്പൂർണ്ണ ശാക്തീകരണ പ്ലാറ്റ്‌ഫോം',
    'one_app_multiple_solutions': 'ഒരു ആപ്പ്. ഒന്നിലധികം പരിഹാരങ്ങൾ. അനന്തമായ സ്വാധീനം.',
    'core_modules': 'പ്രധാന മൊഡ്യൂളുകൾ',
    'coming_soon': 'ഉടൻ വരുന്നു',
    'swasthyamitra': 'സ്വാസ്ഥ്യമിത്ര',
    'ai_health_assistant': 'എഐ ആരോഗ്യ സഹായി',
    'kanoon_sathi': 'കാനൂൻസാഥി',
    'legal_aid_platform': 'നിയമസഹായ പ്ലാറ്റ്‌ഫോം',
    'yuva_rojgar': 'യുവാ രോജ്ഗാർ',
    'career_empowerment': 'കരിയർ ശാക്തീകരണം',
    'samasya_report': 'സമസ്യാ റിപ്പോർട്ട്',
    'civic_issue_reporter': 'പൗര പ്രശ്ന റിപ്പോർട്ടർ',
    'launch_module': 'മൊഡ്യൂൾ സമാരംഭിക്കുക',
    'learn_more': 'കൂടുതൽ അറിയുക',
    'health': 'ആരോഗ്യം',
    'legal_aid': 'നിയമസഹായം',
    'employment': 'തൊഴിൽ',
    'civic_issues': 'പൗര പ്രശ്നങ്ങൾ',
    'login': 'ലോഗിൻ',
    'voice': 'ശബ്ദം',
    'stop': 'നിർത്തുക',
    'live': 'തത്സമയം',
    'ai_assistant': 'എഐ സഹായി',
    'get_ai_help': 'എഐ സഹായം നേടുക',
    'ask_anything': 'ഭാരതസേതു സേവനങ്ങളെ കുറിച്ച് എന്തും ചോദിക്കൂ'
  },
  'ಕನ್ನಡ': {
    'bharatsetu': 'ಭಾರತಸೇತು',
    'empowering_india': 'ಭಾರತವನ್ನು ಶಕ್ತಿಯುತಗೊಳಿಸುವುದು',
    'all_in_one_platform': 'ಭಾರತಕ್ಕಾಗಿ ಎಲ್ಲ-ಒಂದರಲ್ಲಿ ಸಬಲೀಕರಣ ವೇದಿಕೆ',
    'one_app_multiple_solutions': 'ಒಂದು ಅಪ್ಲಿಕೇಶನ್. ಅನೇಕ ಪರಿಹಾರಗಳು. ಅನಂತ ಪರಿಣಾಮ.',
    'core_modules': 'ಮುಖ್ಯ ಮಾಡ್ಯೂಲ್‌ಗಳು',
    'coming_soon': 'ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ',
    'swasthyamitra': 'ಸ್ವಾಸ್ಥ್ಯಮಿತ್ರ',
    'ai_health_assistant': 'ಎಐ ಆರೋಗ್ಯ ಸಹಾಯಕ',
    'kanoon_sathi': 'ಕಾನೂನ್‌ಸಾಥಿ',
    'legal_aid_platform': 'ಕಾನೂನು ಸಹಾಯ ವೇದಿಕೆ',
    'yuva_rojgar': 'ಯುವ ರೋಜ್‌ಗಾರ್',
    'career_empowerment': 'ವೃತ್ತಿ ಸಬಲೀಕರಣ',
    'samasya_report': 'ಸಮಸ್ಯೆ ವರದಿ',
    'civic_issue_reporter': 'ನಾಗರಿಕ ಸಮಸ್ಯೆ ವರದಿಗಾರ',
    'launch_module': 'ಮಾಡ್ಯೂಲ್ ಪ್ರಾರಂಭಿಸಿ',
    'learn_more': 'ಹೆಚ್ಚು ತಿಳಿಯಿರಿ',
    'health': 'ಆರೋಗ್ಯ',
    'legal_aid': 'ಕಾನೂನು ಸಹಾಯ',
    'employment': 'ಉದ್ಯೋಗ',
    'civic_issues': 'ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳು',
    'login': 'ಲಾಗಿನ್',
    'voice': 'ಧ್ವನಿ',
    'stop': 'ನಿಲ್ಲಿಸಿ',
    'live': 'ಲೈವ್',
    'ai_assistant': 'ಎಐ ಸಹಾಯಕ',
    'get_ai_help': 'ಎಐ ಸಹಾಯ ಪಡೆಯಿರಿ',
    'ask_anything': 'ಭಾರತಸೇತು ಸೇವೆಗಳ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ'
  },
  'मराठी': {
    'bharatsetu': 'भारतसेतू',
    'empowering_india': 'भारताला सशक्त बनवणे',
    'all_in_one_platform': 'भारतासाठी सर्व-एक सशक्तिकरण प्लॅटफॉर्म',
    'one_app_multiple_solutions': 'एक अॅप. अनेक समाधाने. अनंत परिणाम.',
    'core_modules': 'मुख्य मॉड्यूल',
    'coming_soon': 'लवकरच येत आहे',
    'swasthyamitra': 'स्वास्थ्यमित्र',
    'ai_health_assistant': 'एआय आरोग्य सहाय्यक',
    'kanoon_sathi': 'कानूनसाथी',
    'legal_aid_platform': 'कायदेशीर मदत प्लॅटफॉर्म',
    'yuva_rojgar': 'युवा रोजगार',
    'career_empowerment': 'करिअर सशक्तिकरण',
    'samasya_report': 'समस्या अहवाल',
    'civic_issue_reporter': 'नागरिक समस्या रिपोर्टर',
    'launch_module': 'मॉड्यूल सुरू करा',
    'learn_more': 'अधिक जाणून घ्या',
    'health': 'आरोग्य',
    'legal_aid': 'कायदेशीर मदत',
    'employment': 'रोजगार',
    'civic_issues': 'नागरिक समस्या',
    'login': 'लॉगिन',
    'voice': 'आवाज',
    'stop': 'थांबा',
    'live': 'थेट',
    'ai_assistant': 'एआय सहाय्यक',
    'get_ai_help': 'एआय मदत घ्या',
    'ask_anything': 'भारतसेतू सेवांबद्दल काहीही विचारा'
  }
};

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: string[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('English');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['English'][key] || key;
  };

  const availableLanguages = Object.keys(translations);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
