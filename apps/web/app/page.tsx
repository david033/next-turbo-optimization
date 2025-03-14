import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";

/* Tree-shaking will drop these imports from bundle if they are not used */
import ServerOnlyChunkDemo from "@repo/ui/server-only-chunk-demo";
import ServerAndClientChunkDemo from "@repo/ui/server-and-client-chunk-demo";

import Link from "next/link";

import Client from "./client";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );

};



export default function Home() {

  return (
    <div>
      <main style={{ padding: '1rem' }}>
        <ThemeImage
          className={styles.logo}
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />
        <h1 className={styles.title}>Welcome to Turbo!</h1>

        {/* Demo content */}

        <h2>UseCallback demo</h2>

        <Client />

        <h2>Image demo</h2>

        {/* Or. size: 5472x3648 */}
        <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
          <Image
            src='/image-demo.jpg'
            placeholder="empty"
            fill={true}
            quality={100}
            alt='landscape'
            style={{ objectFit: 'cover' }}
            sizes="(min-width: 2000px) 100vw, 10vw" />
        </div>
        {/* <img src="/image-demo.jpg" alt="native image" style={{ width: '100%', marginTop: '1rem' }} />
        <Image src='/image-demo.jpg' width={1024} height={768} alt='landscape' /> */}

        <h2>To demo big chunk in server chunk</h2>
        {/* <ServerOnlyChunkDemo /> */}

        <h2>To demo big chunk on server and client side</h2>
        {/* <ServerAndClientChunkDemo /> */}

        <h1>Link automatic preload demo - scroll down to see fetch request in network tab</h1>
        <p style={{ marginTop: '100rem', marginBottom: '10rem' }}>
          <Link href="/about">About page preload test</Link>
          {/* <Link href="/about" prefetch={false}>About page preload test</Link> */}
        </p>

      </main>
      <footer className={styles.footer}>
        Footer content
      </footer>
    </div>
  );
}
