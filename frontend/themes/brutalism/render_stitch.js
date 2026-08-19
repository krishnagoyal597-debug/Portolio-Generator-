import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
// Directly target the companion share URL which renders the final portfolio screen UI
const URL = 'https://app-companion-430619.appspot.com/share/4883055170025929164/219d29d6d1244fb2a238a8b8869cbd88';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("Starting Chrome...");
  const chrome = spawn(CHROME_PATH, [
    '--headless',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\HP\\chrome-stitch-profile'
  ]);
  
  // Wait a moment for Chrome to start
  await delay(3000);
  
  try {
    console.log("Fetching tabs list...");
    const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const tabs = await res.json();
    console.log("Found tabs:", tabs);
    
    // Find the real page tab
    const tab = tabs.find(t => t.type === 'page');
    if (!tab || !tab.webSocketDebuggerUrl) {
      throw new Error("No debugger page tab found");
    }
    
    console.log("Connecting via WebSocket to:", tab.webSocketDebuggerUrl);
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });
    console.log("Connected!");
    
    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        const onMessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', onMessage);
            if (data.error) reject(data.error);
            else resolve(data.result);
          }
        };
        ws.addEventListener('message', onMessage);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }
    
    console.log("Enabling Page and Runtime domains...");
    await send('Page.enable');
    await send('Runtime.enable');
    
    console.log("Navigating to:", URL);
    await send('Page.navigate', { url: URL });
    
    console.log("Waiting 12 seconds for client-side rendering to complete...");
    await delay(12000);
    
    console.log("Evaluating outerHTML...");
    const evalResult = await send('Runtime.evaluate', {
      expression: 'document.documentElement.outerHTML',
      returnByValue: true
    });
    
    const html = evalResult.result.value;
    fs.writeFileSync('rendered_page.html', html);
    console.log(`Saved DOM to rendered_page.html (${html.length} bytes)`);
    
    console.log("Capturing screenshot...");
    const screenshotResult = await send('Page.captureScreenshot', {
      format: 'png'
    });
    const imgBuffer = Buffer.from(screenshotResult.data, 'base64');
    fs.writeFileSync('rendered_image.png', imgBuffer);
    console.log(`Saved screenshot to rendered_image.png (${imgBuffer.length} bytes)`);
    
    ws.close();
  } catch (err) {
    console.error("Error during rendering process:", err);
  } finally {
    console.log("Killing Chrome...");
    chrome.kill();
  }
}

main();
