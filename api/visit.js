import fetch from "node-fetch";

const owner = "always001";
const repo = "huaxia-classroom";
const path = "data/visits.json";
const token = process.env.GITHUB_TOKEN;

export default async function handler(req, res) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const getResp = await fetch(url, {
    headers: { Authorization: `token ${token}` }
  });
  const getData = await getResp.json();

  const content = Buffer.from(getData.content, "base64").toString();
  const json = JSON.parse(content);

  json.total++;

  const newContent = Buffer.from(JSON.stringify(json, null, 2)).toString("base64");

  await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "update visits",
      content: newContent,
      sha: getData.sha
    })
  });

  res.status(200).json({ total: json.total });
}
