const initState = () => ({
  submissions: []
});

export const state = initState;

// mutations are synchronous
// eg: write calls
export const mutations = {
  setSubmissions(state, {submissions}){
    state.submissions = submissions;
  },
  reset(state){
    Object.assign(state, initState());
  }
}

// actions are asynchronous
// api calls are done inside actions
export const actions = {
  async fetchSubmissions({commit}){
    const submissions = await this.$axios.$get("/api/submissions");
    commit("setSubmissions", {submissions});
  },

}
