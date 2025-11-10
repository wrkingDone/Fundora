export default async function handler(req, res) {
    try {
      const response = await fetch(process.env.HEDERA_RPC_URL, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      res.status(200).json(data);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  