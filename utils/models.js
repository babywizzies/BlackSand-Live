import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
  address: String,
  img: String,
  name: String,
  tokenId: Number,
  nickname: String,
  universe: String
})

const actorSchema = new mongoose.Schema({
  address: String,
  avatars: [avatarSchema],
  joined: {
    type: Date,
    default: Date.now
  }
})

const commentSchema = new mongoose.Schema({
  avatar: avatarSchema,
  date: {
    type: Date,
    default: Date.now
  },
  body: String,
})

const engagementSchema = new mongoose.Schema({
  flames: [avatarSchema],
  comments: [commentSchema]
})

const contentSchema = new mongoose.Schema({
  avatar: avatarSchema,
  img: String,
  title: String,
  date: {
    type: Date,
    default: Date.now
  },
  body: String,
  engagements: engagementSchema
})

const drafterSchema = new mongoose.Schema({
  avatar: avatarSchema,
  drafts: [{
    img: String,
    title: String,
    body: String
  }]
})

const universeSchema = new mongoose.Schema({
  universe: String,
  avatars: [avatarSchema],
  contents: [contentSchema]
})

const feedbackSchema = new mongoose.Schema({
  address: String,
  feedback: String,
  date: {
    type: Date,
    default: Date.now
  },
})

mongoose.models = {};

const Avatar = new mongoose.model("Avatar", avatarSchema);
const Actor = new mongoose.model("Actor", actorSchema);
const Comment = new mongoose.model("Comment", commentSchema);
const Content = new mongoose.model("Content", contentSchema);
const Universe = new mongoose.model("Universe", universeSchema);
const Drafter = new mongoose.model("Drafter", drafterSchema);
const Feedback = new mongoose.model("Feedback", feedbackSchema);

export { Avatar, Actor, Content, Comment, Universe, Drafter, Feedback };
