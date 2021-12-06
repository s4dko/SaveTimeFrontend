import axios from "axios";

const url = 'https://api.trello.com/1';

const getCardsOnBoard = (trelloKey, trelloToken, trelloBoardId) => async dispatch => {
    try {
        return axios.get(`${url}/board/${trelloBoardId}/cards?key=${trelloKey}&token=${trelloToken}`);
    } catch (error) {
        //dispatch(updateProjectError(error.message));
    }
};
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    getCardsOnBoard
}
