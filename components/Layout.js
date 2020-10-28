import { route } from "next/dist/next-server/server/router";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import PropTypes from "prop-types";

const Layout = ({ children, title, description, backButton }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="container">
        <nav>
          {backButton && (
            <span className="back-button" onClick={() => Router.back()}>
              &#x2b05;
            </span>
          )}
          <Link href="/">
            <a>
              <span className="main-title">Hacker Next</span>
            </a>
          </Link>
        </nav>
        {children}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Layout;
