const MakeRequest = async (path: string, type: string, payload: any = null) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");

  const options: any = {
    method: type,
    headers: requestHeaders,
  };
  if (payload) options.body = JSON.stringify(payload);
  try {
    const response: any = await fetch(path, options);
    if (response.status >= 200 && response.status <= 399) {
      console.log("got response");
      const result = await response.json();
      console.log("got json");
      console.log(
        `${path}: result from server: ${response.status} ${JSON.stringify(
          result
        )}`
      );
      return { status: true, result: result };
    } else {
      const error: any = response.error ? response.error : response.statusText;
      console.debug(`${path}: result from server: ${response.status} ${error}`);
      return { status: false, result: { error: error } };
    }
  } catch (err: any) {
    console.error(err.message);
    return { status: false, result: { error: err.message } };
  }
};

export const Get = async (path: string) => {
  try {
    const { status, result } = await MakeRequest(path, "GET");
    return { status: status, result: result };
  } catch (err: any) {
    console.error(err);
    return { status: false, result: { error: err.message } };
  }
};

export const Post = async (path: string, payload: any = null) => {
  try {
    const { status, result } = await MakeRequest(path, "POST", payload);
    return { status: status, result: result };
  } catch (err: any) {
    console.error(err.message);
    return { status: false, result: { error: err.message } };
  }
};
