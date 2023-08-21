import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./admin.css";

// utils
import Navbar from "../../components/Navbar/Navbar";

// api calls
import { fetchArticles } from "../../Axios/ApiCalls";

// images
import newsImg from "../../images/newsImg.jpg";
import moment from "moment";

export default function Admin() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles(setArticles);
  }, []);
  return (
    <>
      <Navbar />
      <div className="admin">
        <div className="admin-left">
          <ul>
            <Link to="#">
              <li>Previous Posts</li>
            </Link>
            <Link to="/article/create">
              <li>Create New +</li>
            </Link>
            <Link to="#">
              <li>Uploaded Images</li>
            </Link>
          </ul>
        </div>

        <div className="admin-right">
          {articles.map((article) => {
            return (
              <div className="admin-article" key={article.id}>
                <div className="admin-article-img">
                  <img
                    src={
                      article.featured_image ? article.featured_image : newsImg
                    }
                    alt=""
                  />
                </div>
                <div className="admin-article-content">
                  <p className="text-body">{article.title}</p>
                  <small>
                    {article.category.toUpperCase()} |{" "}
                    {moment(article.published_date).format("MMM Do YYYY")}
                  </small>
                  <div className="admin-article-action-btns">
                    <button className="btn-secondary">Edit</button>
                    <button className="btn-secondary">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
