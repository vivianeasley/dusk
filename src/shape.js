export const initState = (initialState, render) => {
  let state = structuredClone(initialState);
  let needsRender = false;
  let isInitiated = false;

  const get = () => structuredClone(state);

  const set = (updatedState) => {
    // console.log("-=-=-=", updatedState)
    render(updatedState)
    state = updatedState
  };

  // const set = (path, value) => {
  //   const newState = structuredClone(state);
  //   let current = newState;

  //   getPathArray(current, path, value)

  //   state = newState;
  //   needsRender = true;
  //   scheduleRender();

  // };

  if (isInitiated === false) {
    needsRender = true;
    render(initialState);
    isInitiated = true
  }

  return { get, set };
}