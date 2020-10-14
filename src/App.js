import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Post from "./Components/PostComponents/Post";
import { db, auth } from "./firebase";
import ImageUpload from "./Components/ImageUploadComponent/ImageUpload";
function App(props) {
  //State management and controll
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, userName]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modalIn, setModalIn] = useState(false);
  const toggleIn = () => setModalIn(!modal);
  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: userName,
        });
      })
      .catch((error) => alert(error.message));
    setModal(false);
  };
  const signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setModalIn(false);
  };
  return (
    <>
      <div>
        <Modal isOpen={modalIn} toggle={toggleIn} className={className}>
          <ModalHeader toggle={toggleIn}>
            <div className="login__title">
              <img
                src=" https://image.shutterstock.com/image-photo/bangkok-thailand-may-14-2016-260nw-419396578.jpg"
                alt=""
                className="login_logo"
              />
              <h2>Login</h2>
            </div>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={signin}>
              Login
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>
            <div className="login__title">
              <img
                src=" https://image.shutterstock.com/image-photo/bangkok-thailand-may-14-2016-260nw-419396578.jpg"
                alt=""
                className="login_logo"
              />
              <h2>Sign Up</h2>
            </div>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input
                  type="name"
                  name="username"
                  id="exampleEmail"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={signup}>
              SignUp
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      <div className="app">
        <div className="app__header">
          <img
            className="app__headerImage"
            src="https://i.pinimg.com/originals/57/6c/dd/576cdd470fdc0b88f4ca0207d2b471d5.png"
            alt="Instagram Logo"
          />
          {user ? (
            <Button color="danger" onClick={() => auth.signOut()}>
              Logout
            </Button>
          ) : (
            <div className="app__loginContainer">
              <Button className="button" onClick={toggle}>
                Sign UP
              </Button>
              <Button className="button" onClick={toggleIn}>
                Login
              </Button>
            </div>
          )}
        </div>
        <div className="app__posts">
          {posts.map(({ post, id }) => (
            <Post
              user={user}
              key={id}
              postId={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        {user?.displayName ? (
          <ImageUpload className="uploadVolume" userName={user.displayName} />
        ) : (
          <h2 className="uploadVolume">
            Sorry you need to login to Upload a content.
          </h2>
        )}
      </div>
    </>
  );
}

export default App;
