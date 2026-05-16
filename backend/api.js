const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = process.env.OPENAI_API_URL || 'https://api.openai.com/v1';

if (!OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY chưa được cấu hình. Windy sẽ chạy ở chế độ demo.');
}

router.post('/windy/text', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!OPENAI_API_KEY) {
    return res.json({ text: `Demo Windy gợi ý cho: ${prompt}` });
  }

  try {
    const response = await axios.post(
      `${OPENAI_API_URL}/chat/completions`,
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Bạn là trợ lý AI hỗ trợ chỉnh sửa ảnh và tạo video.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const text = response.data.choices?.[0]?.message?.content || 'Không có phản hồi từ AI.';
    res.json({ text });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Không thể gọi API AI.' });
  }
});

router.post('/windy/image', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  if (!OPENAI_API_KEY) {
    return res.json({ imageUrl: '/images/default-product.svg' });
  }

  try {
    const response = await axios.post(
      `${OPENAI_API_URL}/images/generations`,
      {
        prompt,
        n: 1,
        size: '1024x1024'
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const imageUrl = response.data.data?.[0]?.url;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Không thể tạo ảnh AI.' });
  }
});

router.get('/status', (req, res) => {
  res.json({ status: 'ok', mode: OPENAI_API_KEY ? 'live' : 'demo' });
});

module.exports = router;
