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

				<div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none' />
				<div
					className='absolute top-0 right-0 w-80 h-80 opacity-10
                     bg-[--brand_color_100] transform -rotate-45 blur-[80px]
                     pointer-events-none'
				/>
				{/* 2. Glow Central Superior (Efecto "Spotlight") */}
				{/* <div
					className='absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] opacity-20 
          bg-[--brand_color] blur-[120px] rounded-full pointer-events-none mix-blend-screen'
				/> */}

				{/* Fondo Decorativo 2 (Esquina inferior izquierda): Para equilibrar el diseño */}
				<div
					className='absolute bottom-0 left-0 w-96 h-96 opacity-10
                     bg-[--brand_color_100] transform rounded-full -rotate-45 blur-[80px]
                     pointer-events-none'
				/>

				{/* Contenido principal centrado */}
				<div className='relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-8'>
					{/* Título Principal */}
					<h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight'>
						<span className='block text-[--light_0] drop-shadow-sm'>
							{LANGUAGE.WELCOME.HERO_WELCOME_1[preferences.language]}
						</span>

						{/* Gradiente mejorado con un toque de brillo */}
						<span
							className='block text-transparent bg-clip-text 
               bg-gradient-to-r from-[--brand_color] via-[--brand_color_100] to-[--brand_color] 
               bg-[length:200%_auto] animate-gradient'
						>
							{LANGUAGE.WELCOME.HERO_WELCOME_2[preferences.language]}
						</span>
					</h1>

					{/* Descripción (Más legible y contenida) */}
					<p className='text-lg sm:text-xl text-[--light_200] max-w-2xl mx-auto font-normal leading-relaxed text-opacity-90'>
						{LANGUAGE.WELCOME.HERO_DESCRIPTION[preferences.language]}
					</p>

					{/* Contenedor de Botones (Más profesional y espaciado) */}
					<div className='mt-12 flex flex-wrap gap-5 justify-center'>
						<Link
							to={logged ? '#store' : '/login'}
							className='relative group px-8 py-4 rounded-full font-bold text-lg
                   bg-[--brand_color] text-[--bg_prim] overflow-hidden
                   shadow-[0_0_20px_-5px_var(--brand_color)] hover:shadow-[0_0_30px_-5px_var(--brand_color)]
                   transition-all duration-300 transform hover:-translate-y-1'
							onClick={() => (logged ? scrollToElem('store') : null)}
						>
							<div className='absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full' />
							<span className='relative z-10 flex items-center justify-center gap-2'>
								{logged
									? LANGUAGE.WELCOME.HERO_BUTTON_SEE[preferences.language]
									: LANGUAGE.WELCOME.HERO_BUTTON_START[preferences.language]}
								<svg
									className={`w-5 h-5 transition-transform ${
										logged
											? 'rotate-90 group-hover:translate-y-1'
											: 'group-hover:translate-x-1'
									}`}
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 7l5 5m0 0l-5 5m5-5H6'
									/>
								</svg>
							</span>
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
