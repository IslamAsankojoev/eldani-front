export function base64UrlDecode(base64Url:string) {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

export function decode(token:string) {
  const [header, payload, signature] = token.split('.');
  const decodedHeader = JSON.parse(base64UrlDecode(header));
  const decodedPayload = JSON.parse(base64UrlDecode(payload));
  return { header: decodedHeader, payload: decodedPayload, signature };
}