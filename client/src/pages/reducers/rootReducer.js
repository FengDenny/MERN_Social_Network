import { combineReducers } from "redux";
import siteModal from "./siteModal";

const rootreducer = combineReducers({ siteModal: siteModal });

export default rootreducer;
