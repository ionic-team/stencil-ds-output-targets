import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import Input from '@site/src/components/Input/Input';
import Button from '@site/src/components/Button/Button';
import { MyComponent, MyRange, MyRadioGroup } from 'component-library-react/client';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">SSR with Docusaurus</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <Input />
        <hr />
        <Button />
        <hr />
        <MyComponent
          first="Stencil"
          last="'Don't call me a framework' JS"
          className="my-8"
          favoriteKidName="foobar"
        />
        <hr />
        <MyRange name="myRange">Hello World</MyRange>
        <hr />
        <MyRadioGroup name="myRadioGroup" value="two">
          <input type="radio" name="myRadioGroup" value="one" />
          <input type="radio" name="myRadioGroup" value="two" />
          <input type="radio" name="myRadioGroup" value="three" />
        </MyRadioGroup>
      </main>
    </Layout>
  );
}
