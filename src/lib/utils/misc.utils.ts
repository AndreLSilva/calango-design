export function downloadFile(name: string, content: string) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=UTF-8," + encodeURIComponent(content));
  element.setAttribute("download", name);
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
