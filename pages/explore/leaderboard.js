import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Explore.module.css';

export default function Leaderboard() {
  const topCities = [
    { name: 'San Francisco', score: 98, spots: '15,234' },
    { name: 'New York', score: 95, spots: '42,123' },
    { name: 'Boston', score: 92, spots: '8,765' },
    { name: 'Seattle', score: 90, spots: '12,432' },
    { name: 'Austin', score: 88, spots: '7,654' },
  ];

  return (
    <>
      <Head>
        <title>CapturGO Leaderboard</title>
        <meta name="description" content="See which cities are leading the way in smart parking with CapturGO" />
        <meta property="og:title" content="CapturGO Leaderboard" />
        <meta property="og:description" content="See which cities are leading the way in smart parking with CapturGO" />
      </Head>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            CapturGO
          </Link>
          <div className={styles.navLinks}>
            <Link href="/explore/ecosystem">
              Ecosystem
            </Link>
            <Link href="/explore/leaderboard" className={styles.activeLink}>
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
          <h1>City Leaderboard</h1>
          <p>Top performing cities in the CapturGO network</p>
        </section>
        <section className={styles.content}>
          <div className={styles.leaderboard}>
            <div className={styles.leaderboardHeader}>
              <span>City</span>
              <span>Performance Score</span>
              <span>Active Spots</span>
            </div>
            {topCities.map((city, index) => (
              <div key={city.name} className={styles.leaderboardRow}>
                <span className={styles.cityRank}>
                  <strong>{index + 1}</strong>
                  {city.name}
                </span>
                <span className={styles.score}>{city.score}</span>
                <span className={styles.spots}>{city.spots}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
