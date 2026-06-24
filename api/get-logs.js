let logs = [];

export default function handler(req, res) {
  res.status(200).json({ logs });
}

export function addLog(entry) {
  logs.push(entry);
  if (logs.length > 200) logs.shift(); // 最多保留 200 条
}
