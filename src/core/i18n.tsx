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
    open_menu: 'Open menu',
    close_menu: 'Close menu',
    hide_info: 'Hide info',
    show_info: 'Show info',
    place_signature: 'Place your signature inside this box',
    start: 'Start',
    stop: 'Stop',
    capture_btn: 'Capture',
    clean: 'Clean',
    save: 'Save',
    select_camera: 'Select camera...',
    preview_placeholder: 'Capture your signature to see it here',
    camera_not_ready: 'Camera is still starting',
    camera_permission_denied:
      'Camera access is blocked. Allow camera permission in your browser, then try again.',
    camera_retry: 'Try camera again',
    camera_selected_message: 'Using best camera for sharper captures',
    start_camera: 'Start camera',
    stop_camera: 'Stop camera',
    signature_copied: 'Signature copied to clipboard!',
    signature_clipboard_unavailable: 'Clipboard unavailable. Download still works.',
    signature_saved: 'File saved.',
    signature_saved_and_copied: 'File saved and copied to clipboard.',
    language: 'Language',
    source_repository: 'Source repository',
    home_footer_1:
      'Open-source signature capture. Images are processed locally and never leave your device.',
    home_footer_read: 'Read our',
    home_footer_privacy: ' privacy notes',
    home_footer_and: ' and',
    home_footer_about: ' project details',
    home_seo_heading: 'Free signature background remover',
    home_seo_intro:
      'Turn a handwritten signature on paper into a transparent PNG directly in your browser. Use your camera, clean the paper background, then download or copy the finished signature image.',
    home_seo_steps_heading: 'How it works',
    home_seo_capture_title: 'Capture',
    home_seo_capture_body:
      'Place your handwritten signature inside the guide box and capture a frame from your phone or desktop camera.',
    home_seo_remove_background: 'Remove the white paper background',
    home_seo_remove_background_body:
      'The app crops the guide area and converts the signature strokes into a black-on-transparent PNG.',
    home_seo_transparent_png: 'Download a transparent PNG',
    home_seo_transparent_png_body:
      'Save the finished signature image for Word documents, PDFs, forms, and document overlays.',
    home_seo_no_upload: 'No upload',
    home_seo_no_upload_body:
      'Signature images are processed locally in your browser. The app does not ask for an account and does not upload your signature.',
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
    instructions_pwa_heading: 'Install on Your Phone',
    instructions_pwa_intro:
      'Signature Capture can be added to your home screen as a PWA. It uses standard web app install support, so no app store download is required.',
    instructions_pwa_android_heading: 'Android 10+',
    instructions_pwa_android:
      'Use current Chrome, Edge, or Samsung Internet on Android 10 or later. Open the site, tap the browser menu, then choose Install app or Add to Home screen.',
    instructions_pwa_ios_heading: 'iOS/iPadOS 16.4+',
    instructions_pwa_ios:
      'Use Safari on iPhone or iPad. Tap Share, choose Add to Home Screen, keep Open as Web App on if shown, then tap Add. On iOS 16.3 or earlier, Safari is required for home screen install.',
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
    faq_q_remove_white_background:
      'How do I remove the white background from a signature?',
    faq_a_remove_white_background:
      'Use a dark pen on white paper, place the signature inside the guide box, tap Capture, then Clean. The app removes the paper background and keeps the signature strokes.',
    faq_q_make_transparent:
      'How do I make a handwritten signature transparent?',
    faq_a_make_transparent:
      'After capture, the Clean and Save actions export the signature as a PNG with transparent background pixels.',
    faq_q_use_in_documents: 'Can I use the PNG in Word, PDF, or forms?',
    faq_a_use_in_documents:
      'Yes. The transparent PNG is designed for document overlays, forms, Word files, PDF workflows, and other places that accept image signatures.',
    faq_q_digital_signature:
      'Is this a digital signature or only a signature image?',
    faq_a_digital_signature:
      'This creates a transparent signature image. It is not a cryptographic digital signature and does not verify document identity or integrity.',
    faq_q2: 'What file format will I get?',
    faq_a2:
      'Your signature downloads as a high-quality PNG with a transparent background.',
    faq_q3: 'Do I need special software?',
    faq_a3: 'No, everything runs directly in your browser.',
    faq_q_install: 'Can I install it on Android or iOS?',
    faq_a_install:
      'Yes. The site includes the PWA install pieces: HTTPS hosting, a web app manifest, app icons, start URL, fullscreen display mode, and a service worker. Use Android 10+ with a current install-capable browser, or iOS/iPadOS 16.4+ with Safari; camera capture still requires browser camera permission.',
    faq_q4: 'Is my signature secure?',
    faq_a4:
      'The signature image never leaves your device unless you choose to download it. We do not store or transmit your signature data.',
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
      'Signature Capture is open source and designed to keep signature images on your device. The hosted site also uses privacy-first Cloudflare Web Analytics to understand aggregate traffic and performance.',
    privacy_privacy_heading: 'Privacy and Data Handling',
    privacy_local_processing:
      'Local Processing: All image processing occurs locally in your web browser (client-side). Captured signatures never leave your device or get uploaded to any server. This means your signature images remain private and under your control at all times.',
    privacy_no_data:
      'Signature Data: The app does not ask for an account and does not store, transmit, or share your signature image.',
    privacy_analytics:
      'Analytics: The hosted site loads Cloudflare Web Analytics to collect aggregate page-view and performance metrics. Cloudflare states that this analytics beacon does not use cookies or local storage, and the app does not use it to identify users or collect signature images.',
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
    open_menu: 'Abrir men\u00fa',
    close_menu: 'Cerrar',
    hide_info: 'Ocultar informaci\u00f3n',
    show_info: 'Mostrar informaci\u00f3n',
    place_signature: 'Coloca tu firma dentro del cuadro',
    start: 'Iniciar',
    stop: 'Detener',
    capture_btn: 'Capturar',
    clean: 'Limpiar',
    save: 'Guardar',
    select_camera: 'Seleccionar cámara...',
    preview_placeholder: 'Captura tu firma para verla aquí',
    camera_not_ready: 'La cámara aún se está iniciando',
    camera_permission_denied:
      'El acceso a la cámara está bloqueado. Permite el permiso de cámara en tu navegador y vuelve a intentarlo.',
    camera_retry: 'Volver a intentar',
    camera_selected_message: 'Usando la mejor cámara para capturas más nítidas',
    start_camera: 'Iniciar cámara',
    stop_camera: 'Detener cámara',
    signature_copied: '¡Firma copiada al portapapeles!',
    signature_clipboard_unavailable:
      'Portapapeles no disponible. La descarga aún funciona.',
    signature_saved: 'Archivo guardado.',
    signature_saved_and_copied: 'Archivo guardado y copiado al portapapeles.',
    language: 'Idioma',
    source_repository: 'Repositorio de código',
    home_footer_1:
      'En Signature Capture, tu privacidad es importante. Todo el procesamiento se realiza localmente y las imágenes capturadas nunca salen de tu dispositivo.',
    home_footer_read: 'Lee nuestra',
    home_footer_privacy: ' Política de Privacidad completa',
    home_footer_and: ' y conoce más',
    home_footer_about: ' sobre este proyecto',
    home_seo_heading: 'Eliminador gratuito de fondo para firmas',
    home_seo_intro:
      'Convierte una firma manuscrita en papel en un PNG transparente directamente en tu navegador. Usa la cámara, limpia el fondo del papel y descarga o copia la imagen final de la firma.',
    home_seo_steps_heading: 'Cómo funciona',
    home_seo_capture_title: 'Captura',
    home_seo_capture_body:
      'Coloca tu firma manuscrita dentro de la caja guía y captura una imagen desde la cámara del teléfono o del escritorio.',
    home_seo_remove_background: 'Elimina el fondo blanco del papel',
    home_seo_remove_background_body:
      'La app recorta el área de la guía y convierte los trazos de la firma en un PNG negro sobre fondo transparente.',
    home_seo_transparent_png: 'Descarga un PNG transparente',
    home_seo_transparent_png_body:
      'Guarda la imagen final de la firma para documentos de Word, PDF, formularios y superposiciones en documentos.',
    home_seo_no_upload: 'Sin subir archivos',
    home_seo_no_upload_body:
      'Las imágenes de firma se procesan localmente en tu navegador. La app no pide una cuenta ni sube tu firma.',
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
    instructions_pwa_heading: 'Instalar en tu teléfono',
    instructions_pwa_intro:
      'Signature Capture se puede agregar a la pantalla de inicio como una PWA. Usa instalación estándar de aplicaciones web, así que no requiere descarga desde una tienda de apps.',
    instructions_pwa_android_heading: 'Android 10+',
    instructions_pwa_android:
      'Usa Chrome, Edge o Samsung Internet actualizado en Android 10 o posterior. Abre el sitio, toca el menú del navegador y elige Instalar app o Agregar a pantalla de inicio.',
    instructions_pwa_ios_heading: 'iOS/iPadOS 16.4+',
    instructions_pwa_ios:
      'Usa Safari en iPhone o iPad. Toca Compartir, elige Agregar a pantalla de inicio, deja activado Abrir como app web si aparece y toca Agregar. En iOS 16.3 o anterior, Safari es necesario para instalar en la pantalla de inicio.',
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
    faq_q_remove_white_background:
      '¿Cómo elimino el fondo blanco de una firma?',
    faq_a_remove_white_background:
      'Usa un bolígrafo oscuro sobre papel blanco, coloca la firma dentro de la caja guía, toca Capturar y luego Limpiar. La app elimina el fondo del papel y conserva los trazos de la firma.',
    faq_q_make_transparent:
      '¿Cómo hago transparente una firma manuscrita?',
    faq_a_make_transparent:
      'Después de capturarla, las acciones Limpiar y Guardar exportan la firma como un PNG con píxeles de fondo transparentes.',
    faq_q_use_in_documents: '¿Puedo usar el PNG en Word, PDF o formularios?',
    faq_a_use_in_documents:
      'Sí. El PNG transparente está pensado para superposiciones en documentos, formularios, archivos de Word, flujos PDF y otros lugares que aceptan imágenes de firma.',
    faq_q_digital_signature:
      '¿Es una firma digital o solo una imagen de firma?',
    faq_a_digital_signature:
      'Esto crea una imagen transparente de la firma. No es una firma digital criptográfica y no verifica la identidad ni la integridad del documento.',
    faq_q2: '\u00bfEn qu\u00e9 formato recibir\u00e9 el archivo?',
    faq_a2:
      'Tu firma se descarga como un PNG de alta calidad con fondo transparente.',
    faq_q3: '\u00bfNecesito software especial?',
    faq_a3: 'No, todo funciona directamente en tu navegador.',
    faq_q_install: '\u00bfPuedo instalarlo en Android o iOS?',
    faq_a_install:
      'Sí. El sitio incluye las piezas de instalación PWA: alojamiento HTTPS, manifiesto web, iconos de app, URL de inicio, modo de pantalla completa y service worker. Usa Android 10+ con un navegador actualizado compatible con instalación, o iOS/iPadOS 16.4+ con Safari; la captura con cámara todavía requiere permiso del navegador.',
    faq_q4: '\u00bfMi firma est\u00e1 segura?',
    faq_a4:
      'La imagen de la firma nunca sale de tu dispositivo salvo que decidas descargarla. No almacenamos ni transmitimos los datos de tu firma.',
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
      'Signature Capture es de c\u00f3digo abierto y est\u00e1 dise\u00f1ado para mantener las im\u00e1genes de firma en tu dispositivo. El sitio alojado tambi\u00e9n usa Cloudflare Web Analytics, con enfoque de privacidad, para entender el tr\u00e1fico agregado y el rendimiento.',
    privacy_privacy_heading: 'Privacidad y manejo de datos',
    privacy_local_processing:
      'Procesamiento local: Todo el procesamiento de im\u00e1genes se realiza localmente en tu navegador (del lado del cliente). Las firmas capturadas nunca salen de tu dispositivo ni se suben a ning\u00fan servidor. Esto significa tus im\u00e1genes de firma se mantienen privadas y bajo tu control en todo momento.',
    privacy_no_data:
      'Datos de firma: La aplicaci\u00f3n no pide una cuenta y no almacena, transmite ni comparte la imagen de tu firma.',
    privacy_analytics:
      'Anal\u00edtica: El sitio alojado carga Cloudflare Web Analytics para recopilar m\u00e9tricas agregadas de p\u00e1ginas vistas y rendimiento. Cloudflare indica que este beacon de anal\u00edtica no usa cookies ni almacenamiento local, y la aplicaci\u00f3n no lo usa para identificar usuarios ni recopilar im\u00e1genes de firmas.',
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
    open_menu: 'Ouvrir le menu',
    close_menu: 'Fermer',
    hide_info: 'Masquer les infos',
    show_info: 'Afficher les infos',
    place_signature: 'Placez votre signature dans la boîte',
    start: 'Démarrer',
    stop: 'Arrêter',
    capture_btn: 'Prendre',
    clean: 'Nettoyer',
    save: 'Enregistrer',
    select_camera: 'Choisir la caméra...',
    preview_placeholder: 'Capturez votre signature pour la voir ici',
    camera_not_ready: 'La caméra démarre encore',
    camera_permission_denied:
      "L'accès à la caméra est bloqué. Autorisez la caméra dans votre navigateur, puis réessayez.",
    camera_retry: 'Réessayer la caméra',
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
    source_repository: 'Dépôt source',
    home_footer_1:
      'Chez Signature Capture, votre confidentialité compte. Tout le traitement se fait localement et les images capturées ne quittent jamais votre appareil.',
    home_footer_read: 'Lisez notre',
    home_footer_privacy: ' Politique de Confidentialité complète',
    home_footer_and: ' et découvrez-en plus',
    home_footer_about: ' sur ce projet',
    home_seo_heading: 'Suppression gratuite du fond de signature',
    home_seo_intro:
      'Transformez une signature manuscrite sur papier en PNG transparent directement dans votre navigateur. Utilisez votre caméra, nettoyez le fond papier, puis téléchargez ou copiez l’image de signature terminée.',
    home_seo_steps_heading: 'Comment ça marche',
    home_seo_capture_title: 'Capturer',
    home_seo_capture_body:
      'Placez votre signature manuscrite dans le cadre guide et capturez une image avec la caméra de votre téléphone ou de votre ordinateur.',
    home_seo_remove_background: 'Supprimer le fond blanc du papier',
    home_seo_remove_background_body:
      'L’application recadre la zone du guide et convertit les traits de signature en PNG noir sur fond transparent.',
    home_seo_transparent_png: 'Télécharger un PNG transparent',
    home_seo_transparent_png_body:
      'Enregistrez l’image finale de signature pour les documents Word, les PDF, les formulaires et les superpositions de documents.',
    home_seo_no_upload: 'Aucun envoi',
    home_seo_no_upload_body:
      'Les images de signature sont traitées localement dans votre navigateur. L’application ne demande pas de compte et ne téléverse pas votre signature.',
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
    instructions_pwa_heading: 'Installer sur votre téléphone',
    instructions_pwa_intro:
      'Signature Capture peut être ajouté à votre écran d’accueil comme PWA. Il utilise l’installation standard des applications web, sans téléchargement depuis une boutique d’apps.',
    instructions_pwa_android_heading: 'Android 10+',
    instructions_pwa_android:
      'Utilisez Chrome, Edge ou Samsung Internet à jour sur Android 10 ou version ultérieure. Ouvrez le site, touchez le menu du navigateur, puis choisissez Installer l’application ou Ajouter à l’écran d’accueil.',
    instructions_pwa_ios_heading: 'iOS/iPadOS 16.4+',
    instructions_pwa_ios:
      'Utilisez Safari sur iPhone ou iPad. Touchez Partager, choisissez Ajouter à l’écran d’accueil, gardez Ouvrir comme app web activé si l’option apparaît, puis touchez Ajouter. Sur iOS 16.3 ou version antérieure, Safari est requis pour l’installation sur l’écran d’accueil.',
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
    faq_q_remove_white_background:
      'Comment supprimer le fond blanc d’une signature?',
    faq_a_remove_white_background:
      'Utilisez un stylo foncé sur papier blanc, placez la signature dans le cadre guide, touchez Capturer puis Nettoyer. L’application supprime le fond papier et conserve les traits de la signature.',
    faq_q_make_transparent:
      'Comment rendre une signature manuscrite transparente?',
    faq_a_make_transparent:
      'Après la capture, les actions Nettoyer et Enregistrer exportent la signature en PNG avec des pixels de fond transparents.',
    faq_q_use_in_documents: 'Puis-je utiliser le PNG dans Word, un PDF ou des formulaires?',
    faq_a_use_in_documents:
      'Oui. Le PNG transparent est conçu pour les superpositions de documents, les formulaires, les fichiers Word, les flux PDF et les autres emplacements acceptant les images de signature.',
    faq_q_digital_signature:
      'Est-ce une signature numérique ou seulement une image de signature?',
    faq_a_digital_signature:
      'Cela crée une image de signature transparente. Ce n’est pas une signature numérique cryptographique et cela ne vérifie ni l’identité ni l’intégrité du document.',
    faq_q2: 'Quel format de fichier vais-je obtenir?',
    faq_a2:
      'Votre signature est téléchargée au format PNG de haute qualité avec fond transparent.',
    faq_q3: 'Ai-je besoin d\'un logiciel particulier?',
    faq_a3: 'Non, tout fonctionne directement dans votre navigateur.',
    faq_q_install: 'Puis-je l\'installer sur Android ou iOS?',
    faq_a_install:
      'Oui. Le site inclut les éléments d’installation PWA : hébergement HTTPS, manifeste web, icônes d’app, URL de démarrage, mode plein écran et service worker. Utilisez Android 10+ avec un navigateur récent compatible avec l’installation, ou iOS/iPadOS 16.4+ avec Safari; la capture avec caméra nécessite toujours l’autorisation du navigateur.',
    faq_q4: 'Ma signature est-elle sécurisée?',
    faq_a4:
      'L\'image de signature ne quitte jamais votre appareil, sauf si vous décidez de la télécharger. Nous ne stockons ni ne transmettons les données de votre signature.',
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
      "Signature Capture est open source et conçu pour conserver les images de signature sur votre appareil. Le site hébergé utilise aussi Cloudflare Web Analytics, axé sur la confidentialité, afin de comprendre le trafic agrégé et les performances.",
    privacy_privacy_heading: 'Confidentialité et traitement des données',
    privacy_local_processing:
      "Traitement local: Tout le traitement d'image se déroule localement dans votre navigateur (côté client). Les signatures capturées ne quittent jamais votre appareil et ne sont pas téléchargées sur un serveur. Cela signifie vos images de signature restent privées et sous votre contrôle à tout moment.",
    privacy_no_data:
      "Données de signature: L'application ne demande pas de compte et ne stocke, ne transmet ni ne partage votre image de signature.",
    privacy_analytics:
      "Analytique: Le site hébergé charge Cloudflare Web Analytics pour collecter des mesures agrégées de pages vues et de performances. Cloudflare indique que cette balise analytique n'utilise ni cookies ni stockage local, et l'application ne l'utilise pas pour identifier les utilisateurs ni collecter des images de signature.",
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
    open_menu: '\u6253\u5f00\u83dc\u5355',
    close_menu: '关闭',
    hide_info: '\u9690\u85cf\u4fe1\u606f',
    show_info: '\u663e\u793a\u4fe1\u606f',
    place_signature: '将签名放在框内',
    start: '开始',
    stop: '停止',
    capture_btn: '拍摄',
    clean: '清理',
    save: '保存',
    select_camera: '选择摄像头...',
    preview_placeholder: '拍摄签名以在此处查看',
    camera_not_ready: '摄像头仍在启动',
    camera_permission_denied:
      '相机访问被阻止。请在浏览器中允许相机权限，然后重试。',
    camera_retry: '重试相机',
    camera_selected_message: '已启用最佳摄像头以获得更清晰的拍摄',
    start_camera: '启动摄像头',
    stop_camera: '停止摄像头',
    signature_copied: '签名已复制到剪贴板！',
    signature_clipboard_unavailable: '剪贴板不可用。仍可下载文件。',
    signature_saved: '文件已保存。',
    signature_saved_and_copied: '文件已保存并复制到剪贴板。',
    language: '语言',
    source_repository: '\u6e90\u4ee3\u7801\u4ed3\u5e93',
    home_footer_1:
      '在 Signature Capture，您的隐私至关重要。所有处理都在本地完成，捕获的图像绝不会离开您的设备。',
    home_footer_read: '阅读我们的',
    home_footer_privacy: '完整隐私政策',
    home_footer_and: '并进一步了解',
    home_footer_about: '该项目',
    home_seo_heading: '免费签名背景移除工具',
    home_seo_intro:
      '直接在浏览器中把纸上的手写签名转换为透明 PNG。使用摄像头拍摄、清理纸张背景，然后下载或复制完成的签名图片。',
    home_seo_steps_heading: '工作方式',
    home_seo_capture_title: '拍摄',
    home_seo_capture_body:
      '将手写签名放入引导框中，并用手机或桌面摄像头捕获一帧图像。',
    home_seo_remove_background: '移除白色纸张背景',
    home_seo_remove_background_body:
      '应用会裁剪引导区域，并将签名笔画转换成黑色、透明背景的 PNG。',
    home_seo_transparent_png: '下载透明 PNG',
    home_seo_transparent_png_body:
      '保存完成的签名图片，用于 Word 文档、PDF、表单和文档叠加。',
    home_seo_no_upload: '无需上传',
    home_seo_no_upload_body:
      '签名图片会在你的浏览器中本地处理。应用不要求注册账户，也不会上传你的签名。',
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
    instructions_pwa_heading: '安装到手机',
    instructions_pwa_intro:
      'Signature Capture 可以作为 PWA 添加到主屏幕。它使用标准网页应用安装支持，不需要从应用商店下载。',
    instructions_pwa_android_heading: 'Android 10+',
    instructions_pwa_android:
      '在 Android 10 或更高版本上使用最新的 Chrome、Edge 或 Samsung Internet。打开网站，点击浏览器菜单，然后选择安装应用或添加到主屏幕。',
    instructions_pwa_ios_heading: 'iOS/iPadOS 16.4+',
    instructions_pwa_ios:
      '在 iPhone 或 iPad 上使用 Safari。点击分享，选择添加到主屏幕；如果出现作为网页应用打开选项，请保持开启，然后点击添加。iOS 16.3 或更早版本需要使用 Safari 才能安装到主屏幕。',
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
    faq_q_remove_white_background:
      '如何移除签名的白色背景？',
    faq_a_remove_white_background:
      '请用深色笔在白纸上书写，将签名放入引导框，点击拍摄，然后点击清理。应用会移除纸张背景并保留签名笔画。',
    faq_q_make_transparent:
      '如何让手写签名变成透明背景？',
    faq_a_make_transparent:
      '拍摄后，清理和保存操作会将签名导出为带透明背景像素的 PNG。',
    faq_q_use_in_documents: '可以在 Word、PDF 或表单中使用这个 PNG 吗？',
    faq_a_use_in_documents:
      '可以。透明 PNG 适合文档叠加、表单、Word 文件、PDF 流程以及其他接受签名图片的位置。',
    faq_q_digital_signature:
      '这是数字签名，还是只是签名图片？',
    faq_a_digital_signature:
      '它会创建一张透明的签名图片。它不是加密数字签名，不能验证文档身份或完整性。',
    faq_q2: '我会得到什么格式的文件？',
    faq_a2: '你的签名会以高质量的透明背景 PNG 下载。',
    faq_q3: '需要安装特殊软件吗？',
    faq_a3: '不需要，一切都在浏览器中完成。',
    faq_q_install: '可以安装到 Android 或 iOS 吗？',
    faq_a_install:
      '可以。网站已经包含 PWA 安装所需的技术配置：HTTPS 托管、网页应用清单、应用图标、启动 URL、全屏显示模式和 service worker。请使用 Android 10+ 和支持安装的最新版浏览器，或在 iOS/iPadOS 16.4+ 上使用 Safari；相机拍摄仍需要浏览器相机权限。',
    faq_q4: '我的签名安全吗？',
    faq_a4: '签名图像不会离开你的设备，除非你选择下载。我们不会存储或传输你的签名数据。',
    faq_q_open_source: '这个项目是开源的吗？',
    faq_a_open_source: '是的。你可以查看代码、本地运行，并部署自己的版本。',
    faq_q5: '如果摄像头无法工作怎么办？',
    faq_a5: '请检查浏览器是否已获得摄像头权限并刷新页面，或排查摄像头设置问题。',
    privacy_meta_title: '隐私政策 - Signature Capture',
    privacy_meta_description: 'Signature Capture 网站的隐私实践。',
    privacy_heading: '隐私政策',
    privacy_intro:
      'Signature Capture 是开源项目，设计目标是让签名图像保留在你的设备上。托管的网站还使用以隐私为先的 Cloudflare Web Analytics，以了解汇总流量和性能。',
    privacy_privacy_heading: '隐私与数据处理',
    privacy_local_processing:
      '本地处理： 所有图像处理都在你的浏览器本地完成（客户端）。捕获的签名绝不会离开你的设备或上传到任何服务器。这意味着你的签名图片始终私密且由你掌控。',
    privacy_no_data:
      '签名数据： 本应用不要求创建账户，也不会存储、传输或分享你的签名图像。',
    privacy_analytics:
      '分析： 托管的网站会加载 Cloudflare Web Analytics，用于收集汇总的页面浏览和性能指标。Cloudflare 表示该分析 beacon 不使用 cookie 或本地存储，本应用也不会使用它来识别用户或收集签名图像。',
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
