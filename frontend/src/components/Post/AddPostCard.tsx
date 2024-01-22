import {
  AlertColor,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Fragment, SetStateAction } from "react";
import AppState from "../../types/AppState";
import { useParams } from "react-router-dom";

type AddPostCardProps = {
  cardOpen: boolean;
  newPostContent: string;
  setNewPostContent: React.Dispatch<SetStateAction<string>>;
  setCardOpen: React.Dispatch<SetStateAction<boolean>>;
  appState: AppState;
  setPosts: React.Dispatch<SetStateAction<PostObj[]>>;
  notice: (message: string, severity: AlertColor) => void;
};

const AddPostCard: React.FC<AddPostCardProps> = ({
  cardOpen,
  newPostContent,
  setCardOpen,
  setNewPostContent,
  appState,
  setPosts,
  notice,
}) => {
  const { id } = useParams();

  const handleAddPost = () => {
    axios
      .post("http://localhost:3001/posts", {
        post: {
          content: newPostContent,
          topic_id: id,
          user_id: appState.user.id,
        },
      })
      .then((resp) => {
        const newPost: PostObj = resp.data.data;
        // console.log(newPost);
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        notice("Post added successfully!", "success");
      })
      .catch((error) => {
        notice(`Error: ${error}`, "error");
      });
    setNewPostContent("");
    setCardOpen(false);
  };

  return (
    <Fragment>
      {cardOpen && (
        <Card
          onClick={() => {}}
          // fixed the position to be just above the Button to add post
          sx={{
            position: "fixed",
            bottom: 81,
            right: 17,
            width: "70vw",
            backgroundColor: "aliceblue",
            zIndex: 1050, // sweet spot
          }}
        >
          <CardContent>
            <TextField
              type="text"
              label="Add Post"
              variant="outlined"
              multiline
              fullWidth
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              sx={{ marginBottom: 1.5, backgroundColor: "white" }}
            />
            <Button
              onClick={() => handleAddPost()} // implement submit handler
              variant="contained"
              sx={{ marginRight: 1 }}
            >
              Add Post
            </Button>
            <Button
              onClick={() => {
                setCardOpen(false);
                setNewPostContent("");
              }}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
};

export default AddPostCard;
