# https://rinae.dev/posts/a-complete-guide-to-useeffect-ko

# https://www.robinwieruch.de/react-hooks-fetch-data

# 3.

Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

useEffect(() => {
async function fetchData() {
// You can await here
const response = await MyAPI.getData(someId);
// ...
}
fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://fb.me/react-hooks-data-fetchingeslint(react-hooks/exhaustive-deps
