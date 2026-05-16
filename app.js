const imageUpload = document.getElementById('imageUpload');
const imagePrompt = document.getElementById('imagePrompt');
const imageCanvas = document.getElementById('imageCanvas');
const applyFilter = document.getElementById('applyFilter');
const enhanceImage = document.getElementById('enhanceImage');
const videoPrompt = document.getElementById('videoPrompt');
const musicPrompt = document.getElementById('musicPrompt');
const generateVideo = document.getElementById('generateVideo');
const previewVideo = document.getElementById('previewVideo');
const outputVideo = document.getElementById('outputVideo');
const assistantPrompt = document.getElementById('assistantPrompt');
const assistantRun = document.getElementById('assistantRun');
const assistantOutput = document.getElementById('assistantOutput');
const installButton = document.getElementById('installButton');

let deferredPrompt = null;
let currentImage = new Image();
let canvasContext = imageCanvas.getContext('2d');

function renderCanvas() {
  const width = imageCanvas.width;
  const height = imageCanvas.height;
  canvasContext.fillStyle = '#0f172a';
  canvasContext.fillRect(0, 0, width, height);
  if (currentImage.src) {
    let ratio = Math.min(width / currentImage.width, height / currentImage.height);
    let w = currentImage.width * ratio;
    let h = currentImage.height * ratio;
    let x = (width - w) / 2;
    let y = (height - h) / 2;
    canvasContext.drawImage(currentImage, x, y, w, h);
  } else {
    canvasContext.fillStyle = '#1e293b';
    canvasContext.fillRect(0, 0, width, height);
    canvasContext.fillStyle = '#94a3b8';
    canvasContext.font = '20px Inter, sans-serif';
    canvasContext.textAlign = 'center';
    canvasContext.fillText('Upload ảnh để bắt đầu', width / 2, height / 2);
  }
}

imageUpload.addEventListener('change', () => {
  const file = imageUpload.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    currentImage.src = reader.result;
    currentImage.onload = renderCanvas;
  };
  reader.readAsDataURL(file);
});

applyFilter.addEventListener('click', () => {
  canvasContext.globalCompositeOperation = 'color';
  canvasContext.fillStyle = 'rgba(56, 189, 248, 0.28)';
  canvasContext.fillRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasContext.globalCompositeOperation = 'source-over';
  showToast('Áp dụng bộ lọc màu thành công.');
});

enhanceImage.addEventListener('click', async () => {
  const prompt = imagePrompt.value.trim() || 'Sáng tạo hình ảnh với phong cách hiện đại.';
  showToast(`Windy đang xử lý: ${prompt}`);
  try {
    const response = await fetch('/api/windy/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    if (data.imageUrl) {
      currentImage.src = data.imageUrl;
      currentImage.onload = renderCanvas;
      showToast('Ảnh Windy đã được tạo thành công.');
      return;
    }
  } catch (error) {
    console.warn(error);
  }
  setTimeout(() => {
    canvasContext.strokeStyle = '#38bdf8';
    canvasContext.lineWidth = 8;
    canvasContext.strokeRect(16, 16, imageCanvas.width - 32, imageCanvas.height - 32);
    showToast('Ảnh đã được xử lý bởi Windy (demo).');
  }, 1200);
});

generateVideo.addEventListener('click', async () => {
  const prompt = videoPrompt.value.trim() || 'Tạo video quảng cáo sản phẩm độc đáo.';
  const music = musicPrompt.value.trim() || 'Beat nhạc sôi động.';
  showToast(`Windy đang tạo video theo: ${prompt}`);
  try {
    const response = await fetch('/api/windy/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Tạo kịch bản video: ${prompt} với nhạc nền ${music}` })
    });
    const data = await response.json();
    if (data.text) {
      assistantOutput.innerHTML = `<p>${data.text}</p>`;
      showToast('Windy đã tạo kịch bản video.');
      return;
    }
  } catch (error) {
    console.warn(error);
  }
  setTimeout(() => {
    assistantOutput.innerHTML = '<p>Video demo đã được tạo. Tích hợp backend Windy để tạo video thực tế.</p>';
    showToast('Video mẫu đã sẵn sàng.');
  }, 1600);
});

previewVideo.addEventListener('click', () => {
  showToast('Xem trước video...');
});

assistantRun.addEventListener('click', async () => {
  const prompt = assistantPrompt.value.trim();
  if (!prompt) {
    assistantOutput.innerHTML = '<p>Hãy nhập mục tiêu của bạn để Windy hỗ trợ.</p>';
    return;
  }
  assistantOutput.innerHTML = '<p>Windy đang phân tích và đưa ra kế hoạch...</p>';
  try {
    const response = await fetch('/api/windy/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    if (data.text) {
      assistantOutput.innerHTML = `<p>${data.text}</p>`;
      return;
    }
  } catch (error) {
    console.warn(error);
  }
  setTimeout(() => {
    assistantOutput.innerHTML = `
      <p><strong>Gợi ý Windy:</strong> Bạn nên bắt đầu bằng cách upload ảnh mẫu, chọn phong cách video, sau đó sử dụng prompt để tạo khung cảnh video. Windy sẽ giúp bạn hoàn thiện từng bước bằng các mẫu preset và hướng dẫn cụ thể.</p>
      <ul>
        <li>1. Tải ảnh sản phẩm hoặc cảnh nền.</li>
        <li>2. Nhập prompt mô tả phong cách mong muốn.</li>
        <li>3. Tạo video thử nghiệm, tinh chỉnh nhạc và chuyển cảnh.</li>
      </ul>
    `;
  }, 1200);
});

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2600);
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.style.display = 'inline-flex';
});

installButton.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const choiceResult = await deferredPrompt.userChoice;
  if (choiceResult.outcome === 'accepted') {
    showToast('App đã được cài đặt.');
  }
  deferredPrompt = null;
  installButton.style.display = 'none';
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(() => {
    console.warn('Service worker không thể đăng ký.');
  });
}

renderCanvas();
