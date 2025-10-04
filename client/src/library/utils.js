// export function formatMessageTime(date){
//     return new Date(date).toLocaleTimeString("en-US",{
//         hour : "2-digit",
//         minute : "2-digit",
//         hour12 : false
//     })
// }

export function formatMessageTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";   // invalid date check
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
