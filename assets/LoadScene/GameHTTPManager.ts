import { log } from "cc";

export default class GameHTTPManager {
  private static Instance: GameHTTPManager = null;
  public static getInstance(): GameHTTPManager {
    if (this.Instance === null || this.Instance === undefined) {
      this.Instance = new GameHTTPManager();
    }
    return this.Instance;
  }

  isNullOrEmpty(text) {
    if (text == undefined || text == null || text == "") {
      return true;
    }

    return false;
  }

  sendGetHttpRequest(
    url: string,
    onSuccesCallBack: (response: any) => void,
    onErrorCallBack: (mes: string) => void
  ) {
    log("sendGetHttpRequest url: " + url);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        // log("sendGetHttpRequest onreadystatechange responseText: " + xhr.responseText);

        if (xhr.status >= 200 && xhr.status < 400) {
          // log("sendGetHttpRequest onreadystatechange responseText: " + xhr.responseText);

          let response = xhr.responseText;
          onSuccesCallBack(response);
        }
      }
    }

    xhr.onerror = () => {
      let errtext = "Không thể kết nối đến máy chủ, xin hãy thử lại.";

      log("sendGetHttpRequest onerror responseText: " + xhr.responseText);

      if (!this.isNullOrEmpty(xhr.responseText)) {
        let obj = null;
        try {
          obj = JSON.parse(xhr.responseText);
        } catch (error) { }

        if (
          obj !== null &&
          obj !== undefined &&
          !this.isNullOrEmpty(obj.msg)
        ) {
          errtext = obj.msg;
        }
      }
      onErrorCallBack(errtext);
    };

    xhr.ontimeout = () => {
      onErrorCallBack("Không thể kết nối đến máy chủ, xin hãy thử lại.");
    };

    xhr.timeout = 30000;
    xhr.open("GET", url, true);

    xhr.send();
  }

}
