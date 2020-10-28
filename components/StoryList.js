import Link from "next/link";
import PropTypes from "prop-types";

const StoryList = ({ stories }) => (
  <div className="story-list">
    {stories.map((story) => (
      <div key={story.id} className="story">
        <h2 className="story-title">
          <a href={story.url}>{story.title}</a>
        </h2>
        <div className="story-details">
          <span>{story.points || "0"} Points</span>
          <Link href={`/story?id=${story.id}`}>
            <a>{story.comments_count || "0"} Comments</a>
          </Link>
        </div>
      </div>
    ))}
  </div>
);

StoryList.propTypes = {
  stories: PropTypes.array,
};

export default StoryList;
