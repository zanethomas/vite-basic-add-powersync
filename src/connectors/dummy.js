
export default class DummyConnector {
  async fetchCredentials() {
    return {
      endpoint: "",
      token: "",
    };
  }
}
