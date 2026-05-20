import React from "react";
import "./HomeSectionRecommendations.css";
import { RecommendationList } from "./RecommendationList";

const recommendationsUrl =
  "https://www.linkedin.com/in/christian-antonius-anggaresta-84b715243/details/recommendations/?detailScreenTabIndex=0";

function HomeSectionRecommendations() {
  return (
    <section id="recommendationSection" className="section-container recommendation-section">
      <div className="section-head recommendation-section-head">
        <p className="section-header">Recommendations</p>
      </div>
      <p className="recommendation-section-note">
        These recommendations are based on LinkedIn, some recommendations might
        not be visible to public.{" "}
        <a href={recommendationsUrl} target="_blank" rel="noreferrer">
          See the recommendations here
        </a>
      </p>
      <div className="recommendation-list">
        {RecommendationList.map((recommendation) => (
          <article className="recommendation-card" key={recommendation.name}>
            <div className="recommendation-card-header">
              <a
                className="recommendation-profile-link"
                href={recommendation.linkedinLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`${recommendation.name} LinkedIn profile`}
              >
                <img
                  className="recommendation-profile-image"
                  src={recommendation.profilePicture}
                  alt={recommendation.name}
                  loading="lazy"
                />
              </a>
              <div className="recommendation-profile-text">
                <a
                  className="recommendation-name"
                  href={recommendation.linkedinLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {recommendation.name}
                </a>
                <p className="recommendation-role">{recommendation.header}</p>
              </div>
            </div>
            <p className="recommendation-letter">{recommendation.letter}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomeSectionRecommendations;
