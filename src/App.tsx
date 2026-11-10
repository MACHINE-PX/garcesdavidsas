import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'

const A = '/assets/'
const logo = `${A}37bb0.png`

type Route =
  | 'inicio'
  | 'servicios'
  | 'realizados'
  | 'pabellon'
  | 'venta'
  | 'local'
  | 'experiencias'
  | 'nosotros'
  | 'contacto'
  | 'asistente'

const routes: Record<string, Route> = {
  inicio: 'inicio',
  servicios: 'servicios',
  'proyectos-en-venta': 'venta',
  'proyectos-realizados': 'realizados',
  'pabellon-arrayan': 'pabellon',
  'local-alameda': 'local',
  experiencias: 'experiencias',
  nosotros: 'nosotros',
  contacto: 'contacto',
  asistente: 'asistente',
}

function go(path: string) {
  window.location.hash = path === 'inicio' ? '#/' : `#/${path}`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Link({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <a className={className} href={to === 'inicio' ? '#/' : `#/${to}`}>
      {children}
    </a>
  )
}

function Header({ active }: { active: Route }) {
  const [open, setOpen] = useState(false)
  const nav = [
    ['inicio', 'Inicio'],
    ['servicios', 'Servicios'],
    ['proyectos-en-venta', 'Proyectos en venta'],
    ['proyectos-realizados', 'Proyectos realizados'],
    ['nosotros', 'Nosotros'],
    ['contacto', 'Contacto'],
  ]
  return (
    <>
      <header className="header">
        <Link to="inicio" className="brand" aria-label="David Garcés, inicio">
          <img src={logo} alt="David Garcés, arquitectura y construcción" />
        </Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? 'Cerrar' : 'Menú'}
        </button>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Navegación principal">
          {nav.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className={active === routes[to] || (active === 'local' && to === 'proyectos-en-venta') || (active === 'pabellon' && to === 'proyectos-realizados') || (active === 'asistente' && to === 'contacto') ? 'active' : ''}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="notice">PROPUESTA VISUAL · NAVEGACIÓN Y ACCIONES FUNCIONALES</div>
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <img className="footer-logo" src={logo} alt="David Garcés" />
          <p>Arquitectura & construcción. Una propuesta para conectar ideas, espacios y personas.</p>
        </div>
        <div className="footer-links">
          <strong>EXPLORAR</strong>
          <Link to="inicio">Inicio</Link> · <Link to="servicios">Servicios</Link> · <Link to="nosotros">Nosotros</Link>
          <br />
          <Link to="proyectos-realizados">Proyectos realizados</Link> · <Link to="proyectos-en-venta">Proyectos en venta</Link>
          <br />
          <Link to="experiencias">Experiencias audiovisuales</Link> · <Link to="contacto">Contacto</Link>
          <br />
          <a href="#top">↑ Volver al inicio</a>
        </div>
        <div className="muted footer-links">
          <strong>HABLEMOS</strong>
          <a href="mailto:contacto@davidgarces.example">contacto@davidgarces.example</a>
          <span>Correo provisional · Por confirmar</span>
          <span>Instagram / LinkedIn · Enlaces pendientes</span>
        </div>
      </div>
      <div className="legal">DAVID GARCÉS · Propuesta de diseño. Aviso legal, privacidad y datos de contacto pendientes de confirmar.</div>
    </footer>
  )
}

function Layout({ active, children }: { active: Route; children: ReactNode }) {
  return (
    <div id="top">
      <Header active={active} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function Intro({ crumb, eyebrow, title, text, note }: { crumb?: string; eyebrow: string; title: string; text: string; note?: string }) {
  return (
    <section className="intro section">
      {crumb && <button className="crumb" onClick={() => history.back()}>← {crumb}</button>}
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p className="lead">{text}</p>
      {note && <p className="small muted">{note}</p>}
    </section>
  )
}

function Button({ to, children, secondary = false, onClick }: { to?: string; children: ReactNode; secondary?: boolean; onClick?: () => void }) {
  const cls = secondary ? 'button secondary' : 'button'
  return to ? <Link to={to} className={cls}>{children}<span>↗</span></Link> : <button className={cls} onClick={onClick}>{children}<span>↗</span></button>
}

function Cta() {
  return (
    <section className="section cta">
      <div className="eyebrow">EL SIGUIENTE PASO</div>
      <h2>Tu idea merece un buen comienzo.</h2>
      <p className="lead">Conversemos sobre el espacio, tus objetivos y las posibilidades del proyecto.</p>
      <Button to="contacto">Hablemos de tu proyecto</Button>
    </section>
  )
}

const portfolio = [
  { type: 'COMERCIAL', city: 'Medellín', year: '2025', name: 'Pabellón Arrayán', img: '31b78.png', to: 'pabellon-arrayan' },
  { type: 'RESIDENCIAL', city: 'Envigado', year: '2024', name: 'Casa del Patio', img: '2b21b.png' },
  { type: 'COMERCIAL', city: 'Bogotá', year: '2025', name: 'Oficinas Umbral', img: '3ddef.png' },
  { type: 'COMERCIAL', city: 'Medellín', year: '2024', name: 'Tienda Materia', img: '29bbe.png' },
  { type: 'RESIDENCIAL', city: 'Rionegro', year: '2023', name: 'Casa Entre Árboles', img: '2b21b.png' },
  { type: 'RESIDENCIAL', city: 'Bogotá', year: '2025', name: 'Apartamento Luz', img: 'd8a07.png' },
]

const sales = [
  { type: 'LOCAL COMERCIAL', city: 'Medellín · El Poblado', detail: '145 m² · Disponible · Provisional', price: 'COP $980.000.000', name: 'Local Alameda', img: '29bbe.png', to: 'local-alameda' },
  { type: 'CASA', city: 'Rionegro · Llanogrande', detail: '280 m² · En desarrollo · Provisional', price: 'COP $1.450.000.000', name: 'Casa Horizonte', img: '2b21b.png' },
  { type: 'OFICINA', city: 'Bogotá · Chicó', detail: '92 m² · Disponible · Provisional', price: 'COP $690.000.000', name: 'Oficina Terra', img: '3ddef.png' },
]

function ProjectCard({ project }: { project: (typeof portfolio)[number] }) {
  return (
    <article className="card">
      <img src={A + project.img} alt={project.name} />
      <div className="eyebrow">{project.type} · {project.city} · {project.year}</div>
      <h3>{project.name}</h3>
      <p className="small muted">Proyecto demostrativo · Datos e imágenes de referencia</p>
      <Link to={project.to || 'proyectos-realizados'} className="text-link">Ver proyecto ↗</Link>
    </article>
  )
}

function SaleCard({ item }: { item: (typeof sales)[number] }) {
  return (
    <article className="card sale-card">
      <img src={A + item.img} alt={item.name} />
      <div className="eyebrow">{item.type}</div>
      <h3>{item.name}</h3>
      <p className="muted">{item.city}</p>
      <p>{item.detail}</p>
      <p className="price">{item.price}</p>
      <p className="tiny muted">Proyecto demostrativo · Datos e imágenes de referencia. Precio e información de venta provisionales.</p>
      <Link to={item.to || 'proyectos-en-venta'} className="text-link">Ver detalles ↗</Link>
    </article>
  )
}

function Filters({ sale = false, onChange }: { sale?: boolean; onChange: (values: string[]) => void }) {
  const [values, setValues] = useState(['Todas', 'Todas', 'Todos'])
  const update = (index: number, value: string) => {
    const next = [...values]
    next[index] = value
    setValues(next)
    onChange(next)
  }
  return (
    <div className="filters">
      <label><span>{sale ? 'Ubicación' : 'Categoría'}</span><select value={values[0]} onChange={(e) => update(0, e.target.value)}>
        <option>Todas</option>
        {sale ? <><option>Medellín</option><option>Rionegro</option><option>Bogotá</option></> : <><option>Comercial</option><option>Residencial</option></>}
      </select></label>
      <label><span>{sale ? 'Tipo' : 'Ubicación'}</span><select value={values[1]} onChange={(e) => update(1, e.target.value)}>
        <option>Todas</option>{sale ? <><option>Local comercial</option><option>Casa</option><option>Oficina</option></> : <><option>Medellín</option><option>Envigado</option><option>Bogotá</option><option>Rionegro</option></>}
      </select></label>
      <label><span>{sale ? 'Rango de precio' : 'Año'}</span><select value={values[2]} onChange={(e) => update(2, e.target.value)}>
        <option>Todos</option>{sale ? <><option>Hasta COP $1.000M</option><option>Más de COP $1.000M</option></> : <><option>2025</option><option>2024</option><option>2023</option></>}
      </select></label>
    </div>
  )
}

function ContactForm({ subject }: { subject?: string }) {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }
  return (
    <form className="form" onSubmit={submit}>
      {subject && <p className="olive">Consulta de ejemplo: {subject}</p>}
      <label>Nombre<input required placeholder="Escribe aquí" /></label>
      <label>Correo electrónico<input required type="email" placeholder="tu@correo.com" /></label>
      <label>Tipo de proyecto<select required defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Diseño arquitectónico</option><option>Construcción</option><option>Proyecto en venta</option></select></label>
      <label>Mensaje<textarea required placeholder="Cuéntanos qué espacio tienes en mente…" /></label>
      <p className="tiny muted">Envío demostrativo no conectado a correo real. No se recopilan datos.</p>
      {sent ? <div className="success" role="status">Gracias. Tu consulta de demostración quedó preparada.</div> : <Button>Enviar consulta</Button>}
    </form>
  )
}

function Home() {
  return (
    <Layout active="inicio">
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(18,23,20,.86),rgba(18,23,20,.08)),url(${A}7247e.png)` }}>
        <div><h1>Diseñamos espacios.<br />Construimos<br />posibilidades.</h1>
          <p>Arquitectura residencial y comercial, diseño y construcción de proyectos que transforman ideas en espacios reales.</p>
          <div className="actions"><Button to="proyectos-realizados">Explorar proyectos</Button><Button to="servicios" secondary>Conocer servicios</Button></div>
        </div>
        <span>ARQUITECTURA COMERCIAL · Imagen de referencia, no obra oficial del estudio</span>
      </section>
      <section className="section center-copy"><div className="eyebrow">ESPACIOS CON INTENCIÓN</div><h2>Diseño que entiende cómo vivimos, trabajamos y nos encontramos.</h2><p className="lead">Una propuesta de identidad construida desde la claridad.</p></section>
      <section className="section alt"><div className="eyebrow">01 / LO QUE HACEMOS</div><h2>Soluciones arquitectónicas para cada proyecto</h2>
        <div className="grid three">
          {[['3e3d3.png','Diseño arquitectónico','Planeación residencial y comercial: concepto, distribución y definición de espacios a la medida.','servicios'],['93584.png','Construcción','Ejecución de obras con atención al detalle, coordinación técnica y seguimiento de cada etapa.','servicios'],['f45d5.png','Proyectos en venta','Una selección de espacios para habitar o desarrollar tu actividad comercial.','proyectos-en-venta']].map(([img,title,text,to])=><article className="card" key={title}><img src={A+img} alt={title}/><h3>{title}</h3><p className="muted">{text}</p><Link className="text-link" to={to}>Conocer más ↗</Link></article>)}
        </div>
      </section>
      <section className="section"><div className="eyebrow">02 / NUESTRAS MIRADAS</div><div className="grid two">
        <article className="feature-card"><img src={A+'25eea.png'} alt="Arquitectura comercial"/><h2>Arquitectura comercial</h2><p>Espacios que expresan una marca y enriquecen la experiencia de quienes los recorren.</p></article>
        <article className="feature-card"><img src={A+'c0baa.png'} alt="Arquitectura residencial"/><h2>Arquitectura residencial</h2><p>Lugares pensados para la vida cotidiana, la luz natural y la relación con el entorno.</p></article>
      </div></section>
      <section className="section alt"><div className="eyebrow">03 / PORTAFOLIO · REALIZADOS</div><h2>Proyectos que hablan por nosotros</h2><div className="grid three">{portfolio.map((p)=><ProjectCard key={p.name} project={p}/>)}</div><Button to="proyectos-realizados" secondary>Ver todos los realizados</Button></section>
      <section className="section"><div className="eyebrow">04 / PROYECTOS EN VENTA</div><h2>Encuentra tu próximo espacio</h2><div className="grid three">{sales.map((s)=><SaleCard key={s.name} item={s}/>)}</div><Button to="proyectos-en-venta" secondary>Explorar proyectos en venta</Button></section>
      <section className="section alt"><div className="eyebrow">05 / EXPERIENCIAS AUDIOVISUALES</div><h2>Descubre cada proyecto desde adentro</h2><div className="grid three">{[['556b3.png','Proceso de construcción'],['152a8.png','Resultado final'],['5237a.png','Recorrido virtual']].map(([img,title])=><article className="card" key={title}><img src={A+img} alt={title}/><h3>{title}</h3><p className="muted">Contenido audiovisual de demostración.</p></article>)}</div><Button to="experiencias" secondary>Ver experiencias audiovisuales</Button></section>
      <Cta />
    </Layout>
  )
}

function Services() {
  return <Layout active="servicios"><Intro crumb="Inicio / Servicios" eyebrow="DISEÑO + CONSTRUCCIÓN" title="De la primera idea al espacio construido." text="Una propuesta integral para proyectos residenciales y comerciales. Alcances y metodología pendientes de validación por el estudio." />
    <img className="full-image" src={A+'91dad.png'} alt="Patio interior de arquitectura contemporánea"/>
    <section className="section split"><div><div className="eyebrow">01 / DISEÑO ARQUITECTÓNICO</div><h2>Primero, entender cómo quieres vivir el espacio.</h2><p>Desde una vivienda hasta un entorno de trabajo o un local comercial, la propuesta comienza por comprender el lugar, las personas y el propósito del proyecto.</p><ul><li>Lectura del contexto y necesidades del cliente</li><li>Concepto arquitectónico y distribución espacial</li><li>Desarrollo de planos y materialidad</li><li>Coordinación con especialidades según alcance</li></ul><Button to="contacto">Consultar sobre diseño</Button></div><img src={A+'4cfe9.png'} alt="Mesa de diseño con planos"/></section>
    <section className="section alt split reverse"><img src={A+'0c918.png'} alt="Estructura de edificio en construcción"/><div><div className="eyebrow">02 / CONSTRUCCIÓN</div><h2>La precisión del diseño, en cada detalle de obra.</h2><p>Planeación del alcance, coordinación de obra y seguimiento de acabados para dar continuidad a la intención arquitectónica.</p><Button to="contacto">Consultar sobre construcción</Button></div></section>
    <section className="section"><div className="eyebrow">UN PROCESO CLARO</div><h2>Cada decisión tiene su momento.</h2><div className="grid four">{[['01','Escuchar','Objetivos, lugar y necesidades.'],['02','Proyectar','Concepto, planos y materiales.'],['03','Coordinar','Alcance, tiempos y especialidades.'],['04','Construir','Ejecución y cuidado del detalle.']].map(([n,t,d])=><div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section><Cta /></Layout>
}

function Portfolio() {
  const [filters, setFilters] = useState(['Todas','Todas','Todos'])
  const items = portfolio.filter((p) => (filters[0] === 'Todas' || p.type.toLowerCase() === filters[0].toLowerCase()) && (filters[1] === 'Todas' || p.city === filters[1]) && (filters[2] === 'Todos' || p.year === filters[2]))
  return <Layout active="realizados"><Intro crumb="Inicio / Proyectos realizados" eyebrow="PORTAFOLIO / REALIZADOS" title="Espacios que cuentan una idea." text="Arquitectura comercial y residencial, desde el concepto hasta el detalle. Explora una colección de ejemplos preparada para el futuro portafolio." note="Colección demostrativa. Ninguno de estos ejemplos se atribuye al estudio como obra real."/><section className="section"><Filters onChange={setFilters}/><div className="list-head"><span>{String(items.length).padStart(2,'0')} PROYECTOS DEMOSTRATIVOS</span><span>Comercial y residencial</span></div><div className="grid three">{items.map((p)=><ProjectCard key={p.name} project={p}/>)}</div>{!items.length&&<p className="empty">No hay proyectos que coincidan con estos filtros.</p>}</section><Cta/></Layout>
}

function Sales() {
  const [filters, setFilters] = useState(['Todas','Todas','Todos'])
  const items = sales.filter((s) => (filters[0] === 'Todas' || s.city.startsWith(filters[0])) && (filters[1] === 'Todas' || s.type.toLowerCase() === filters[1].toLowerCase()) && (filters[2] === 'Todos' || (filters[2].startsWith('Hasta') ? !s.price.includes('1.450') : s.price.includes('1.450'))))
  return <Layout active="venta"><Intro crumb="Inicio / Proyectos en venta" eyebrow="ESPACIOS / EN VENTA" title="Una nueva posibilidad comienza aquí." text="Una selección de propuestas para vivir, trabajar o darle forma a tu próximo negocio." note="Catálogo demostrativo · Información de venta provisional. No representa una oferta comercial ni permite reservas o compras."/><section className="section"><Filters sale onChange={setFilters}/><div className="list-head"><span>{String(items.length).padStart(2,'0')} PROPUESTAS DE REFERENCIA</span><span>Información provisional</span></div><div className="grid three">{items.map((s)=><SaleCard key={s.name} item={s}/>)}</div>{!items.length&&<p className="empty">No hay espacios que coincidan con estos filtros.</p>}</section><Cta/></Layout>
}

function Pavilion() {
  return <Layout active="pabellon"><Intro crumb="Inicio / Proyectos realizados / Pabellón Arrayán" eyebrow="COMERCIAL / PROYECTO DEMOSTRATIVO" title="Pabellón Arrayán" text="Un espacio abierto al encuentro, donde la luz y la materialidad construyen una experiencia de marca." note="Proyecto demostrativo · Datos e imágenes de referencia. No es una obra oficial de David Garcés."/><img className="full-image tall" src={A+'a58f4.png'} alt="Pabellón Arrayán rodeado de vegetación"/>
    <section className="section split"><div><div className="eyebrow">LA IDEA</div><h2>Un umbral entre la ciudad y el interior.</h2><p>En este ejemplo de arquitectura comercial, una fachada permeable conecta las áreas de atención con un patio de transición. La modulación de la estructura organiza recorridos claros y permite diferentes configuraciones de uso.</p><p>Piedra clara, metal y madera componen una atmósfera sobria.</p><Button to="contacto">Solicitar información</Button></div><aside className="facts"><div className="eyebrow">FICHA / DATOS FICTICIOS</div><b>Tipo</b><span>Arquitectura comercial</span><b>Ubicación</b><span>Medellín, Colombia</span><b>Año</b><span>2025</span><b>Área</b><span>420 m²</span></aside></section>
    <section className="section alt"><div className="eyebrow">GALERÍA DE REFERENCIA / 01—03</div><h2>El proyecto, en sus detalles.</h2><div className="gallery two"><img src={A+'1cf8a.png'} alt="Interior del proyecto"/><img src={A+'e6f75.png'} alt="Detalle de materialidad"/></div></section>
    <section className="section"><div className="eyebrow">CONTINÚA EXPLORANDO</div><h2>Otras formas de habitar el espacio.</h2><div className="grid two"><ProjectCard project={{...portfolio[2],img:'b564e.png'}}/><ProjectCard project={{...portfolio[3],img:'11976.png'}}/></div></section></Layout>
}

function LocalDetail() {
  return <Layout active="local"><Intro crumb="Inicio / Proyectos en venta / Local Alameda" eyebrow="EN VENTA / LOCAL COMERCIAL" title="Local Alameda" text="Medellín · El Poblado · Ubicación de ejemplo" note="Proyecto demostrativo · Datos e imágenes de referencia. Información comercial provisional, no constituye una oferta."/><img className="full-image tall" src={A+'f9b82.png'} alt="Interior de Local Alameda"/>
    <section className="section split"><div><div className="eyebrow">UN LUGAR PARA TU MARCA</div><h2>Amplitud, luz y nuevas posibilidades.</h2><p>Propuesta ficticia de un local a nivel de calle, con un área abierta que permite adaptar la distribución a distintos formatos comerciales.</p><h3>Características de referencia</h3><ul><li>Área abierta adaptable</li><li>Acceso independiente desde el exterior</li><li>Fachada con entrada de luz natural</li><li>Zona de apoyo y baño de servicio</li></ul></div><aside className="facts"><div className="eyebrow">PRECIO DE EJEMPLO</div><h3>COP $980.000.000</h3><b>Tipo</b><span>Local comercial</span><b>Área de referencia</b><span>145 m²</span><b>Ubicación</b><span>Medellín · El Poblado</span><b>Estado provisional</b><span>Disponible</span><Button to="contacto">Consultar este proyecto</Button></aside></section>
    <section className="section alt"><div className="eyebrow">GALERÍA / IMÁGENES DE REFERENCIA</div><div className="gallery two"><img src={A+'a254c.png'} alt="Fachada de referencia"/><img src={A+'786f8.png'} alt="Detalle constructivo"/></div></section>
    <section className="section split"><div><div className="eyebrow">CONSULTA / SIN COMPROMISO</div><h2>Conoce más sobre este espacio.</h2><p>El correo es el canal principal. Cuando exista información oficial, podrás solicitar disponibilidad, características y condiciones.</p><p className="contact-email">contacto@davidgarces.example</p><Button to="proyectos-en-venta" secondary>Volver a proyectos en venta</Button></div><ContactForm subject="Local Alameda"/></section></Layout>
}

function Experiences() {
  const [modal, setModal] = useState<string | null>(null)
  const experiences = [['556b3.png','Proceso de construcción'],['152a8.png','Resultado final'],['5237a.png','Recorrido virtual']]
  return <Layout active="experiencias"><Intro crumb="Inicio / Experiencias audiovisuales" eyebrow="MIRAR / COMPRENDER / RECORRER" title="La arquitectura, desde otra perspectiva." text="Un espacio editorial preparado para mostrar procesos, resultados y futuros recorridos. Todos los formatos se presentan como demostración estática."/>
    <section className="section alt split"><img src={A+'60963.png'} alt="Proceso de construcción"/><div><div className="eyebrow">PROCESO DE CONSTRUCCIÓN</div><h2>Lo que sucede antes de habitar.</h2><p>Una futura mirada a las decisiones y etapas de una obra.</p><Button secondary onClick={()=>setModal('Video pendiente de suministro')}>Vista de modal demo</Button></div></section>
    <section className="section"><div className="eyebrow">05 / EXPERIENCIAS AUDIOVISUALES</div><h2>Descubre cada proyecto desde adentro</h2><div className="grid three">{experiences.map(([img,title])=><button className="card media-card" key={title} onClick={()=>setModal(title)}><img src={A+img} alt=""/><h3>{title}</h3><p className="muted">Abrir experiencia de demostración ↗</p></button>)}</div></section>
    <section className="section alt split"><div><div className="eyebrow">360° / ESPACIO RESERVADO</div><h2>Imaginar el recorrido.<br/>Preparar la experiencia.</h2><p>Simulación estática para definir la ubicación de una futura experiencia 360°. Esta imagen no es un recorrido auténtico.</p></div><img src={A+'e1445.png'} alt="Simulación estática de recorrido"/></section>
    {modal&&<div className="modal-backdrop" role="dialog" aria-modal="true" onClick={()=>setModal(null)}><div className="modal" onClick={(e)=>e.stopPropagation()}><button onClick={()=>setModal(null)}>Cerrar ×</button><div className="eyebrow">DEMOSTRACIÓN AUDIOVISUAL</div><h2>{modal}</h2><p>No hay un archivo disponible. Esta interacción define el comportamiento futuro del contenido.</p></div></div>}</Layout>
}

function About() {
  return <Layout active="nosotros"><Intro crumb="Inicio / Nosotros" eyebrow="DAVID GARCÉS / ARQUITECTURA & CONSTRUCCIÓN" title="Pensar el espacio. Cuidar el proceso." text="Propuesta de presentación institucional pendiente de revisión y aprobación del estudio."/><img className="full-image" src={A+'327fb.png'} alt="Detalle de arquitectura y materialidad"/>
    <section className="section alt split"><div><div className="eyebrow">06 / EL ESTUDIO</div><h2>Arquitectura con visión y propósito</h2><p>Una mirada que busca unir calidad, confianza y una relación cercana durante cada etapa del proyecto.</p><Button to="contacto" secondary>Conocer el estudio</Button></div><aside className="quote"><div className="eyebrow">DAVID GARCÉS / EQUIPO</div><h3>Las personas detrás de cada idea.</h3><p>Espacio reservado para fotografía real de David o del equipo.</p></aside></section>
    <section className="section"><div className="eyebrow">NUESTRA MIRADA / TEXTO PROPUESTO</div><h2>La confianza se diseña en cada decisión.</h2><div className="grid three">{[['Escucha y claridad','Comprender necesidades, explicar alternativas y mantener una conversación cercana.'],['Coherencia arquitectónica','Relacionar función, entorno y materialidad en propuestas residenciales y comerciales.'],['Cuidado de la ejecución','Atender los detalles y coordinar el proceso para acompañar la intención del diseño.']].map(([t,d])=><div className="step" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div></section><Cta/></Layout>
}

function Contact() {
  return <Layout active="contacto"><Intro crumb="Inicio / Contacto" eyebrow="UNA CONVERSACIÓN, MUCHAS POSIBILIDADES" title="Hablemos de tu próximo proyecto" text="¿Un espacio comercial, una vivienda o una idea por construir? Cuéntanos lo que imaginas."/>
    <section className="section alt split"><div><div className="eyebrow">CONTACTO POR CORREO</div><p className="contact-email">contacto@davidgarces.example</p><p className="muted">Correo provisional · Pendiente de confirmar</p><img className="contact-img" src={A+'0636d.png'} alt="Detalle arquitectónico de referencia"/><Button to="asistente" secondary>Consultar por WhatsApp</Button></div><ContactForm/></section>
    <section className="section"><div className="eyebrow">ANTES DE ESCRIBIRNOS</div><h2>Un poco de contexto nos ayuda a entender tu idea.</h2><p className="lead">Puedes indicar ubicación, tipo de espacio, necesidades principales y etapa del proyecto. No compartas información sensible en esta demostración.</p></section></Layout>
}

function Assistant() {
  const options = ['Quiero conocer sus servicios','Me interesa un proyecto en venta','Quiero solicitar una cotización','Quiero hablar con un asesor']
  const [messages,setMessages] = useState<string[]>([])
  return <Layout active="asistente"><section className="section assistant-layout"><div><button className="crumb" onClick={()=>go('contacto')}>← Inicio / Contacto / Asistente WhatsApp</button><div className="eyebrow">CANAL SECUNDARIO / DEMOSTRACIÓN</div><h1>Una primera orientación, a tu manera.</h1><p className="lead">Así podría acompañarte un asistente para conocer nuestros servicios y orientar una consulta. Esta vista no representa un sistema implementado.</p><hr/><p>Para consultas sobre diseño, construcción o proyectos en venta, el correo se mantiene como canal principal.</p><p className="contact-email">contacto@davidgarces.example</p><Button to="contacto" secondary>Volver a contacto</Button></div>
    <div className="chat"><div className="chat-head"><img src={logo} alt=""/><div><h3>David Garcés</h3><span>Asistente · Simulación visual</span></div></div><div className="chat-body"><div className="eyebrow">NO CONECTADO A WHATSAPP</div><div className="bubble">Hola, bienvenido a David Garcés, arquitectura & construcción.<br/>¿Sobre qué te gustaría conversar?</div>{messages.map((m,i)=><div className="bubble answer" key={i}>{m}<small>Esta es una orientación visual. Para continuar, escribe a nuestro correo.</small></div>)}{options.map((o)=><button key={o} onClick={()=>setMessages([...messages,o])}>{o} ↗</button>)}<p className="tiny muted">Demostración estática · No hay envío ni atención en tiempo real.</p></div><div className="chat-input">Escribir mensaje · Solo representación visual <span>↗</span></div></div></section></Layout>
}

export default function App() {
  const readRoute = () => routes[window.location.hash.replace(/^#\//,'')] || 'inicio'
  const [route,setRoute] = useState<Route>(readRoute)
  useEffect(()=>{ const change=()=>setRoute(readRoute()); window.addEventListener('hashchange',change); return()=>window.removeEventListener('hashchange',change)},[])
  const page = useMemo(()=>({inicio:<Home/>,servicios:<Services/>,realizados:<Portfolio/>,pabellon:<Pavilion/>,venta:<Sales/>,local:<LocalDetail/>,experiencias:<Experiences/>,nosotros:<About/>,contacto:<Contact/>,asistente:<Assistant/>})[route],[route])
  return page
}
