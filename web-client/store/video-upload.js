import {UPLOAD_TYPE} from "@/data/enum";

const initState = () => ({
  uploadPromise: null,
  active: false,
  type: "",
  step: 1,
});

export const state = initState;

// mutations are synchronous
// eg: write calls
export const mutations = {
  toggleActivity(state) {
    state.active = !state.active;
    if (!state.active) {
      Object.assign(state, initState());
    }
  },
  setType(state, {type}) {
    state.type = type;
    if(type === UPLOAD_TYPE.TRICK ) {
      state.step++
    }
    else if(type === UPLOAD_TYPE.SUBMISSION) {
      state.step += 2;
    }
  },
  incStep(state) {
    state.step++;
  },
  setTask(state, {uploadPromise}) {
    state.uploadPromise = uploadPromise;
    state.step++
  },
  reset(state) {
    Object.assign(state, initState());
  }
}

// actions are asynchronous
// api calls are done inside actions
export const actions = {
  async startVideoUpload({commit, dispatch}, {form}) {
    const uploadPromise = this.$axios.$post("/api/videos", form);
    commit("setTask", {uploadPromise});
  },
  async createTrick({state, commit, dispatch}, {trick, submission}) {

    if(state.type === UPLOAD_TYPE.TRICK) {
      const createdTrick = await this.$axios.$post("/api/tricks", trick);
      console.log("Created Trick: ", createdTrick);
      submission.trickId = createdTrick.id;
    }

    const createdSubmission = await this.$axios.$post("/api/submissions", submission);

    await dispatch("tricks/fetchTricks", null, { root: true });
    await dispatch("submissions/fetchSubmissions", null, { root: true });
  },
}
