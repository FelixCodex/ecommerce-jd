import { Link } from 'react-router-dom';
import { LANGUAGE } from '../consts';
import { usePreferences } from '../hooks/usePreferences';
import '../App.css';
import { scrollToElem } from '../utils';
import { useAuth } from '../context/auth.context';
import { Store } from './Store';

export default function Welcome() {
	const { logged } = useAuth(); // Asumo que useAuth está definido
	const { preferences } = usePreferences(); // Asumo que usePreferences está definido

	return (
		// Contenedor principal: Altura completa, fondo oscuro con degradado sutil
		<article className=' overflow-x-hidden'>
			<article
				id='welcome'
				className='relative min-h-screen h-screen flex pt-[14vh] md:pt-6 items-start md:items-center justify-center overflow-visible p-6 bg-[--bg_bg_prim]'
			>
				{/* Fondo Decorativo 1 (Esquina superior derecha): Un 'glow' más sutil y angular para un toque moderno */}
				<div
					className='absolute top-0 right-0 w-96 h-96 opacity-15 
                      bg-[--brand_color] transform rotate-45 blur-[100px] 
                      pointer-events-none'
				/>

				{/* Fondo Decorativo 2 (Esquina inferior izquierda): Para equilibrar el diseño */}
				<div
					className='absolute bottom-0 left-0 w-80 h-80 opacity-10 
                      bg-[--brand_color_100] transform -rotate-45 blur-[80px] 
                      pointer-events-none'
				/>

				{/* Contenido principal centrado */}
				<div className='relative z-10 max-w-5xl w-full text-center'>
					{/* Título Principal (Hero Title) */}
					<h1 className='text-6xl sm:text-7xl md:text-8xl font-black leading-tight tracking-tighter'>
						{/* Primera línea: Texto claro y fuerte */}
						<span className='block text-[--light_0]'>
							{/* {LANGUAGE.WELCOME.HERO_WELCOME[preferences.language]} */}
							{LANGUAGE.WELCOME.HERO_WELCOME_1[preferences.language]}
						</span>

						{/* Segunda línea (Destacada): Gradiente vibrante y audaz */}
						<span
							className='block text-transparent bg-clip-text 
                           bg-gradient-to-r from-[--brand_color] to-[--brand_color_100]'
						>
							{LANGUAGE.WELCOME.HERO_WELCOME_2[preferences.language]}
						</span>
					</h1>

					{/* Subtítulo / Descripción */}
					<p className='mt-6 text-xl sm:text-2xl text-[--light_200] max-w-3xl mx-auto font-light'>
						{LANGUAGE.WELCOME.HERO_DESCRIPTION[preferences.language]}
					</p>

					{/* Contenedor de Botones (Más profesional y espaciado) */}
					<div className='mt-12 flex flex-wrap gap-5 justify-center'>
						{/* Botón Principal (Destacado y de acción clara) */}
						<Link
							to={logged ? '#store' : '/login'}
							className='group px-10 py-4 rounded-full font-bold text-xl 
                       bg-[--brand_color] text-[--bg_prim] shadow-2xl shadow-[--brand_color]/30
                       hover:bg-[--brand_color_100] hover:shadow-[--brand_color_100]/50
                       transform hover:scale-[1.03] transition-all duration-300 ease-in-out'
							onClick={() => (logged ? scrollToElem('store') : null)}
						>
							{logged
								? LANGUAGE.WELCOME.HERO_BUTTON_SEE[preferences.language]
								: LANGUAGE.WELCOME.HERO_BUTTON_START[preferences.language]}
						</Link>

						{/* Botón Secundario (Estilo 'Ghost' o con borde sutil) */}
						<Link
							to='/contact'
							className='p-4 px-8 flex items-center justify-center rounded-full font-semibold text-xl border border-[--brand_color] 
                       text-[--brand_color] hover:bg-[--brand_color] hover:text-[--bg_prim] 
                       transition-all duration-300'
						>
							{LANGUAGE.WELCOME.HERO_BUTTON_CONTACT[preferences.language]}
						</Link>
					</div>
				</div>
			</article>
			<Store />
		</article>
	);
}
