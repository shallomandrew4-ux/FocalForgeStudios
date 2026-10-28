import React, { Suspense, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Image as DreiImage, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Aperture, Camera, Code2, Layers3, Menu, X, Sparkles, Mail, Instagram, Youtube, MessageCircle, Check, Plus } from 'lucide-react';

const photos = [
  {id:1,title:'Portraits in Focus',category:'Photography',image:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85',note:'Editorial portrait study'},
  {id:2,title:'The Art of Presence',category:'Photography',image:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',note:'Studio portraiture'},
  {id:3,title:'After Hours',category:'Cinematography',image:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',note:'Character and light'},
  {id:4,title:'Monochrome Study',category:'Photography',image:'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85',note:'Black-and-white editorial'},
  {id:5,title:'Live in the Moment',category:'Cinematography',image:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85',note:'People and performance'},
  {id:6,title:'A New Perspective',category:'Creative Direction',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',note:'Fashion and direction'},
  {id:7,title:'Made to Create',category:'Photography',image:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85',note:'Portrait session'},
  {id:8,title:'Behind the Lens',category:'Cinematography',image:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=85',note:'Production life'}
];
const filters=['All work','Photography','Cinematography','Creative Direction'];

function Logo({footer=false}) {
  return <a className={'brand '+(footer?'brand-footer':'')} href="#home" aria-label="FocalForge Studios home"><span className="brand-mark"><span>F</span></span><span className="brand-type"><strong>FOCAL<span>FORGE</span></strong><small>STUDIOS — KAMPALA</small></span></a>;
}
function FloatingPhoto({image,position,rotation=0,index}) {
  const [ready,setReady]=useState(false);
  useFrame(({clock})=>{});
  return <Float speed={1.15+index*.12} rotationIntensity={.13} floatIntensity={.28}>
    <group position={position} rotation={[0,rotation,0]}>
      <mesh position={[0,0,-.055]}><boxGeometry args={[1.62,2.16,.1]}/><meshStandardMaterial color="#242424" metalness={.72} roughness={.3}/></mesh>
      <DreiImage url={image} scale={[1.52,2.06]} transparent toneMapped={false} />
    </group>
  </Float>;
}
function HeroScene(){
  return <Canvas camera={{position:[0,0,7.5],fov:38}} dpr={[1,1.5]} gl={{alpha:true,antialias:true}}>
    <ambientLight intensity={1.5}/><directionalLight position={[3,4,5]} intensity={2.2} color="#ff6a00"/><pointLight position={[-4,-1,2]} intensity={1.5} color="#ff8a36"/>
    <Suspense fallback={null}>
      <FloatingPhoto image={photos[0].image} position={[-2.05,.15,-.55]} rotation={.18} index={1}/>
      <FloatingPhoto image={photos[1].image} position={[0,-.45,.45]} rotation={-.07} index={2}/>
      <FloatingPhoto image={photos[2].image} position={[2.05,.25,-.65]} rotation={-.2} index={3}/>
      <Environment preset="city"/>
    </Suspense>
  </Canvas>;
}
function App(){
  const [menuOpen,setMenuOpen]=useState(false),[filter,setFilter]=useState('All work'),[active,setActive]=useState(null);
  const [form,setForm]=useState({name:'',email:'',service:'Cinematography',message:''}),[submitted,setSubmitted]=useState(false);
  const filtered=useMemo(()=>filter==='All work'?photos:photos.filter(p=>p.category===filter),[filter]);
  const update=(key,value)=>setForm(p=>({...p,[key]:value}));
  const submit=e=>{e.preventDefault();const subject=encodeURIComponent('FocalForge enquiry — '+form.service);const body=encodeURIComponent('Name: '+form.name+'\nEmail: '+form.email+'\nService: '+form.service+'\n\nProject details:\n'+form.message);window.location.href='mailto:billing@focalforgestudios.com?subject='+subject+'&body='+body;setSubmitted(true);};
  const close=()=>setMenuOpen(false);
  return <div className="site-shell"><div className="grain" aria-hidden="true"/>
    <header className="topbar"><Logo/><nav className={menuOpen?'nav nav-open':'nav'}>{[['Work','#work'],['Services','#services'],['Studio','#studio'],['Contact','#contact']].map(([t,h])=><a key={t} href={h} onClick={close}>{t}</a>)}<a className="nav-mobile-cta" href="#contact" onClick={close}>Start a project <ArrowUpRight size={15}/></a></nav><a className="top-cta" href="#contact">Let's talk <ArrowUpRight size={16}/></a><button className="menu-toggle" onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle navigation">{menuOpen?<X/>:<Menu/>}</button></header>
    <main>
      <section className="hero section-pad" id="home"><div className="hero-bg-orb orb-one"/><div className="hero-bg-orb orb-two"/>
        <div className="hero-copy"><motion.div className="eyebrow" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}><span className="eyebrow-line"/> INDEPENDENT CREATIVE + TECH STUDIO</motion.div>
          <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.1}}>Make it<br/><em>matter.</em><span className="hero-period">✳</span></motion.h1>
          <motion.p className="hero-intro" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.25}}>We bring stories to life and ideas into the real world — through cinematic visuals, thoughtful design, and powerful digital experiences.</motion.p>
          <div className="hero-actions"><a href="#work" className="button button-orange">Explore our work <ArrowUpRight size={17}/></a><a href="#services" className="text-link">What we do <ArrowDownRight size={17}/></a></div>
          <div className="hero-footnote"><span className="live-dot"/> AVAILABLE FOR SELECT PROJECTS <span className="footnote-sep">/</span> KAMPALA, UG</div>
        </div><div className="hero-visual"><div className="scene-frame"><HeroScene/></div><div className="scene-label scene-label-top"><span>FIG. 001</span><span>HUMAN / LIGHT / STORY</span></div><div className="scene-label scene-label-bottom"><span>FOCALFORGE®</span><span>CREATIVE ARCHIVE</span></div><div className="scene-orbit"/></div>
        <a href="#work" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16}/></a>
      </section>
      <section className="ticker" aria-label="Studio disciplines"><div className="ticker-track">{Array.from({length:2},(_,i)=><span key={i}>PHOTOGRAPHY <b>✳</b> CINEMATOGRAPHY <b>✳</b> DIGITAL CRAFT <b>✳</b> CREATIVE DIRECTION <b>✳</b> STORYTELLING <b>✳</b></span>)}</div></section>
      <section className="work-section section-pad" id="work"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> SELECTED WORK / 2024—26</div><h2>Proof of<br/><em>possibility.</em></h2></div><p className="section-side-copy">Every frame is a decision. Every project is a chance to make something with purpose, feeling, and a point of view.</p></div>
        <div className="photo-wall">{photos.slice(0,5).map((p,i)=><motion.button key={p.id} className={'wall-card wall-card-'+(i+1)} onClick={()=>setActive(p)} initial={{opacity:0,y:30,rotate:i%2?3:-3}} whileInView={{opacity:1,y:0,rotate:0}} viewport={{once:true}} whileHover={{y:-10,scale:1.025}} transition={{delay:i*.07}}><img src={p.image} alt={p.note} loading="lazy"/><span className="wall-index">0{p.id}</span><span className="wall-plus"><Plus size={16}/></span></motion.button>)}<div className="wall-caption"><span className="orange-dot"/> A FEW FRAMES FROM OUR WORLD</div></div>
        <div className="work-bottom"><span>01 — 08 / VISUAL ARCHIVE</span><a href="#gallery" className="line-link">Browse the full gallery <ArrowUpRight size={16}/></a></div>
      </section>
      <section className="gallery-section section-pad" id="gallery"><div className="gallery-header"><div><div className="eyebrow"><span className="eyebrow-line"/> THE VISUAL ARCHIVE</div><h2>Collected<br/><em>moments.</em></h2></div><div className="filter-row">{filters.map(f=><button key={f} onClick={()=>setFilter(f)} className={filter===f?'filter active':'filter'}>{f}</button>)}</div></div>
        <div className="gallery-grid">{filtered.map((p,i)=><motion.button layout key={p.id} className={'gallery-card gallery-card-'+(i%4+1)} onClick={()=>setActive(p)} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><div className="gallery-image"><img src={p.image} alt={p.note} loading="lazy"/><span className="gallery-open"><ArrowUpRight size={19}/></span><span className="gallery-number">0{p.id}</span></div><div className="gallery-card-meta"><div><h3>{p.title}</h3><span>{p.category}</span></div><span>2025</span></div></motion.button>)}</div>
      </section>
      <section className="services-section section-pad" id="services"><div className="section-heading services-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> WHAT WE BRING</div><h2>Two worlds.<br/><em>One studio.</em></h2></div><p className="section-side-copy">Creative instinct meets technical thinking. From the first frame to the final line of code, everything works together.</p></div>
        <div className="services-grid"><article className="service-card service-card-featured"><div className="service-card-top"><span>01 / VISUALS</span><Camera size={22}/></div><div className="service-icon"><Aperture size={30}/></div><h3>Visual<br/><em>storytelling.</em></h3><p>Photography and cinematic production with character, clarity, and feeling — built for brands, people, and moments worth remembering.</p><ul><li><Check size={15}/> Portrait & commercial photography</li><li><Check size={15}/> Event cinematography</li><li><Check size={15}/> Creative direction & editing</li><li><Check size={15}/> Brand and campaign visuals</li></ul><a href="#contact" className="service-link">Make something visual <ArrowUpRight size={16}/></a><div className="service-watermark">F</div></article>
        <article className="service-card"><div className="service-card-top"><span>02 / SYSTEMS</span><Code2 size={22}/></div><div className="service-icon"><Layers3 size={30}/></div><h3>Digital<br/><em>craft.</em></h3><p>Purpose-built websites and software that look sharp, work smoothly, and give your business room to grow.</p><ul><li><Check size={15}/> Responsive websites</li><li><Check size={15}/> Web applications & dashboards</li><li><Check size={15}/> Database design & integration</li><li><Check size={15}/> Performance optimization</li></ul><a href="#contact" className="service-link">Build something useful <ArrowUpRight size={16}/></a></article>
        <article className="service-card service-card-wide"><div className="service-card-top"><span>03 / THE HYBRID</span><Sparkles size={22}/></div><div className="hybrid-copy"><h3>Made to work<br/><em>together.</em></h3><p>We unite rich visual media with fast, considered digital platforms — so your story and your technology speak the same language.</p><a href="#contact" className="button button-outline">Explore a hybrid project <ArrowUpRight size={16}/></a></div><div className="hybrid-graphic"><div className="hybrid-ring ring-1"/><div className="hybrid-ring ring-2"/><div className="hybrid-ring ring-3"/><div className="hybrid-core">FF<span>®</span></div></div></article></div>
      </section>
      <section className="studio-section section-pad" id="studio"><div className="studio-image-wrap"><div className="studio-monogram">FF<span>®</span></div><div className="studio-image-caption"><span>INDEPENDENT BY DESIGN</span><span>KAMPALA, UGANDA</span></div></div><div className="studio-copy"><div className="eyebrow"><span className="eyebrow-line"/> A LITTLE ABOUT US</div><h2>Small studio.<br/><em>Big intention.</em></h2><p>FocalForge Studios is an independent creative and technology studio working across cinematography, digital media, software architecture, and web systems to help people and businesses show up with purpose.</p><p>Good creative work should do more than look good. It should communicate clearly, feel considered, and work beautifully in the real world.</p><div className="studio-stats"><div><strong>02</strong><span>CORE DISCIPLINES</span></div><div><strong>01</strong><span>CONNECTED VISION</span></div><div><strong>∞</strong><span>WAYS TO CREATE</span></div></div><a href="#contact" className="line-link">Let's create something <ArrowUpRight size={16}/></a></div></section>
      <section className="statement-section"><div className="statement-mark">“</div><div className="eyebrow"><span className="eyebrow-line"/> OUR POINT OF VIEW</div><p>We don't make things just to fill a screen.<br/><em>We make things that stay with you.</em></p><span className="statement-signature">THE FOCALFORGE APPROACH — EST. KAMPALA</span></section>
      <section className="contact-section section-pad" id="contact"><div className="contact-copy"><div className="eyebrow"><span className="eyebrow-line"/> YOUR MOVE</div><h2>Have a good<br/>idea? <em>Let's make it.</em></h2><p>Tell us what you're imagining. We'll bring creative thinking, technical clarity, and a plan to move it forward.</p><div className="contact-details"><a href="mailto:billing@focalforgestudios.com"><Mail size={17}/> billing@focalforgestudios.com <ArrowUpRight size={14}/></a><span><MessageCircle size={17}/> Kampala, Uganda</span></div></div>
        <form className="contact-form" onSubmit={submit}><div className="form-topline"><span>PROJECT INQUIRY</span><span>01 — LET'S BEGIN</span></div><label>Your name<input required value={form.name} onChange={e=>update('name',e.target.value)} placeholder="What should we call you?"/></label><label>Email address<input required type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="you@example.com"/></label><label>What do you need?<select value={form.service} onChange={e=>update('service',e.target.value)}><option>Cinematography</option><option>Photography</option><option>Website development</option><option>Custom software</option><option>Hybrid creative + tech</option><option>Something else</option></select></label><label>Tell us a little about it<textarea required rows="3" value={form.message} onChange={e=>update('message',e.target.value)} placeholder="The idea, the goal, the feeling..."/></label><button className="button button-orange form-submit" type="submit">{submitted?'Open your email app':'Send project inquiry'} <ArrowUpRight size={17}/></button><small className="form-note">{submitted?'Your email app should open with your inquiry drafted. Send it there to complete your request.':'This form opens your email app with the project details ready to send.'}</small></form>
      </section>
    </main>
    <footer className="footer"><div className="footer-main"><Logo footer/><p>Make it matter.<br/>Make it FocalForge.</p><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={15}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} FOCALFORGE STUDIOS</span><span>CREATIVE + TECHNOLOGY / KAMPALA, UG</span><div className="social-links"><a href="mailto:billing@focalforgestudios.com" aria-label="Email"><Mail size={15}/></a><a href="#contact" aria-label="Instagram placeholder"><Instagram size={15}/></a><a href="#contact" aria-label="Video portfolio"><Youtube size={15}/></a></div></div></footer>
    <AnimatePresence>{active&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActive(null)}><motion.div className="project-modal" initial={{opacity:0,scale:.94,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setActive(null)} aria-label="Close project"><X/></button><img src={active.image} alt={active.note}/><div className="modal-copy"><span>{active.category} / 2025</span><h2>{active.title}</h2><p>{active.note}. Part of the FocalForge visual archive.</p><a href="#contact" onClick={()=>setActive(null)} className="line-link">Discuss a similar project <ArrowUpRight size={16}/></a></div></motion.div></motion.div>}</AnimatePresence>
    <a href="#contact" className="floating-contact" aria-label="Start a project"><MessageCircle size={19}/><span>START A PROJECT</span></a>
  </div>;
}
export default App;
