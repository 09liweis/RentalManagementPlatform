interface FetchDataProp {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: { [key: string]: any };
}

export const fetchData = async ({
  url,
  method = "GET",
  body = {},
}: FetchDataProp) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Auhtorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {}
};
