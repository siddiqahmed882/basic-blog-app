import postReducerActions from '../actions/postActions';

const postReducer = (state, action) => {
  switch (action.type) {
    case postReducerActions.LOADING: {
      return { ...state, isLoading: true };
    }

    case postReducerActions.ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    case postReducerActions.POSTS_FETCH_SUCCESS: {
      return { ...state, isLoading: false, error: '', posts: action.payload };
    }

    case postReducerActions.SINGLE_POST_FETCH_SUCCESS: {
      return { ...state, isLoading: false, error: '', post: action.payload };
    }

    case postReducerActions.POST_CREATE: {
      return { ...state, posts: [action.payload, ...state.posts] };
    }

    case postReducerActions.POST_DELETE: {
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload.id),
      };
    }

    case postReducerActions.COMMENT_ADDED: {
      return {
        ...state,
        post: { ...state.post, comments: [action.payload, ...state.post.comments] },
        posts: state.posts.map(post => post.id === action.payload.postId ? { ...post, comments: post.comments++ } : post)
      };
    }

    case postReducerActions.COMMENT_DELETED: {
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment.id !== action.payload.id
          ),
        },
        posts: state.posts.map(post => post.id === action.payload.postId ? { ...post, comments: post.comments-- } : post)
      };
    }

    case postReducerActions.REACTION_ADDED: {
      return {
        ...state,
        post: state.post
          ? { ...state.post, reactions: [...state.post.reactions, action.payload] }
          : null,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, reactions: [...post.reactions, action.payload] }
            : post
        ),
      };
    }

    case postReducerActions.REACTION_REMOVED: {
      return {
        ...state,
        post: state.post
          ? {
            ...state.post,
            reactions: state.post.reactions.filter(
              (react) => react.id !== action.payload.id
            ),
          }
          : null,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
              ...post,
              reactions: post.reactions.filter(
                (react) => react.id !== action.payload.id
              ),
            }
            : post
        ),
      };
    }

    case postReducerActions.REACTION_UPDATED: {
      return {
        ...state,
        post: state.post
          ? {
            ...state.post,
            reactions: state.post.reactions.map((react) =>
              react.id === action.payload.id
                ? { ...react, type: action.payload.newType }
                : react
            ),
          }
          : null,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
              ...post,
              reactions: post.reactions.map((react) =>
                react.id === action.payload.id
                  ? { ...react, type: action.payload.newType }
                  : react
              ),
            }
            : post
        ),
      };
    }

    case postReducerActions.REACTION_REVERTED: {
      return {
        ...state,
        post: state.post
          ? {
            ...state.post,
            reactions: state.post.reactions.map((react) =>
              react.id === action.payload.id
                ? { ...react, type: action.payload.oldType }
                : react
            ),
          }
          : null,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
              ...post,
              reactions: post.reactions.map((react) =>
                react.id === action.payload.id
                  ? { ...react, type: action.payload.oldType }
                  : react
              ),
            }
            : post
        ),
      };
    }

    case postReducerActions.FETCH_REACTION_EMOJIS: {
      return { ...state, reactionsEmojis: action.payload };
    }

    default:
      return state;
  }
};

export default postReducer;