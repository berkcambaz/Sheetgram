export function api(type, data) {
  return fetch(window.location.origin + "/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data })
  }).then(res => res.json())
}