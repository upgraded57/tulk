// styles
import "./admin.css";

// components
import Navbar from "../../components/Navbar/Navbar";
import Loader from "./../../components/Loader/Loader";

// hooks
import UseFetchArticles from "./../../Hooks/Articles/UseFetchArticles";
import { axiosInstance } from "../../Axios/axiosInstance";

// utils
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import moment from "moment";

// images
import newsImg from "../../images/newsImg.jpg";

export default function Admin() {
  const {
    isLoading: articlesLoading,
    data: articles,
    isError,
    error,
  } = UseFetchArticles();

  if (isError) {
    console.log(isError);
  }

  if (error) {
    console.log(error);
  }

  const deleteArticle = async (id) => {
    const confirmation = window.confirm(
      "Delete article? This action cannot be undone!"
    );
    if (confirmation !== true) {
      return;
    } else {
      const toastId = toast.loading("Deleting Article");
      await axiosInstance({
        method: "delete",
        url: `/editor/articles/${id}/`,
      })
        .then((res) => {
          toast.success("Article deleted", {
            id: toastId,
            icon: "🗑️",
          });
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to delete article", {
            id: toastId,
          });
        });
    }
  };

  const editArticle = async (id) => {
    toast("Feature coming soon!", {
      icon: "🖐🏼",
    });
  };

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

        {articlesLoading ? (
          <Loader type="list" />
        ) : (
          <div className="admin-right">
            {articles?.length === 0 ? (
              <p style={{ padding: "20px" }}>Nothing to show here yet!</p>
            ) : (
              articles?.map((article) => {
                return (
                  <div className="admin-article" key={article.id}>
                    <div className="admin-article-img">
                      <img
                        src={
                          article.featured_image
                            ? article.featured_image
                            : newsImg
                        }
                        alt=""
                      />
                    </div>
                    <div className="admin-article-content">
                      <p className="text-body">{article.title}</p>
                      <small>
                        {article.category.toUpperCase()} |{" "}
                        {moment(article.published_date).format("MMM Do YYYY")}|{" "}
                        {article.status === "draft" ? (
                          <span className="draft">{article.status}</span>
                        ) : (
                          <span className="published">{article.status}</span>
                        )}
                      </small>
                      <div className="admin-article-action-btns">
                        <button
                          className="btn-secondary"
                          onClick={() => editArticle(article.slug)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={() => deleteArticle(article.slug)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
}
