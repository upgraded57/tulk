// Utils
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

// Protected routes
import ProtectedRoute from "./Store/Auth/ProtectedRoute";

// Hot toast notification
import { Toaster } from "react-hot-toast";

// Pages
import Loader from "./components/Loader/Loader";
import Login from "./pages/Login/Login";

// Auth page
import VerifyOTP from "./components/ForgotPassword/VerifyOTP";
import { NotFound } from "./pages/404/NotFound";

// lazy load pages
const Home = lazy(() => import("./pages/Home/Home"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const NewsPage = lazy(() => import("./pages/NewsPage/NewsPage"));
const GroupListing = lazy(() => import("./pages/GroupListing/GroupListing"));
const Group = lazy(() => import("./pages/Group/Group"));
const Messenger = lazy(() => import("./pages/Messenger/Messenger"));
const MessengerMobile = lazy(() =>
  import("./pages/Messenger-Mobile/MessengerMobile")
);
const Conversation = lazy(() => import("./pages/Conversation/Conversation"));
const SearchResult = lazy(() => import("./pages/SearchResult/SearchResult"));
const FriendListing = lazy(() => import("./pages/FriendListing/FriendListing"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const CreateArticle = lazy(() => import("./pages/CreateArticle/CreateArticle"));
const PostModal = lazy(() => import("./components/Post/PostModal"));
const ArticleModal = lazy(() =>
  import("./components/IndividualNews/ArticleModal")
);
const Notifications = lazy(() =>
  import("./components/Notifications/Notifications")
);
const CreateGroup = lazy(() => import("./components/CreateGroup/CreateGroup"));

function App() {
  return (
    <>
      <Router>
        <div className="margin-top-container">
          <Toaster
            toastOptions={{
              duration: 3000,
            }}
          />
          <Routes>
            {/* Protected routes  */}
            <Route path="/" element={<ProtectedRoute />}>
              <Route
                index
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/search/:search_query"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <SearchResult />
                  </Suspense>
                }
              />
              <Route
                path="/profile/:profile_id"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="/groups"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <GroupListing />
                  </Suspense>
                }
              />
              <Route
                path="/groups/:group_id"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <Group />
                  </Suspense>
                }
              />
              <Route
                path="/groups/create"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <CreateGroup />
                  </Suspense>
                }
              />
              <Route
                path="/newsPage"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <NewsPage />
                  </Suspense>
                }
              />
              <Route
                path="/messenger"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <Messenger />
                  </Suspense>
                }
              />
              <Route
                path="/messenger/m"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <MessengerMobile />
                  </Suspense>
                }
              />
              <Route
                path="/messenger/m/:conversationId"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <Conversation />
                  </Suspense>
                }
              />
              <Route
                path="/notifications"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <Notifications />
                  </Suspense>
                }
              />
              <Route
                path="/friends"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <FriendListing />
                  </Suspense>
                }
              />
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <Admin />
                  </Suspense>
                }
              />
              <Route
                path="/article/create/"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <CreateArticle />
                  </Suspense>
                }
              />
              <Route
                path="/posts/:post_id"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <PostModal />
                  </Suspense>
                }
              />
              <Route
                path="/articles/:article_id"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <ArticleModal />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<Loader type="spinner" />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/verify-OTP" element={<VerifyOTP />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
