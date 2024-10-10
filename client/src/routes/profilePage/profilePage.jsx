import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
function ProfilePage() {
  const data = useLoaderData();

  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu currentUser không tồn tại, chuyển hướng đến trang đăng nhập
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Nếu currentUser không tồn tại, không render component
  if (!currentUser) {
    return null; // Hoặc bạn có thể trả về một <div> trống hoặc một thông báo khác
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
            <button>Update Profile</button>
            
            </Link>
            
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "/noavatar.jpg"}
                alt="Avatar"
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add" >
            <button>Create New Post</button>

            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
           {(postResponse) => <List posts = {postResponse.data.userPosts} />}
          </Await>
        </Suspense>
        <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.chatResponse}
            errorElement={<p>Error loading chat!</p>}
          >
           {(chatResponse) =>        
             <Chat chats={chatResponse.data} />

           
           }
          </Await>
        </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
