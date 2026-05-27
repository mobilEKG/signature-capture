/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'en' | 'es' | 'fr' | 'zh'

interface I18nContext {
  lang: Language
  setLang: (l: Language) => void
  t: (key: string) => string
}

const defaultLang: Language = 'en'

export const I18nContext = createContext<I18nContext>({
  lang: defaultLang,
  setLang: () => {},
  t: (k) => k,
})

const translations: Record<Language, Record<string, string>> = {
  en: {
    capture: 'Capture',
    instructions: 'Instructions',
    faq: 'FAQ',
    about: 'About',
    privacy: 'Privacy',
    menu: 'Menu',
    close_menu: 'Close menu',
    place_signature: 'Place your signature inside this box',
    start: 'Start',
    stop: 'Stop',
    capture_btn: 'Capture',
    clean: 'Clean',
    save: 'Save',
    select_camera: 'Select camera...',
    preview_placeholder: 'Capture your signature to see it here',
    camera_not_ready: 'Camera is still starting',
    camera_selected_message: 'Using best camera for sharper captures',
    start_camera: 'Start camera',
    stop_camera: 'Stop camera',
    signature_copied: 'Signature copied to clipboard!',
    signature_clipboard_unavailable: 'Clipboard unavailable. Download still works.',
    signature_saved: 'File saved.',
    signature_saved_and_copied: 'File saved and copied to clipboard.',
    language: 'Language',
    home_footer_1:
      'Open-source signature capture. Images are processed locally and never leave your device.',
    home_footer_read: 'Read our',
    home_footer_privacy: ' privacy notes',
    home_footer_and: ' and',
    home_footer_about: ' project details',
    period_sign: '.',
    instructions_meta_title: 'Instructions - Signature Capture',
    instructions_meta_description:
      'Quick guide for capturing a signature locally in your browser.',
    instructions_heading: 'How to Capture Your Signature',
    instructions_flow_1: 'Start',
    instructions_flow_2: 'Capture',
    instructions_flow_3: 'Clean',
    instructions_flow_4: 'Save',
    instructions_glance_heading: 'At a Glance',
    instructions_tips_heading: 'Quick Tips',
    instructions_tip_pen: 'Use a dark pen on white paper for best results',
    instructions_tip_light:
      'Ensure even lighting without shadows across your signature',
    instructions_tip_hold: 'Hold the paper steady and align with the guide box',
    instructions_tip_back_cam:
      'For mobile devices, use the back camera for higher quality',
    instructions_tip_landscape:
      'On mobile, landscape orientation often works better than portrait',
    instructions_tip_open_source:
      'The project is open source, so you can inspect, fork, and self-host it',
    about_meta_title: 'About - Signature Capture',
    about_meta_description:
      'Learn about the open-source Signature Capture project.',
    about_heading: 'About Signature Capture',
    about_p1:
      'Signature Capture is an open-source browser app that turns a handwritten signature into a transparent PNG.',
    about_p2:
      'It runs locally in your browser: capture a frame, clean the background, download the result, or fork the code and self-host it.',
    faq_meta_title: 'FAQ - Signature Capture',
    faq_meta_description:
      'Frequently asked questions about the Signature Capture tool.',
    faq_heading: 'Frequently Asked Questions',
    faq_q2: 'What file format will I get?',
    faq_a2:
      'Your signature downloads as a high-quality PNG with a transparent background.',
    faq_q3: 'Do I need special software?',
    faq_a3: 'No, everything runs directly in your browser.',
    faq_q4: 'Is my signature secure?',
    faq_a4:
      'The image never leaves your device unless you choose to download it. We do not store or transmit your data.',
    faq_q_open_source: 'Is the project open source?',
    faq_a_open_source:
      'Yes. You can inspect the code, run it locally, and deploy your own copy.',
    faq_q5: "What if my webcam isn't working?",
    faq_a5:
      'Check that your browser has permission to access the camera and refresh the page, or troubleshoot your webcam settings.',
    privacy_meta_title: 'Privacy - Signature Capture',
    privacy_meta_description:
      'Privacy practices for the Signature Capture web application.',
    privacy_heading: 'Privacy',
    privacy_intro:
      'Signature Capture is open source and designed to keep signature images on your device.',
    privacy_privacy_heading: 'Privacy and Data Handling',
    privacy_local_processing:
      'Local Processing: All image processing occurs locally in your web browser (client-side). Captured signatures never leave your device or get uploaded to any server. This means your signature images remain private and under your control at all times.',
    privacy_no_data:
      'No Personal Data Collection: The app does not ask for an account and does not store, transmit, or share your signature.',
    privacy_terms_heading: 'Terms of Use & Disclaimer',
    privacy_no_warranties:
      'No Warranties Provided: This web application is provided as is. Review the code and use it at your own discretion.',
  },
  es: {
    capture: 'Capturar',
    instructions: 'Instrucciones',
    faq: 'Preguntas',
    about: 'Acerca de',
    privacy: 'Privacidad',
    menu: 'Menú',
    close_menu: 'Cerrar',
    place_signature: 'Coloca tu firma dentro del cuadro',
    start: 'Iniciar',
    stop: 'Detener',
    capture_btn: 'Capturar',
    clean: 'Limpiar',
    save: 'Guardar',
    select_camera: 'Seleccionar cámara...',
    preview_placeholder: 'Captura tu firma para verla aquí',
    camera_not_ready: 'La cámara aún se está iniciando',
    camera_selected_message: 'Usando la mejor cámara para capturas más nítidas',
    start_camera: 'Iniciar cámara',
    stop_camera: 'Detener cámara',
    signature_copied: '¡Firma copiada al portapapeles!',
    signature_clipboard_unavailable:
      'Portapapeles no disponible. La descarga aún funciona.',
    signature_saved: 'Archivo guardado.',
    signature_saved_and_copied: 'Archivo guardado y copiado al portapapeles.',
    language: 'Idioma',
    home_footer_1:
      'En Signature Capture, tu privacidad es importante. Todo el procesamiento se realiza localmente y las imágenes capturadas nunca salen de tu dispositivo.',
    home_footer_read: 'Lee nuestra',
    home_footer_privacy: ' Política de Privacidad completa',
    home_footer_and: ' y conoce más',
    home_footer_about: ' sobre este proyecto',
    period_sign: '.',
    instructions_meta_title: 'Instrucciones - Signature Capture',
    instructions_meta_description:
      'Guía paso a paso para capturar tu firma en línea.',
    instructions_heading: 'Cómo capturar tu firma',
    instructions_flow_1: 'Iniciar',
    instructions_flow_2: 'Capturar',
    instructions_flow_3: 'Limpiar',
    instructions_flow_4: 'Guardar',
    instructions_glance_heading: 'De un vistazo',
    instructions_tips_heading: 'Consejos rápidos',
    instructions_tip_pen:
      'Utiliza un bolígrafo oscuro sobre papel blanco para mejores resultados',
    instructions_tip_light:
      'Asegúrate de que la iluminación sea uniforme y sin sombras sobre la firma',
    instructions_tip_hold:
      'Sostén el papel firme y alinéalo con la caja de guía',
    instructions_tip_back_cam:
      'En dispositivos móviles, usa la cámara trasera para mejor calidad',
    instructions_tip_landscape:
      'En el móvil, la orientación horizontal suele funcionar mejor que la vertical',
    instructions_tip_open_source:
      'El proyecto es de código abierto: puedes revisar, bifurcar y autoalojar el código',
    about_meta_title: 'Acerca de - Signature Capture',
    about_meta_description:
      'Conoce el proyecto Signature Capture y cómo funciona.',
    about_heading: 'Acerca de Signature Capture',
    about_p1:
      'Bienvenido a Signature Capture, tu solución sencilla y segura para crear firmas digitales rápidamente en línea. Ya sea que firmes documentos o personalices tus comunicaciones digitales, nuestra herramienta captura firmas nítidas directamente desde tu cámara web. No requiere descargas y es totalmente gratuita: perfecta para profesionales, estudiantes y cualquiera que necesite una firma digital de manera conveniente.',
    about_p2:
      'Signature Capture comenzó como un proyecto secundario inspirado en la idea de que cualquiera debería poder convertir su firma manuscrita en un recurso digital nítido, sin complicaciones ni distracciones.',
    faq_meta_title: 'Preguntas frecuentes - Signature Capture',
    faq_meta_description:
      'Respuestas a preguntas frecuentes sobre la herramienta Signature Capture.',
    faq_heading: 'Preguntas frecuentes',
    faq_q2: '\u00bfEn qu\u00e9 formato recibir\u00e9 el archivo?',
    faq_a2:
      'Tu firma se descarga como un PNG de alta calidad con fondo transparente.',
    faq_q3: '\u00bfNecesito software especial?',
    faq_a3: 'No, todo funciona directamente en tu navegador.',
    faq_q4: '\u00bfMi firma est\u00e1 segura?',
    faq_a4:
      'La imagen nunca sale de tu dispositivo salvo que decidas descargarla. No almacenamos ni transmitimos tus datos.',
    faq_q_open_source: '¿El proyecto es de código abierto?',
    faq_a_open_source:
      'Sí. Puedes revisar el código, ejecutarlo localmente y desplegar tu propia copia.',
    faq_q5: '\u00bfQu\u00e9 hago si mi c\u00e1mara no funciona?',
    faq_a5:
      'Comprueba que tu navegador tenga permiso para acceder a la c\u00e1mara y actualiza la p\u00e1gina, o revisa la configuraci\u00f3n de tu c\u00e1mara.',
    privacy_meta_title: 'Pol\u00edtica de Privacidad - Signature Capture',
    privacy_meta_description:
      'Pr\u00e1cticas de privacidad de la aplicaci\u00f3n web Signature Capture.',
    privacy_heading: 'Pol\u00edtica de Privacidad',
    privacy_intro:
      'Signature Capture est\u00e1 dise\u00f1ado teniendo en cuenta tu privacidad. Te animamos a usar esta herramienta con confianza, sabiendo que no recopila datos personales y mantiene tu informaci\u00f3n en tu propio dispositivo. A continuaci\u00f3n explicamos nuestras pr\u00e1cticas de datos y los t\u00e9rminos de uso de esta aplicaci\u00f3n web de forma clara y formal.',
    privacy_privacy_heading: 'Privacidad y manejo de datos',
    privacy_local_processing:
      'Procesamiento local: Todo el procesamiento de im\u00e1genes se realiza localmente en tu navegador (del lado del cliente). Las firmas capturadas nunca salen de tu dispositivo ni se suben a ning\u00fan servidor. Esto significa tus im\u00e1genes de firma se mantienen privadas y bajo tu control en todo momento.',
    privacy_no_data:
      'No se recopilan datos personales: No recopilamos ninguna informaci\u00f3n personal o datos identificables. La herramienta no almacena, transmite ni comparte tu nombre, firma ni ning\u00fan otro dato personal. Puedes usar Signature Capture sin preocuparte por una recopilaci\u00f3n de datos oculta.',
    privacy_terms_heading: 'T\u00e9rminos de uso y exenci\u00f3n de responsabilidad',
    privacy_no_warranties:
      'No se ofrecen garant\u00edas: Esta aplicaci\u00f3n web se proporciona "tal cual", sin garant\u00edas ni compromisos. No prometemos que Signature Capture cumpla con tus requerimientos, funcione ininterrumpidamente o est\u00e9 libre de errores. Todas las funciones se ofrecen sin ninguna garant\u00eda expresa o impl\u00edcita (incluidas garant\u00edas de rendimiento, seguridad o idoneidad para un prop\u00f3sito particular).',
  },
  fr: {
    capture: 'Capturer',
    instructions: 'Instructions',
    faq: 'FAQ',
    about: 'À propos',
    privacy: 'Confidentialité',
    menu: 'Menu',
    close_menu: 'Fermer',
    place_signature: 'Placez votre signature dans la boîte',
    start: 'Démarrer',
    stop: 'Arrêter',
    capture_btn: 'Prendre',
    clean: 'Nettoyer',
    save: 'Enregistrer',
    select_camera: 'Choisir la caméra...',
    preview_placeholder: 'Capturez votre signature pour la voir ici',
    camera_not_ready: 'La caméra démarre encore',
    camera_selected_message: 'Utilisation de la meilleure caméra pour des captures plus nettes',
    start_camera: 'Démarrer la caméra',
    stop_camera: 'Arrêter la caméra',
    signature_copied: 'Signature copiée dans le presse-papiers !',
    signature_clipboard_unavailable:
      'Presse-papiers indisponible. Le téléchargement fonctionne.',
    signature_saved: 'Fichier enregistré.',
    signature_saved_and_copied:
      'Fichier enregistré et copié dans le presse-papiers.',
    language: 'Langue',
    home_footer_1:
      'Chez Signature Capture, votre confidentialité compte. Tout le traitement se fait localement et les images capturées ne quittent jamais votre appareil.',
    home_footer_read: 'Lisez notre',
    home_footer_privacy: ' Politique de Confidentialité complète',
    home_footer_and: ' et découvrez-en plus',
    home_footer_about: ' sur ce projet',
    period_sign: '.',
    instructions_meta_title: 'Instructions - Signature Capture',
    instructions_meta_description:
      'Guide étape par étape pour capturer votre signature en ligne.',
    instructions_heading: 'Comment capturer votre signature',
    instructions_flow_1: 'Démarrer',
    instructions_flow_2: 'Capturer',
    instructions_flow_3: 'Nettoyer',
    instructions_flow_4: 'Enregistrer',    
    instructions_glance_heading: 'En un coup d’œil',
    instructions_tips_heading: 'Astuces rapides',
    instructions_tip_pen:
      'Utilisez un stylo foncé sur du papier blanc pour de meilleurs résultats',
    instructions_tip_light:
      'Assurez un éclairage uniforme sans ombres sur votre signature',
    instructions_tip_hold:
      'Maintenez la feuille bien droite et alignez-la avec le cadre de guidage',
    instructions_tip_back_cam:
      'Sur mobile, utilisez la caméra arrière pour une meilleure qualité',
    instructions_tip_landscape:
      'Sur mobile, l\'orientation paysage fonctionne souvent mieux que le portrait',
    instructions_tip_open_source:
      'Le projet est open source : vous pouvez inspecter, forker et auto-héberger le code',
    about_meta_title: 'À propos - Signature Capture',
    about_meta_description:
      'En savoir plus sur le projet Signature Capture et son fonctionnement.',
    about_heading: 'À propos de Signature Capture',
    about_p1:
      'Bienvenue sur Signature Capture, votre solution simple et sécurisée pour créer rapidement des signatures numériques en ligne. Que vous signiez des documents ou personnalisiez vos communications numériques, notre outil capture des signatures nettes directement depuis votre webcam. Aucun téléchargement requis et totalement gratuit — idéal pour les professionnels, les étudiants et tous ceux qui ont besoin d\'une signature numérique pratique.',
    about_p2:
      'Signature Capture a débuté comme un petit projet guidé par la conviction que chacun devrait pouvoir transformer sa signature manuscrite en un atout numérique clair — sans tracas ni distractions.',
    faq_meta_title: 'FAQ - Signature Capture',
    faq_meta_description:
      'Questions fréquemment posées sur l\'outil Signature Capture.',
    faq_heading: 'Foire aux questions',
    faq_q2: 'Quel format de fichier vais-je obtenir?',
    faq_a2:
      'Votre signature est téléchargée au format PNG de haute qualité avec fond transparent.',
    faq_q3: 'Ai-je besoin d\'un logiciel particulier?',
    faq_a3: 'Non, tout fonctionne directement dans votre navigateur.',
    faq_q4: 'Ma signature est-elle sécurisée?',
    faq_a4:
      'L\'image ne quitte jamais votre appareil, sauf si vous décidez de la télécharger. Nous ne stockons ni ne transmettons vos données.',
    faq_q_open_source: 'Le projet est-il open source?',
    faq_a_open_source:
      'Oui. Vous pouvez inspecter le code, l\'exécuter localement et déployer votre propre copie.',
    faq_q5: 'Que faire si ma webcam ne fonctionne pas?',
    faq_a5:
      'Vérifiez que votre navigateur a l\'autorisation d\'accéder à la caméra et actualisez la page, ou dépannez les paramètres de votre webcam.',
    privacy_meta_title: 'Politique de confidentialité - Signature Capture',
    privacy_meta_description:
      "Pratiques de confidentialité de l'application web Signature Capture.",
    privacy_heading: 'Politique de confidentialité',
    privacy_intro:
      "Signature Capture est conçu dans le respect de votre vie privée. Nous vous encourageons à utiliser cet outil en toute confiance, sachant qu'il ne collecte pas de données personnelles et conserve vos informations sur votre propre appareil. Ci-dessous, nous exposons nos pratiques de traitement des données et les conditions d'utilisation de cette application web de manière claire et formelle.",
    privacy_privacy_heading: 'Confidentialité et traitement des données',
    privacy_local_processing:
      "Traitement local: Tout le traitement d'image se déroule localement dans votre navigateur (côté client). Les signatures capturées ne quittent jamais votre appareil et ne sont pas téléchargées sur un serveur. Cela signifie vos images de signature restent privées et sous votre contrôle à tout moment.",
    privacy_no_data:
      "Aucune collecte de données personnelles: Nous ne collectons aucune information personnelle ou données identifiables. L'outil ne stocke, ne transmet ni ne partage votre nom, votre signature ou tout autre détail personnel. Vous pouvez utiliser Signature Capture sans craindre une collecte de données cachée.",
    privacy_terms_heading: "Conditions d'utilisation et clause de non-responsabilité",
    privacy_no_warranties:
      "Aucune garantie fournie: Cette application web est fournie « en l'état », sans garanties ni promesses. Nous ne garantissons pas que Signature Capture répondra à vos besoins, fonctionnera sans interruption ou sera exempt d'erreurs. Toutes les fonctionnalités sont offertes sans garantie expresse ou implicite (y compris les garanties de performance, de sécurité ou d'adéquation à un usage particulier).",
  },
  zh: {
    capture: '拍摄',
    instructions: '说明',
    faq: '常见问题',
    about: '关于',
    privacy: '隐私政策',
    menu: '菜单',
    close_menu: '关闭',
    place_signature: '将签名放在框内',
    start: '开始',
    stop: '停止',
    capture_btn: '拍摄',
    clean: '清理',
    save: '保存',
    select_camera: '选择摄像头...',
    preview_placeholder: '拍摄签名以在此处查看',
    camera_not_ready: '摄像头仍在启动',
    camera_selected_message: '已启用最佳摄像头以获得更清晰的拍摄',
    start_camera: '启动摄像头',
    stop_camera: '停止摄像头',
    signature_copied: '签名已复制到剪贴板！',
    signature_clipboard_unavailable: '剪贴板不可用。仍可下载文件。',
    signature_saved: '文件已保存。',
    signature_saved_and_copied: '文件已保存并复制到剪贴板。',
    language: '语言',
    home_footer_1:
      '在 Signature Capture，您的隐私至关重要。所有处理都在本地完成，捕获的图像绝不会离开您的设备。',
    home_footer_read: '阅读我们的',
    home_footer_privacy: '完整隐私政策',
    home_footer_and: '并进一步了解',
    home_footer_about: '该项目',
    period_sign: '。',
    instructions_meta_title: '说明 - Signature Capture',
    instructions_meta_description:
      '在线捕获签名的逐步指南。',
    instructions_heading: '如何捕获你的签名',
    instructions_flow_1: '开始',
    instructions_flow_2: '拍摄',
    instructions_flow_3: '清理',
    instructions_flow_4: '保存',
    instructions_glance_heading: '速览',
    instructions_tips_heading: '快速提示',
    instructions_tip_pen: '使用深色笔在白纸上书写以获得最佳效果',
    instructions_tip_light: '确保光线均匀，签名上没有阴影',
    instructions_tip_hold: '保持纸张稳定并与框对齐',
    instructions_tip_back_cam: '在移动设备上，使用后置摄像头可获得更高质量',
    instructions_tip_landscape: '在移动端，横屏通常比竖屏效果更好',
    instructions_tip_open_source: '项目是开源的，你可以查看、fork 并自行部署',
    about_meta_title: '关于 - Signature Capture',
    about_meta_description: '了解 Signature Capture 项目及其工作原理。',
    about_heading: '关于 Signature Capture',
    about_p1:
      '欢迎使用 Signature Capture，这是一个简单安全的在线工具，能快速生成数字签名。无论是签署文件还是个性化数字通信，我们的工具都能直接通过摄像头捕获清晰的签名。无需下载，完全免费——非常适合专业人士、学生以及任何需要方便获取数字签名的人。',
    about_p2:
      'Signature Capture 最初是一个轻量的副项目，源于一个信念：任何人都应该能够把手写签名轻松转换为清晰的数字资源——无需麻烦，也没有干扰。',
    faq_meta_title: '常见问题 - Signature Capture',
    faq_meta_description: '关于 Signature Capture 工具的常见问题。',
    faq_heading: '常见问题',
    faq_q2: '我会得到什么格式的文件？',
    faq_a2: '你的签名会以高质量的透明背景 PNG 下载。',
    faq_q3: '需要安装特殊软件吗？',
    faq_a3: '不需要，一切都在浏览器中完成。',
    faq_q4: '我的签名安全吗？',
    faq_a4: '图像不会离开你的设备，除非你选择下载。我们不会存储或传输你的数据。',
    faq_q_open_source: '这个项目是开源的吗？',
    faq_a_open_source: '是的。你可以查看代码、本地运行，并部署自己的版本。',
    faq_q5: '如果摄像头无法工作怎么办？',
    faq_a5: '请检查浏览器是否已获得摄像头权限并刷新页面，或排查摄像头设置问题。',
    privacy_meta_title: '隐私政策 - Signature Capture',
    privacy_meta_description: 'Signature Capture 网站的隐私实践。',
    privacy_heading: '隐私政策',
    privacy_intro:
      'Signature Capture 在设计时充分考虑了隐私。请放心使用，本工具不会收集个人数据，且所有信息都留存在你的设备上。下面我们以清晰正式的方式概述我们的数据处理做法及本网站的使用条款。',
    privacy_privacy_heading: '隐私与数据处理',
    privacy_local_processing:
      '本地处理： 所有图像处理都在你的浏览器本地完成（客户端）。捕获的签名绝不会离开你的设备或上传到任何服务器。这意味着你的签名图片始终私密且由你掌控。',
    privacy_no_data:
      '不收集个人数据： 我们不会收集任何个人信息或可识别的数据。该工具不会存储、传输或分享你的姓名、签名或其他个人信息。你可以放心使用，不必担心隐藏的数据收集。',
    privacy_terms_heading: '使用条款与免责声明',
    privacy_no_warranties:
      '不提供任何担保： 本网站按“原样”提供，不附带任何保证或承诺。我们不保证 Signature Capture 能满足你的需求、持续运行或没有错误。所有功能均不含任何明示或暗示的保证（包括性能、安全或适用于特定目的的保证）。',
  },
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, _setLang] = useState<Language>(defaultLang)

  const setLang = (l: Language) => {
    document.documentElement.lang = l
    _setLang(l)
  }

  useEffect(() => {
    const preferred =
      (navigator.languages && navigator.languages.length > 0
        ? navigator.languages[0]
        : navigator.language) || defaultLang
    const code = preferred.slice(0, 2)
    const detected: Language = ['en', 'es', 'fr', 'zh'].includes(code as Language)
      ? (code as Language)
      : defaultLang
    setLang(detected)
  }, [])

  const t = (key: string) => translations[lang][key] || translations.en[key] || key

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
