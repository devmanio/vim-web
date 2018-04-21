import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import posts from "./posts";
import post from "./post";
import modal from "./modal";
import login from "./login";

export default combineReducers({
	login,
	posts,
	post,
	modal,
	router: routerReducer
});