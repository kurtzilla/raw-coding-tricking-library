const initState = () => ({});

export const state = initState;

// mutations are synchronous
// eg: write calls
export const mutations = {
  reset(state){
    Object.assign(state, initState());
  }
}

// actions are asynchronous
// api calls are done inside actions
export const actions = {
  // nuxtServerInit is only available for the index page!
  async nuxtServerInit({commit, dispatch}){
    await dispatch("tricks/fetchTricks");
    await dispatch("submissions/fetchSubmissions");
  }
}
