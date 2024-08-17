import { BaseObserver } from "@powersync/web";

export class SupabaseConnector extends BaseObserver {
  constructor(config) {
	 super();
	 this.config = config;
	 this.client = createClient(
		this.config.supabaseUrl,
		this.config.supabaseAnonKey,
		{
		  auth: {
			 persistSession: true,
		  },
		}
	 );
	 this.currentSession = null;
	 this.ready = false;
  }

  async init() {
	 if (this.ready) {
		return;
	 }

	 const sessionResponse = await this.client.auth.getSession();
	 this.updateSession(sessionResponse.data.session);

	 this.ready = true;
	 this.iterateListeners((cb) => cb.initialized?.());
  }

  async login(username, password) {
	 const {
		data: { session },
		error,
	 } = await this.client.auth.signInWithPassword({
		email: username,
		password: password,
	 });

	 if (error) {
		throw error;
	 }

	 this.updateSession(session);
  }

  async logout() {
	 await this.client.auth.signOut();
	 this.updateSession(null);
  }
}
export default class DummyConnector {
  async fetchCredentials() {
    return {
      endpoint: "",
      token: "",
    };
  }

  async uploadData(database) {}
}
