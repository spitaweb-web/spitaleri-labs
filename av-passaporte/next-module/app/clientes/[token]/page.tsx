import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPassport } from '../../../lib/passports';

export const metadata: Metadata = {
  title: 'Tu césped · Alfombra Verde',
  robots: { index: false, follow: false },
};

export default async function PassportPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const passport = getPassport(token);
  if (!passport) notFound();

  const installed = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(`${passport.installedAt}T12:00:00-03:00`));
  const nextControl = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit' }).format(new Date(`${passport.nextControlAt}T12:00:00-03:00`));
  const wa = `https://wa.me/?text=${encodeURIComponent(passport.whatsappText)}`;

  return (
    <main style={{ background: '#f3f1e8', minHeight: '100vh', color: '#142019', padding: '20px 14px 64px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div style={{ fontWeight: 850, fontSize: 22, letterSpacing: '-.04em' }}>Alfombra Verde</div>
            <div style={{ fontSize: 11, color: '#657068', textTransform: 'uppercase', letterSpacing: '.08em' }}>Seguimiento postobra</div>
          </div>
          <div style={{ fontSize: 12, color: '#657068' }}>Pasaporte activo</div>
        </header>

        <section style={{ background: 'linear-gradient(135deg,#10251a,#214b34 70%,#326143)', color: '#fff', borderRadius: 28, padding: 28 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', opacity: .72 }}>Pasaporte de tu césped</div>
          <h1 style={{ fontSize: 'clamp(36px,6vw,62px)', lineHeight: .98, letterSpacing: '-.055em', margin: '14px 0 12px', maxWidth: 650 }}>Tu jardín sigue después de la obra.</h1>
          <p style={{ maxWidth: 610, color: 'rgba(255,255,255,.78)', fontSize: 15, margin: 0 }}>Hola {passport.customerName}. Acá vas a encontrar el cuidado recomendado para tu césped, tus próximos controles y las actualizaciones estacionales.</p>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 22 }}>
            {[passport.species, passport.location, `Instalado ${installed}`].map((item) => <span key={item} style={{ border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.12)', padding: '7px 10px', borderRadius: 999, fontSize: 12 }}>{item}</span>)}
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14, marginTop: 14 }}>
          <article style={{ background: 'rgba(255,255,255,.88)', border: '1px solid #d8ddd5', borderRadius: 22, padding: 20 }}>
            <h2 style={{ margin: '0 0 6px' }}>Estado actual</h2>
            <p style={{ color: '#657068', fontSize: 13 }}>Etapa inicial de arraigue. El objetivo ahora es mantener humedad pareja y evitar tránsito innecesario.</p>
            {passport.notes.map((note) => <div key={note} style={{ border: '1px solid #c9d7cb', background: '#f7fbf7', borderRadius: 16, padding: 14, marginTop: 10, fontSize: 13 }}>{note}</div>)}
            <a href={wa} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', marginTop: 15, background: '#183c29', color: '#fff', padding: '11px 14px', borderRadius: 13, textDecoration: 'none', fontWeight: 780 }}>Enviar control de 7 días</a>
          </article>

          <article style={{ background: 'rgba(255,255,255,.88)', border: '1px solid #d8ddd5', borderRadius: 22, padding: 20 }}>
            <h2 style={{ margin: '0 0 6px' }}>Próximos hitos</h2>
            <ul style={{ paddingLeft: 18, marginBottom: 0, color: '#657068', lineHeight: 1.7 }}>
              <li>48 h · chequeo de riego</li>
              <li>{nextControl} · control por imágenes</li>
              <li>Primer corte · cuando haya arraigue suficiente</li>
              <li>30 días · revisión general</li>
              <li>Temporada · actualización de riego y corte</li>
            </ul>
          </article>
        </section>

        <section style={{ background: 'rgba(255,255,255,.88)', border: '1px solid #d8ddd5', borderRadius: 22, padding: 20, marginTop: 14 }}>
          <h2 style={{ margin: '0 0 6px' }}>Cuidados por temporada</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 9, marginTop: 14 }}>
            <div style={{ border: '1px solid #d8ddd5', borderRadius: 16, padding: 14 }}><b>Primavera</b><p style={{ color: '#657068', fontSize: 12 }}>Aumentar gradualmente el riego según crecimiento y temperatura.</p></div>
            <div style={{ border: '1px solid #d8ddd5', borderRadius: 16, padding: 14 }}><b>Verano</b><p style={{ color: '#657068', fontSize: 12 }}>Riegos profundos una vez establecido. Cortes frecuentes sin retirar más de 1/3 de la hoja.</p></div>
            <div style={{ border: '1px solid #d8ddd5', borderRadius: 16, padding: 14 }}><b>Corte orientativo</b><p style={{ color: '#657068', fontSize: 12 }}>Celebration Bermuda residencial: aproximadamente 20–30 mm cuando superficie y equipo lo permitan.</p></div>
            <div style={{ border: '1px solid #d8ddd5', borderRadius: 16, padding: 14 }}><b>Otoño / invierno</b><p style={{ color: '#657068', fontSize: 12 }}>Reducir riego a medida que baja la demanda. El color puede disminuir naturalmente con el frío.</p></div>
          </div>
        </section>
      </div>
    </main>
  );
}
