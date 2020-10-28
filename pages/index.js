import React from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import Error from "next/error";

import Layout from "../components/Layout";
import StoryList from "../components/StoryList";

class Index extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;

    try {
      page = Number(query.page) || 1;
      const response = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      );
      stories = await response.json();
    } catch (err) {
      stories = [];
      console.log(err);
    }

    return { stories, page };
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js", { scope: "/" });
    } else {
      console.log("No service-worker on this browser");
    }
  }

  render() {
    const { stories, page } = this.props;
    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }
    return (
      <Layout
        title="Hacker News"
        description="A Hacker News clone created using Next.js"
      >
        <StoryList stories={stories} />
        <footer>
          {page > 1 && (
            <Link href={page === 2 ? "/?page=1" : `/?page=${page - 1}`}>
              <a>Go Back ({page - 1})</a>
            </Link>
          )}
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1})</a>
          </Link>
        </footer>
      </Layout>
    );
  }
}

Index.propTypes = {
  stories: PropTypes.array,
};

export default Index;
