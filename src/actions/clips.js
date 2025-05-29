import axios from "axios";
import { CLEAR_CLIP_URL, CREATE_CLIP_URL, DELETE_CLIP_URL, GET_CLIP_URL } from "../constants";
import { getToken } from "./login";

export const getClips = async () => {
    try {
        const headers = {
            authorization: `Bearer ${getToken()}`,
        }
        const response = await axios.get(GET_CLIP_URL, { headers });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch clips:", error);
        return [];
    }
}

export const postClip = async (text) => {
    try {
        const headers = {
            authorization: `Bearer ${getToken()}`,
        }
        const response = await axios.post(CREATE_CLIP_URL, { text }, { headers });
        return response.data;
    } catch (error) {
        console.error("Failed to post clip:", error);
        throw error;
    }
}

export const deleteClip = async (id) => {
    try {
        const headers = {
            authorization: `Bearer ${getToken()}`,
        }
        const response = await axios.delete(`${DELETE_CLIP_URL}/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Failed to delete clip:", error);
        throw error;
    }
}

export const clearClips = async () => {
    try {
        const headers = {
            authorization: `Bearer ${getToken()}`,
        }
        const response = await axios.delete(CLEAR_CLIP_URL, { headers });
        return response.data;
    } catch (error) {
        console.error("Failed to clear clips:", error);
        throw error;
    }
}