/**
 * The status of the XMLHttpRequest.
 *
 * @enum {number}
 */
enum XMLHttpRequestReadyState {
  NotInitialized,
  ServerConnectionEstablished,
  RequestReceived,
  ProcessingRequest,
  ResponseIsReady
}

const HTTP_STATUS_CODE_OK: number = 200;

/**
 * @description This is an AJAX-like function, which is implemented using the XMLHttpRequest.
 * @description Acknowledgement: This implementation borrows idea from the [W3Schools](https://www.w3schools.com/xml/ajax_intro.asp)
 * @description Please be aware that this is not a robust function, I am just writing it to show it is possible to implement the ajax call using XMLHTTPRequest.
 *
 * @author Martin Luo
 *
 * @export
 * @param {string} url The API endpoints.
 * @param {(response: XMLHttpRequestResponseType) => any} onResponseIsReady Callback function when the response is received.
 * @param {BodyInit} [body=null] Body to be sent with the request. When no value is passed in, the request will be sent using GET method, otherwise POST mthod, together with the body.
 * @param {boolean} [async=true] Flag indicating if the call is asynchronous or not.
 */
export function ajaxInXMLHTTPRequest(
  url: string,
  onResponseIsReady: (response: XMLHttpRequestResponseType) => any,
  body: BodyInit = null,
  async: boolean = true
): void {
  let xhr: XMLHttpRequest;

  if (window.XMLHttpRequest) {
    // code for modern browsers
    xhr = new XMLHttpRequest();
  } else {
    // code for old IE browsers
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // Event handler when the XMLHttpResponse is received.
  xhr.onreadystatechange = function(this: XMLHttpRequest, event: Event) {
    if (
      this.readyState === XMLHttpRequestReadyState.ResponseIsReady &&
      this.status === HTTP_STATUS_CODE_OK
    ) {
      onResponseIsReady(this.response);
    }
  };

  // Check if body is null, if it's null, treat this request as a POST request.
  const xhrMethod: string = body ? "POST" : "GET";
  xhr.open(xhrMethod, url, async);
  xhr.send(xhrMethod);
}
