const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    //아래와 같이 ipcRenderer를 노출시키면, 렌더러 프로세스에서도 ipcRenderer를 사용할 수 있게 되어서 사용하지 않는다. 
    //Todo. 나중에 제거
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    }
});