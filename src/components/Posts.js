import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  deletePosts,
  fetchPosts,
  fetchPostsByUserId,
  savePosts,
  updatePosts,
} from "../app/slice/postSlice";
import { signout } from "../app/slice/loginThunk";

const Posts = () => {
  const post = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.login.userData);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user_id, setUserId] = useState("");
  const [id, setId] = useState(null);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts({ user_id: user.user_id }));
  }, []);

  const editPost = (item) => {
    setId(item.id);
    setUserId(item.user_id);
    setTitle(item.title);
    setDescription(item.description);
  };

  const saveUpdatePost = () => {
    if (id == null) {
      let payload = {
        id: null,
        title: title,
        description: description,
      };
      dispatch(savePosts(payload));
    } else {
      let payload = {
        id: id,
        user_id: user.user_id,
        title: title,
        description: description,
      };
      dispatch(updatePosts(payload));
    }
    setTitle("");
    setDescription("");
  };

  const handleTitle = (value) => {
    let max = 15;
    let min = 4;
    setTitle(value);
    if (!value.trim()) {
      setTitleError("Title is Required");
    } else if (min != null && min > value.length) {
      setTitleError("Minimum " + min + " Characters Required!");
    } else if (max != null && max < value.length) {
      setTitleError("Maximum " + max + " Characters are allowed!");
    } else {
      setTitleError(null);
    }
  };
  const handledescription = (value) => {
    let max = 100;
    let min = 4;
    setDescription(value);
    if (!value.trim()) {
      setDescriptionError("Description is Required");
    } else if (min != null && min > value.length) {
      setDescriptionError("Minimum " + min + " Characters Required!");
    } else if (max != null && max < value.length) {
      setDescriptionError("Maximum " + max + " Characters are allowed!");
    } else {
      setDescriptionError(null);
    }
  };

  return (
    <div className="user-section">
      <h1>Posts</h1>
      <Form>
        <div className="logout-btn">
          <Button
            onClick={() => {
              dispatch(signout());
              navigate("/login");
            }}
            variant="outline-danger"
          >
            Logout
          </Button>
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(evt) => handleTitle(evt.target.value)}
          />
          {titleError && <p className="error-msg">{titleError}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="email"
            placeholder="Description"
            value={description}
            onChange={(evt) => handledescription(evt.target.value)}
          />
          {descriptionError && <p className="error-msg">{descriptionError}</p>}
        </Form.Group>

        <Button
          variant="primary"
          onClick={() => {
            saveUpdatePost();
          }}
          disabled={
            !titleError && !descriptionError && title && description
              ? false
              : true
          }
        >
          Submit
        </Button>
      </Form>
      <div className="user-cards-container">
        {post.map((item) => (
          <Card key={item.id}>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.description}
              </Card.Subtitle>
              <div className="user-btns">
                <Button
                  variant="primary"
                  onClick={() => {
                    editPost(item);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch(deletePosts({ id: item.id }));
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Posts;
