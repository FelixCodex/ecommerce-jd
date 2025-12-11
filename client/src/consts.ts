export const POSITIONS = {
	Home: { left: '0px', width: '43' },
	About: { left: '73px', width: '48' },
	Contact: { left: '150px', width: '56' },
	User: { left: '200px', width: '0' },
};

export const LOG_AXIOS_ERRORS = true;
export const LOG_AXIOS_DATA = true;

export const API_URL = 'https://api-url.app/app/';
// export const API_URL = 'https://ss8xzg8b-3000.use.devtunnels.ms/app/';

export const IMG_API_URL = 'https://api-url.app/imgs/';

export const BRANDNAME = 'Javier David';

export const SUPPORT_EMAIL = 'support@javier-david.com';

export const months = {
	en: [
		'January',
		'Febrary',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	],
	es: [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviember',
		'Diciember',
	],
};

export const LANGUAGE = {
	WELCOME: {
		HERO_WELCOME_1: {
			es: 'Dando vida a',
			en: 'Bringing life to new',
		},
		HERO_WELCOME_2: {
			es: 'Nuevas Realidades Inmersivas',
			en: 'Immersive Realities',
		},
		HERO_DESCRIPTION: {
			es: 'Eleva tu narrativa visual con modelos diseñados meticulosamente. Desde piezas de arte hasta topologías impecable, la base ideal para tu próxima obra maestra.',
			en: 'Elevate your visual storytelling with meticulously engineered models. From pieces of art to flawless topology, the ideal foundation for your next masterpiece.',
		},
		HERO_BUTTON_START: {
			es: 'Empezar ahora',
			en: 'Get Started',
		},
		HERO_BUTTON_SEE: {
			es: 'Ver mis productos',
			en: 'See my products',
		},
		HERO_BUTTON_CONTACT: {
			es: 'Contactar',
			en: 'Contact',
		},
	},
	NAVBAR: {
		HOME: {
			es: 'Inicio',
			en: 'Home',
		},
		ABOUT: {
			es: 'Sobre nosotros',
			en: 'About us',
		},
		CONTACT: {
			es: 'Contactar',
			en: 'Contact',
		},
		CART: {
			es: 'Carrito',
			en: 'Cart',
		},
		DASHBOARD: {
			es: 'Perfil',
			en: 'Dashboard',
		},
		LOGIN: {
			es: 'Iniciar Sesión',
			en: 'Login',
		},
	},
	CART: {
		TITLE: {
			es: 'Carrito',
			en: 'Shopping Cart',
		},
		SUMMARY: {
			es: 'Resumen',
			en: 'Summary',
		},
		LOADING: {
			es: 'Cargando carrito',
			en: 'Loading cart',
		},
		PRODUCT: {
			es: 'Productos',
			en: 'Products',
		},
		TOTAL: {
			es: 'Total',
			en: 'Total',
		},
		PAY: {
			es: 'Pagar',
			en: 'Pay',
		},
		ANY_PRODUCT: {
			es: 'No tienes ningún producto en el carrito',
			en: "You don't have any product in the cart",
		},
		DELETE: {
			es: 'Eliminar',
			en: 'Delete',
		},
	},
	DASHBOARD: {
		HI: {
			es: 'Hola',
			en: 'Hi',
		},
		PURCHASED: {
			es: 'Mis Productos Comprados',
			en: 'My Purchased Items',
		},
		LOADING_PURCHASED: {
			es: 'Cargando Productos Comprados',
			en: 'Loading Purchased Items',
		},
		ANYITEMS: {
			es: 'Aun no has comprado ningun producto',
			en: "You don't have any purchase yet",
		},
		MYITEMS: {
			es: 'Mis Products',
			en: 'My Items',
		},
		SETTINGS: {
			es: 'Ajustes',
			en: 'Settings',
		},
		LOGOUT: {
			es: 'Cerrar Sesión',
			en: 'Log out',
		},
		DOWNLOAD: {
			es: 'Descargar',
			en: 'Download',
		},
		DOWNLOADS: {
			es: 'Descargas',
			en: 'Downloads',
		},
		PURCHASED_AT: {
			es: 'Comprado el',
			en: 'Purchased at',
		},
		SPEED: {
			es: 'Velocidad',
			en: 'Speed',
		},
		ESTTIME: {
			es: 'Tiempo estimado',
			en: 'Estim. Time',
		},
		WRONG: {
			es: 'Algo salio mal con la descarga. ',
			en: 'Something went wrong with the download. ',
		},
		TRY: {
			es: 'Intentalo de nuevo ',
			en: 'Try again ',
		},
	},
	STORE: {
		TITLE: {
			es: 'Productos',
			en: 'Products',
		},
		LOADING: {
			es: 'Cargando productos',
			en: 'Loading products',
		},
		NO_PRODUCTS: {
			es: 'No hay ningún producto todavía',
			en: 'There are no products yet',
		},
		WRONG: {
			es: 'Algo salió mal.',
			en: 'Something went wrong.',
		},
		RELOAD: {
			es: 'Recargar',
			en: 'Reload',
		},
	},
	SETTINGS: {
		TITLE: {
			es: 'Ajustes de la Cuenta',
			en: 'Account Settings',
		},
		USER_PREF_TITLE: {
			es: 'Preferencias de usuario',
			en: 'User Preferences',
		},
		USER_PREF_DESCRIPTION: {
			es: 'Personliza tus ajustes de cuenta y preferencias',
			en: 'Customize your account settings and preferences',
		},
		LANGUAGE: {
			es: 'Lenguaje',
			en: 'Language',
		},
		CURRENCY: {
			es: 'Moneda (Esta opción es sólo para fines comparativos, los pagos son en EUR)',
			en: 'Currency (This option is for comparing purposes only, payments are in EUR)',
		},
		EMAIL: {
			es: 'Notificaciones por email',
			en: 'Email Notifications',
		},
		EMAIL_DESCRIPTION: {
			es: 'Recibe actualizaciones importantes a travéz de email',
			en: 'Receive important updates via email',
		},
		APPEARENCE_TITLE: {
			es: 'Apariencia',
			en: 'Appearance',
		},
		APPEARENCE_DESCRIPTION: {
			es: 'Personaliza la apariencia y la sensación',
			en: 'Customize the look and feel',
		},
		THEME: {
			es: 'Tema',
			en: 'Theme',
		},
		DARK: {
			es: 'Oscuro',
			en: 'Dark',
		},
		LIGHT: {
			es: 'Claro',
			en: 'Light',
		},
		SYSTEM: {
			es: 'Color del sistema',
			en: 'System',
		},
		BACK: {
			es: 'Atras',
			en: 'Back',
		},
		SAVE: {
			es: 'Guardar Cambios',
			en: 'Save Changes',
		},
	},
	CHECKOUT: {
		TITLE: {
			es: 'Checkout',
			en: 'Checkout',
		},
		SUMMARY: {
			es: 'Resumen de la compra',
			en: 'Order Summary',
		},
		TOTAL: {
			es: 'Total',
			en: 'Total',
		},
		ANY: {
			es: 'No tienes ningún producto en el carrito',
			en: "You don't have any product in the cart",
		},
		PAYMENT_INFORMATION: {
			es: 'Imformación del pago',
			en: 'Payment Information',
		},
		PAYMENT_METHODS: {
			es: 'Metodos de pago',
			en: 'Payment Methods',
		},
		NAME: {
			es: 'Nombre',
			en: 'Name',
		},
		LASTNAME: {
			es: 'Apellidos',
			en: 'Last Name',
		},
		PHONE: {
			es: 'Número de teléfono',
			en: 'Phone Number',
		},
		ADDRESS: {
			es: 'Dirección',
			en: 'Address',
		},
		COUNTRY: {
			es: 'País',
			en: 'Country',
		},
		CITY: {
			es: 'Ciudad',
			en: 'City',
		},
		POSTALCODE: {
			es: 'Codigo Postal',
			en: 'Postal Code',
		},
		PAY: {
			es: 'Pagar ahora',
			en: 'Pay now',
		},
		TERMS_AND_CONDITIONS: {
			es: 'Al continuar con el pago aceptas los Términos y Condiciones de la Plataforma Tropipay',
			en: 'By continuing with the payment you agree to the Terms and Conditions of Tropipay Platform',
		},
	},
	PRODUCT_BUTTON: {
		ACQUIRE: {
			es: 'Adquirir',
			en: 'Acquire',
		},
		SAVED_DASH: {
			es: 'Guardado en tu perfil',
			en: 'Saved in your Dashboard',
		},
		DOWNLOAD: {
			es: 'Descargar',
			en: 'Download',
		},
		GO_TO_CART: {
			es: 'Ir al carrito',
			en: 'Go to Cart',
		},
		ADD: {
			es: 'Añadir al carro',
			en: 'Add to Cart',
		},
		NOW: {
			es: 'Comprar ahora',
			en: 'Buy now',
		},
		FROM: {
			es: 'Desde',
			en: 'From',
		},
		FREE: {
			es: 'Gratis',
			en: 'Free',
		},
		LOGIN: {
			es: 'Iniciar sesión',
			en: 'Login to buy',
		},
	},
	CURRENCIES: {
		EUR: '€',
		USD: '$',
	},
	CONTACT: {
		TITLE: {
			es: 'Contacta con Nosotros',
			en: 'Contact Us',
		},
		TOUCH: {
			es: 'Ponte en contacto',
			en: 'Get in Touch',
		},
		NAME: {
			es: 'Nombre',
			en: 'Name',
		},
		EMAIL: {
			es: 'Correo electrónico',
			en: 'Email',
		},
		MESSAGE: {
			es: 'Mensaje',
			en: 'Message',
		},
		SEND: {
			es: 'Enviar mensaje',
			en: 'Send Message',
		},
		CONTACT_INFO: {
			es: 'Contactanos a travéz de',
			en: 'Contact us through',
		},
		PLACEHOLDER_NAME: {
			es: 'Tu nombre',
			en: 'Your name',
		},
		PLACEHOLDER_EMAIL: {
			es: 'tu@email.com',
			en: 'your@email.com',
		},
		PLACEHOLDER_MESSAGE: {
			es: 'Tu mensage',
			en: 'Your message',
		},
	},
	LOGIN: {
		TITLE: {
			es: 'Inicia sesión en tu cuenta',
			en: 'Sign in to your account',
		},
		EMAIL: {
			es: 'Dirección de correo',
			en: 'Email address',
		},
		PASS: {
			es: 'Contraseña',
			en: 'Password',
		},
		REMEMBERME: {
			es: 'Recuerdame',
			en: 'Remember me',
		},
		FORGOT: {
			es: 'Olvidó su contraseña?',
			en: 'Forgot your password?',
		},
		DONT_HAVE_ACCOUNT: {
			es: 'No tienes una cuenta? Crear cuenta',
			en: "Don't have an account? Sign up",
		},
		SIGNIN: {
			es: 'Iniciar Sesion con correo',
			en: 'Sign in with email',
		},
		SIGNIN_GOOGLE: {
			es: 'Continuar con Google',
			en: 'Continue with Google',
		},
		EMAIL_VALID: {
			es: 'Email válido',
			en: 'Valid email',
		},
		EMAIL_NOT_VALID: {
			es: 'Email no válido',
			en: 'Invalid email',
		},
		PASS_VALID: {
			es: 'Contraseña válida',
			en: 'Valid password',
		},
		PASS_NOT_VALID: {
			es: 'Mínimo 6 caracteres',
			en: 'Password should be 6 characters long',
		},
	},
	REGISTER: {
		TITLE: {
			es: 'Crear una Cuenta',
			en: 'Sign Up',
		},
		USERNAME: {
			es: 'Nombre de usuario',
			en: 'Username',
		},
		EMAIL: {
			es: 'Dirección de correo',
			en: 'Email address',
		},
		PASS: {
			es: 'Contraseña',
			en: 'Password',
		},
		REPEAT_PASS: {
			es: 'Repita la contraseña',
			en: 'Repeat password',
		},
		REMEMBERME: {
			es: 'Recuerdame',
			en: 'Remember me',
		},
		ALREADY_ACCOUNT: {
			es: 'Ya tienes una cuenta?',
			en: 'Already have an account?',
		},
		SIGNUP: {
			es: 'Crear cuenta',
			en: 'Sign up',
		},
		USERNAME_VALID: {
			es: 'Nombre de usuario válido',
			en: 'Valid username',
		},
		USERNAME_NOT_VALID: {
			es: 'Mínimo 3 caracteres',
			en: 'Username should be 3 characters long',
		},
		EMAIL_VALID: {
			es: 'Email válido',
			en: 'Valid email',
		},
		EMAIL_NOT_VALID: {
			es: 'Email no válido',
			en: 'Invalid email',
		},
		PASS_VALID: {
			es: 'Contraseña válida',
			en: 'Valid password',
		},
		PASS_NOT_VALID: {
			es: 'Mínimo 6 caracteres',
			en: 'Password should be 6 characters long',
		},
		PASS_NOT_MATCH: {
			es: 'Las contraseñas no coinicden',
			en: "Passwords don't match",
		},
	},
	PRODUCT: {
		INFORMATION: {
			es: 'Información',
			en: 'Information',
		},
		DESCRIPTION: {
			es: 'Descripción',
			en: 'Description',
		},
		IMAGE_UNAVAILABLE: {
			es: 'Imagen No Disponible',
			en: 'Image Unavaliable',
		},
		COMMENTS: {
			es: 'Comentarios',
			en: 'Comments',
		},
		ADD_COMMENT: {
			es: 'Agregar un comentario',
			en: 'Add a Comment',
		},
		WRITE_COMMENT: {
			es: 'Escribe tu comentario aqui...',
			en: 'Write your comment here...',
		},
		COMMENT: {
			es: 'Comentar',
			en: 'Comment',
		},
		LOADING_COMMENTS: {
			es: 'Cargando comentarios...',
			en: 'Loading comments...',
		},
		NO_COMMENTS: {
			es: 'Este producto no tiene comentarios todavía',
			en: 'This product has no comments yet',
		},
		BE_FIRST: {
			es: 'Sé el primero!',
			en: 'Be the first one!',
		},
		SINCE: {
			es: 'Hace',
			en: 'Since',
		},
		LICENSE: {
			es: 'Licencia',
			en: 'License',
		},
		PERSONAL: {
			es: 'Licencia Estandar',
			en: 'Standard License',
		},
		PERSONAL_LICENSE: {
			es: 'Licencia Estandar ',
			en: 'Standard License ',
		},
		PROFESSIONAL: {
			es: 'Licencia Comercial',
			en: 'Commercial License',
		},
		PROFESSIONAL_LICENSE: {
			es: 'Licencia Comercial',
			en: 'Commercial License',
		},
		FILES: {
			es: 'Archivos',
			en: 'Files',
		},
		DETAILS: {
			es: 'Detalles',
			en: 'Details',
		},
		PUBLISHED_AT: {
			es: 'Fecha de publicación',
			en: 'Publish date',
		},
		WEIGHT: {
			es: 'Peso',
			en: 'Weight',
		},
		FORMATS: {
			es: 'Formatos incluidos',
			en: 'Included formats',
		},
		LOADING_PRODUCTS: {
			es: 'Cargando productos',
			en: 'Loading Products',
		},
	},
	PAY_SUCCESS: {
		TITLE: {
			es: 'Pago Exitoso',
			en: 'Payment Success',
		},
		TEXT1: {
			es: 'Queremos expresarte nuestro más sincero agradecimiento por tu compra en nuestra tienda virtual. Nos llena de alegría contar con clientes tan valiosos como tú, y tu confianza en nosotros es lo que nos motiva a seguir mejorando día a día. Espero que disfrutes de tu compra tanto como nosotros disfrutamos preparándola para ti.',
			en: 'We want to express our most sincere gratitude for your purchase in our virtual store. It fills us with joy to have clients as valuable as you, and your trust in us is what motivates us to continue improving day by day. I hope you enjoy your purchase as much as we enjoyed preparing it for you.',
		},
		TEXT2: {
			es: '¡Pronto tendra disponible sus productos en su perfil!',
			en: 'Your products will soon be available on your dashboard!',
		},
		TEXT3: {
			es: '¡Gracias por ser parte de nuestra comunidad y por contribuir a que sigamos creciendo!',
			en: 'Thank you for being part of our community and for helping us continue to grow!',
		},
		GREETINGS: {
			es: 'Un cordial saludo',
			en: 'Sincerely',
		},
		HOME: {
			es: 'Volver a Inicio',
			en: 'Back Home',
		},
		DASHBOARD: {
			es: 'Ir a tu Perfil',
			en: 'Go to Dashboard',
		},
		PRODUCTS: {
			es: 'Productos comprados',
			en: 'Purchased products',
		},
		DETAILS: {
			es: 'Detalles del pago',
			en: 'Payment Details',
		},
		AMOUNT: {
			es: 'Monto pagado',
			en: 'Amount paid',
		},
		ORDER: {
			es: 'Codigo de la orden',
			en: 'Order Code',
		},
		PAY_ID: {
			es: 'Codigo del pago',
			en: 'Payment Code',
		},
		DATE: {
			es: 'Fecha del pago',
			en: 'Payment Date',
		},
	},
	PAY_FAILED: {
		TITLE: {
			es: 'Pago Fallido',
			en: 'Payment Failed',
		},
		TEXT1: {
			es: 'Lo sentimos, hubo un problema con tu pago.',
			en: "We're sorry, there was a problem with your payment.",
		},
		TEXT2: {
			es: 'Agradecemos tu intención de compra en nuestra tienda y, al mismo tiempo, le informamos que hubo un inconveniente con el procesamiento de tu pago. Lamentamos mucho esta situación y entendemos lo frustrante que puede ser.',
			en: 'We appreciate your intention to purchase in our store and, at the same time, we inform you that there was a problem with the processing of your payment. We are very sorry about this situation and understand how frustrating it can be.',
		},
		TEXT3: {
			es: 'Te sugerimos verificar con tu banco o método de pago si hubo algún bloqueo o restricción.',
			en: 'We suggest you check with your bank or payment method if there were any blocks or restrictions.',
		},
		TEXT4: {
			es: 'Gracias por tu paciencia y por confiar en nosotros.',
			en: 'Thank you for your patience and for trusting us.',
		},
		GREETINGS: {
			es: 'Un cordial saludo',
			en: 'Sincerely',
		},
		HOME: {
			es: 'Volver a Inicio',
			en: 'Back Home',
		},
		CART: {
			es: 'Ir al carrito',
			en: 'Go to Cart',
		},
		PRODUCTS: {
			es: 'Productos a comprar',
			en: 'Products to purchase',
		},
		DETAILS: {
			es: 'Detalles del pago',
			en: 'Payment Details',
		},
		AMOUNT: {
			es: 'Monto a pagar',
			en: 'Amount to paid',
		},
		ORDER: {
			es: 'Codigo de la orden',
			en: 'Order Code',
		},
		DATE: {
			es: 'Fecha del pago',
			en: 'Payment Date',
		},
	},
	TIME: {
		SECOND: {
			es: 'sec',
			en: 'sec',
		},
		MINUTE: {
			es: 'min',
			en: 'min',
		},
		HOUR: {
			es: 'hora',
			en: 'hour',
		},
		DAY: {
			es: 'día',
			en: 'day',
		},
		WEEK: {
			es: 'semana',
			en: 'week',
		},
		MONTH: {
			es: 'mese',
			en: 'month',
		},
		YEAR: {
			es: 'año',
			en: 'year',
		},
	},
	LOADING: {
		es: 'Cargando',
		en: 'Loading',
	},
};
