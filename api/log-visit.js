import { addLog } from "./get-logs";

export default function handler(req, res) {
  const ua = req.headers['user-agent'] || 'Unknown';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const referer = req.headers['referer'] || 'Unknown';
  const url = req.query.url || 'Unknown';
  const time = new Date().toISOString();

  const entry = `时间: ${time}
IP: ${ip}
设备: ${ua}
来源: ${referer}
访问页面: ${url}`;

  addLog(entry);

  res.status(200).json({ ok: true });
}

