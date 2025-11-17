import { API_URL } from "./config";

const MakeRequest = async (path: string, type: string, payload: any = null) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");

  const options: any = {
    method: type,
    headers: requestHeaders,
  };
  if (payload) options.body = JSON.stringify(payload);

  try {
    const response: any = await fetch(`${API_URL}${path}`, options);
    if (response.status >= 200 && response.status <= 399) {
      const result = await response.json();
      console.log(`${path}: result from server: ${response.status}`, result);
      return { status: true, result };
    } else {
      const error: any = response.error ? response.error : response.statusText;
      console.debug(`${path}: result from server: ${response.status} ${error}`);
      return { status: false, result: { error } };
    }
  } catch (err: any) {
    console.error(err.message);
    return { status: false, result: { error: err.message } };
  }
};

export const Get = async (path: string) => {
  try {
    return await MakeRequest(path, "GET");
  } catch (err: any) {
    console.error(err);
    return { status: false, result: { error: err.message } };
  }
};

export const Post = async (path: string, payload: any = null) => {
  try {
    return await MakeRequest(path, "POST", payload);
  } catch (err: any) {
    console.error(err.message);
    return { status: false, result: { error: err.message } };
  }
};
