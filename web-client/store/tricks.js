const initState = () => ({
  tricks: []
});

export const state = initState;

// mutations are synchronous
// eg: write calls
export const mutations = {
  setTricks(state, {tricks}){
    state.tricks = tricks;
  },
  reset(state){
    Object.assign(state, initState());
  }
}

// actions are asynchronous
// api calls are done inside actions
export const actions = {
  async fetchTricks({commit}){
    const tricks = await this.$axios.$get("/api/tricks");
    commit("setTricks", {tricks});
  },

}
