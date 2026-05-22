export async function apiRequest(url = "", optionsObj = null, errMsg = null) {
  try {
    const response = await fetch(url, optionsObj);
    console.log(url);
    if (!response.ok) throw Error("Please reload the app");
  } catch (error) {
    errMsg = error.message;
  }
  return errMsg;
}
