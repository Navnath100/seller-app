import { createServer } from "miragejs"
import schedules from './schedules.json';

if (window.server) {
  server.shutdown()
}

window.server = createServer({
  routes() {
    this.get("/api/schedules", () => {
        return schedules
    })
  },
})
