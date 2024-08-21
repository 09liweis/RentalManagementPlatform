interface FetchDataProp {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: { [key: string]: any };
}

export const fetchData = async ({
  url,
  method = "GET",
  body = {},
}: FetchDataProp) => {
  try {
    const option: any = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    };
    if (method === "POST" || method === "PUT") {
      option.body = JSON.stringify(body);
    }
    const res = await fetch(url, option);
    const data = await res.json();
    return data;
  } catch (err) {
    return { err };
  }
};
