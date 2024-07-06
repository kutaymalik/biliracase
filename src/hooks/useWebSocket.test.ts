import { renderHook, act } from '@testing-library/react-hooks';
import useWebSocket from './useWebSocket';
import { Asset } from '../types/Asset';

// Mock WebSocket class
class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  
  readyState = MockWebSocket.CONNECTING;
  url: string;
  listeners: { [key: string]: Array<(event: any) => void> } = { message: [] };
  
  constructor(url: string) {
    this.url = url;
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN;
      this.listeners.open?.forEach(listener => listener({}));
    }, 10);
  }
  
  addEventListener(type: string, listener: (event: any) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }
  
  removeEventListener(type: string, listener: (event: any) => void) {
    this.listeners[type] = this.listeners[type].filter(l => l !== listener);
  }
  
  send(data: any) {
    // no-op
  }
  
  close() {
    this.readyState = MockWebSocket.CLOSED;
    this.listeners.close?.forEach(listener => listener({}));
  }
  
  dispatchEvent(event: any) {
    this.listeners[event.type]?.forEach(listener => listener(event));
  }
}

// Override the global WebSocket
(global as any).WebSocket = MockWebSocket;

describe('useWebSocket', () => {
  it('should receive data from WebSocket and update state', async () => {
    const url = 'wss://test-websocket-url';
    const mockData: Asset[] = [
      { s: 'BTCUSDT', c: '50000', p: '1', q: '10', P: '2' },
      { s: 'ETHUSDT', c: '4000', p: '2', q: '20', P: '3' },
    ];

    const { result, waitForNextUpdate } = renderHook(() => useWebSocket(url));

    act(() => {
      const ws = (global as any).WebSocket.mock.instances[0];
      ws.dispatchEvent(new MessageEvent('message', { data: JSON.stringify(mockData) }));
    });

    await waitForNextUpdate();

    expect(result.current).toEqual(mockData);
  });

  it('should close WebSocket on unmount', () => {
    const url = 'wss://test-websocket-url';

    const { unmount } = renderHook(() => useWebSocket(url));
    const ws = (global as any).WebSocket.mock.instances[0];

    unmount();

    expect(ws.close).toHaveBeenCalled();
  });
});
