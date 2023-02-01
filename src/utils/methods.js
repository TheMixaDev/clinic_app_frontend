import router from "@/router";
import NotificationProgress from "@/components/NotificationProgress.vue";
import {createApp} from "vue";

import {settings} from "@/utils/settings";
import {constants} from "@/utils/constants";
import axios from "axios";

export const methods = {
    runNotification(text) {
        const div = document.getElementById("notification");
        const app = createApp(NotificationProgress, {text: text});
        app.mount(div);
    },
    checkCookies(cookies, access) {
        if(settings.designMode)
            return;
        if(cookies.get("token") != null) { // TODO Check cookies for already logged in user
            if(access === constants.Role.UNAUTHORIZED) {
                router.push({name: "appointments"}); // TODO: OR ADMIN PANEL DEPENDING ON ROLE, SENDING GET MODEL REQUEST
            }
        } else if(access !== constants.Role.UNAUTHORIZED) {
            router.push({ name: "login" })
        }
    },
    authorizedGETRequest(cookies, route, success, fail) {
        axios.request({
            method: 'get',
            url: `${settings.serverUrl}${route}`,
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`
            }
        }).then(success).catch(fail);
    }
}