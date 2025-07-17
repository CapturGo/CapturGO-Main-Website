import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Explore.module.css';

export default function Ecosystem() {
  return (
    <>
      <Head>
        <title>CapturGO Ecosystem</title>
        <meta name="description" content="Explore the CapturGO ecosystem and discover how we're revolutionizing urban mobility" />
        <meta property="og:title" content="CapturGO Ecosystem" />
        <meta property="og:description" content="Explore the CapturGO ecosystem and discover how we're revolutionizing urban mobility" />
      </Head>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            CapturGO
          </Link>
          <div className={styles.navLinks}>
            <Link href="/explore/ecosystem" className={styles.activeLink}>
              Ecosystem
            </Link>
            <Link href="/explore/leaderboard">
              Leaderboard
            </Link>
            <Link href="/waitlist">
              Join Waitlist
            </Link>
          </div>
        </div>
      </nav>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>CapturGO Ecosystem</h1>
          <p>Discover how we're building the future of urban mobility</p>
        </section>
        <section className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Smart Cities</h2>
              <p>Empowering cities with real-time data and analytics to optimize parking management and reduce congestion.</p>
            </div>
            <div className={styles.card}>
              <h2>Businesses</h2>
              <p>Helping businesses improve customer experience with seamless parking solutions and valuable insights.</p>
            </div>
            <div className={styles.card}>
              <h2>Drivers</h2>
              <p>Making parking effortless for drivers with real-time availability and contactless payments.</p>
            </div>
            <div className={styles.card}>
              <h2>Environment</h2>
              <p>Reducing emissions and traffic by helping drivers find parking spots quickly and efficiently.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
