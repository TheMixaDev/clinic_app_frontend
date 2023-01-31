import NotificationProgress from "@/components/NotificationProgress.vue";
import {createApp} from "vue";

export const methods = {
    runNotification: function(text) {
        const div = document.getElementById("notification");
        const app = createApp(NotificationProgress, {text: text});
        app.mount(div);
    }
}