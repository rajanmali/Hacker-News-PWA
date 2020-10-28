import React from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-fetch";
import Error from "next/error";

import Layout from "../components/Layout";
import CommentList from "../components/CommentList";

class Story extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let storyId = query.id;
    let story;

    try {
      const response = await fetch(
        `https://node-hnapi.herokuapp.com/item/${storyId}`
      );
      story = await response.json();
    } catch (err) {
      story = null;
      console.log(err);
    }

    return { story };
  }
  render() {
    const { story } = this.props;
    if (!story) {
      return <Error statusCode={503} />;
    }
    return (
      <Layout title={story.title} backButton={true}>
        <main className="story-main">
          <h1 className="story-title">
            <a href={story.url}>{story.title}</a>
          </h1>
          <div className="story-details">
            <strong>{story.points || "0"} Points</strong>
            <strong>{story.comments_count || "0"} Counts</strong>
            <strong>{story.time_ago}</strong>
          </div>

          {story.comments.length > 0 ? (
            <CommentList comments={story.comments} />
          ) : (
            <div>No comments for this story</div>
          )}
        </main>
      </Layout>
    );
  }
}

Layout.propTypes = {
  story: PropTypes.object,
};

export default Story;
