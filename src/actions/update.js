export const update = () => {
    return {
      type: "UPDATE"
    }
}
export const updateProfileImage = () => {
  return {
    type: "UPDATE_PROFILE_IMAGE"
  }
}

export const updatePosts = () => {
  return {
    type: "UPDATE_POSTS"
  }
}

export const showModal = () => {
  return {
    type: "SHOW_POST_MODAL"
  }
}


export const userProfile = (profile) => {
  return {
    type: "USER_PROFILE",
    payload: profile
  }
}

export const selectedProfile = (profile) => {
  return {
    type: "SELECTED_PROFILE",
    payload: profile
  }
}

export const searchQuery = (searchWord) => {
  return {
    type: "UPDATE_SEARCH_WORD",
    payload: searchWord
  }
}

export const selectedPost = (post) => {
  return {
    type: "SELECTED_POST",
    payload: post
  }
}

export const addNewPost = (post) => {
  return {
    type: "ADD_NEW_POST",
    payload: post
  }
}