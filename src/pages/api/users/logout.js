export default async function (req, res) {
  res.setHeader('Set-Cookie', `session=''; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  res.send();
}
