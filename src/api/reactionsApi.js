import axios from 'axios';


const reactionsApi = axios.create({
	baseURL: 'http://localhost:3500/reactions',
});

const create = async (data) => {
	try {
		const response = await reactionsApi.post('/', data, {
			headers: {
				"Content-Type": "Application/json"
			}
		});
		return { success: true, data: response.data };
	} catch (error) {
		return { success: false, data: error.message };
	}
};

const destroy = async ({ id }) => {
	try {
		const response = await reactionsApi.delete(`/${id}`);
		return { success: true };
	} catch (error) {
		return { success: false, data: error.message };
	}
};

const update = async ({ id, newType }) => {
	try {
		const response = await reactionsApi.patch(`/${id}`, { type: newType }, {
			headers: {
				"Content-Type": "Application/json"
			}
		});
		return { success: true, data: response.data };
	} catch (error) {
		return { success: false, data: error.message };
	}
};

const getReactionEmojis = async () => {
	try {
		const response = await axios.get('http://localhost:3500/reactionEmojis');
		return { success: true, data: response.data };
	} catch (error) {
		return { success: false, data: error.message };
	}
};

export default {
	create,
	destroy,
	getReactionEmojis,
	update
};
