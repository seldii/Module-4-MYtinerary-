import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addComment,
  deleteComment
} from "../../../store/actions/commentActions";
import { getItinerary } from "../../../store/actions/itineraryAction";
import TextField from "@material-ui/core/TextField";
import { getCurrentDate } from "../../utility/GetCurrentDate";
import CommentsList from "./CommentsList";
import { withStyles } from "@material-ui/core/styles/";

const styles = theme => ({
  sent: {
    color: theme.palette.secondary.main,
    fontSize: "xx-large"
  }
});
export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: this.props.itinerary.comments
    };

    this.addComment = this.addComment.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    this.props.getItinerary(this.props.itinerary._id);
  }
  componentDidMount() {}

  addComment(e) {
    e.preventDefault();

    const id = this.props.itinerary._id;
    const newDate = getCurrentDate();
    const comment = {
      user: this.props.auth.user,
      comment: this.state.comment,
      date: newDate
    };

    //Add comment via addComment action
    this.props.addComment(id, comment);
    const prevComments = this.props.itinerary.comments;
    const comments = [...prevComments, comment];
    this.setState({
      comment: "",
      comments: comments
    });
  }

  handleDelete(comment) {
    console.log(comment);
    const id = this.props.itinerary._id;
    this.props.deleteComment(id, comment);
    const prevComments = this.state.comments;
    const comments = prevComments.filter(prevComment => {
      return prevComment.comment != comment.comment;
    });
    this.setState({
      comments
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const comments = this.state.comments
      .sort((a, b) => {
        let x = new Date(a.date);
        let y = new Date(b.date);
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      })
      .reverse();

    const commentList = comments.map((comment, idx) => {
      return (
        <CommentsList
          key={idx}
          comment={comment}
          handleDelete={() => this.handleDelete(comment)}
        />
      );
    });
    return (
      <div>
        <form onSubmit={this.addComment} onChange={this.onChange}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={10}>
              <TextField
                disabled={!this.props.auth.isAuthenticated}
                placeholder={
                  this.props.auth.isAuthenticated
                    ? "Write a comment.."
                    : "Login to leave a comment"
                }
                value={this.state.comment}
                name="comment"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <Button type="submit">
                <FontAwesomeIcon
                  className={this.props.classes.sent}
                  icon="paper-plane"
                />
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body2" color="secondary">
          Comments
        </Typography>
        {commentList}
      </div>
    );
  }
}

Comment.propTypes = {
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getItinerary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  itineraryRed: state.itineraries.itinerary
});

export default connect(
  mapStateToProps,
  { addComment, deleteComment, getItinerary }
)(withStyles(styles, { withTheme: true })(Comment));
