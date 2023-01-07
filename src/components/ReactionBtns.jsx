import { useNavigate, useLocation } from 'react-router-dom';

import usePostContext from '../hooks/usePostContext';
import useUserContent from '../hooks/useUserContext';

const ReactionBtns = ({ post }) => {
	const { currentUser } = useUserContent();
	const { reactionsEmojis, addReaction, removeReaction, updateReaction } =
		usePostContext();

	const navigate = useNavigate();
	const location = useLocation();

	const isThereUserToInteract = currentUser?.id ? true : false;

	const acc = reactionsEmojis.reduce((acc, reaction) => {
		return { ...acc, [reaction.type]: 0 };
	}, {});

	let currentUserReaction;

	const reducedReactions = post.reactions.reduce((acc, reaction) => {
		if (isThereUserToInteract && !currentUserReaction) {
			currentUserReaction = reaction.userId === currentUser?.id ? reaction : null;
		}

		return { ...acc, [reaction.type]: (acc[reaction.type] += 1) };
	}, acc);

	const postReactionsClass = isThereUserToInteract ? 'greyed-out' : '';

	const onReactionBtnClick = async (type) => {
		if (!currentUserReaction) {
			const error = await addReaction({ postId: post.id, userId: currentUser.id, type });
			if (error) alert(error);
			return;
		}

		if (currentUserReaction.type === type) {
			const error = await removeReaction(currentUserReaction);
			if (error) alert(error);
			return;
		}

		if (currentUserReaction.type !== type) {
			const { type: oldType, ...other } = currentUserReaction;
			const error = await updateReaction({ ...other, oldType, newType: type });
			if (error) alert(error);
			return;
		}

		console.log({ type, currentUserReaction });
	};

	return (
		<div className="post__reactions">
			{reactionsEmojis &&
				reactionsEmojis.map((reaction) => (
					<div className="post__reaction" key={`${post?.id}-${reaction.type}`}>
						<button
							className={`post__reaction__btn ${
								currentUserReaction?.type === reaction.type ? '' : postReactionsClass
							}`}
							disabled={!isThereUserToInteract}
							onClick={() => {
								onReactionBtnClick(reaction.type);
							}}
						>
							{reaction.emoji}
						</button>
						<span>{reducedReactions[reaction.type]}</span>
					</div>
				))}
		</div>
	);
};

export default ReactionBtns;
