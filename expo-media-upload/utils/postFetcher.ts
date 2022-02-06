const getHeader = (type: 'multipart' | 'json'): HeadersInit => {
  switch (type) {
    case 'json':
      return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    case 'multipart':
    default:
      return {};
  }
};

const getBody = (
  type: 'multipart' | 'json',
  body: object | FormData
): BodyInit => {
  switch (type) {
    case 'multipart':
      return body as FormData;
    case 'json':
    default:
      return JSON.stringify(body);
  }
};

export const postFetcher = (
  url: string,
  body: object | FormData,
  type: 'multipart' | 'json'
) =>
  fetch(url, {
    method: 'POST',
    headers: getHeader(type),
    body: getBody(type, body),
  });
